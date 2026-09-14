import m from 'mithril';

import { jest } from '@jest/globals';
import app from 'flarum/forum/app';

import ManageThreadmarkModal from '../../src/forum/components/ManageThreadmarkModal';
import ThreadmarkDirectory from '../../src/forum/components/ThreadmarkDirectory';
import ThreadmarkList from '../../src/forum/components/ThreadmarkList';
import { openThreadmarkDirectory } from '../../src/forum/utils/threadmarkDirectory';
import { fixture, rootElement, cleanup } from '../support/fixtures';

let data: ReturnType<typeof fixture>;
let root: HTMLElement;
beforeAll(async () => {
  (globalThis as any).jQuery = $;
  await import('bootstrap/js/dropdown');
});
beforeEach(() => {
  data = fixture();
  root = rootElement();
  jest.spyOn(app, 'screen').mockReturnValue('desktop');
  localStorage.clear();
});
afterEach(() => cleanup(root));
function mount(onNavigate = jest.fn()) {
  m.mount(root, {
    view: () => m(ThreadmarkDirectory, { discussion: data.discussion, onNavigate }),
  });
  return onNavigate;
}
function toggle() {
  root.querySelector<HTMLButtonElement>('.ThreadmarkDirectory-toggle')!.click();
  m.redraw.sync();
}
function panel() {
  return document.querySelector<HTMLElement>('.ThreadmarkDirectory')!;
}

