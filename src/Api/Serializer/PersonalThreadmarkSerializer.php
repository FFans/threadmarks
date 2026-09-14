<?php

namespace FFans\Threadmarks\Api\Serializer;

class PersonalThreadmarkSerializer extends ThreadmarkSerializer
{
    protected $type = 'personal-threadmarks';

    protected function getDefaultAttributes($mark)
    {
        return parent::getDefaultAttributes($mark) + [
            'position' => $mark->position,
            'createdAt' => $this->formatDate($mark->created_at),
            'updatedAt' => $this->formatDate($mark->updated_at),
        ];
    }
}
