<?php

namespace FFans\Threadmarks\Tests\integration;

use FFans\Threadmarks\Gdpr\Threadmarks;
use FFans\Threadmarks\Tests\integration\Support\ForumTestCase;
use Flarum\Gdpr\DataProcessor;
use Flarum\Gdpr\Exporter;
use Flarum\Gdpr\Jobs\ErasureJob;
use Flarum\Gdpr\Models\ErasureRequest;
use Flarum\Gdpr\StorageManager;
use Flarum\Http\UrlGenerator;
use Flarum\Locale\LocaleManager;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Mail\Mailer;
use PhpZip\ZipFile;
use Symfony\Contracts\Translation\TranslatorInterface;

class GdprTest extends ForumTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->extension('flarum-gdpr');
        $this->setting('mail_driver', 'log');
        $this->setting('flarum-gdpr.allow-anonymization', true);
        $this->setting('flarum-gdpr.allow-deletion', true);
        $this->setting('flarum-gdpr.default-anonymous-username', 'Anonymous');
    }

    private function seedMarks(): void
    {
        $this->database();
        $common = [
            'discussion_id' => 1, 'post_id' => 11, 'original_post_id' => 11,
            'original_post_number' => 2, 'type_id' => 1, 'note' => '个人 note',
            'position' => 7, 'created_at' => '2026-09-01 10:11:12', 'updated_at' => '2026-09-02 13:14:15',
        ];
        $this->database()->table('ffans_personal_threadmarks')->insert([
            ['id' => 1, 'owner_id' => 2] + $common,
            ['id' => 2, 'owner_id' => 3] + $common,
            ['id' => 3, 'owner_id' => 2, 'post_id' => 12, 'original_post_id' => 12, 'original_post_number' => 4] + $common,
            ['id' => 4, 'owner_id' => 2, 'post_id' => null, 'original_post_id' => 99, 'original_post_number' => 9] + $common,
        ]);
        foreach ([[2, 3], [3, 2], [2, 2], [3, 3], [null, null]] as $index => [$creator, $editor]) {
            $this->database()->table('ffans_discussion_threadmarks')->insert([
                'id' => $index + 1, 'created_by' => $creator, 'updated_by' => $editor,
                'post_id' => null, 'original_post_id' => 100 + $index, 'note' => 'Public '.$index,
            ] + $common);
        }
        // GDPR includes owned records even after visibility or type availability changes.
        $this->database()->table('posts')->where('id', 12)->update(['hidden_at' => '2026-09-03 00:00:00']);
        $this->database()->table('ffans_threadmark_types')->where('id', 1)->update(['is_enabled' => false]);
    }

    private function segment(int $userId = 2): Threadmarks
    {
        $container = $this->app()->getContainer();
        return new Threadmarks(
            User::findOrFail($userId),
            null,
            $container->make(Factory::class),
            $container->make(SettingsRepositoryInterface::class),
            $container->make(UrlGenerator::class),
            $container->make(TranslatorInterface::class),
        );
    }

    private function rows(string $scope): array
    {
        return $this->database()->table('ffans_'.$scope.'_threadmarks')
            ->orderBy('id')->get()->map(fn ($row) => (array) $row)->all();
    }

    public function test_registration_and_translated_descriptions_are_available_to_gdpr(): void
    {
        $document = $this->document($this->api('GET', '/api/gdpr/datatypes', 1));
        $row = array_values(array_filter($document['data'], fn ($row) => $row['id'] === Threadmarks::class));
        $this->assertCount(1, $row);
        $this->assertSame('ffans-threadmarks', $row[0]['attributes']['extension']);
        $this->assertSame('Threadmarks', $row[0]['attributes']['type']);
        foreach (['exportDescription', 'anonymizeDescription', 'deleteDescription'] as $key) {
            $this->assertNotEmpty($row[0]['attributes'][$key]);
            $this->assertStringNotContainsString('ffans-threadmarks.', $row[0]['attributes'][$key]);
        }
        $container = $this->app()->getContainer();
        $translator = $container->make(LocaleManager::class)->getTranslator();
        foreach (['en', 'zh-Hans'] as $locale) {
            foreach (['export', 'anonymize', 'delete'] as $action) {
                $key = 'ffans-threadmarks.lib.gdpr.'.$action.'_description';
                $this->assertNotSame($key, $translator->trans($key, [], null, $locale));
            }
        }
        $processor = $container->make(DataProcessor::class);
        foreach (Threadmarks::piiFields() as $field) {
            $this->assertContains($field, $processor->getPiiKeysForSerialization());
        }
        $this->assertSame(403, $this->api('GET', '/api/gdpr/datatypes', 2)->getStatusCode());
    }

    public function test_export_contains_all_owned_data_and_unique_public_participation_without_posts(): void
    {
        $this->seedMarks();
        $segment = $this->segment();
        $expected = [];
        foreach ($this->rows('personal') as $row) {
            if ($row['owner_id'] === 2) {
                $expected['threadmarks/personal-'.$row['id'].'.json'] = $row;
            }
        }
        foreach ($this->rows('discussion') as $row) {
            if ($row['created_by'] === 2 || $row['updated_by'] === 2) {
                $expected['threadmarks/discussion-'.$row['id'].'.json'] = $row;
            }
        }
        $this->database()->enableQueryLog();
        $files = $segment->export();
        $queries = $this->database()->getQueryLog();
        $this->database()->disableQueryLog();
        $actual = [];
        foreach ($files as $file) {
            foreach ($file as $path => $json) {
                $this->assertArrayNotHasKey($path, $actual);
                $actual[$path] = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
                $this->assertArrayNotHasKey('content', $actual[$path]);
                $this->assertArrayNotHasKey('post', $actual[$path]);
            }
        }
        $this->assertSame($expected, $actual);
        $this->assertCount(6, $files);
        foreach ($queries as $query) {
            $this->assertStringNotContainsString('posts', $query['query']);
        }
        $this->assertSame([], $this->segment(4)->export());
    }

    public function test_export_includes_records_beyond_the_first_chunk(): void
    {
        $this->database();
        $rows = [];
        for ($id = 1; $id <= 1001; $id++) {
            $rows[] = [
                'id' => $id, 'owner_id' => 2, 'discussion_id' => 1, 'post_id' => null,
                'original_post_id' => 1000 + $id, 'original_post_number' => $id + 1,
                'type_id' => 1, 'note' => 'Mark '.$id,
            ];
        }
        foreach (array_chunk($rows, 200) as $chunk) {
            $this->database()->table('ffans_personal_threadmarks')->insert($chunk);
        }
        $files = $this->segment()->export();
        $this->assertCount(1001, $files);
        $this->assertArrayHasKey('threadmarks/personal-1001.json', $files[1000]);
    }

    public function test_anonymize_deletes_only_owned_private_marks_and_preserves_public_content_and_times(): void
    {
        $this->seedMarks();
        $otherPersonal = [$this->rows('personal')[1]];
        $expectedPublic = $this->rows('discussion');
        foreach ($expectedPublic as &$row) {
            foreach (['created_by', 'updated_by'] as $column) {
                if ($row[$column] === 2) {
                    $row[$column] = null;
                }
            }
        }
        unset($row);
        $segment = $this->segment();
        $segment->anonymize();
        $this->assertSame($otherPersonal, $this->rows('personal'));
        $this->assertSame($expectedPublic, $this->rows('discussion'));
        $segment->anonymize();
        $this->assertSame($otherPersonal, $this->rows('personal'));
        $this->assertSame($expectedPublic, $this->rows('discussion'));
    }

    public function test_delete_removes_target_personal_marks_and_clears_only_target_public_references(): void
    {
        $this->seedMarks();
        $otherPersonal = [$this->rows('personal')[1]];
        $public = $this->rows('discussion');
        foreach ($public as &$row) {
            foreach (['created_by', 'updated_by'] as $column) {
                if ($row[$column] === 2) {
                    $row[$column] = null;
                }
            }
        }
        unset($row);
        $segment = $this->segment();
        $segment->delete();
        $segment->delete();
        $this->assertSame($otherPersonal, $this->rows('personal'));
        $this->assertSame($public, $this->rows('discussion'));
        $this->assertNotNull(User::find(2));
    }

    public function test_real_exporter_places_threadmarks_in_the_zip(): void
    {
        $this->seedMarks();
        $container = $this->app()->getContainer();
        $export = $container->make(Exporter::class)->export(User::findOrFail(2), User::findOrFail(2));
        $stream = $container->make(StorageManager::class)->getStoredExport($export);
        $zip = new ZipFile();
        try {
            $zip->openFromString(stream_get_contents($stream));
            $names = array_values(array_filter($zip->getListFiles(), fn ($path) => str_starts_with($path, 'threadmarks/')));
            $this->assertCount(6, $names);
            $this->assertNotContains('threadmarks/personal-2.json', $names);
            $this->assertNotContains('threadmarks/discussion-4.json', $names);
            foreach ($names as $name) {
                $this->assertArrayNotHasKey('content', json_decode($zip->getEntryContents($name), true, 512, JSON_THROW_ON_ERROR));
            }
        } finally {
            fclose($stream);
            $zip->close();
        }
    }

    private function erase(string $mode): void
    {
        $this->database()->table('gdpr_erasure')->insert([
            'id' => 1, 'user_id' => 2, 'status' => ErasureRequest::STATUS_MANUAL,
            'processed_mode' => $mode, 'created_at' => '2026-09-01 10:11:12',
            'processed_by' => 1, 'processed_at' => '2026-09-04 10:11:12',
        ]);
        $job = new ErasureJob(ErasureRequest::findOrFail(1));
        // Exercise the real erasure job without invoking the legacy mail transport.
        $mailer = $this->createMock(Mailer::class);
        $mailer->expects($this->once())->method('send');
        $container = $this->app()->getContainer();
        $container->instance(Mailer::class, $mailer);
        $container->call([$job, 'handle']);
    }

    public function test_real_anonymization_job_keeps_public_marks_and_other_owners_marks(): void
    {
        $this->seedMarks();
        $this->erase(ErasureRequest::MODE_ANONYMIZATION);
        $this->assertTrue(User::findOrFail(2)->anonymized);
        $this->assertSame([3], array_column($this->rows('personal'), 'owner_id'));
        $this->assertCount(5, $this->rows('discussion'));
        foreach ($this->rows('discussion') as $row) {
            $this->assertNotSame(2, $row['created_by']);
            $this->assertNotSame(2, $row['updated_by']);
            $this->assertSame('2026-09-01 10:11:12', $row['created_at']);
            $this->assertSame('2026-09-02 13:14:15', $row['updated_at']);
        }
    }

    public function test_real_deletion_job_keeps_public_marks_and_other_owners_marks(): void
    {
        $this->seedMarks();
        $this->erase(ErasureRequest::MODE_DELETION);
        $this->assertNull(User::find(2));
        $this->assertSame([3], array_column($this->rows('personal'), 'owner_id'));
        $public = $this->rows('discussion');
        $this->assertCount(5, $public);
        $this->assertSame([null, 3, null, 3, null], array_column($public, 'created_by'));
        $this->assertSame([3, null, null, 3, null], array_column($public, 'updated_by'));
        foreach ($public as $row) {
            $this->assertSame('2026-09-01 10:11:12', $row['created_at']);
            $this->assertSame('2026-09-02 13:14:15', $row['updated_at']);
        }
    }
}
