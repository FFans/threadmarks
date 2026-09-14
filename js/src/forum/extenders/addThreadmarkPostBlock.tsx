import type Mithril from 'mithril';

import { extend } from 'flarum/common/extend';
import Post from 'flarum/common/models/Post';
import app from 'flarum/forum/app';
import PostStream from 'flarum/forum/components/PostStream';

import ThreadmarkBlock from '../components/ThreadmarkBlock';
import { postThreadmarks } from '../utils/discussionThreadmarks';

export default function addThreadmarkPostBlock() {
  extend(PostStream.prototype, 'view', function (view) {
    if (app.current.get('threadmarksOnly')) return;

    const visit = (node: Mithril.Children): void => {
      if (Array.isArray(node)) {
        node.forEach(visit);
        return;
      }
      if (!node || typeof node !== 'object' || !('tag' in node)) return;
      const vnode = node as Mithril.Vnode<Record<string, unknown>>;
      const id = vnode.attrs?.['data-id'];
      if (
        id &&
        String(vnode.attrs?.className || '')
          .split(' ')
          .includes('PostStream-item')
      ) {
        const post = app.store.getById<Post>('posts', String(id));
        if (!post) return;
        // Keep Post's root element intact: its lifecycle uses it for controls and content.
        // The empty fragment also keeps the post at the same child position when marks change.
        const children = (vnode.children || []) as Mithril.Children[];
        vnode.children = [
          m.fragment(
            {},
            postThreadmarks(post).map((mark) => <ThreadmarkBlock key={mark.key()} threadmark={mark} />)
          ),
          ...children,
        ];
        return;
      }
      visit(vnode.children);
    };

    visit(view);
  });
}
