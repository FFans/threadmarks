<?php

namespace FFans\Threadmarks\Api\Serializer;

use FFans\Threadmarks\Service\ThreadmarkTypeService;
use Flarum\Api\Serializer\AbstractSerializer;

class ThreadmarkTypeSerializer extends AbstractSerializer
{
    protected $type = 'threadmark-types';

    protected function getDefaultAttributes($type)
    {
        $attributes = [
            'key' => $type->key, 'name' => $type->name, 'color' => $type->color, 'icon' => $type->icon,
            'position' => $type->position, 'isBuiltin' => $type->is_builtin, 'isEnabled' => $type->is_enabled,
            'createdAt' => $this->formatDate($type->created_at), 'updatedAt' => $this->formatDate($type->updated_at),
        ];
        if ($this->actor->isAdmin()) {
            $attributes['canDelete'] = !static::$container->make(ThreadmarkTypeService::class)->isUsed($type);
        }
        return $attributes;
    }
}
