import m from 'mithril';

import { jest } from '@jest/globals';
import app from 'flarum/forum/app';
import PostControls from 'flarum/forum/utils/PostControls';

import ManageThreadmarkModal from '../../src/forum/components/ManageThreadmarkModal';
import addThreadmarkPostControl from '../../src/forum/extenders/addThreadmarkPostControl';
import { fixture, rootElement, cleanup, deferred, tick } from '../support/fixtures';

let data: ReturnType<typeof fixture>;
let root: HTMLElement;
beforeAll(addThreadmarkPostControl);
beforeEach(() => {
  data = fixture();
  root = rootElement();
  app.threadmarkTypeList.loaded = true;
});
afterEach(() => cleanup(root));
function modal(attrs: Record<string, unknown> = { post: data.post }) {
  const component = new ManageThreadmarkModal();
  component.attrs = { discussion: data.discussion, ...attrs } as any;
  component.oninit(m(ManageThreadmarkModal, component.attrs) as any);
  return component;
}
const submit = { preventDefault() {} } as SubmitEvent;

test('checkmarks indicate saved scopes; both tabs stay natively focusable and keep independent drafts', () => {
  data.discussion.pushData({ relationships: { personalThreadmarks: [] } });
  const instance = modal();
  m.render(root, instance.content());
  const tabs = root.querySelectorAll<HTMLButtonElement>('[role=tab]');
  expect(tabs[0].querySelector('.fa-check')).not.toBeNull();
  expect(tabs[1].querySelector('.fa-check')).toBeNull();
  expect(Array.from(tabs, (tab) => tab.tabIndex)).toEqual([0, 0]);
  instance.drafts.discussion.note('Draft discussion');
  tabs[1].click();
  instance.drafts.personal.note('Draft personal');
  tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
  expect(instance.activeScope).toBe('personal');
  instance.selectScope('discussion');
  expect(instance.drafts.discussion.note()).toBe('Draft discussion');
  instance.selectScope('personal');
  expect(instance.drafts.personal.note()).toBe('Draft personal');
  expect(instance.title()).toBe('Threadmark · #2');
});

test.each([
  [false, false, []],
  [true, false, ['discussion']],
  [false, true, ['personal']],
  [true, true, ['discussion', 'personal']],
])('scope tabs reflect discussion=%s personal=%s permissions', (publicAllowed, privateAllowed, scopes) => {
  data.discussion.pushData({
    attributes: {
      canManageThreadmarks: publicAllowed,
      canManagePersonalThreadmarks: privateAllowed,
    },
    relationships: { threadmarks: [], personalThreadmarks: [] },
  });
  expect(modal().scopes()).toEqual(scopes);
});

test.each([{ number: 1 }, { contentType: 'discussionRenamed' }, { hiddenAt: '2026-01-01T00:00:00Z' }])(
  'invalid post %j has no creation scope or menu entry',
  (attributes) => {
    data.discussion.pushData({ relationships: { threadmarks: [], personalThreadmarks: [] } });
    data.post.pushData({ attributes });
    expect(modal().scopes()).toEqual([]);
    expect(PostControls.moderationControls(data.post).has('threadmark')).toBe(false);
  }
);
test('one shared post menu entry opens the manager', () => {
  const show = jest.spyOn(app.modal, 'show').mockImplementation(() => {});
  const items = PostControls.moderationControls(data.post);
  expect(items.has('threadmark')).toBe(true);
  m.render(root, items.get('threadmark'));
  root.querySelector<HTMLButtonElement>('button')!.click();
  expect(show).toHaveBeenCalledWith(ManageThreadmarkModal, {
    discussion: data.discussion,
    post: data.post,
  });
});

test.each(['discussion', 'personal'] as const)('%s editing retains only its current disabled type and previews the selected type', async (scope) => {
  data.type.pushData({ attributes: { isEnabled: false } });
  app.store.pushObject({
    type: 'threadmark-types',
    id: '3',
    attributes: { name: 'Unavailable', isEnabled: false },
  });
  const instance = modal();
  instance.selectScope(scope);
  m.render(root, instance.content());
  expect(Array.from(root.querySelectorAll('option'), (option) => option.textContent)).toEqual(['Notice', 'Chapter']);
  const select = root.querySelector<HTMLSelectElement>('select')!;
  select.value = '2';
  select.dispatchEvent(new Event('change', { bubbles: true }));
  m.render(root, instance.content());
  expect(root.querySelector('.ManageThreadmarkModal-typePreview .fa-book-bookmark')).not.toBeNull();
  expect(root.querySelector<HTMLElement>('.ManageThreadmarkModal-typePreview')!.style.color).toBe('rgb(0, 170, 0)');
  const mark = scope === 'personal' ? data.personalMark : data.publicMark;
  const save = jest.spyOn(mark, 'save').mockResolvedValue(mark as any);
  jest.spyOn(instance, 'hide').mockImplementation(() => {});
  instance.drafts[scope].typeId('3');
  await instance.onsubmit(submit);
  expect(save).not.toHaveBeenCalled();
  instance.drafts[scope].typeId('1');
  await instance.onsubmit(submit);
  expect(save).toHaveBeenCalledTimes(1);
});
test('creation with no enabled types disables selection and submit', async () => {
  app.store.all('threadmark-types').forEach((type) => type.pushData({ attributes: { isEnabled: false } }));
  data.discussion.pushData({ relationships: { threadmarks: [], personalThreadmarks: [] } });
  const instance = modal();
  m.render(root, instance.content());
  expect(root.querySelector<HTMLSelectElement>('select')!.disabled).toBe(true);
  expect(root.querySelector<HTMLButtonElement>('[type=submit]')!.disabled).toBe(true);
  const create = jest.spyOn(app.store, 'createRecord');
  await instance.onsubmit(submit);
  expect(create).not.toHaveBeenCalled();
});

