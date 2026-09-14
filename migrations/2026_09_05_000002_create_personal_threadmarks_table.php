<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable('ffans_personal_threadmarks', function (Blueprint $table) {
    $table->increments('id');

    $table->unsignedInteger('owner_id');
    $table->unsignedInteger('discussion_id');
    $table->unsignedInteger('post_id')->nullable();
    $table->unsignedInteger('original_post_id');
    $table->unsignedInteger('original_post_number');
    $table->unsignedInteger('type_id');
    $table->string('note', 100)->nullable();
    $table->unsignedInteger('position')->nullable();
    $table->timestamps();

    $table->foreign('owner_id')->references('id')->on('users')->cascadeOnDelete();
    $table->foreign('discussion_id')->references('id')->on('discussions')->cascadeOnDelete();
    $table->foreign('post_id')->references('id')->on('posts')->nullOnDelete();
    $table->foreign('type_id')->references('id')->on('ffans_threadmark_types')->restrictOnDelete();

    $table->unique(['owner_id', 'discussion_id', 'original_post_id'], 'ffans_ptm_owner_discussion_post_unique');
    $table->index(['owner_id', 'discussion_id', 'position'], 'ffans_ptm_owner_discussion_sort_order_index');
    $table->index(['owner_id', 'discussion_id', 'original_post_number', 'original_post_id'], 'ffans_ptm_owner_discussion_post_number_post_id_index');

});
