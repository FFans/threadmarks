import m from 'mithril';
import jquery from 'jquery';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import app from 'flarum/forum/app';
import ForumApplication from 'flarum/forum/ForumApplication';
import admin from 'flarum/admin/app';
import AdminApplication from 'flarum/admin/AdminApplication';

Object.assign(window, { $: jquery, jQuery: jquery, m, dayjs });
window.matchMedia = (query: string) => ({ matches: false, media: query, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false, onchange: null });
dayjs.extend(relativeTime);

beforeAll(async () => {
  window.$ = jquery;
  window.jQuery = jquery;
  await import('bootstrap/js/dropdown');
  window.flarum = { extensions: {} } as any;
  const data = {
    apiDocument: null, locale: 'en', locales: {},
    resources: [{ type: 'forums', id: '1', attributes: {} }],
    session: { userId: 0, csrfToken: 'test' },
  };
  ForumApplication.prototype.mount = () => {};
  AdminApplication.prototype.mount = () => {};
  for (const target of [app, admin]) {
    window.app = target;
    target.load(data as any);
    target.boot();
  }
  window.app = app;
});
