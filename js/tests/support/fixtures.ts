import m from 'mithril';

import fs from 'node:fs';

import { jest } from '@jest/globals';
import Discussion from 'flarum/common/models/Discussion';
import Forum from 'flarum/common/models/Forum';
import Post from 'flarum/common/models/Post';
import Store from 'flarum/common/Store';
import Translator from 'flarum/common/Translator';
import app from 'flarum/forum/app';
import flatten from 'flat';
import yaml from 'js-yaml';

import extend from '../../src/forum/extend';
import Threadmark from '../../src/forum/models/Threadmark';
import ThreadmarkTypeListState from '../../src/forum/states/ThreadmarkTypeListState';

export const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
export function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
export function catalogue(locale = 'en'): Record<string, string> {
  return flatten(yaml.load(fs.readFileSync('../locale/' + locale + '.yml', 'utf8')));
}
export function translations(target: typeof app = app, locale = 'en') {
  const messages: Record<string, string> = {
    ...flatten(yaml.load(fs.readFileSync('../vendor/flarum/core/locale/core.yml', 'utf8'))),
    ...catalogue(locale),
  };
  const resolve = (key: string, seen: string[] = []): string => {
    if (seen.includes(key) || !(key in messages)) throw new Error('Invalid translation reference: ' + [...seen, key].join(' -> '));
    const value = messages[key];
    return value.startsWith('=> ') ? resolve(value.slice(3), [...seen, key]) : value;
  };
  target.translator = new Translator();
  target.translator.setLocale(locale);
  target.translator.addTranslations(Object.fromEntries(Object.keys(messages).map((key) => [key, resolve(key)])));
}
export function fixture(target: typeof app = app) {
  (window as any).app = target;
  target.store = new Store({ discussions: Discussion, posts: Post });
  target.data = { resources: [] } as any;
  target.forum = new Forum({ type: 'forums', id: '1', attributes: { apiUrl: '/api' } });
  extend.forEach((extender) => extender.extend(target, {}));
  target.threadmarkTypeList = new ThreadmarkTypeListState();
  translations(target);
  const type = target.store.pushObject({
    type: 'threadmark-types',
    id: '1',
    attributes: {
      key: 'notice',
      name: 'Notice',
      color: '#aa0000',
      icon: 'fas fa-bookmark',
      position: 1,
      isEnabled: true,
      isBuiltin: true,
      canDelete: true,
    },
  })!;
  target.store.pushObject({
    type: 'threadmark-types',
    id: '2',
    attributes: {
      key: 'chapter',
      name: 'Chapter',
      color: '#00aa00',
      icon: 'fas fa-book',
      position: 2,
      isEnabled: true,
      isBuiltin: false,
      canDelete: true,
    },
  });
  const discussion = target.store.pushObject<Discussion>({
    type: 'discussions',
    id: '1',
    attributes: { canManageThreadmarks: true, canManagePersonalThreadmarks: true },
    relationships: {
      posts: {
        data: [
          { type: 'posts', id: '10' },
          { type: 'posts', id: '11' },
          { type: 'posts', id: '12' },
        ],
      },
    },
  })!;
  const post = target.store.pushObject<Post>({
    type: 'posts',
    id: '11',
    attributes: { number: 2, contentType: 'comment', contentHtml: 'Reply', isHidden: false },
    relationships: { discussion: { data: { type: 'discussions', id: '1' } } },
  })!;
  const mark = (personal = false, id = '1', postId = 11, number = 2, attributes: Record<string, unknown> = {}) =>
    target.store.pushObject<Threadmark>({
      type: personal ? 'personal-threadmarks' : 'threadmarks',
      id,
      attributes: {
        originalPostId: postId,
        originalPostNumber: number,
        note: personal ? 'Private note' : 'Public note',
        canManage: true,
        isPostDeleted: false,
        navigationIndex: null,
        ...attributes,
      },
      relationships: {
        discussion: { data: { type: 'discussions', id: '1' } },
        post: { data: { type: 'posts', id: String(postId) } },
        type: { data: { type: 'threadmark-types', id: '1' } },
      },
    })!;
  const publicMark = mark();
  const personalMark = mark(true);
  discussion.pushData({
    relationships: { threadmarks: [publicMark], personalThreadmarks: [personalMark] },
  });
  return { discussion, post, type, publicMark, personalMark, mark };
}
export function rootElement() {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return root;
}
export function cleanup(root: HTMLElement) {
  m.mount(root, null);
  m.render(root, null);
  root.remove();
  jest.restoreAllMocks();
}
