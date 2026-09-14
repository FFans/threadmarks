<?php

namespace FFans\Threadmarks\Tests\integration;

use FFans\Threadmarks\Tests\integration\Support\ForumTestCase;
use Flarum\Locale\LocaleManager;

class FrontendAssetsTest extends ForumTestCase
{
    public function test_flarum_compiles_forum_admin_css_and_resolved_locale_catalogues(): void
    {
        $container = $this->app()->getContainer();
        $translator = $container->make(LocaleManager::class)->getTranslator();
        foreach (['forum' => 'ThreadmarkDirectory', 'admin' => 'ThreadmarkTypeList'] as $frontend => $selector) {
            $assets = $container->make('flarum.assets.'.$frontend);
            $assets->makeCss()->commit(true);
            $css = $assets->getAssetsDir()->get($frontend.'.css');
            $this->assertStringContainsString($selector, $css);
            foreach (['en', 'zh-Hans'] as $locale) {
                $assets->makeLocaleJs($locale)->commit(true);
                $source = $assets->getAssetsDir()->get($frontend.'-'.$locale.'.js');
                $this->assertSame(1, preg_match('/app\.translator\.addTranslations\((\{[^\n]*\})\)/', $source, $matches));
                $messages = json_decode($matches[1], true, 512, JSON_THROW_ON_ERROR);
                foreach ($translator->getCatalogue($locale)->all('messages') as $key => $value) {
                    if (!str_starts_with($key, 'ffans-threadmarks.')) {
                        continue;
                    }
                    if (in_array(explode('.', $key)[1], [$frontend, 'lib'])) {
                        $this->assertSame($value, $messages[$key] ?? null, $locale.':'.$key);
                        $this->assertStringNotContainsString('=> ', $messages[$key]);
                    } else {
                        $this->assertArrayNotHasKey($key, $messages);
                    }
                }
            }
        }
        $this->assertSame('Threadmark · #23', $translator->trans('ffans-threadmarks.forum.manage_modal.title', ['number' => 23], null, 'en'));
        $this->assertSame('帖标 · #23', $translator->trans('ffans-threadmarks.forum.manage_modal.title', ['number' => 23], null, 'zh-Hans'));
    }

    public function test_forum_and_admin_documents_boot_with_extension_assets(): void
    {
        foreach (['/' => 0, '/admin' => 1] as $path => $actor) {
            $response = $this->api('GET', $path, $actor);
            $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
            $this->assertStringContainsString('flarum-json-payload', (string) $response->getBody());
            $this->assertStringContainsString($path === '/' ? 'forum.js' : 'admin.js', (string) $response->getBody());
        }
    }
}
