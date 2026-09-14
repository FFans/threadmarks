<?php

namespace FFans\Threadmarks\Api\Serializer;

use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Service\ThreadmarkService;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Post\PostRepository;

class ThreadmarkSerializer extends AbstractSerializer
{
    protected $type = 'threadmarks';

    protected function getDefaultAttributes($mark)
    {
        return [
            'originalPostId' => $mark->original_post_id,
            'originalPostNumber' => $mark->original_post_number,
            'note' => $mark->note,
            'canManage' => $mark instanceof PersonalThreadmark
                ? (!$this->actor->isGuest() && (int) $mark->owner_id === (int) $this->actor->id
                    && $this->actor->can('ffans-threadmarks.managePersonalThreadmarks', $mark->discussion))
                : static::$container->make(ThreadmarkService::class)->canManageDiscussion($this->actor, $mark->discussion),
            'isPostDeleted' => $mark->post_id === null,
            'navigationIndex' => $mark->post_id === null ? max(0, static::$container->make(PostRepository::class)
                ->getIndexForNumber($mark->discussion_id, $mark->original_post_number - 1, $this->actor) - 1) : null,
        ];
    }

    protected function type($mark)
    {
        return $this->hasOne($mark, ThreadmarkTypeSerializer::class);
    }

    protected function discussion($mark)
    {
        return $this->hasOne($mark, DiscussionSerializer::class);
    }

    protected function post($mark)
    {
        return $this->hasOne($mark, PostSerializer::class);
    }

}
