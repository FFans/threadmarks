<?php

namespace FFans\Threadmarks\Api\Resource;

use FFans\Threadmarks\Model\PersonalThreadmark;
use Flarum\Api\Context as FlarumContext;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\TranslatorInterface;
use Flarum\Post\Post;
use Flarum\Post\PostRepository;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\UniqueConstraintViolationException;
use Tobyz\JsonApiServer\Context;

/** @extends AbstractDatabaseResource<PersonalThreadmark> */
class PersonalThreadmarkResource extends AbstractDatabaseResource
{
    public function __construct(
        protected PostRepository $posts,
        protected TranslatorInterface $translator,
    ) {
    }

    public function type(): string
    {
        return 'personal-threadmarks';
    }

    public function model(): string
    {
        return PersonalThreadmark::class;
    }

    public function scope(Builder $query, Context $context): void
    {
        /** @var FlarumContext $context */
        $query->visibleToOwner($context->getActor());
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Show::make()->authenticated()->defaultInclude(['type']),
            Endpoint\Create::make()->authenticated()->defaultInclude(['type']),
            Endpoint\Update::make()->authenticated()->defaultInclude(['type']),
            Endpoint\Delete::make()->authenticated(),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Relationship\ToOne::make('discussion')->type('discussions')->includable(),
            Schema\Relationship\ToOne::make('post')->type('posts')->includable()
                ->requiredOnCreate()->writableOnCreate()
                ->set(function (PersonalThreadmark $mark, Post $post) {
                    $mark->post_id = $post->id;
                    $mark->discussion_id = $post->discussion_id;
                    $mark->original_post_id = $post->id;
                    $mark->original_post_number = $post->number;
                }),
            Schema\Relationship\ToOne::make('type')->type('threadmark-types')->includable()
                ->requiredOnCreate()->writable(),
            Schema\Integer::make('originalPostId'),
            Schema\Integer::make('originalPostNumber'),
            Schema\Str::make('note')->nullable()->writable()->maxLength(100),
            Schema\Integer::make('position')->nullable()->writable()->min(0)->max(2147483647),
            Schema\DateTime::make('createdAt'),
            Schema\DateTime::make('updatedAt'),
            Schema\Boolean::make('isPostDeleted')->get(fn (PersonalThreadmark $mark) => $mark->post_id === null),
            Schema\Integer::make('navigationIndex')->nullable()
                ->get(function (PersonalThreadmark $mark, FlarumContext $context) {
                    if ($mark->post_id !== null) {
                        return null;
                    }

                    return max(0, $this->posts->getIndexForNumber(
                        $mark->discussion_id,
                        $mark->original_post_number - 1,
                        $context->getActor()
                    ) - 1);
                }),
            Schema\Boolean::make('canManage')->get(function (PersonalThreadmark $mark, FlarumContext $context) {
                $actor = $context->getActor();

                return ! $actor->isGuest()
                    && $mark->owner_id === (int) $actor->id
                    && $actor->can('ffans-threadmarks.managePersonalThreadmarks', $mark->discussion);
            }),
        ];
    }

    public function creating(object $model, Context $context): ?object
    {
        /** @var PersonalThreadmark $model */
        /** @var FlarumContext $context */
        $actor = $context->getActor();
        $actor->assertRegistered();
        $model->owner_id = $actor->id;

        // Resolve the target with the actor again before writing; a supplied ID is not authorization.
        $post = $this->posts->findOrFail($model->post_id, $actor);
        if ((int) $post->number === 1) {
            throw new ValidationException([], ['post' => $this->translator->trans('ffans-threadmarks.lib.validation.first_post')]);
        }
        if ($post->type !== 'comment') {
            throw new ValidationException([], ['post' => $this->translator->trans('ffans-threadmarks.lib.validation.invalid_personal_post')]);
        }

        $this->assertCanManage($actor, $model);

        if (PersonalThreadmark::query()->where('owner_id', $actor->id)
            ->where('discussion_id', $model->discussion_id)
            ->where('original_post_id', $model->original_post_id)->exists()) {
            $this->duplicate();
        }

        return $model;
    }

    public function updating(object $model, Context $context): ?object
    {
        /** @var FlarumContext $context */
        $this->assertCanManage($context->getActor(), $model);

        return $model;
    }

    public function saving(object $model, Context $context): ?object
    {
        /** @var PersonalThreadmark $model */
        // An existing mark may keep its disabled type when only its note/position changes.
        if ((! $model->exists || $model->isDirty('type_id')) && ! $model->type->is_enabled) {
            throw new ValidationException([], ['type' => $this->translator->trans('ffans-threadmarks.lib.validation.disabled_type')]);
        }

        return $model;
    }

    public function create(object $model, Context $context): object
    {
        try {
            return parent::create($model, $context);
        } catch (UniqueConstraintViolationException $exception) {
            // The database constraint is authoritative when concurrent requests pass the pre-check.
            $this->duplicate();
        }
    }

    public function deleting(object $model, Context $context): void
    {
        /** @var FlarumContext $context */
        $this->assertCanManage($context->getActor(), $model);
    }

    private function assertCanManage(User $actor, PersonalThreadmark $mark): void
    {
        $actor->assertRegistered();

        if ((int) $mark->owner_id !== (int) $actor->id) {
            throw new ModelNotFoundException();
        }

        $actor->assertCan('ffans-threadmarks.managePersonalThreadmarks', $mark->discussion);
    }

    private function duplicate(): never
    {
        throw new ValidationException([], ['post' => $this->translator->trans('ffans-threadmarks.lib.validation.duplicate_personal')]);
    }
}
