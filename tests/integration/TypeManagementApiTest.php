<?php

namespace FFans\Threadmarks\Tests\integration;

use FFans\Threadmarks\Tests\integration\Support\ForumTestCase;

class TypeManagementApiTest extends ForumTestCase
{
    protected function allowedRepeatedQueries(): array
    {
        // Sorting writes a distinct position for each type inside one transaction.
        return ['ffans_threadmark_types" set "position"', 'ffans_threadmark_types` set `position'];
    }

    private function typePayload(array $attributes = []): array
    {
        return ['data' => ['type' => 'threadmark-types', 'attributes' => $attributes + [
            'key' => 'custom', 'name' => 'Custom', 'color' => '#123456', 'icon' => 'fa-solid fa-book-bookmark',
        ]]];
    }

    public function test_public_catalogue_and_admin_only_management(): void
    {
        foreach ([0, 2, 4] as $actor) {
            $types = $this->document($this->api('GET', '/api/threadmark-types', $actor))['data'];
            $this->assertCount(6, $types);
            $this->assertSame([1, 2, 3, 4, 5, 6], array_column(array_column($types, 'attributes'), 'position'));
            $this->assertArrayNotHasKey('canDelete', $types[0]['attributes']);
            foreach (['POST' => '/api/threadmark-types', 'PATCH' => '/api/threadmark-types/1', 'DELETE' => '/api/threadmark-types/1'] as $method => $path) {
                $payload = $this->typePayload();
                if ($method !== 'POST') {
                    $payload['data']['id'] = '1';
                }
                $this->assertContains($this->api($method, $path, $actor, $payload)->getStatusCode(), [401, 403]);
            }
            $this->assertContains($this->api('POST', '/api/threadmark-types/order', $actor, ['order' => [2, 1]])->getStatusCode(), [401, 403]);
        }
        $created = $this->document($this->api('POST', '/api/threadmark-types', 1, $this->typePayload()), 201)['data'];
        $this->assertSame(7, $created['attributes']['position']);
        $this->assertTrue($created['attributes']['isEnabled']);
        $this->assertFalse($created['attributes']['isBuiltin']);
        $this->document($this->api('POST', '/api/threadmark-types', 1, $this->typePayload()), 422);
        $payload = ['data' => ['type' => 'threadmark-types', 'id' => $created['id'], 'attributes' => ['name' => 'Renamed', 'isEnabled' => false]]];
        $updated = $this->document($this->api('PATCH', '/api/threadmark-types/'.$created['id'], 1, $payload))['data'];
        $this->assertSame('Renamed', $updated['attributes']['name']);
        $this->assertFalse($updated['attributes']['isEnabled']);
        $this->assertSame(204, $this->api('DELETE', '/api/threadmark-types/'.$created['id'], 1)->getStatusCode());
        $this->document($this->api('GET', '/api/threadmark-types/'.$created['id']), 404);
    }

    public function test_types_used_by_either_scope_cannot_be_deleted_even_when_disabled(): void
    {
        $personal = $this->createMark();
        $public = $this->createMark('threadmarks', 3, 12, 2);
        foreach ([1, 2] as $id) {
            $this->database()->table('ffans_threadmark_types')->where('id', $id)->update(['is_enabled' => false]);
            $type = $this->document($this->api('GET', '/api/threadmark-types/'.$id, 1))['data'];
            $this->assertFalse($type['attributes']['canDelete']);
            $this->document($this->api('DELETE', '/api/threadmark-types/'.$id, 1), 422);
        }
        $this->assertSame(204, $this->api('DELETE', '/api/personal-threadmarks/'.$personal['id'], 2)->getStatusCode());
        $this->assertSame(204, $this->api('DELETE', '/api/threadmarks/'.$public['id'], 3)->getStatusCode());
        foreach ([1, 2] as $id) {
            $this->assertTrue($this->document($this->api('GET', '/api/threadmark-types/'.$id, 1))['data']['attributes']['canDelete']);
            $this->assertSame(204, $this->api('DELETE', '/api/threadmark-types/'.$id, 1)->getStatusCode());
        }
    }

    public function test_sort_order_persists_and_malformed_orders_do_not_partially_write(): void
    {
        $order = [6, 5, 4, 3, 2, 1];
        $this->assertSame(204, $this->api('POST', '/api/threadmark-types/order', 1, ['order' => $order])->getStatusCode());
        $this->assertSame(array_map('strval', $order), array_column($this->document($this->api('GET', '/api/threadmark-types'))['data'], 'id'));
        foreach ([null, '1,2', [1, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 999], [[1], 2, 3, 4, 5, 6]] as $invalid) {
            $response = $this->api('POST', '/api/threadmark-types/order', 1, ['order' => $invalid]);
            $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
            $this->assertSame($order, $this->database()->table('ffans_threadmark_types')->orderBy('position')->pluck('id')->map(fn ($id) => (int) $id)->all());
        }
    }

    public function test_required_type_fields_fail_validation(): void
    {
        foreach (['key', 'name', 'color', 'icon'] as $field) {
            $payload = $this->typePayload();
            unset($payload['data']['attributes'][$field]);
            $this->document($this->api('POST', '/api/threadmark-types', 1, $payload), 422);
        }
        $this->assertSame(6, $this->database()->table('ffans_threadmark_types')->count());
    }
}