test.each(['discussion', 'personal'] as const)(
  '%s creation uses known post ID without fetching or inserting a placeholder post and closes on success',
  async (scope) => {
    const source = scope === 'personal' ? data.publicMark : data.personalMark;
    const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
    const resource = scope === 'personal' ? 'personal-threadmarks' : 'threadmarks';
    data.discussion.pushData({ relationships: { [relationship]: [] } });
    app.store.remove(data.post);
    const find = jest.spyOn(app.store, 'find');
    const pending = deferred<any>();
    const request = jest.spyOn(app, 'request').mockReturnValue(pending.promise);
    const instance = modal({ threadmark: source });
    instance.selectScope(scope);
    instance.drafts[scope].note('   ');
    const hide = jest.spyOn(instance, 'hide').mockImplementation(() => {});
    const saving = instance.onsubmit(submit);
    await instance.onsubmit(submit);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/' + resource,
        body: {
          data: expect.objectContaining({
            type: resource,
            attributes: { note: null },
            relationships: expect.objectContaining({ post: { data: { type: 'posts', id: '11' } } }),
          }),
        },
      })
    );
    expect(hide).not.toHaveBeenCalled();
    pending.resolve({
      data: {
        type: resource,
        id: '9',
        attributes: { originalPostId: 11, originalPostNumber: 2 },
        relationships: { type: { data: { type: 'threadmark-types', id: '1' } } },
      },
    });
    await saving;
    expect(hide).toHaveBeenCalledTimes(1);
    expect(data.discussion[relationship]().map((mark: any) => mark.id())).toEqual(['9']);
    expect(app.store.getById('posts', '11')).toBeUndefined();
    expect(find).not.toHaveBeenCalled();
  }
);
test('failed save preserves draft and existing model; retry succeeds with a trimmed note', async () => {
  const instance = modal();
  instance.drafts.discussion.note('  Revised  ');
  const request = jest
    .spyOn(app, 'request')
    .mockRejectedValueOnce(new Error('Offline'))
    .mockResolvedValueOnce({
      data: {
        ...data.publicMark.data,
        attributes: { ...data.publicMark.data.attributes, note: 'Revised' },
      },
    } as any);
  const hide = jest.spyOn(instance, 'hide').mockImplementation(() => {});
  await instance.onsubmit(submit);
  expect(hide).not.toHaveBeenCalled();
  expect(data.publicMark.note()).toBe('Public note');
  expect(instance.drafts.discussion.note()).toBe('  Revised  ');
  await instance.onsubmit(submit);
  expect(hide).toHaveBeenCalledTimes(1);
  expect(request.mock.calls[1][0]).toEqual(
    expect.objectContaining({
      method: 'PATCH',
      body: { data: expect.objectContaining({ attributes: { note: 'Revised' } }) },
    })
  );
});
test('delete cancellation and failure preserve the mark; success removes only its own scope', async () => {
  const instance = modal();
  const confirm = jest.spyOn(window, 'confirm').mockReturnValue(false);
  const remove = jest
    .spyOn(data.publicMark, 'delete')
    .mockRejectedValueOnce(new Error('Offline'))
    .mockResolvedValue(undefined as any);
  await instance.deleteThreadmark();
  expect(remove).not.toHaveBeenCalled();
  confirm.mockReturnValue(true);
  await instance.deleteThreadmark();
  expect(data.discussion.threadmarks()).toEqual([data.publicMark]);
  await instance.deleteThreadmark();
  expect(data.discussion.threadmarks()).toEqual([]);
  expect(data.discussion.personalThreadmarks()).toEqual([data.personalMark]);
  expect(instance.drafts.discussion.note()).toBe('');
});

test('add/edit openings share one successful type load, coalesce requests, and retry a failure', async () => {
  app.threadmarkTypeList.loaded = false;
  const first = deferred<any>();
  const find = jest
    .spyOn(app.store, 'find')
    .mockReturnValueOnce(first.promise)
    .mockResolvedValue([] as any);
  modal();
  modal({ threadmark: data.personalMark });
  expect(find).toHaveBeenCalledTimes(1);
  first.reject(new Error('Offline'));
  await tick();
  modal();
  await tick();
  const cached = modal({ threadmark: data.publicMark });
  expect(find).toHaveBeenCalledTimes(2);
  expect(find).toHaveBeenCalledWith('threadmark-types');
  expect(cached['loading']).toBe(false);
});
test('an empty type response is also cached', async () => {
  app.store.all('threadmark-types').forEach((type) => app.store.remove(type));
  app.threadmarkTypeList.loaded = false;
  const find = jest.spyOn(app.store, 'find').mockResolvedValue([] as any);
  await app.threadmarkTypeList.load();
  await app.threadmarkTypeList.load();
  expect(find).toHaveBeenCalledTimes(1);
  expect(app.threadmarkTypeList.all()).toEqual([]);
});
