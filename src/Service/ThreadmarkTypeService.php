<?php

namespace FFans\Threadmarks\Service;

use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Model\ThreadmarkType;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\User;

class ThreadmarkTypeService
{
    public function __construct(protected Translator $translator)
    {
    }

    public function isUsed(ThreadmarkType $type): bool
    {
        return $type->threadmarks()->exists() || PersonalThreadmark::where('type_id', $type->id)->exists();
    }

    public function save($attributes, User $actor, ?string $id = null): ThreadmarkType
    {
        $actor->assertAdmin();
        if (!is_array($attributes)) {
            throw new \Tobscure\JsonApi\Exception\InvalidParameterException('Attributes must be an object.');
        }
        $type = $id === null ? new ThreadmarkType() : ThreadmarkType::findOrFail($id);
        foreach (['key' => 50, 'name' => 100, 'color' => 20, 'icon' => 100] as $field => $limit) {
            if ($field === 'key' && $type->exists) continue;
            if (!$type->exists || array_key_exists($field, $attributes)) {
                $value = $attributes[$field] ?? null;
                if (!is_string($value) || trim($value) === '' || mb_strlen($value) > $limit) {
                    throw new ValidationException([$field => 'A nonempty string of at most '.$limit.' characters is required.']);
                }
                $type->$field = $value;
            }
        }
        if (!$type->exists) {
            if (ThreadmarkType::where('key', $type->key)->exists()) {
                throw new ValidationException(['key' => 'The key has already been taken.']);
            }
            $type->position = ((int) ThreadmarkType::max('position')) + 1;
            $type->is_builtin = false;
            $type->is_enabled = true;
        } elseif (array_key_exists('isEnabled', $attributes)) {
            if (!is_bool($attributes['isEnabled'])) {
                throw new ValidationException(['isEnabled' => 'A boolean is required.']);
            }
            $type->is_enabled = $attributes['isEnabled'];
        }
        $type->save();
        return $type;
    }

    public function delete(string $id, User $actor): void
    {
        $actor->assertAdmin();
        $type = ThreadmarkType::findOrFail($id);
        if ($this->isUsed($type)) {
            throw new ValidationException([], ['type' => $this->translator->trans('ffans-threadmarks.lib.validation.type_in_use')]);
        }
        $type->delete();
    }
}
