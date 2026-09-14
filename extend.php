<?php

/*
 * This file is part of ffans/threadmarks.
 *
 * Copyright (c) 2026 .
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FFans\Threadmarks;

use FFans\Threadmarks\Api\Resource\PersonalThreadmarkResource;
use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Api\Controller\OrderThreadmarkTypesController;
use FFans\Threadmarks\Api\Resource\ThreadmarkResource;
use FFans\Threadmarks\Api\Resource\ThreadmarkTypeResource;
use FFans\Threadmarks\Model\Threadmark;
use Flarum\Api\Context as FlarumContext;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\DiscussionResource;
use Flarum\Api\Resource\PostResource;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Post\Post;
use Tobyz\JsonApiServer\Context;

return [
    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-gdpr', fn () => [
            (new \Flarum\Gdpr\Extend\UserData())
                ->addType(Gdpr\Threadmarks::class),
        ]),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Model(Discussion::class))
        ->relationship('personalThreadmarks', function (Discussion $discussion) {
            return $discussion->hasMany(PersonalThreadmark::class, 'discussion_id')
                ->orderBy('original_post_number')->orderBy('original_post_id');
        }),
    (new Extend\Model(Post::class))
        ->hasOne('personalThreadmark', PersonalThreadmark::class, 'post_id'),

    // Core Model
    (new Extend\Model(Discussion::class))
        ->relationship('threadmarks', function (Discussion $discussion) {
            return $discussion
                ->hasMany(Threadmark::class, 'discussion_id')
                ->orderBy('original_post_number');
        }),
    (new Extend\Model(Post::class))
        ->hasOne('threadmark', Threadmark::class, 'post_id'),

    // Ext ApiResources
    new Extend\ApiResource(ThreadmarkTypeResource::class),
    new Extend\ApiResource(ThreadmarkResource::class),
    new Extend\ApiResource(PersonalThreadmarkResource::class),
    (new Extend\Routes('api'))
        ->post('/threadmark-types/order', 'threadmark-types.order', OrderThreadmarkTypesController::class),

    // Core ApiResources
    (new Extend\ApiResource(DiscussionResource::class))
        ->fields(fn() => [
            Schema\Relationship\ToMany::make('personalThreadmarks')
                ->type('personal-threadmarks')->includable(),
            Schema\Boolean::make('canManagePersonalThreadmarks')
                ->get(fn(Discussion $discussion, FlarumContext $context) =>
                    ! $context->getActor()->isGuest()
                    && $context->getActor()->can('ffans-threadmarks.managePersonalThreadmarks', $discussion)),
        ]),
    (new Extend\ApiResource(PostResource::class))
        ->fields(fn() => [
            Schema\Relationship\ToOne::make('personalThreadmark')
                ->type('personal-threadmarks')->includable(),
        ]),
    (new Extend\ApiResource(DiscussionResource::class))
        ->fields(fn() => [
            Schema\Relationship\ToMany::make('threadmarks')
                ->type('threadmarks')
                ->includable(),

            Schema\Boolean::make('canManageThreadmarks')
                ->get(function (Discussion $discussion, Context $context) {
                    /** @var FlarumContext $context */
                    $actor = $context->getActor();

                    return $actor->can('ffans-threadmarks.manageDiscussionThreadmarks', $discussion)
                        || (
                            $discussion->user_id === $actor->id
                            && $actor->can('ffans-threadmarks.manageOwnDiscussionThreadmarks', $discussion)
                        );
                })
        ])
        ->endpoint(
            Endpoint\Show::class,
            fn(Endpoint\Show $endpoint) => $endpoint->addDefaultInclude([
                'threadmarks',
                'threadmarks.type',
                'personalThreadmarks',
                'personalThreadmarks.type'
            ])),
    (new Extend\ApiResource(PostResource::class))
        ->fields(fn() => [
            Schema\Relationship\ToOne::make('threadmark')
                ->type('threadmarks')
                ->includable(),
        ]),
];
