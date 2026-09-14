import m from 'mithril';

import { jest } from '@jest/globals';
import app from 'flarum/admin/app';

import CreateThreadmarkTypeModal from '../../src/admin/components/CreateThreadmarkTypeModal';
import EditThreadmarkTypeModal from '../../src/admin/components/EditThreadmarkTypeModal';
import ThreadmarkTypesPage from '../../src/admin/components/ThreadmarkTypesPage';
import { fixture, rootElement, cleanup, deferred, tick } from '../support/fixtures';

let data: ReturnType<typeof fixture>;
let root: HTMLElement;
beforeEach(() => {
  data = fixture(app as any);
  root = rootElement();
});
afterEach(() => cleanup(root));
function page() {
  const component = new ThreadmarkTypesPage();
  component['loading'] = false;
  component.sortable = { create: jest.fn(() => ({ destroy: jest.fn() })) };
  component.element = root;
  m.render(root, component.content({} as any));
  return component;
}
function edit() {
  const component = new EditThreadmarkTypeModal();
  component.attrs = { threadmarkType: data.type } as any;
  component.oninit(m(EditThreadmarkTypeModal, component.attrs) as any);
  return component;
}
test('type table sorts rows and uses labelled native Switch inputs with sortable cleanup', () => {
  data.type.pushData({ attributes: { position: 3 } });
  const component = page();
  const rows = root.querySelectorAll<HTMLElement>('.ThreadmarkTypeList-item');
  expect(Array.from(rows, (row) => row.dataset.id)).toEqual(['2', '1']);
  expect(root.querySelectorAll('th[scope=col]')).toHaveLength(6);
  expect(rows[1].querySelector<HTMLInputElement>('input[type=checkbox]')!.checked).toBe(true);
  expect(rows[1].querySelector('input')!.getAttribute('aria-label')).toBe('Enable Notice');
  const destroy = component.sortableList!.destroy;
  m.render(root, null);
  expect(destroy).toHaveBeenCalledTimes(1);
});
test.each([true, false])('Switch pending state prevents duplicate saves; success=%s retains or rolls back value', async (success) => {
  const component = page();
  const pending = deferred<any>();
  const request = jest.spyOn(app, 'request').mockReturnValue(pending.promise);
  const saving = component.setTypeEnabled(data.type as any, false);
  await component.setTypeEnabled(data.type as any, true);
  expect(request).toHaveBeenCalledTimes(1);
  expect(data.type.attribute('isEnabled')).toBe(false);
  m.render(root, component.content({} as any));
  expect(root.querySelector<HTMLInputElement>('input[type=checkbox]')!.disabled).toBe(true);
  if (success)
    pending.resolve({
      data: { ...data.type.data, attributes: { ...data.type.data.attributes, isEnabled: false } },
    });
  else pending.reject(new Error('Offline'));
  await saving;
  expect(component.savingTypes.size).toBe(0);
  expect(data.type.attribute('isEnabled')).toBe(!success);
});
test('sorting submits the displayed order and updates stored positions', () => {
  const request = jest.spyOn(app, 'request').mockResolvedValue(undefined as any);
  const component = page();
  const tbody = root.querySelector('tbody')!;
  tbody.prepend(tbody.lastElementChild!);
  component.onSortUpdate();
  expect(request).toHaveBeenCalledWith({
    method: 'POST',
    url: '/api/threadmark-types/order',
    body: { order: ['2', '1'] },
  });
  expect(data.type.attribute('position')).toBe(2);
});
test('used type cannot be deleted and provides a linked explanation; deletion is right of save', () => {
  data.type.pushData({ attributes: { canDelete: false } });
  const component = edit();
  const confirm = jest.spyOn(window, 'confirm');
  const remove = jest.spyOn(data.type, 'delete');
  m.render(root, component.content());
  const buttons = root.querySelectorAll<HTMLButtonElement>('.Form-controls button');
  expect(buttons[0].type).toBe('submit');
  expect(buttons[1].classList.contains('Button--danger')).toBe(true);
  expect(buttons[1].disabled).toBe(true);
  expect(document.getElementById(buttons[1].getAttribute('aria-describedby')!)!.textContent).toContain('cannot be deleted');
  component.deleteThreadmarkType();
  expect(confirm).not.toHaveBeenCalled();
  expect(remove).not.toHaveBeenCalled();
});
test.each([true, false])('type deletion success=%s closes or resets pending state', async (success) => {
  const component = edit();
  const hide = jest.spyOn(component, 'hide').mockImplementation(() => {});
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  const pending = deferred<any>();
  const remove = jest.spyOn(data.type, 'delete').mockReturnValue(pending.promise);
  component.deleteThreadmarkType();
  component.deleteThreadmarkType();
  expect(remove).toHaveBeenCalledTimes(1);
  expect(component.deleting).toBe(true);
  if (success) pending.resolve(undefined);
  else pending.reject(new Error('Offline'));
  await tick();
  expect(hide).toHaveBeenCalledTimes(success ? 1 : 0);
  if (!success) expect(component.deleting).toBe(false);
});
test('edit form keeps key read-only, links labels to inputs and updates icon and color preview', () => {
  const component = edit();
  component.color('#00aa00');
  component.icon('fas fa-star');
  m.render(root, component.content());
  expect(root.querySelector<HTMLInputElement>('#edit-threadmark-type-key')!.disabled).toBe(true);
  for (const label of root.querySelectorAll<HTMLLabelElement>('label[for]')) expect(root.querySelector('#' + label.htmlFor)).not.toBeNull();
  expect(root.querySelector('.ThreadmarkTypeIconInput-preview .fa-star')).not.toBeNull();
  expect(root.querySelector<HTMLElement>('.ThreadmarkTypeIconInput-preview')!.style.color).toBe('rgb(0, 170, 0)');
  expect(root.querySelector('input[type=color]')).not.toBeNull();
});
test('editing trims fields, sends no immutable key, closes on success and permits retry on failure', async () => {
  const component = edit();
  component.name('  Renamed  ');
  component.color(' #123456 ');
  component.icon(' fas fa-star ');
  const save = jest
    .spyOn(data.type, 'save')
    .mockRejectedValueOnce(new Error('Offline'))
    .mockResolvedValue(data.type as any);
  const hide = jest.spyOn(component, 'hide').mockImplementation(() => {});
  component.onsubmit({ preventDefault() {} } as SubmitEvent);
  await tick();
  expect(hide).not.toHaveBeenCalled();
  component.onsubmit({ preventDefault() {} } as SubmitEvent);
  await tick();
  expect(save).toHaveBeenLastCalledWith({ name: 'Renamed', color: '#123456', icon: 'fas fa-star' }, expect.any(Object));
  expect(hide).toHaveBeenCalledTimes(1);
});
test('create form uses a distinct title and persists trimmed input, invokes callback and closes', async () => {
  const component = new CreateThreadmarkTypeModal();
  const onCreated = jest.fn();
  component.attrs = { onCreated } as any;
  component.oninit(m(CreateThreadmarkTypeModal, component.attrs) as any);
  component.key(' custom ');
  component.name(' Custom ');
  component.color(' #123456 ');
  component.icon(' fas fa-star ');
  const request = jest.spyOn(app, 'request').mockResolvedValue({
    data: {
      type: 'threadmark-types',
      id: '9',
      attributes: { key: 'custom', name: 'Custom', isEnabled: true },
    },
  } as any);
  const hide = jest.spyOn(component, 'hide').mockImplementation(() => {});
  m.render(root, component.content());
  expect(root.querySelector<HTMLInputElement>('#create-threadmark-type-key')!.disabled).toBe(false);
  expect(component.title()).not.toEqual(edit().title());
  component.onsubmit({ preventDefault() {} } as SubmitEvent);
  await tick();
  expect(request).toHaveBeenCalledWith(
    expect.objectContaining({
      method: 'POST',
      body: {
        data: {
          type: 'threadmark-types',
          attributes: { key: 'custom', name: 'Custom', color: '#123456', icon: 'fas fa-star' },
        },
      },
    })
  );
  expect(onCreated).toHaveBeenCalledWith(app.store.getById('threadmark-types', '9'));
  expect(hide).toHaveBeenCalledTimes(1);
});
