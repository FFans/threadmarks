<?php

namespace FFans\Threadmarks\Gdpr;

use FFans\Threadmarks\Model\PersonalThreadmark;
use FFans\Threadmarks\Model\Threadmark;
use Flarum\Gdpr\Data\Type;

class Threadmarks extends Type
{
    public static function dataType(): string
    {
        return 'Threadmarks';
    }

    public static function exportDescription(): string
    {
        return static::staticTranslator()->trans('ffans-threadmarks.lib.gdpr.export_description');
    }

    public static function anonymizeDescription(): string
    {
        return static::staticTranslator()->trans('ffans-threadmarks.lib.gdpr.anonymize_description');
    }

    public static function deleteDescription(): string
    {
        return static::staticTranslator()->trans('ffans-threadmarks.lib.gdpr.delete_description');
    }

    public static function piiFields(): array
    {
        return ['owner_id', 'created_by', 'updated_by', 'note'];
    }

    public function export(): ?array
    {
        $files = [];

        // Export owned data even when its discussion/post is hidden or deleted.
        // Raw attributes exclude relations, so Post content is not exported again.
        PersonalThreadmark::query()
            ->where('owner_id', $this->user->id)
            ->eachById(function (PersonalThreadmark $mark) use (&$files) {
                $files[] = [
                    "threadmarks/personal-{$mark->id}.json" => $this->encodeForExport($mark->getAttributes()),
                ];
            });

        Threadmark::query()
            ->where(function ($query) {
                $query->where('created_by', $this->user->id)
                    ->orWhere('updated_by', $this->user->id);
            })
            ->eachById(function (Threadmark $mark) use (&$files) {
                $files[] = [
                    "threadmarks/discussion-{$mark->id}.json" => $this->encodeForExport($mark->getAttributes()),
                ];
            });

        return $files;
    }

    public function anonymize(): void
    {
        $this->delete();
    }

    public function delete(): void
    {
        (new PersonalThreadmark())->getConnection()->transaction(function () {
            PersonalThreadmark::query()->where('owner_id', $this->user->id)->delete();

            // Query-builder updates preserve created_at and updated_at.
            foreach (['created_by', 'updated_by'] as $column) {
                Threadmark::query()->where($column, $this->user->id)
                    ->toBase()->update([$column => null]);
            }
        });
    }
}
