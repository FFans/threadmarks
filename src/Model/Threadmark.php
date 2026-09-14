<?php

namespace FFans\Threadmarks\Model;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Threadmark extends AbstractModel
{
    protected $table = 'ffans_discussion_threadmarks';

    public $timestamps = true;

    public $guarded = [];

    protected $casts = [
        'discussion_id' => 'integer',
        'post_id' => 'integer',
        'original_post_id' => 'integer',
        'original_post_number' => 'integer',
        'type_id' => 'integer',
        'note' => 'string',
        'created_by' => 'integer',
        'updated_by' => 'integer',
    ];

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
