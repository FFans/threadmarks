import PostStream from 'flarum/forum/components/PostStream';
import m from 'mithril';

import { jest } from '@jest/globals';
import ItemList from 'flarum/common/utils/ItemList';
import app from 'flarum/forum/app';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

import ThreadmarkOnlyStream from '../../src/forum/components/ThreadmarkOnlyStream';
import ThreadmarkTombstone from '../../src/forum/components/ThreadmarkTombstone';
import addThreadmarkOnlyMode from '../../src/forum/extenders/addThreadmarkOnlyMode';
import addThreadmarkPostFlash from '../../src/forum/extenders/addThreadmarkPostFlash';
import addThreadmarkTombstones from '../../src/forum/extenders/addThreadmarkTombstones';
import { fixture, rootElement, cleanup, deferred } from '../support/fixtures';

let data: ReturnType<typeof fixture>;
let root: HTMLElement;
let state: Map<string, any>;
let page: DiscussionPage;
beforeEach(() => {
  data = fixture();
  root = rootElement();
  state = new Map();
  jest.spyOn(app.current, 'get').mockImplementation((key: string) => state.get(key));
  jest.spyOn(app.current, 'set').mockImplementation((key: string, value: any) => {
    state.set(key, value);
    return app.current;
  });
  jest.spyOn(app, 'screen').mockReturnValue('desktop');
  // Core's sidebar output is a boundary fixture; extension callbacks execute through Core's extender.
  jest.spyOn(DiscussionPage.prototype, 'sidebarItems').mockImplementation(() => new ItemList().add('unrelated', m('span', 'Other control')) as any);
  page = new DiscussionPage();
  page.discussion = data.discussion;
  page.element = root;
  page['near'] = 80;
});
afterEach(() => cleanup(root));

test('only mode enters near the visible post and restores the live normal reading position before remounting', async () => {
  addThreadmarkOnlyMode();
  const far = data.mark(false, '9', 900, 90);
  data.discussion.pushData({ relationships: { threadmarks: [data.publicMark, far] } });
  m.render(root, m('.DiscussionPage-stream', m('.PostStream-item', { 'data-number': 90 })));
  jest.spyOn(root.querySelector('.PostStream-item')!, 'getBoundingClientRect').mockReturnValue({ top: 10, bottom: 100, height: 90 } as DOMRect);
  let items = page.sidebarItems();
  expect(items.has('unrelated')).toBe(true);
  await (items.get('threadmarksOnly') as any).attrs.onlyModeControl.attrs.onclick();
  expect(state.get('threadmarksOnly')).toBe(true);
  expect(state.get('threadmarkStream').current()).toBe(far);
  expect(page['near']).toBe(80);
  const pending = deferred<void>();
  const goToNumber = jest.fn(() => pending.promise);
  state.set('stream', { goToNumber });
  items = page.sidebarItems();
  const restoring = (items.get('threadmarksOnly') as any).attrs.onlyModeControl.attrs.onclick();
  expect(goToNumber).toHaveBeenCalledWith(80, true);
  expect(state.get('threadmarksOnly')).toBe(true);
  pending.resolve();
  await restoring;
  expect(state.get('threadmarksOnly')).toBe(false);
});
test('restoring an old page cannot switch a newly navigated discussion out of only mode', async () => {
  addThreadmarkOnlyMode();
  state.set('threadmarksOnly', true);
  const pending = deferred<void>();
  state.set('stream', { goToNumber: () => pending.promise });
  const restoring = (page.sidebarItems().get('threadmarksOnly') as any).attrs.onlyModeControl.attrs.onclick();
  state.set('stream', {});
  pending.resolve();
  await restoring;
  expect(state.get('threadmarksOnly')).toBe(true);
});
test('no marks hides the entry, but an active empty filtered stream retains an exit', () => {
  addThreadmarkOnlyMode();
  data.discussion.pushData({ relationships: { threadmarks: [], personalThreadmarks: [] } });
  expect(page.sidebarItems().has('threadmarksOnly')).toBe(false);
  state.set('threadmarksOnly', true);
  expect(page.sidebarItems().has('threadmarksOnly')).toBe(true);
});
test('page replaces just the stream subtree when filtered mode is active', () => {
  class PageView {
    view() {
      return m('main', [m('aside', 'Controls'), m('section', { className: 'DiscussionPage-stream' }, m('div', 'Normal posts'))]);
    }
  }
  jest.spyOn(DiscussionPage.prototype, 'view').mockImplementation(PageView.prototype.view as any);
  addThreadmarkOnlyMode();
  state.set('threadmarksOnly', true);
  const filtered = { count: () => 0 };
  state.set('threadmarkStream', filtered);
  const view = DiscussionPage.prototype.view.call(page) as any;
  const children = view.children as any[];
  expect(children[0].text).toBe('Controls');
  expect(children[1].children[0].tag).toBe(ThreadmarkOnlyStream);
  expect(children[1].children[0].attrs.stream).toBe(filtered);
});

test.each([
  [0, true, [1, 5], [2, 9]],
  [2, false, [5, 7], []],
  [0, false, [5, 7], [2]],
  [2, true, [5, 7], [9]],
  [0, true, [2, 9], []],
])('tombstones respect loaded window start=%s end=%s posts=%j', (start, end, numbers, expected) => {
  data.publicMark.pushData({ attributes: { isPostDeleted: true } });
  const tail = data.mark(true, '9', 999, 9, { isPostDeleted: true });
  data.discussion.pushData({ relationships: { personalThreadmarks: [tail] } });
  class WindowView {
    discussion = data.discussion;
    stream = { visibleStart: start, viewingEnd: () => end };
    view() {
      return m(
        'div',
        numbers.map((number) => m('article', { className: 'PostStream-item', 'data-number': number, key: String(number) }))
      );
    }
  }
  jest.spyOn(PostStream.prototype, 'view').mockImplementation(WindowView.prototype.view as any);
  addThreadmarkTombstones();
  const children = (PostStream.prototype.view.call(new WindowView() as any) as any).children as any[];
  expect(children.filter((child) => child.tag === ThreadmarkTombstone).map((child) => child.attrs.threadmark.originalPostNumber())).toEqual(expected);
  const sequence = children.map((child) =>
    child.tag === ThreadmarkTombstone ? child.attrs.threadmark.originalPostNumber() : child.attrs['data-number']
  );
  expect(sequence).toEqual([...sequence].sort((a, b) => a - b));
});
test('jump flash waits for scrolling and ignores an obsolete jump when another target wins', async () => {
  const pending = deferred<void>();
  class StreamView {
    stream: any = { threadmarkFlashIndex: 1 };
    scrollToItem() {
      return pending.promise;
    }
    $ = jest.fn(() => 'target');
    flashItem = jest.fn();
  }
  jest.spyOn(PostStream.prototype, 'scrollToItem').mockImplementation(StreamView.prototype.scrollToItem);
  addThreadmarkPostFlash();
  const stream = new StreamView();
  const result = (PostStream.prototype.scrollToItem as any).call(stream, $('<div data-index="1">'), true, false, false);
  stream.stream.threadmarkFlashIndex = 2;
  pending.resolve();
  await result;
  expect(stream.flashItem).not.toHaveBeenCalled();
  stream.stream.threadmarkFlashIndex = 1;
  await (PostStream.prototype.scrollToItem as any).call(stream, $('<div data-index="1">'), true, false, false);
  expect(stream.flashItem).toHaveBeenCalledWith('target');
  expect(stream.stream.threadmarkFlashIndex).toBeUndefined();
});
