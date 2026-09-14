import m from 'mithril';

import app from 'flarum/forum/app';

import ThreadmarkType from '../../src/common/models/ThreadmarkType';
import ThreadmarkLabel from '../../src/forum/components/ThreadmarkLabel';
import ThreadmarkBlock from '../../src/forum/components/ThreadmarkBlock';
import ThreadmarkList from '../../src/forum/components/ThreadmarkList';
import ManageThreadmarkModal from '../../src/forum/components/ManageThreadmarkModal';
import threadmarkTypeLabel from '../../src/forum/utils/threadmarkTypeLabel';
import { fixture, translations, rootElement, cleanup } from '../support/fixtures';

test.each([
  ['default', 'Threadmark', '帖标'],
  ['notice', 'Notice', '通知'],
  ['highlight', 'Highlight', '重点'],
  ['progress', 'Progress', '进度'],
  ['update', 'Update', '更新'],
  ['chapter', 'Chapter', '章节'],
])('translates built-in %s without changing its stored name', (key, name, chinese) => {
  fixture();
  const type = new ThreadmarkType({ type: 'threadmark-types', id: '3', attributes: { key, name, isBuiltin: true } });
  expect(threadmarkTypeLabel(type)).toBe(name);
  translations(app, 'zh-Hans');
  expect(threadmarkTypeLabel(type)).toBe(chinese);
  expect(type.name()).toBe(name);
});

test.each([
  ['notice', 'Site announcement', true],
  ['notice', 'Notice', false],
  ['custom', 'Custom type', true],
])('preserves type name for %s / %s', (key, name, isBuiltin) => {
  fixture();
  translations(app, 'zh-Hans');
  const type = new ThreadmarkType({ type: 'threadmark-types', id: '3', attributes: { key, name, isBuiltin } });
  expect(threadmarkTypeLabel(type)).toBe(name);
});

test('uses language pack overrides and falls back when the translation is missing', () => {
  const { publicMark } = fixture();
  const type = publicMark.type();
  const key = 'ffans-threadmarks.forum.type_labels.notice';
  app.translator.addTranslations({ [key]: 'Announcement' });
  expect(threadmarkTypeLabel(type)).toBe('Announcement');
  delete app.translator.translations[key];
  expect(threadmarkTypeLabel(type)).toBe('Notice');
});

test('renders translated labels in posts, directory and type selector', () => {
  const data = fixture();
  translations(app, 'zh-Hans');
  app.threadmarkTypeList.loaded = true;
  data.publicMark.pushData({ attributes: { note: '' } });
  const modal = new ManageThreadmarkModal();
  modal.attrs = { discussion: data.discussion, post: data.post } as any;
  modal.oninit(m(ManageThreadmarkModal, modal.attrs) as any);
  const root = rootElement();
  try {
    m.render(root, [
      m(ThreadmarkLabel, { threadmark: data.publicMark }),
      m(ThreadmarkBlock, { threadmark: data.publicMark }),
      m(ThreadmarkList, { discussion: data.discussion, onNavigate() {} }),
      modal.content(),
    ]);
    expect(Array.from(root.querySelectorAll('.ThreadmarkLabel-type'), (element) => element.textContent)).toEqual(['通知', '通知']);
    expect(root.querySelector('.ThreadmarkList-label')!.textContent).toBe('通知');
    expect(root.querySelector('option[value="1"]')!.textContent).toBe('通知');
    expect(root.querySelector('option[value="2"]')!.textContent).toBe('Chapter');
  } finally {
    cleanup(root);
  }
});
