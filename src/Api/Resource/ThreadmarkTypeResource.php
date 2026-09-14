<?php

namespace FFans\Threadmarks\Api\Resource;

use FFans\Threadmarks\Model\ThreadmarkType;
use FFans\Threadmarks\Model\PersonalThreadmark;
use Flarum\Api\Context as FlarumContext;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\Api\Sort\SortColumn;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\TranslatorInterface;
use Tobyz\JsonApiServer\Context;

/**
 * @extends AbstractDatabaseResource<ThreadmarkType>
 */
class ThreadmarkTypeResource extends AbstractDatabaseResource
{
    public function __construct(protected TranslatorInterface $translator)
    {
    }

    public function type(): string
    {
        return 'threadmark-types';
    }

    public function model(): string
    {
        return ThreadmarkType::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make()->defaultSort('position'),
            Endpoint\Show::make(),
            Endpoint\Create::make()->admin(),
            Endpoint\Update::make()->admin(),
            Endpoint\Delete::make()->admin(),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('key')
                ->requiredOnCreate()
                ->writableOnCreate()
                ->unique('ffans_threadmark_types', 'key', true),
            Schema\Str::make('name')->requiredOnCreate()->writable(),
            Schema\Str::make('color')->requiredOnCreate()->writable(),
            Schema\Str::make('icon')->requiredOnCreate()->writable(),
            Schema\Integer::make('position'),
            Schema\Boolean::make('isBuiltin'),
            Schema\Boolean::make('isEnabled')->writableOnUpdate(),
            Schema\Boolean::make('canDelete')
                ->visible(fn (ThreadmarkType $model, FlarumContext $context) => $context->getActor()->isAdmin())
                ->get(fn (ThreadmarkType $model) => ! $this->isUsed($model)),
            Schema\DateTime::make('createdAt'),
            Schema\DateTime::make('updatedAt'),
        ];
    }

    public function creating(object $model, Context $context): ?object
    {
        /** @var ThreadmarkType $model */
        $model->position = ((int)ThreadmarkType::query()->max('position')) + 1;
        $model->is_builtin = false;
        $model->is_enabled = true;
        return $model;
    }

    private function isUsed(ThreadmarkType $model): bool
    {
        return $model->threadmarks()->exists()
            || PersonalThreadmark::query()->where('type_id', $model->id)->exists();
    }

    public function deleting(object $model, Context $context): void
    {
        if ($this->isUsed($model)) {
            throw new ValidationException([], ['type' => $this->translator->trans('ffans-threadmarks.lib.validation.type_in_use')]);
        }

        parent::deleting($model, $context);
    }

    public function sorts(): array
    {
        return [
            SortColumn::make('position'),
        ];
    }
}