test('desktop toggle has real boolean strings, body-mounted dialog, close focus restoration, and no header arrow-key movement', () => {
  mount();
  const button = root.querySelector('.ThreadmarkDirectory-toggle')!;
  expect(button.getAttribute('aria-expanded')).toBe('false');
  toggle();
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(button.getAttribute('aria-pressed')).toBe('true');
  expect(root.contains(panel())).toBe(false);
  expect(document.activeElement).toBe(panel().querySelector('.ThreadmarkDirectory-close'));
  const header = panel().querySelector<HTMLElement>('.ThreadmarkDirectory-drag')!;
  expect(header.hasAttribute('tabindex')).toBe(false);
  const position = panel().style.cssText;
  header.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  m.redraw.sync();
  expect(panel().style.cssText).toBe(position);
  panel().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  m.redraw.sync();
  expect(panel()).toBeNull();
  expect(button.getAttribute('aria-expanded')).toBe('false');
  expect(document.activeElement).toBe(button);
});
test('All, Discussion and Mine filter existing data without a request', () => {
  const find = jest.spyOn(app.store, 'find');
  mount();
  toggle();
  const filters = panel().querySelectorAll<HTMLButtonElement>('.ThreadmarkDirectory-filters button');
  expect(Array.from(filters, (button) => button.textContent)).toEqual(['All', 'Discussion', 'Mine']);
  expect(panel().querySelectorAll('.ThreadmarkList-item')).toHaveLength(2);
  filters[1].click();
  m.redraw.sync();
  expect(panel().querySelectorAll('.ThreadmarkList-item')).toHaveLength(1);
  expect(panel().textContent).toContain('Public note');
  filters[2].click();
  m.redraw.sync();
  expect(panel().querySelectorAll('.ThreadmarkList-item')).toHaveLength(1);
  expect(panel().textContent).toContain('Private note');
  const badge = panel().querySelector('.ThreadmarkMineBadge')!;
  expect(badge.textContent).toBe('Mine');
  expect(badge.parentElement!.lastElementChild).toBe(badge);
  expect(panel().querySelector('.fa-lock')).toBeNull();
  expect(find).not.toHaveBeenCalled();
});
test.each(['threadmarks', 'personalThreadmarks'])('one remaining scope (%s) has no filters or empty placeholder', (relationship) => {
  data.discussion.pushData({ relationships: { [relationship]: [] } });
  mount();
  toggle();
  expect(panel().querySelector('.ThreadmarkDirectory-filters')).toBeNull();
  expect(panel().querySelectorAll('.ThreadmarkList-item')).toHaveLength(1);
  data.discussion.pushData({ relationships: { threadmarks: [], personalThreadmarks: [] } });
  m.redraw.sync();
  expect(panel().querySelector('.ThreadmarkList')).toBeNull();
  expect(panel().querySelector('.ThreadmarkList-empty')).toBeNull();
});
test('removing the currently filtered scope switches to the remaining list', () => {
  mount();
  toggle();
  panel().querySelectorAll<HTMLButtonElement>('.ThreadmarkDirectory-filters button')[2].click();
  m.redraw.sync();
  data.discussion.pushData({ relationships: { personalThreadmarks: [] } });
  m.redraw.sync();
  expect(panel().textContent).toContain('Public note');
  expect(panel().querySelector('.ThreadmarkDirectory-filters')).toBeNull();
});
test('directory requests are scoped by discussion and clean up listeners and host on removal', () => {
  mount();
  openThreadmarkDirectory('other');
  m.redraw.sync();
  expect(panel()).toBeNull();
  openThreadmarkDirectory('1');
  m.redraw.sync();
  expect(panel()).not.toBeNull();
  m.mount(root, null);
  expect(panel()).toBeNull();
  openThreadmarkDirectory('1');
  m.redraw.sync();
  expect(panel()).toBeNull();
});
test.each(['malformed JSON', '{"x":999999,"y":999999}'])('invalid or offscreen saved coordinates are safe: %s', (saved) => {
  localStorage.setItem('ffans-threadmarks.directory-position', saved);
  mount();
  toggle();
  expect(Number.isFinite(parseFloat(panel().style.left))).toBe(true);
  expect(parseFloat(panel().style.left)).toBeGreaterThanOrEqual(8);
  expect(parseFloat(panel().style.top)).toBeGreaterThanOrEqual(8);
});
test('editing from the list uses the mark, does not navigate or fetch its post', () => {
  const navigate = jest.fn();
  const show = jest.spyOn(app.modal, 'show').mockImplementation(() => {});
  const find = jest.spyOn(app.store, 'find');
  app.store.remove(data.post);
  m.render(root, m(ThreadmarkList, { discussion: data.discussion, onNavigate: navigate }));
  root.querySelector<HTMLButtonElement>('.ThreadmarkList-edit')!.click();
  expect(show).toHaveBeenCalledWith(ManageThreadmarkModal, {
    discussion: data.discussion,
    threadmark: data.publicMark,
  });
  expect(navigate).not.toHaveBeenCalled();
  expect(find).not.toHaveBeenCalled();
  expect(root.querySelector('.ThreadmarkList-edit')!.getAttribute('aria-label')).toContain('#2');
});
test('mobile uses Bootstrap backdrop dismissal, keeps filters open and dismisses after navigation', () => {
  jest.mocked(app.screen).mockReturnValue('phone');
  Object.defineProperty(document.documentElement, 'ontouchstart', {
    configurable: true,
    value: null,
  });
  const navigate = mount();
  toggle();
  expect(root.querySelector('.Dropdown.open')).not.toBeNull();
  expect(document.querySelector('.dropdown-backdrop')).not.toBeNull();
  expect(panel()).toBeNull();
  root.querySelectorAll<HTMLButtonElement>('.ThreadmarkDirectory-filters button')[2].click();
  m.redraw.sync();
  expect(root.querySelector('.Dropdown.open')).not.toBeNull();
  document.querySelector<HTMLElement>('.dropdown-backdrop')!.click();
  m.redraw.sync();
  expect(root.querySelector('.Dropdown.open')).toBeNull();
  expect(root.querySelector('.ThreadmarkDirectory-toggle')!.getAttribute('aria-expanded')).toBe('false');
  toggle();
  root.querySelector<HTMLButtonElement>('.ThreadmarkList-button')!.click();
  m.redraw.sync();
  expect(navigate).toHaveBeenCalledWith(data.personalMark);
  expect(root.querySelector('.Dropdown.open')).toBeNull();
  expect(document.querySelector('.dropdown-backdrop')).toBeNull();
});
test('changing viewport mode closes the floating window and removes mobile backdrops', () => {
  mount();
  toggle();
  jest.mocked(app.screen).mockReturnValue('phone');
  window.dispatchEvent(new Event('resize'));
  m.redraw.sync();
  expect(panel()).toBeNull();
  toggle();
  expect(document.querySelector('.dropdown-backdrop')).not.toBeNull();
  jest.mocked(app.screen).mockReturnValue('desktop');
  window.dispatchEvent(new Event('resize'));
  m.redraw.sync();
  expect(document.querySelector('.dropdown-backdrop')).toBeNull();
  expect(root.querySelector('.ThreadmarkDirectory-toggle')!.getAttribute('aria-expanded')).toBe('false');
});
