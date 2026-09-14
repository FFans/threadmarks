<?php

namespace FFans\Threadmarks\Tests\integration;

use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Tests\integration\Support\ForumTestCase;
use Flarum\Group\Group;

class PersonalMarksApiTest extends ForumTestCase
{
    public function test_independent_owners_crud_and_uniqueness_across_types(): void
    {
        $mine = $this->createMark();
        $other = $this->createMark(actor: 3);
        $this->assertNotSame($mine['id'], $other['id']);
        foreach ([1, 2] as $type) {
            $this->document($this->api('POST', '/api/personal-threadmarks', 2, $this->payload('personal-threadmarks', type: $type)), 422);
        }
        $updated = $this->document($this->updateMark('personal-threadmarks', $mine['id'], 2, ['note' => null, 'position' => 4294967295], 2))['data'];
        $this->assertNull($updated['attributes']['note']);
        $this->assertSame(4294967295, $updated['attributes']['position']);
        $this->assertSame('2', $updated['relationships']['type']['data']['id']);
        $this->assertSame(204, $this->api('DELETE', '/api/personal-threadmarks/'.$mine['id'], 2)->getStatusCode());
        $this->assertSame([$other['id']], PersonalThreadmark::query()->pluck('id')->map(fn ($id) => (string) $id)->all());
    }

    public function test_private_notes_are_absent_from_every_other_viewer_and_direct_endpoint(): void
    {
        $mine = $this->createMark();
        $other = $this->createMark(actor: 3);
        $this->createMark('threadmarks', 3);
        foreach ([0 => null, 1 => null, 2 => $mine['id'], 3 => $other['id'], 4 => null] as $actor => $id) {
            foreach (['/api/discussions/1', '/api/discussions/1?include=personalThreadmarks.type,threadmarks.type', '/api/posts/11?include=personalThreadmark.type', '/api/discussions?include=personalThreadmarks.type', '/api/posts?filter[discussion]=1&include=personalThreadmark.type', '/api/discussions/1?include=posts.personalThreadmark.type'] as $path) {
                $doc = $this->document($this->api('GET', $path, $actor));
                $included = array_values(array_filter($doc['included'] ?? [], fn ($row) => $row['type'] === 'personal-threadmarks'));
                $this->assertSame($id ? [$id] : [], array_column($included, 'id'), $path.' actor='.$actor);
                foreach ($included as $row) {
                    $this->assertArrayNotHasKey('owner', $row['relationships']);
                    $this->assertArrayNotHasKey('ownerId', $row['attributes']);
                }
            }
        }
        foreach ([1, 3, 4] as $actor) {
            foreach (['GET', 'PATCH', 'DELETE'] as $method) {
                $this->document($this->api($method, '/api/personal-threadmarks/'.$mine['id'], $actor, [
                    'data' => ['type' => 'personal-threadmarks', 'id' => $mine['id'], 'attributes' => ['note' => 'Attack']],
                ]), 404);
            }
        }
        $this->assertSame('Original note', PersonalThreadmark::findOrFail($mine['id'])->note);
        $this->assertContains($this->api('GET', '/api/personal-threadmarks', 1)->getStatusCode(), [404, 405]);
    }

    public function test_permission_revocation_blocks_writes_but_keeps_own_read_access(): void
    {
        $mark = $this->createMark();
        $this->revoke('managePersonalThreadmarks');
        $doc = $this->document($this->api('GET', '/api/discussions/1', 2));
        $this->assertFalse($doc['data']['attributes']['canManagePersonalThreadmarks']);
        $own = $this->document($this->api('GET', '/api/personal-threadmarks/'.$mark['id'], 2));
        $this->assertFalse($own['data']['attributes']['canManage']);
        $this->document($this->api('POST', '/api/personal-threadmarks', 2, $this->payload('personal-threadmarks', 12)), 403);
        $this->document($this->updateMark('personal-threadmarks', $mark['id'], 2, ['note' => 'Denied']), 403);
        $this->document($this->api('DELETE', '/api/personal-threadmarks/'.$mark['id'], 2), 403);
    }

