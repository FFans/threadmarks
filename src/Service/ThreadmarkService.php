<?php

namespace FFans\Threadmarks\Service;

use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Model\Threadmark;
use FFans\Threadmarks\Model\ThreadmarkType;
use Flarum\Discussion\Discussion;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\Post\PostRepository;
use Flarum\User\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Arr;

class ThreadmarkService
{
    public function __construct(protected PostRepository $posts, protected Translator $translator)
    {
    }

    public function canManageDiscussion(User $actor, Discussion $discussion): bool
    {
        return $actor->can('ffans-threadmarks.manageDiscussionThreadmarks', $discussion)
            || ((int) $discussion->user_id === (int) $actor->id
                && $actor->can('ffans-threadmarks.manageOwnDiscussionThreadmarks', $discussion));
    }

    public function find(string $id, User $actor, bool $personal)
    {
        if ($personal) {
            $actor->assertRegistered();
            return PersonalThreadmark::query()->visibleToOwner($actor)->findOrFail($id);
        }

        return Threadmark::query()->whereIn('discussion_id', Discussion::whereVisibleTo($actor)->select('id'))->findOrFail($id);
    }

    public function save($data, User $actor, bool $personal, ?string $id = null)
    {
        $actor->assertRegistered();
        if (!is_array($data)) {
            throw new \Tobscure\JsonApi\Exception\InvalidParameterException('Data must be an object.');
        }
        $mark = $id === null ? ($personal ? new PersonalThreadmark() : new Threadmark()) : $this->find($id, $actor, $personal);
        $attributes = Arr::get($data, 'attributes', []);
        if (!is_array($attributes)) {
            throw new ValidationException(['data' => 'Attributes must be an object.']);
        }

        // Only the explicitly writable fields can affect persisted state.
        foreach (array_diff(array_keys($attributes), $personal ? ['note', 'position'] : ['note']) as $key) {
            throw new \Tobscure\JsonApi\Exception\InvalidParameterException('Unknown attribute: '.$key, 0, null, $key);
        }

        if (!$mark->exists) {
            $postId = Arr::get($data, 'relationships.post.data.id');
            if (!is_scalar($postId) || !ctype_digit((string) $postId)) {
                throw new ValidationException([], ['post' => 'A post is required.']);
            }
            $post = $this->posts->findOrFail($postId, $actor);
            if ((int) $post->number === 1) {
                $this->invalid('post', 'first_post');
            }
            if ($post->type !== 'comment') {
                $this->invalid('post', $personal ? 'invalid_personal_post' : 'invalid_discussion_post');
            }
            $mark->post_id = $mark->original_post_id = $post->id;
            $mark->discussion_id = $post->discussion_id;
            $mark->original_post_number = $post->number;
            if ($personal) {
                $mark->owner_id = $actor->id;
            } else {
                $mark->created_by = $actor->id;
            }
        }
        $this->assertCanManage($mark, $actor);

        if (!$mark->exists || Arr::has($data, 'relationships.type')) {
            $typeId = Arr::get($data, 'relationships.type.data.id');
            if (!is_scalar($typeId) || !ctype_digit((string) $typeId)) {
                throw new ValidationException([], ['type' => 'A type is required.']);
            }
            $type = ThreadmarkType::findOrFail($typeId);
            if ((!$mark->exists || (int) $mark->type_id !== (int) $type->id) && !$type->is_enabled) {
                $this->invalid('type', 'disabled_type');
            }
            $mark->type_id = $type->id;
            $mark->setRelation('type', $type);
        }
        if (array_key_exists('note', $attributes)) {
            $note = $attributes['note'];
            if ($note !== null && (!is_string($note) || mb_strlen($note) > 100)) {
                throw new ValidationException(['note' => 'The note must be a string of at most 100 characters.']);
            }
            $mark->note = $note;
        }
        if ($personal && array_key_exists('position', $attributes)) {
            $position = $attributes['position'];
            if ($position !== null && (!is_int($position) || $position < 0 || $position > 4294967295)) {
                throw new ValidationException(['position' => 'The position must be an integer between 0 and 4294967295.']);
            }
            $mark->position = $position;
        }
        if (!$personal) {
            $mark->updated_by = $actor->id;
        }
        if (!$mark->exists) {
            $duplicates = $mark->newQuery()->where('discussion_id', $mark->discussion_id)->where('original_post_id', $mark->original_post_id);
            if ($personal) {
                $duplicates->where('owner_id', $actor->id);
            }
            if ($duplicates->exists()) {
                $this->invalid('post', $personal ? 'duplicate_personal' : 'duplicate_discussion');
            }
        }
        try {
            $mark->save();
        } catch (QueryException $exception) {
            // Laravel 8 has no UniqueConstraintViolationException. Do not mask other SQL failures.
            if (in_array((int) ($exception->errorInfo[1] ?? 0), [1062, 19], true)
                && preg_match('/UNIQUE constraint failed|Duplicate entry/i', $exception->getMessage())) {
                $this->invalid('post', $personal ? 'duplicate_personal' : 'duplicate_discussion');
            }
            throw $exception;
        }

        return $mark;
    }

    public function delete(string $id, User $actor, bool $personal): void
    {
        $actor->assertRegistered();
        $mark = $this->find($id, $actor, $personal);
        $this->assertCanManage($mark, $actor);
        $mark->delete();
    }

    private function assertCanManage($mark, User $actor): void
    {
        $actor->assertRegistered();
        if ($mark instanceof PersonalThreadmark) {
            $actor->assertCan('ffans-threadmarks.managePersonalThreadmarks', $mark->discussion);
        } else {
            $actor->assertPermission($this->canManageDiscussion($actor, $mark->discussion));
        }
    }

    private function invalid(string $field, string $key): void
    {
        throw new ValidationException([], [$field => $this->translator->trans('ffans-threadmarks.lib.validation.'.$key)]);
    }
}
