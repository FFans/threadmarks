<?php

namespace FFans\Threadmarks\Tests\integration;

use FFans\Threadmarks\Gdpr\Threadmarks;
use FFans\Threadmarks\Tests\integration\Support\ForumTestCase;
use Flarum\Extension\ExtensionManager;
use Flarum\Gdpr\DataProcessor;
use RuntimeException;
use Symfony\Component\Filesystem\Path;

class GdprAvailabilityTest extends ForumTestCase
{
    public function test_disabled_gdpr_does_not_register_integration_and_threadmarks_still_work(): void
    {
        $container = $this->app()->getContainer();
        $extensions = $container->make(ExtensionManager::class);
        $this->assertNotNull($extensions->getExtension('flarum-gdpr'));
        $this->assertFalse($extensions->isEnabled('flarum-gdpr'));
        $this->assertArrayNotHasKey(Threadmarks::class, (new DataProcessor())->types());
        $this->assertFalse(class_exists(Threadmarks::class, false));
        $this->assertSame('personal-threadmarks', $this->createMark()['type']);
        $this->assertSame(200, $this->api('GET', '/')->getStatusCode());
        $this->assertSame(200, $this->api('GET', '/admin', 1)->getStatusCode());
    }

    public function test_missing_gdpr_package_does_not_load_gdpr_classes_or_break_threadmarks(): void
    {
        // Use a separate Composer inventory without GDPR; never alter installed packages.
        $root = dirname(__DIR__, 2);
        $vendor = getenv('FLARUM_TEST_VENDOR_PATH') ?: $root.'/vendor';
        $manifest = json_decode(file_get_contents($vendor.'/composer/installed.json'), true, 512, JSON_THROW_ON_ERROR);
        $packages = [];
        foreach ($manifest['packages'] ?? $manifest as $package) {
            if ($package['name'] === 'flarum/gdpr' || $package['name'] === 'ffans/threadmarks') {
                continue;
            }
            $package['install-path'] = realpath($vendor.'/composer/'.($package['install-path'] ?? '../'.$package['name']));
            $packages[] = $package;
        }
        $package = json_decode(file_get_contents($root.'/composer.json'), true, 512, JSON_THROW_ON_ERROR);
        $package['install-path'] = $root;
        $package['version'] = '0.0.0';
        $packages[] = $package;
        $shadow = $this->tmpDir().'/without-gdpr-'.uniqid();
        mkdir($shadow.'/vendor/composer', 0777, true);
        // Core resolves Font Awesome Less directly through the configured vendor path.
        (new \Symfony\Component\Filesystem\Filesystem())->mirror(
            $vendor.'/components/font-awesome/less',
            $shadow.'/vendor/components/font-awesome/less'
        );
        foreach ($packages as &$package) {
            $package['install-path'] = Path::makeRelative($package['install-path'], $shadow.'/vendor/composer');
        }
        unset($package);
        file_put_contents($shadow.'/composer.json', '{"type":"project"}');
        file_put_contents($shadow.'/vendor/composer/installed.json', json_encode(['packages' => $packages], JSON_THROW_ON_ERROR));

        $blockGdpr = static function (string $class): void {
            if (str_starts_with($class, 'Flarum\\Gdpr\\') || str_starts_with($class, 'FFans\\Threadmarks\\Gdpr\\')) {
                throw new RuntimeException('Attempted to load optional GDPR code without its package: '.$class);
            }
        };
        $previousCwd = getcwd();
        spl_autoload_register($blockGdpr, true, true);
        chdir($shadow);
        try {
            $container = $this->app()->getContainer();
            $this->assertNull($container->make(ExtensionManager::class)->getExtension('flarum-gdpr'));
            $this->assertFalse(class_exists(Threadmarks::class, false));
            $this->assertSame('personal-threadmarks', $this->createMark()['type']);
            $this->assertSame(200, $this->api('GET', '/')->getStatusCode());
            $this->assertSame(200, $this->api('GET', '/admin', 1)->getStatusCode());
        } finally {
            spl_autoload_unregister($blockGdpr);
            chdir($previousCwd);
        }
    }
}

