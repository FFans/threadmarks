<?php

namespace FFans\Threadmarks\Tests\integration;

use FFans\Threadmarks\Model\Threadmark;
use FFans\Threadmarks\Tests\integration\Support\ForumTestCase;

class DiscussionMarksApiTest extends ForumTestCase
{
    public function test_author_and_moderator_permissions_and_public_relationship_reading(): void
    {
        $this->document($this->api('POST', '/api/threadmarks', 2, $this->payload('threadmarks')), 403);
        $mark = $this->createMark('threadmarks', 3);
        $this->assertSame(3, (int) Threadmark::findOrFail($mark['id'])->created_by);
        foreach ([0, 1, 2, 3, 4] as $actor) {
            $doc = $this->document($this->api('GET', '/api/discussions/1', $actor));
            $this->assertSame([$mark['id']], array_column($doc['data']['relationships']['threadmarks']['data'], 'id'));
            $this->assertSame(in_array($actor, [1, 3, 4]), $doc['data']['attributes']['canManageThreadmarks']);
        }
        $this->document($this->updateMark('threadmarks', $mark['id'], 2, ['note' => 'Denied']), 403);
        $this->document($this->api('DELETE', '/api/threadmarks/'.$mark['id'], 2), 403);
        $updated = $this->document($this->updateMark('threadmarks', $mark['id'], 4, ['note' => 'Moderator edit'], 2));
        $this->assertSame('Moderator edit', $updated['data']['attributes']['note']);
        $this->assertSame(4, (int) Threadmark::findOrFail($mark['id'])->updated_by);
        $this->assertSame(204, $this->api('DELETE', '/api/threadmarks/'.$mark['id'], 3)->getStatusCode());
        $this->assertSame(0, Threadmark::query()->count());
        $this->createMark('threadmarks', 2, 21);
    }

    public function test_administrative_listing_and_no_guest_mutations(): void
    {
        $mark = $this->createMark('threadmarks', 3);
        foreach ([0, 2, 3, 4] as $actor) {
            $this->assertContains($this->api('GET', '/api/threadmarks', $actor)->getStatusCode(), [401, 403]);
            $this->assertContains($this->api('GET', '/api/threadmarks/'.$mark['id'], $actor)->getStatusCode(), [401, 403]);
        }
        $this->assertSame([$mark['id']], array_column($this->document($this->api('GET', '/api/threadmarks', 1))['data'], 'id'));
        foreach (['PATCH', 'DELETE'] as $method) {
            $this->assertContains($this->api($method, '/api/threadmarks/'.$mark['id'], 0, ['data' => [
                'type' => 'threadmarks', 'id' => $mark['id'], 'attributes' => ['note' => 'Denied'],
            ]])->getStatusCode(), [401, 403]);
        }
    }

    public function test_permission_revocation_applies_to_existing_and_new_marks(): void
    {
        $mark = $this->createMark('threadmarks', 3);
        $this->revoke('manageOwnDiscussionThreadmarks');
        $this->document($this->updateMark('threadmarks', $mark['id'], 3, ['note' => 'Denied']), 403);
        $this->document($this->api('POST', '/api/threadmarks', 3, $this->payload('threadmarks', 12)), 403);
        $this->document($this->updateMark('threadmarks', $mark['id'], 4, ['note' => 'Allowed']));
        $this->revoke('manageDiscussionThreadmarks');
        $this->document($this->api('DELETE', '/api/threadmarks/'.$mark['id'], 4), 403);
    }

    public function test_disabled_types_are_rejected_for_creation_and_replacement_but_retained_on_edit(): void
    {
        $mark = $this->createMark('threadmarks', 3);
        $this->database()->table('ffans_threadmark_types')->whereIn('id', [1, 2])->update(['is_enabled' => false]);
        $this->document($this->updateMark('threadmarks', $mark['id'], 3, ['note' => 'Retain'], 1));
        $this->document($this->updateMark('threadmarks', $mark['id'], 3, [], 2), 422);
        $this->document($this->api('POST', '/api/threadmarks', 3, $this->payload('threadmarks', 12)), 422);
        $this->document($this->updateMark('threadmarks', $mark['id'], 3, [], 3));
    }

    public function test_invalid_targets_and_note_length_return_validation_errors(): void
    {
        foreach ([10 => 422, 13 => 422, 999 => 404] as $post => $status) {
            $this->document($this->api('POST', '/api/threadmarks', 3, $this->payload('threadmarks', $post)), $status);
        }
        $this->document($this->api('POST', '/api/threadmarks', 3, $this->payload('threadmarks', attributes: ['note' => str_repeat('字', 101)])), 422);
        $this->assertSame(0, Threadmark::query()->count());
        $doc = $this->document($this->api('POST', '/api/threadmarks', 3, $this->payload('threadmarks', attributes: ['note' => str_repeat('字', 100)])), 201);
        $this->assertSame(str_repeat('字', 100), $doc['data']['attributes']['note']);
    }

    public function test_duplicate_creation_is_validation_error_and_does_not_replace_existing_mark(): void
    {
        $mark = $this->createMark('threadmarks', 3);
        $this->document($this->api('POST', '/api/threadmarks', 4, $this->payload('threadmarks', type: 2)), 422);
        $this->assertSame(1, Threadmark::query()->count());
        $this->assertSame('Original note', Threadmark::findOrFail($mark['id'])->note);
    }

    public function test_deleted_reply_keeps_a_nonnegative_navigation_index_even_without_earlier_posts(): void
    {
        $mark = $this->createMark('threadmarks', 3);
        $this->database()->table('posts')->whereIn('id', [10, 11])->delete();
        // Simulate the FK effect separately verified by ThreadmarkSchemaTest.
        $this->database()->table('ffans_discussion_threadmarks')->where('id', $mark['id'])->update(['post_id' => null]);
        $attributes = $this->document($this->api('GET', '/api/threadmarks/'.$mark['id'], 1))['data']['attributes'];
        $this->assertTrue($attributes['isPostDeleted']);
        $this->assertSame(11, $attributes['originalPostId']);
        $this->assertSame(2, $attributes['originalPostNumber']);
        $this->assertSame(0, $attributes['navigationIndex']);
    }
}

