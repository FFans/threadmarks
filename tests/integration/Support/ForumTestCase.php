<?php

namespace FFans\Threadmarks\Tests\integration\Support;

use Flarum\Discussion\Discussion;
use Flarum\Group\Group;
use Flarum\Group\PermissionCache;
use Flarum\Locale\LocaleManager;
use Flarum\Post\Post;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\Filesystem\Path;

abstract class ForumTestCase extends TestCase
{
    public function tmpDir()
    {
        return Path::makeAbsolute(parent::tmpDir(), dirname(__DIR__, 3));
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->extension('ffans-threadmarks');
        $this->prepareDatabase([
            User::class => [
                ['id' => 2, 'username' => 'reader', 'email' => 'reader@example.test', 'is_email_confirmed' => true],
                ['id' => 3, 'username' => 'author', 'email' => 'author@example.test', 'is_email_confirmed' => true],
                ['id' => 4, 'username' => 'moderator', 'email' => 'moderator@example.test', 'is_email_confirmed' => true],
            ],
            'group_user' => [['user_id' => 4, 'group_id' => Group::MODERATOR_ID]],
            'group_permission' => [
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.ffans-threadmarks.managePersonalThreadmarks'],
                ['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.ffans-threadmarks.manageOwnDiscussionThreadmarks'],
                ['group_id' => Group::MODERATOR_ID, 'permission' => 'discussion.ffans-threadmarks.manageDiscussionThreadmarks'],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'Author discussion', 'user_id' => 3, 'first_post_id' => 10],
                ['id' => 2, 'title' => 'Reader discussion', 'user_id' => 2, 'first_post_id' => 20],
            ],
            Post::class => [
                ['id' => 10, 'discussion_id' => 1, 'number' => 1, 'user_id' => 3, 'type' => 'comment', 'content' => '<t>Start</t>'],
                ['id' => 11, 'discussion_id' => 1, 'number' => 2, 'user_id' => 2, 'type' => 'comment', 'content' => '<t>Reply</t>'],
                ['id' => 12, 'discussion_id' => 1, 'number' => 4, 'user_id' => 3, 'type' => 'comment', 'content' => '<t>Reply after a gap</t>'],
                ['id' => 13, 'discussion_id' => 1, 'number' => 5, 'user_id' => 3, 'type' => 'discussionRenamed', 'content' => '["old","new"]'],
                ['id' => 20, 'discussion_id' => 2, 'number' => 1, 'user_id' => 2, 'type' => 'comment', 'content' => '<t>Start</t>'],
                ['id' => 21, 'discussion_id' => 2, 'number' => 2, 'user_id' => 3, 'type' => 'comment', 'content' => '<t>Reply</t>'],
            ],
        ]);
    }

    protected function app()
    {
        $booting = $this->app === null;
        $app = parent::app();
        if ($booting) {
            // The testing extension manager enables extensions before locale callbacks register.
            $container = $app->getContainer();
            $container->forgetInstance(LocaleManager::class);
            $container->make(LocaleManager::class);
        }
        return $app;
    }

    protected function api(string $method, string $path, int $actor = 0, ?array $json = null): ResponseInterface
    {
        $options = $actor ? ['authenticatedAs' => $actor] : [];
        if ($json !== null) {
            $options['json'] = $json;
        }
        parse_str(parse_url($path, PHP_URL_QUERY) ?? '', $query);
        return $this->send($this->request($method, $path, $options)
            ->withQueryParams($query)->withAttribute('bypassCsrfToken', true));
    }

    protected function document(ResponseInterface $response, int $status = 200): array
    {
        $body = (string) $response->getBody();
        $this->assertSame($status, $response->getStatusCode(), $body);
        return json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    }

    protected function payload(string $resource, int $post = 11, int $type = 1, array $attributes = []): array
    {
        return ['data' => [
            'type' => $resource, 'attributes' => $attributes,
            'relationships' => [
                'post' => ['data' => ['type' => 'posts', 'id' => (string) $post]],
                'type' => ['data' => ['type' => 'threadmark-types', 'id' => (string) $type]],
            ],
        ]];
    }

    protected function createMark(string $resource = 'personal-threadmarks', int $actor = 2, int $post = 11, int $type = 1): array
    {
        return $this->document($this->api('POST', '/api/'.$resource, $actor, $this->payload($resource, $post, $type, ['note' => 'Original note'])), 201)['data'];
    }

    protected function updateMark(string $resource, string $id, int $actor, array $attributes = [], ?int $type = null): ResponseInterface
    {
        $data = ['type' => $resource, 'id' => $id, 'attributes' => $attributes];
        if ($type !== null) {
            $data['relationships']['type']['data'] = ['type' => 'threadmark-types', 'id' => (string) $type];
        }
        return $this->api('PATCH', '/api/'.$resource.'/'.$id, $actor, ['data' => $data]);
    }

    protected function revoke(string $ability): void
    {
        $this->database()->table('group_permission')->where('permission', 'discussion.ffans-threadmarks.'.$ability)->delete();
        $this->app()->getContainer()->make(PermissionCache::class)->flush();
    }
}

