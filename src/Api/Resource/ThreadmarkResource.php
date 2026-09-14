<?php

namespace FFans\Threadmarks\Api\Resource;

use FFans\Threadmarks\Model\Threadmark;
use Flarum\Api\Context as FlarumContext;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\TranslatorInterface;
use Flarum\Post\Post;
use Flarum\Post\PostRepository;
use Illuminate\Database\UniqueConstraintViolationException;
use Tobyz\JsonApiServer\Context;

/**
 * @extends AbstractDatabaseResource<Threadmark>
 */
class ThreadmarkResource extends AbstractDatabaseResource
{
    public function __construct(protected PostRepository $posts, protected TranslatorInterface $translator)
    {
    }

    public function model(): string
    {
        return Threadmark::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make()->admin()->paginate(50, 100),
            Endpoint\Show::make()->admin(),
            Endpoint\Create::make()->authenticated()->defaultInclude(['post', 'type']),
            Endpoint\Update::make()->authenticated()->defaultInclude(['post', 'type']),
            Endpoint\Delete::make()->authenticated(),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Relationship\ToOne::make('discussion')->type('discussions')->includable(),
            Schema\Relationship\ToOne::make('post')->type('posts')->includable()
                ->requiredOnCreate()
                ->writableOnCreate()
                ->set(function (Threadmark $threadmark, Post $post) {
                    $threadmark->post_id = $post->id;
                    $threadmark->discussion_id = $post->discussion_id;

                    $threadmark->original_post_id = $post->id;
                    $threadmark->original_post_number = $post->number;
                }),
            Schema\Integer::make('originalPostId'),
            Schema\Integer::make('originalPostNumber'),
            Schema\Relationship\ToOne::make('type')->type('threadmark-types')->includable()
                ->requiredOnCreate()
                ->writable(),
            Schema\Str::make('note')->nullable()->writable()->maxLength(100),

            Schema\Boolean::make('isPostDeleted')
                ->get(fn(Threadmark $threadmark) => $this->isPostDeleted($threadmark)),
            Schema\Integer::make('navigationIndex')->nullable()
                ->get(function (Threadmark $threadmark, FlarumContext $context) {
                    if (!$this->isPostDeleted($threadmark)) {
                        return null;
                    }
                    return max(0, $this->posts->getIndexForNumber(
                            $threadmark->discussion_id,
                            $threadmark->original_post_number - 1,
                            $context->getActor()
                        ) - 1);
                })
        ];
    }

    public function type(): string
    {
        return 'threadmarks';
    }

    public function creating(object $model, Context $context): ?object
    {
        /** @var Threadmark $model */
        /** @var FlarumContext $context */

        $this->assertCanManageDiscussionThreadmarks($model, $context);

        if ((int) $model->original_post_number === 1) {
            throw new ValidationException([], ['post' => $this->translator->trans('ffans-threadmarks.lib.validation.first_post')]);
        }

        $actor = $context->getActor();
        $post = $this->posts->findOrFail($model->post_id, $actor);
        if ($post->type !== 'comment') {
            throw new ValidationException([], ['post' => $this->translator->trans('ffans-threadmarks.lib.validation.invalid_discussion_post')]);
        }
        if (Threadmark::query()->where('discussion_id', $model->discussion_id)
            ->where('original_post_id', $model->original_post_id)->exists()) {
            $this->duplicate();
        }

        $model->created_by = $actor->id;
        $model->updated_by = $actor->id;

        return $model;
    }

    public function saving(object $model, Context $context): ?object
    {
        /** @var Threadmark $model */
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
            $this->duplicate();
        }
    }

    private function duplicate(): never
    {
        throw new ValidationException([], ['post' => $this->translator->trans('ffans-threadmarks.lib.validation.duplicate_discussion')]);
    }

    public function updating(object $model, Context $context): ?object
    {
        /** @var Threadmark $model */
        /** @var FlarumContext $context */

        $this->assertCanManageDiscussionThreadmarks($model, $context);

        $actor = $context->getActor();

        $model->updated_by = $actor->id;

        return $model;
    }

    public function deleting(object $model, Context $context): void
    {
        /** @var Threadmark $model */
        $this->assertCanManageDiscussionThreadmarks($model, $context);
    }

    private function assertCanManageDiscussionThreadmarks(Threadmark $threadmark, Context $context): void
    {
        /** @var FlarumContext $context */
        $actor = $context->getActor();
        $discussion = $threadmark->discussion;

        $actor->assertPermission(
            $actor->can('ffans-threadmarks.manageDiscussionThreadmarks', $discussion)
            || (
                $discussion->user_id === $actor->id
                && $actor->can('ffans-threadmarks.manageOwnDiscussionThreadmarks', $discussion)
            )
        );
    }

    private function isPostDeleted(Threadmark $threadmark): bool
    {
        return $threadmark->post_id === null;
    }
}
