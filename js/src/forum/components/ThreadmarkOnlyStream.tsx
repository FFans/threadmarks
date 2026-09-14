import Mithril from 'mithril';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import Post from 'flarum/common/models/Post';
import ScrollListener from 'flarum/common/utils/ScrollListener';
import app from 'flarum/forum/app';
import LoadingPost from 'flarum/forum/components/LoadingPost';

import Threadmark from '../models/Threadmark';
import ThreadmarkStreamState from '../states/ThreadmarkStreamState';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import ThreadmarkBlock from './ThreadmarkBlock';
import ThreadmarkTombstone from './ThreadmarkTombstone';

export interface ThreadmarkOnlyStreamAttrs extends ComponentAttrs {
  stream: ThreadmarkStreamState;
}

export default class ThreadmarkOnlyStream extends Component<ThreadmarkOnlyStreamAttrs> {
  private loading = true;

  private scrollListener!: ScrollListener;

  oninit(vnode: Mithril.Vnode<ThreadmarkOnlyStreamAttrs, this>) {
    super.oninit(vnode);

    this.scrollListener = new ScrollListener(this.onscroll.bind(this));

    void this.loadPosts();
  }

  view() {
    const threadmarks = this.attrs.stream.threadmarks();

    // Component.element is captured oncreate, so keep the root stable while loading.
    return (
      <div className="PostStream ThreadmarkOnlyStream" role="feed" aria-live="off" aria-busy={this.loading}>
        {threadmarks.map((threadmark, index) => this.viewThreadmark(threadmark, index))}
      </div>
    );
  }

  oncreate(vnode: Mithril.VnodeDOM<ThreadmarkOnlyStreamAttrs, this>) {
    super.oncreate(vnode);

    this.triggerScroll();

    setTimeout(() => {
      this.scrollListener.start();
      this.scrollListener.update();
    });
  }

  onupdate(vnode: Mithril.VnodeDOM<ThreadmarkOnlyStreamAttrs, this>) {
    super.onupdate(vnode);

    this.triggerScroll();
  }

  onremove(vnode: Mithril.VnodeDOM<ThreadmarkOnlyStreamAttrs, this>) {
    super.onremove(vnode);

    this.scrollListener.stop();
  }

  private viewThreadmark(threadmark: Threadmark, index: number) {
    const marks = discussionThreadmarks(this.attrs.stream.discussion).filter((mark) => mark.originalPostId() === threadmark.originalPostId());

    if (threadmark.isPostDeleted()) {
      return (
        <div className="ThreadmarkOnlyStream-item" data-threadmark-index={index} key={`threadmark-post-${threadmark.originalPostId()}`}>
          {marks.map((mark) => (
            <ThreadmarkTombstone key={mark.key()} threadmark={mark} />
          ))}
        </div>
      );
    }

    const post = app.store.getById<Post>('posts', String(threadmark.originalPostId()));

    if (!post) {
      if (!this.loading) return null;

      return (
        <div
          className="PostStream-item ThreadmarkOnlyStream-item"
          data-threadmark-index={index}
          key={`threadmark-post-${threadmark.originalPostId()}`}
          aria-hidden="true"
        >
          <LoadingPost />
        </div>
      );
    }

    const PostComponent = app.postComponents[post.contentType()!];

    if (!PostComponent) return null;

    return (
      <div
        className="PostStream-item ThreadmarkOnlyStream-item"
        role="article"
        data-threadmark-index={index}
        data-number={post.number()}
        data-id={post.id()}
        data-type={post.contentType()}
        key={`threadmark-post-${threadmark.originalPostId()}`}
      >
        {marks.map((mark) => (
          <ThreadmarkBlock key={mark.key()} threadmark={mark} />
        ))}

        <PostComponent post={post} />
      </div>
    );
  }

  private async loadPosts() {
    const missingIds = this.attrs.stream
      .threadmarks()
      .filter((threadmark) => !threadmark.isPostDeleted())
      .map((threadmark) => String(threadmark.originalPostId()))
      .filter((id) => !app.store.getById<Post>('posts', id));

    if (!missingIds.length) {
      this.loading = false;
      m.redraw();

      return;
    }

    try {
      for (let i = 0; i < missingIds.length; i += 20) {
        const ids = missingIds.slice(i, i + 20);
        await app.store.find<Post[]>('posts', ids);
        m.redraw();
      }
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  private triggerScroll() {
    const stream = this.attrs.stream;

    if (!stream.needsScroll || stream.targetIndex === null || this.loading) {
      return;
    }

    const index = stream.targetIndex;
    const animate = stream.animateScroll;

    stream.needsScroll = false;

    void this.scrollToIndex(index, animate, stream.targetAtTop).then(() => {
      stream.paused = false;

      this.updatePosition();

      stream.forceUpdateScrubber = true;

      m.redraw();
    });
  }

  private scrollToIndex(index: number, animate: boolean, atTop: boolean): Promise<void> {
    const $item = this.$(`.ThreadmarkOnlyStream-item[data-threadmark-index="${index}"]`);

    if (!$item.length) {
      return Promise.resolve();
    }

    const top = atTop ? 0 : $item.offset()!.top - this.getMarginTop();

    const $container = $('html, body').stop(true);

    if (!animate) {
      $container.scrollTop(top);

      return Promise.resolve();
    }

    return new Promise((resolve) => {
      $container.animate(
        {
          scrollTop: top,
        },
        'fast',
        () => resolve()
      );
    });
  }

  private onscroll(top = window.scrollY) {
    if (this.loading || this.attrs.stream.paused) return;

    this.updatePosition(top);
  }

  private updatePosition(top = window.scrollY) {
    const stream = this.attrs.stream;

    const marginTop = this.getMarginTop();
    const viewportHeight = $(window).height()! - marginTop;
    const viewportTop = top + marginTop;

    const $items = this.$('.ThreadmarkOnlyStream-item[data-threadmark-index]');

    let visible = 0;
    let indexFromViewport: number | null = null;

    $items.each(function (): void | false {
      const $item = $(this);

      const itemTop = $item.offset()!.top;
      const height = $item.outerHeight(true)!;

      if (itemTop + height < viewportTop) {
        return;
      }

      if (itemTop > viewportTop + viewportHeight) {
        return false;
      }

      const visibleTop = Math.max(0, viewportTop - itemTop);
      const visibleBottom = Math.min(height, viewportTop + viewportHeight - itemTop);

      const visibleItem = visibleBottom - visibleTop;

      if (indexFromViewport === null) {
        indexFromViewport = Number($item.data('threadmark-index')) + visibleTop / height;
      }

      if (visibleItem > 0) {
        visible += visibleItem / height;
      }

      return;
    });

    stream.index = indexFromViewport !== null ? indexFromViewport + 1 : stream.count();

    stream.visible = visible;
  }

  private getMarginTop(): number {
    const headerId = app.screen() === 'phone' ? '#app-navigation' : '#header';

    return $(headerId).outerHeight()! + parseInt(this.$().css('margin-top'), 10);
  }
}
