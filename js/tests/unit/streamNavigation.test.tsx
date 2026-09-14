import m from 'mithril';

import { jest } from '@jest/globals';
import app from 'flarum/forum/app';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';

import ThreadmarkOnlyStream from '../../src/forum/components/ThreadmarkOnlyStream';
import ThreadmarkStreamState from '../../src/forum/states/ThreadmarkStreamState';
import { discussionThreadmarks, postThreadmarks } from '../../src/forum/utils/discussionThreadmarks';
import { getThreadmarkNavigationIndex, navigateToThreadmark } from '../../src/forum/utils/threadmarkNavigation';
import { fixture, rootElement, cleanup } from '../support/fixtures';

let data: ReturnType<typeof fixture>;
let root: HTMLElement;
beforeEach(() => {
  data = fixture();
  root = rootElement();
});
afterEach(() => cleanup(root));

test('combined ordering uses floor, scope and ID, with distinct keys for matching resource IDs', () => {
  const later = data.mark(false, '3', 12, 4);
  data.discussion.pushData({ relationships: { threadmarks: [later, data.publicMark] } });
  expect(discussionThreadmarks(data.discussion)).toEqual([data.publicMark, data.personalMark, later]);
  expect(data.publicMark.key()).not.toBe(data.personalMark.key());
  expect(postThreadmarks(data.post)).toEqual([data.publicMark, data.personalMark]);
});
test('stream deduplicates marked post bodies and selects the preceding mark for a gap', async () => {
  const later = data.mark(false, '3', 12, 8);
  data.discussion.pushData({ relationships: { threadmarks: [data.publicMark, later] } });
  const state = new ThreadmarkStreamState(data.discussion);
  expect(state.count()).toBe(2);
  await state.goToPostNumber(7);
  expect(state.current()).toBe(data.publicMark);
  await state.goToPostNumber(8, true);
  expect(state.current()).toBe(later);
  expect(state.animateScroll).toBe(false);
  await state.goToFirst();
  expect(state.targetAtTop).toBe(true);
  await state.goToLast();
  expect(state.targetIndex).toBe(1);
});
test.each([-20, 0, 0.5, 100])('stream navigation clamps target %s to a valid marked post', async (target) => {
  const state = new ThreadmarkStreamState(data.discussion);
  await state.goToIndex(target);
  expect(state.targetIndex).toBe(0);
  expect(state.index).toBe(1);
  expect(state.needsScroll).toBe(true);
});
test('empty stream navigation does not schedule scrolling', async () => {
  data.discussion.pushData({ relationships: { threadmarks: [], personalThreadmarks: [] } });
  const state = new ThreadmarkStreamState(data.discussion);
  await state.goToLast();
  expect(state.count()).toBe(0);
  expect(state.current()).toBeUndefined();
  expect(state.needsScroll).toBe(false);
});
test('navigation uses raw discussion post IDs, never a post-details fetch; missing posts require a tombstone index', () => {
  app.store.remove(data.post);
  expect(getThreadmarkNavigationIndex(data.discussion, data.publicMark)).toBe(1);
  data.publicMark.pushData({ attributes: { originalPostId: 999 } });
  expect(getThreadmarkNavigationIndex(data.discussion, data.publicMark)).toBeNull();
  data.publicMark.pushData({ attributes: { isPostDeleted: true, navigationIndex: 0 } });
  expect(getThreadmarkNavigationIndex(data.discussion, data.publicMark)).toBe(0);
});
test('normal navigation updates Core scrubber and flash; filtered mode delegates to its own stream', async () => {
  const goToIndex = jest.fn().mockResolvedValue(undefined as never);
  const context = { stream: { goToIndex } as any, updateScrubberValues: jest.fn() };
  const get = jest.spyOn(app.current, 'get').mockReturnValue(undefined);
  await navigateToThreadmark.call(context, data.discussion, data.publicMark);
  expect(goToIndex).toHaveBeenCalledWith(1);
  expect(context.stream.threadmarkFlashIndex).toBe(1);
  expect(context.updateScrubberValues).toHaveBeenCalledWith({
    animate: true,
    forceHeightChange: true,
  });
  const filtered = new ThreadmarkStreamState(data.discussion);
  const goToPostNumber = jest.spyOn(filtered, 'goToPostNumber');
  get.mockImplementation((key: string) => (key === 'threadmarksOnly' ? true : key === 'threadmarkStream' ? filtered : undefined) as any);
  await navigateToThreadmark.call(context, data.discussion, data.personalMark);
  expect(goToPostNumber).toHaveBeenCalledWith(2);
  expect(goToIndex).toHaveBeenCalledTimes(1);
});
test('deleted navigation loads the anchor without scheduling Core scrolling and unpauses on failure', async () => {
  data.publicMark.pushData({
    attributes: { originalPostId: 999, isPostDeleted: true, navigationIndex: 0 },
  });
  jest.spyOn(app.current, 'get').mockReturnValue(undefined);
  const context = {
    stream: {
      paused: false,
      goToIndex: jest.fn(),
      loadNearIndex: jest.fn().mockRejectedValue(new Error('Offline') as never),
    } as any,
    updateScrubberValues: jest.fn(),
  };
  await expect(navigateToThreadmark.call(context, data.discussion, data.publicMark)).rejects.toThrow('Offline');
  expect(context.stream.paused).toBe(false);
  expect(context.stream.goToIndex).not.toHaveBeenCalled();
});

