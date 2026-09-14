<?php

namespace FFans\Threadmarks\Model;

use Flarum\Database\AbstractModel;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ThreadmarkType extends AbstractModel
{
    protected $table = 'ffans_threadmark_types';

    public $timestamps = true;

    protected $guarded = [];

    protected $casts = [
        'position' => 'integer',
        'is_builtin' => 'boolean',
        'is_enabled' => 'boolean',
    ];

    public function threadmarks(): HasMany
    {
        return $this->hasMany(Threadmark::class, 'type_id');
    }
}
