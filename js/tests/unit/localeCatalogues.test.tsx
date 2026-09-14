import m from 'mithril';

import fs from 'node:fs';
import path from 'node:path';

import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/forum/app';

import ManageThreadmarkModal from '../../src/forum/components/ManageThreadmarkModal';
import ThreadmarkList from '../../src/forum/components/ThreadmarkList';
import { catalogue, fixture, translations, rootElement, cleanup } from '../support/fixtures';

test('both locales expose the same keys and resolve all references', () => {
  expect(Object.keys(catalogue('en')).sort()).toEqual(Object.keys(catalogue('zh-Hans')).sort());
  for (const locale of ['en', 'zh-Hans']) {
    translations(app, locale);
    for (const key of Object.keys(catalogue(locale))) {
      expect(app.translator.translations[key]).not.toMatch(/^=> /);
    }
  }
});
test.each([
  ['en', 'Mine', 'Threadmark · #2'],
  ['zh-Hans', '我的', '帖标 · #2'],
])('%s renders interpolated titles, escaped notes and accessible labels', (locale, mine, title) => {
  const data = fixture();
  translations(app, locale);
  app.threadmarkTypeList.loaded = true;
  data.personalMark.pushData({ attributes: { note: '<img src=x onerror=alert(1)>' } });
  const modal = new ManageThreadmarkModal();
  modal.attrs = { discussion: data.discussion, post: data.post } as any;
  modal.oninit(m(ManageThreadmarkModal, modal.attrs) as any);
  expect(modal.title()).toBe(title);
  const root = rootElement();
  try {
    m.render(root, m(ThreadmarkList, { discussion: data.discussion, onNavigate() {} }));
    expect(root.querySelector('.ThreadmarkMineBadge')!.textContent).toBe(mine);
    expect(root.querySelector('img')).toBeNull();
    expect(root.textContent).toContain('<img src=x onerror=alert(1)>');
    for (const button of root.querySelectorAll('[aria-label]')) {
      expect(button.getAttribute('aria-label')).not.toContain('ffans-threadmarks.');
      expect(button.getAttribute('aria-label')).toContain('2');
    }
  } finally {
    cleanup(root);
  }
});
test('English cluster labels interpolate singular and plural counts', () => {
  translations();
  const key = 'ffans-threadmarks.forum.scrubber.cluster_a11y_label';
  expect(extractText(app.translator.trans(key, { count: 1 }))).toBe('1 threadmark');
  expect(extractText(app.translator.trans(key, { count: 3 }))).toBe('3 threadmarks');
});
test('every literal translation used by extension code exists and frontend code does not request server-only refs', () => {
  const messages = catalogue();
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const file = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(file) : /\.(php|tsx?)$/.test(entry.name) ? [file] : [];
    });
  let count = 0;
  for (const file of [...walk('src'), ...walk('../src')]) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/['"](ffans-threadmarks\.(?:admin|forum|lib|ref)\.[a-zA-Z0-9_.]+)['"]/g)) {
      expect(messages[match[1]]).toBeDefined();
      if (!file.endsWith('.php')) expect(match[1]).not.toContain('.ref.');
      count++;
    }
  }
  expect(count).toBeGreaterThan(40);
});
