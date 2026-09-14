import m from 'mithril';

import { jest } from '@jest/globals';
import app from 'flarum/forum/app';

import ThreadmarkLabel from '../../src/forum/components/ThreadmarkLabel';
import ThreadmarkScrubberMarkers from '../../src/forum/components/ThreadmarkScrubberMarkers';
import syncThreadmarkAfterPostDelete from '../../src/forum/extenders/syncThreadmarkAfterPostDelete';
import { DIRECTORY_OPEN_EVENT } from '../../src/forum/utils/threadmarkDirectory';
import { fixture, rootElement, cleanup } from '../support/fixtures';

let data: ReturnType<typeof fixture>;
let root: HTMLElement;
beforeAll(syncThreadmarkAfterPostDelete);
beforeEach(() => {
  data = fixture();
  root = rootElement();
});
afterEach(() => cleanup(root));
function markers() {
  const component = new ThreadmarkScrubberMarkers();
  component.attrs = { discussion: data.discussion, onNavigate: jest.fn() } as any;
  component['height'] = 200;
  return component;
}
test('overlapping scopes cluster, carry an accessible count and open the directory without navigating', () => {
  const component = markers();
  const opened = jest.fn();
  window.addEventListener(DIRECTORY_OPEN_EVENT, opened);
  try {
    m.render(root, component.view());
    expect(root.querySelectorAll('.ThreadmarkScrubberMarker--cluster')).toHaveLength(1);
    expect(root.querySelector('.ThreadmarkScrubberMarker-hit')!.getAttribute('aria-label')).toBe('2 threadmarks');
    root.querySelector<HTMLButtonElement>('.ThreadmarkScrubberMarker-openDirectory')!.click();
    expect(opened).toHaveBeenCalledWith(expect.objectContaining({ detail: '1' }));
    expect(component.attrs.onNavigate).not.toHaveBeenCalled();
    root.querySelectorAll<HTMLElement>('.ThreadmarkScrubberMarker-collapseItem')[1].click();
    expect(component.attrs.onNavigate).toHaveBeenCalledWith(data.personalMark);
  } finally {
    window.removeEventListener(DIRECTORY_OPEN_EVENT, opened);
  }
});
test('unavailable posts have no scrubber marker, deleted ones use their navigation index and stay within the track', () => {
  data.discussion.pushData({
    relationships: { personalThreadmarks: [] },
    attributes: { lastPostNumber: 2 },
  });
  data.publicMark.pushData({ attributes: { originalPostId: 999, originalPostNumber: 100 } });
  const component = markers();
  m.render(root, component.view());
  expect(root.querySelector('.ThreadmarkScrubberMarker')).toBeNull();
  data.publicMark.pushData({ attributes: { isPostDeleted: true, navigationIndex: 0 } });
  m.render(root, component.view());
  expect(root.querySelector<HTMLElement>('.ThreadmarkScrubberMarker')!.style.top).toBe('0%');
  expect(root.querySelector('.ThreadmarkScrubberMarker-hit')!.getAttribute('aria-label')).toContain('#100');
});

test('early marks in a long discussion stay near the start even when discussion counters are stale', () => {
  const third = data.mark(false, '3', 3, 3);
  const fifth = data.mark(false, '5', 5, 5);
  data.discussion.pushData({
    attributes: { lastPostNumber: 1, commentCount: 1 },
    relationships: {
      posts: { data: Array.from({ length: 1001 }, (_, index) => ({ type: 'posts', id: String(index + 1) })) },
      threadmarks: [third, fifth],
      personalThreadmarks: [],
    },
  });
  const component = markers();
  m.render(root, component.view());
  const cluster = root.querySelector<HTMLElement>('.ThreadmarkScrubberMarker--cluster')!;
  expect(parseFloat(cluster.style.top)).toBeCloseTo(0.3);
  expect(cluster.querySelector('button')!.getAttribute('aria-label')).toBe('2 threadmarks');
  expect(cluster.textContent).toContain('#3');
  expect(cluster.textContent).toContain('#5');
});

test('marker placement follows the visible post index despite gaps in post numbers', () => {
  data.publicMark.pushData({ attributes: { originalPostNumber: 80 } });
  data.discussion.pushData({ attributes: { lastPostNumber: 100 }, relationships: { personalThreadmarks: [] } });
  m.render(root, markers().view());
  expect(root.querySelector<HTMLElement>('.ThreadmarkScrubberMarker')!.style.top).toBe('50%');
});

test.each([
  [[], 0, '0%'],
  [['10'], 0, '0%'],
  [['10', '11', '12'], -1, '0%'],
  [['10', '11', '12'], 3, '100%'],
])('deleted marker anchors remain within a track with posts %j and index %s', (ids, navigationIndex, top) => {
  data.publicMark.pushData({ attributes: { originalPostId: 999, isPostDeleted: true, navigationIndex } });
  data.discussion.pushData({
    relationships: { posts: { data: ids.map((id) => ({ type: 'posts', id })) }, personalThreadmarks: [] },
  });
  m.render(root, markers().view());
  expect(root.querySelector<HTMLElement>('.ThreadmarkScrubberMarker')!.style.top).toBe(top);
});
test('inline personal label ends with Mine badge and uses text rendering for notes', () => {
  data.personalMark.pushData({ attributes: { note: '<script>bad()</script>' } });
  m.render(root, m(ThreadmarkLabel, { threadmark: data.personalMark }));
  expect(root.querySelector('.ThreadmarkLabel')!.lastElementChild!.textContent).toBe('Mine');
  expect(root.querySelector('script')).toBeNull();
  expect(root.querySelector('.fa-lock')).toBeNull();
});
test('post deletion refreshes both scopes and tolerates a later refresh failure', async () => {
  const request = jest.spyOn(app, 'request').mockResolvedValue(undefined as any);
  const find = jest.spyOn(app.store, 'find').mockRejectedValue(new Error('Discussion removed'));
  await expect(data.post.delete()).resolves.toBeUndefined();
  expect(request).toHaveBeenCalledWith(expect.objectContaining({ method: 'DELETE', url: '/api/posts/11' }));
  expect(find).toHaveBeenCalledWith('discussions', '1', {
    include: 'threadmarks,threadmarks.type,personalThreadmarks,personalThreadmarks.type',
  });
});
test.each(['no marks', 'last post'])('post deletion skips an unnecessary refresh with %s', async (condition) => {
  if (condition === 'no marks') data.discussion.pushData({ relationships: { threadmarks: [], personalThreadmarks: [] } });
  else data.discussion.pushData({ relationships: { posts: [data.post] } });
  jest.spyOn(app, 'request').mockResolvedValue(undefined as any);
  const find = jest.spyOn(app.store, 'find');
  await data.post.delete();
  expect(find).not.toHaveBeenCalled();
});
test('failed post deletion never refreshes discussion relations or removes the cached post', async () => {
  jest.spyOn(app, 'request').mockRejectedValue(new Error('Forbidden'));
  const find = jest.spyOn(app.store, 'find');
  await expect(data.post.delete()).rejects.toThrow('Forbidden');
  expect(find).not.toHaveBeenCalled();
  expect(app.store.getById('posts', '11')).toBe(data.post);
});
