<?php

namespace FFans\Threadmarks\Tests\unit;

use Illuminate\Database\QueryException;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\SQLiteConnection;
use PDO;
use PHPUnit\Framework\TestCase;

class ThreadmarkSchemaTest extends TestCase
{
    private SQLiteConnection $db;
    private array $migrations;

    protected function setUp(): void
    {
        parent::setUp();
        if (!extension_loaded('pdo_sqlite')) {
            $this->markTestSkipped('pdo_sqlite is required for isolated schema tests.');
        }
        $this->db = new SQLiteConnection(new PDO('sqlite::memory:'), ':memory:', 'test_');
        $schema = $this->db->getSchemaBuilder();
        $schema->enableForeignKeyConstraints();
        foreach (['users', 'discussions', 'posts'] as $name) {
            $schema->create($name, fn (Blueprint $table) => $table->increments('id'));
            $this->db->table($name)->insert([['id' => 1], ['id' => 2]]);
        }
        foreach ([
            '2026_09_05_000000_create_threadmark_types_table.php',
            '2026_09_05_000001_create_discussion_threadmarks_table.php',
            '2026_09_05_000002_create_personal_threadmarks_table.php',
        ] as $file) {
            $migration = require __DIR__.'/../../migrations/'.$file;
            $migration['up']($schema);
            $this->migrations[] = $migration;
        }
    }

    private function insert(string $scope, int $owner = 1, int $type = 1): void
    {
        $row = ['discussion_id' => 1, 'post_id' => 1, 'original_post_id' => 1, 'original_post_number' => 8, 'type_id' => $type];
        if ($scope === 'personal') {
            $row['owner_id'] = $owner;
        } else {
            $row += ['created_by' => $owner, 'updated_by' => $owner];
        }
        $this->db->table('ffans_'.$scope.'_threadmarks')->insert($row);
    }

    public function test_seed_defaults_and_full_rollback(): void
    {
        $types = $this->db->table('ffans_threadmark_types')->orderBy('position')->get();
        $this->assertCount(6, $types);
        $this->assertSame(['default', 'notice', 'highlight', 'progress', 'update', 'chapter'], $types->pluck('key')->all());
        $this->assertTrue($types->every(fn ($type) => (bool) $type->is_enabled && (bool) $type->is_builtin));
        foreach (array_reverse($this->migrations) as $migration) {
            $migration['down']($this->db->getSchemaBuilder());
        }
        foreach (['types', 'discussion_threadmarks', 'personal_threadmarks'] as $name) {
            $this->assertFalse($this->db->getSchemaBuilder()->hasTable($name === 'types' ? 'ffans_threadmark_types' : 'ffans_'.$name));
        }
    }

    public function test_unique_key_is_per_owner_and_post_not_per_type(): void
    {
        $this->insert('personal', 1);
        $this->insert('personal', 2);
        $this->insert('discussion');
        foreach (['personal', 'discussion'] as $scope) {
            try {
                $this->insert($scope, 1, 2);
                $this->fail('Duplicate mark was accepted: '.$scope);
            } catch (QueryException $exception) {
                $this->assertStringContainsString('UNIQUE', $exception->getMessage());
            }
        }
        $this->assertSame(2, $this->db->table('ffans_personal_threadmarks')->count());
        $this->assertSame(1, $this->db->table('ffans_discussion_threadmarks')->count());
    }

    public function test_post_deletion_preserves_both_scopes_and_owner_deletion_only_removes_private_marks(): void
    {
        $this->insert('personal', 1);
        $this->insert('personal', 2);
        $this->insert('discussion');
        $this->db->table('posts')->where('id', 1)->delete();
        foreach (['personal', 'discussion'] as $scope) {
            $row = $this->db->table('ffans_'.$scope.'_threadmarks')->first();
            $this->assertNull($row->post_id);
            $this->assertSame(1, $row->original_post_id);
            $this->assertSame(8, $row->original_post_number);
        }
        $this->db->table('users')->where('id', 1)->delete();
        $this->assertSame([2], $this->db->table('ffans_personal_threadmarks')->pluck('owner_id')->all());
        $public = $this->db->table('ffans_discussion_threadmarks')->first();
        $this->assertNull($public->created_by);
        $this->assertNull($public->updated_by);
        $this->db->table('discussions')->where('id', 1)->delete();
        $this->assertSame(0, $this->db->table('ffans_personal_threadmarks')->count());
        $this->assertSame(0, $this->db->table('ffans_discussion_threadmarks')->count());
    }

    public function test_database_restricts_deleting_used_types_in_both_scopes(): void
    {
        foreach (['personal', 'discussion'] as $scope) {
            $this->insert($scope);
            try {
                $this->db->table('ffans_threadmark_types')->where('id', 1)->delete();
                $this->fail('A referenced type was deleted');
            } catch (QueryException $exception) {
                $this->assertStringContainsString('FOREIGN KEY', $exception->getMessage());
            }
            $this->db->table('ffans_'.$scope.'_threadmarks')->where('id', 1)->delete();
        }
        $this->assertSame(1, $this->db->table('ffans_threadmark_types')->where('id', 1)->delete());
    }
}