test('only-marked stream renders one post with both labels and a separate tombstone for a deleted target', async () => {
  const deleted = data.mark(true, '9', 999, 9, { isPostDeleted: true, navigationIndex: 1 });
  data.discussion.pushData({
    relationships: { personalThreadmarks: [data.personalMark, deleted] },
  });
  const component = new ThreadmarkOnlyStream();
  component.attrs = { stream: new ThreadmarkStreamState(data.discussion) } as any;
  component['loading'] = false;
  const previous = app.postComponents.comment;
  app.postComponents.comment = { view: () => m('article.fixture-post', 'Post body') } as any;
  try {
    m.render(root, component.view());
    expect(root.querySelectorAll('.fixture-post')).toHaveLength(1);
    expect(root.querySelectorAll('.ThreadmarkOnlyStream-item')).toHaveLength(2);
    expect(root.querySelectorAll('.ThreadmarkTombstone')).toHaveLength(1);
    expect(root.textContent).toContain('Public note');
    expect(root.textContent).toContain('Private note');
  } finally {
    app.postComponents.comment = previous;
  }
});
test('only-marked stream batches missing unique posts in groups of 20 and skips deleted targets', async () => {
  const marks = Array.from({ length: 43 }, (_, index) => data.mark(false, String(index + 10), index + 100, index + 10));
  const deleted = data.mark(true, '90', 999, 99, { isPostDeleted: true });
  data.discussion.pushData({
    relationships: {
      threadmarks: marks,
      personalThreadmarks: [data.mark(true, '2', 100, 10), deleted],
    },
  });
  const find = jest.spyOn(app.store, 'find').mockResolvedValue([] as any);
  const component = new ThreadmarkOnlyStream();
  component.attrs = { stream: new ThreadmarkStreamState(data.discussion) } as any;
  await component['loadPosts']();
  expect(find.mock.calls.map((call) => (call[1] as any[]).length)).toEqual([20, 20, 3]);
  expect(find.mock.calls.flatMap((call) => call[1])).not.toContain('999');
  expect(component['loading']).toBe(false);
});

test('only mode retains default post includes and resolves discussion and author for newly loaded posts', async () => {
  app.store.remove(data.post);
  app.store.models.users = User;
  data.discussion.pushData({ attributes: { canReply: true } });
  const request = jest.spyOn(app, 'request').mockResolvedValue({
    data: [{
      type: 'posts', id: '11',
      attributes: { number: 2, contentType: 'comment', contentHtml: 'Loaded marked post' },
      relationships: {
        discussion: { data: { type: 'discussions', id: '1' } },
        user: { data: { type: 'users', id: '7' } },
      },
    }],
    included: [{ type: 'users', id: '7', attributes: { username: 'Author', displayName: 'Author' } }],
  } as any);
  const component = new ThreadmarkOnlyStream();
  component.attrs = { stream: new ThreadmarkStreamState(data.discussion) } as any;
  await component['loadPosts']();

  // An explicit include replaces Core and third-party defaults in Flarum.
  expect(request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET', url: '/api/posts?filter[id]=11' }));
  expect(request.mock.calls[0][0].params).not.toHaveProperty('include');
  const post = app.store.getById<Post>('posts', '11')!;
  expect(post.discussion()).toBe(data.discussion);
  expect((post.discussion() as typeof data.discussion).canReply()).toBe(true);
  expect((post.user() as User).displayName()).toBe('Author');
  expect(postThreadmarks(post)).toEqual([data.publicMark, data.personalMark]);
  expect(component['loading']).toBe(false);
});