    public function test_installation_has_no_implicit_or_legacy_permission_grant(): void
    {
        $this->databaseContent['group_permission'] = [['group_id' => Group::MEMBER_ID, 'permission' => 'discussion.managePersonalThreadmarks']];
        $this->document($this->api('POST', '/api/personal-threadmarks', 2, $this->payload('personal-threadmarks')), 403);
        $this->assertFalse($this->database()->table('group_permission')->where('permission', 'discussion.ffans-threadmarks.managePersonalThreadmarks')->exists());
        $this->assertContains($this->api('POST', '/api/personal-threadmarks', 0, $this->payload('personal-threadmarks'))->getStatusCode(), [401, 403]);
    }

    public function test_rejects_first_event_missing_posts_and_invalid_fields_without_persisting(): void
    {
        foreach ([10 => 422, 13 => 422, 999 => 404] as $post => $status) {
            $this->document($this->api('POST', '/api/personal-threadmarks', 2, $this->payload('personal-threadmarks', $post)), $status);
        }
        foreach ([['note' => str_repeat('字', 101)], ['position' => -1], ['position' => 4294967296], ['position' => 1.5]] as $attributes) {
            $this->document($this->api('POST', '/api/personal-threadmarks', 2, $this->payload('personal-threadmarks', attributes: $attributes)), 422);
        }
        $this->assertSame(0, PersonalThreadmark::query()->count());
    }

    public function test_client_cannot_reassign_owner_discussion_original_location_or_post(): void
    {
        $payload = $this->payload('personal-threadmarks', attributes: ['ownerId' => 3, 'originalPostId' => 21, 'originalPostNumber' => 99]);
        $response = $this->api('POST', '/api/personal-threadmarks', 2, $payload);
        $this->document($response, 400);
        $mark = $this->createMark();
        $row = PersonalThreadmark::findOrFail($mark['id']);
        $this->assertSame([2, 1, 11, 2], [$row->owner_id, $row->discussion_id, $row->original_post_id, $row->original_post_number]);
        $payload = $this->payload('personal-threadmarks', 21);
        $payload['data']['id'] = $mark['id'];
        $this->api('PATCH', '/api/personal-threadmarks/'.$mark['id'], 2, $payload);
        $this->assertSame(11, $row->fresh()->post_id);
    }

    public function test_disabled_type_can_only_be_retained_by_an_existing_mark(): void
    {
        $mark = $this->createMark();
        $this->database()->table('ffans_threadmark_types')->whereIn('id', [1, 2])->update(['is_enabled' => false]);
        $this->document($this->updateMark('personal-threadmarks', $mark['id'], 2, ['note' => 'Retained'], 1));
        $this->document($this->updateMark('personal-threadmarks', $mark['id'], 2, [], 2), 422);
        $this->document($this->api('POST', '/api/personal-threadmarks', 2, $this->payload('personal-threadmarks', 12)), 422);
        $this->document($this->updateMark('personal-threadmarks', $mark['id'], 2, [], 3));
    }

    public function test_hidden_targets_are_not_disclosed_and_deleted_targets_keep_their_location(): void
    {
        $mark = $this->createMark(post: 12);
        $this->database()->table('posts')->where('id', 12)->update(['hidden_at' => '2026-01-01 00:00:00']);
        $this->document($this->api('GET', '/api/personal-threadmarks/'.$mark['id'], 2), 404);
        $doc = $this->document($this->api('GET', '/api/discussions/1', 2));
        $this->assertSame([], $doc['data']['relationships']['personalThreadmarks']['data']);
        $this->database()->table('posts')->where('id', 12)->delete();
        // Flarum's SQLite integration transaction disables FKs; schema tests verify SET NULL.
        $this->database()->table('ffans_personal_threadmarks')->where('id', $mark['id'])->update(['post_id' => null]);
        $deleted = $this->document($this->api('GET', '/api/personal-threadmarks/'.$mark['id'], 2))['data']['attributes'];
        $this->assertTrue($deleted['isPostDeleted']);
        $this->assertSame(12, $deleted['originalPostId']);
        $this->assertSame(4, $deleted['originalPostNumber']);
        $this->assertGreaterThanOrEqual(0, $deleted['navigationIndex']);
        $this->document($this->updateMark('personal-threadmarks', $mark['id'], 2, ['note' => 'Tombstone']));
        $this->database()->table('discussions')->where('id', 1)->update(['hidden_at' => '2026-01-01 00:00:00']);
        $this->document($this->api('GET', '/api/personal-threadmarks/'.$mark['id'], 2), 404);
    }
}
