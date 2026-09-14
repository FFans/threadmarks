<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable('ffans_discussion_threadmarks', function (Blueprint $table) {
    $table->increments('id');

    $table->unsignedInteger('discussion_id');
    $table->unsignedInteger('post_id')->nullable();
    $table->unsignedInteger('original_post_id');
    $table->unsignedInteger('original_post_number');
    $table->unsignedInteger('type_id');
    $table->string('note', 100)->nullable();
    $table->unsignedInteger('position')->nullable();
    $table->unsignedInteger('created_by')->nullable();
    $table->unsignedInteger('updated_by')->nullable();
    $table->timestamps();

    $table->foreign('discussion_id')->references('id')->on('discussions')->cascadeOnDelete();
    $table->foreign('post_id')->references('id')->on('posts')->nullOnDelete();
    $table->foreign('type_id')->references('id')->on('ffans_threadmark_types')->restrictOnDelete();
    $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
    $table->foreign('updated_by')->references('id')->on('users')->nullOnDelete();

    $table->unique(['discussion_id', 'original_post_id'], 'ffans_dtm_discussion_original_post_unique');
    $table->index(['discussion_id', 'position'], 'ffans_dtm_discussion_sort_order_index');
    $table->index(['discussion_id', 'original_post_number', 'original_post_id'], 'ffans_dtm_discussion_original_post_number_post_id_index');

});
