<?php

use Illuminate\Database\Schema\Builder;
use Illuminate\Database\Schema\Blueprint;

return [
    'up' => function (Builder $schema) {
        $schema->create('ffans_threadmark_types', function (Blueprint $table) {
            $table->increments('id');

            $table->string('key', 50)->unique();
            $table->string('name', 100);
            $table->string('color', 20)->nullable();
            $table->string('icon', 100)->nullable();
            $table->unsignedInteger('position')->default(0);

            $table->boolean('is_builtin')->default(false);
            $table->boolean('is_enabled')->default(true);

            $table->timestamps();
        });

        $schema->getConnection()->table('ffans_threadmark_types')->insert([
            ['key' => 'default', 'name' => 'Threadmark', 'color' => '#64748b', 'icon' => 'fas fa-bookmark', 'position' => 1, 'is_builtin' => true],
            ['key' => 'notice', 'name' => 'Notice', 'color' => '#dc2626', 'icon' => 'fas fa-bullhorn', 'position' => 2, 'is_builtin' => true],
            ['key' => 'highlight', 'name' => 'Highlight', 'color' => '#f59e0b', 'icon' => 'fas fa-star', 'position' => 3, 'is_builtin' => true],
            ['key' => 'progress', 'name' => 'Progress', 'color' => '#059669', 'icon' => 'fas fa-chart-line', 'position' => 4, 'is_builtin' => true],
            ['key' => 'update', 'name' => 'Update', 'color' => '#8b5cf6', 'icon' => 'fas fa-rocket', 'position' => 5, 'is_builtin' => true],
            ['key' => 'chapter', 'name' => 'Chapter', 'color' => '#0891b2', 'icon' => 'fas fa-book', 'position' => 6, 'is_builtin' => true],
        ]);
    },
    'down' => function (Builder $schema) {
        $schema->drop('ffans_threadmark_types');
    }
];
