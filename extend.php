<?php

namespace FFans\Threadmarks;

use FFans\Threadmarks\Api\Controller;
use FFans\Threadmarks\Api\Serializer\PersonalThreadmarkSerializer;
use FFans\Threadmarks\Api\Serializer\ThreadmarkSerializer;
use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Model\Threadmark;
use FFans\Threadmarks\Service\ThreadmarkService;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Controller\ShowPostController;
use Flarum\Api\Controller\ListPostsController;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Http\RequestUtil;
use Flarum\Post\Post;

$extenders = [
    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-gdpr', fn () => [
            (new \Flarum\Gdpr\Extend\UserData())
                ->addType(Gdpr\Threadmarks::class),
        ]),

    (new Extend\Frontend('forum'))->js(__DIR__.'/js/dist/forum.js')->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))->js(__DIR__.'/js/dist/admin.js')->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\Model(Discussion::class))
        ->relationship('threadmarks', fn (Discussion $discussion) => $discussion->hasMany(Threadmark::class, 'discussion_id')->orderBy('original_post_number'))
        ->relationship('personalThreadmarks', fn (Discussion $discussion) => $discussion->hasMany(PersonalThreadmark::class, 'discussion_id')->orderBy('original_post_number')->orderBy('original_post_id')),
    (new Extend\Model(Post::class))
        ->hasOne('threadmark', Threadmark::class, 'post_id')
        ->hasOne('personalThreadmark', PersonalThreadmark::class, 'post_id'),
    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->hasMany('threadmarks', ThreadmarkSerializer::class)
        ->hasMany('personalThreadmarks', PersonalThreadmarkSerializer::class)
        ->attributes(function ($serializer, Discussion $discussion) {
            $actor = $serializer->getActor();
            return [
                'canManageThreadmarks' => resolve(ThreadmarkService::class)->canManageDiscussion($actor, $discussion),
                'canManagePersonalThreadmarks' => !$actor->isGuest() && $actor->can('ffans-threadmarks.managePersonalThreadmarks', $discussion),
            ];
        }),
    (new Extend\ApiSerializer(PostSerializer::class))
        ->hasOne('threadmark', ThreadmarkSerializer::class)
        ->hasOne('personalThreadmark', PersonalThreadmarkSerializer::class),
    (new Extend\Routes('api'))
        ->get('/threadmarks', 'threadmarks.index', Controller\ListThreadmarksController::class)
        ->get('/threadmarks/{id}', 'threadmarks.show', Controller\ShowThreadmarkController::class)
        ->post('/threadmarks', 'threadmarks.create', Controller\CreateThreadmarkController::class)
        ->patch('/threadmarks/{id}', 'threadmarks.update', Controller\UpdateThreadmarkController::class)
        ->delete('/threadmarks/{id}', 'threadmarks.delete', Controller\DeleteThreadmarkController::class)
        ->get('/personal-threadmarks/{id}', 'personal-threadmarks.show', Controller\ShowPersonalThreadmarkController::class)
        ->post('/personal-threadmarks', 'personal-threadmarks.create', Controller\CreatePersonalThreadmarkController::class)
        ->patch('/personal-threadmarks/{id}', 'personal-threadmarks.update', Controller\UpdatePersonalThreadmarkController::class)
        ->delete('/personal-threadmarks/{id}', 'personal-threadmarks.delete', Controller\DeletePersonalThreadmarkController::class)
        ->get('/threadmark-types', 'threadmark-types.index', Controller\ListThreadmarkTypeController::class)
        ->get('/threadmark-types/{id}', 'threadmark-types.show', Controller\ShowThreadmarkTypeController::class)
        ->post('/threadmark-types', 'threadmark-types.create', Controller\CreateThreadmarkTypeController::class)
        ->post('/threadmark-types/order', 'threadmark-types.order', Controller\OrderThreadmarkTypesController::class)
        ->patch('/threadmark-types/{id}', 'threadmark-types.update', Controller\UpdateThreadmarkTypeController::class)
        ->delete('/threadmark-types/{id}', 'threadmark-types.delete', Controller\DeleteThreadmarkTypeController::class),
];

foreach ([ShowDiscussionController::class, ListDiscussionsController::class, ShowPostController::class, ListPostsController::class] as $controller) {
    $discussion = in_array($controller, [ShowDiscussionController::class, ListDiscussionsController::class], true);
    $public = $discussion ? 'threadmarks' : 'threadmark';
    $private = $discussion ? 'personalThreadmarks' : 'personalThreadmark';
    $api = (new Extend\ApiController($controller))
        ->addOptionalInclude([$public, $public.'.type', $private, $private.'.type'])
        ->loadWhere($public, function ($query) {
            $query->with(['type', 'discussion']);
        })
        ->loadWhere($private, function ($query, $request) {
            $query->visibleToOwner(RequestUtil::getActor($request))->with(['type', 'discussion']);
        });
    if ($controller === ShowDiscussionController::class) {
        $api->addInclude([$public, $public.'.type', $private, $private.'.type'])
            ->addOptionalInclude(['posts.threadmark', 'posts.threadmark.type', 'posts.personalThreadmark', 'posts.personalThreadmark.type'])
            ->loadWhere('posts.personalThreadmark', function ($query, $request) {
                $query->visibleToOwner(RequestUtil::getActor($request))->with(['type', 'discussion']);
            });
    }
    $extenders[] = $api;
}

return $extenders;
