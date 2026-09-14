<?php

namespace FFans\Threadmarks\Model;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonalThreadmark extends AbstractModel
{
    protected $table = 'ffans_personal_threadmarks';

    public $timestamps = true;

    protected $casts = [
        'owner_id' => 'integer',
        'discussion_id' => 'integer',
        'post_id' => 'integer',
        'original_post_id' => 'integer',
        'original_post_number' => 'integer',
        'type_id' => 'integer',
        'position' => 'integer',
    ];

    public function scopeVisibleToOwner(Builder $query, User $actor): Builder
    {
        if ($actor->isGuest()) {
            return $query->whereRaw('1 = 0');
        }

        $table = $this->getTable();

        // Ownership applies to every viewer, including administrators.
        return $query->where($table.'.owner_id', $actor->id)
            ->whereIn($table.'.discussion_id', Discussion::query()->whereVisibleTo($actor)->select('discussions.id'))
            ->where(function (Builder $query) use ($actor, $table) {
                $query->whereNull($table.'.post_id')
                    ->orWhereIn($table.'.post_id', Post::query()->whereVisibleTo($actor)->select('posts.id'));
            });
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function discussion(): BelongsTo
    {
        return $this->belongsTo(Discussion::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(ThreadmarkType::class, 'type_id');
    }
}
