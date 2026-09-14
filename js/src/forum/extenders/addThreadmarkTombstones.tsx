import type Mithril from 'mithril';

import { extend } from 'flarum/common/extend';
import PostStream from 'flarum/forum/components/PostStream';

import ThreadmarkTombstone from '../components/ThreadmarkTombstone';
import Threadmark from '../models/Threadmark';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';

interface RenderedPostItem {
  vnode: Mithril.Vnode<any, any>;
  parent: any[];
  number: number;
}

export default function addThreadmarkTombstones() {
  extend(PostStream.prototype, 'view', function (view) {
    const threadmarks = discussionThreadmarks(this.discussion);

    const deletedThreadmarks = threadmarks
      .filter((threadmark) => threadmark.isPostDeleted())
      .sort((a, b) => a.originalPostNumber() - b.originalPostNumber());

    if (!deletedThreadmarks.length) return;

    const posts = collectRenderedPosts(view).sort((a, b) => a.number - b.number);

    if (!posts.length) return;

    // key 是 Stone 后面的真实 Post。
    const beforeGroups = new Map<RenderedPostItem, Threadmark[]>();

    // 讨论末尾的 Stone 没有后一条真实 Post。
    const tail: Threadmark[] = [];

    for (const threadmark of deletedThreadmarks) {
      const number = threadmark.originalPostNumber();

      let previous: RenderedPostItem | undefined;
      let next: RenderedPostItem | undefined;
      let realPostStillExists = false;

      for (const post of posts) {
        if (post.number === number) {
          realPostStillExists = true;
          break;
        }

        if (post.number < number) {
          previous = post;
          continue;
        }

        if (post.number > number) {
          next = post;
          break;
        }
      }

      if (realPostStillExists) continue;

      if (next) {
        // 正常情况：
        //
        // #1
        // Stone #2
        // Stone #3
        // Stone #4
        // #5
        //
        // 至少要确认 Stone 的前一侧也属于当前窗口。如果已经在讨论开头，则允许没有 previous。
        if (previous || this.stream.visibleStart === 0) {
          const group = beforeGroups.get(next) ?? [];

          group.push(threadmark);
          beforeGroups.set(next, group);
        }

        continue;
      }

      // 没有 next，只有在当前已经看到讨论末尾时，才能确定 Stone 应该放到最后一条真实 Post 后面。
      if (previous && this.stream.viewingEnd()) {
        tail.push(threadmark);
      }
    }

    for (const [target, group] of beforeGroups) {
      const index = target.parent.indexOf(target.vnode);

      if (index === -1) continue;

      target.parent.splice(
        index,
        0,
        ...group.map((threadmark) => <ThreadmarkTombstone key={threadmark.key()} threadmark={threadmark}></ThreadmarkTombstone>)
      );
    }

    if (tail.length) {
      const lastPost = posts[posts.length - 1];
      const index = lastPost.parent.indexOf(lastPost.vnode);

      if (index !== -1) {
        lastPost.parent.splice(
          index + 1,
          0,
          ...tail.map((threadmark) => <ThreadmarkTombstone key={threadmark.key()} threadmark={threadmark}></ThreadmarkTombstone>)
        );
      }
    }
  });
}

function collectRenderedPosts(node: Mithril.Children, result: RenderedPostItem[] = []): RenderedPostItem[] {
  if (Array.isArray(node)) {
    for (const child of node) {
      if (isNumberedPostStreamItem(child)) {
        result.push({
          vnode: child,
          parent: node,
          number: Number(child.attrs['data-number']),
        });
      }

      collectRenderedPosts(child, result);
    }

    return result;
  }

  if (!node || typeof node !== 'object' || !('children' in node)) {
    return result;
  }

  collectRenderedPosts((node as Mithril.Vnode<any, any>).children, result);

  return result;
}

function isNumberedPostStreamItem(node: Mithril.Children): node is Mithril.Vnode<any, any> {
  if (!node || typeof node !== 'object' || !('attrs' in node)) {
    return false;
  }

  const vnode = node as Mithril.Vnode<any, any>;
  const className = vnode.attrs?.className;

  return typeof className === 'string' && className.split(/\s+/).includes('PostStream-item') && vnode.attrs?.['data-number'] !== undefined;
}
