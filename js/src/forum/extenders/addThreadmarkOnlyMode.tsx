import Mithril from 'mithril';

import Button from 'flarum/common/components/Button';
import { extend, override } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import app from 'flarum/forum/app';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import PostStream from 'flarum/forum/components/PostStream';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber';
import PostStreamState from 'flarum/forum/states/PostStreamState';

import ThreadmarkOnlyStream from '../components/ThreadmarkOnlyStream';
import ThreadmarkStreamState from '../states/ThreadmarkStreamState';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import { findVnodeByClass } from '../utils/vnode';

export default function addThreadmarkOnlyMode() {
  extend(DiscussionPage.prototype, 'sidebarItems', function (this: DiscussionPage, items: ItemList<Mithril.Children>) {
    const discussion = this.discussion;

    const active = !!app.current.get('threadmarksOnly');

    if (!discussion || (!active && !discussionThreadmarks(discussion).length)) return;

    items.add(
      'threadmarksOnly',
      <Button
        icon={active ? 'fas fa-bookmark' : 'far fa-bookmark'}
        className={`Button Button--block App-secondaryControl ${active ? 'active' : ''}`}
        onclick={async () => {
          if (active) {
            const stream = app.current.get('stream') as PostStreamState;
            // Core declares near protected; the extension reads its live reading position.
            const number = this['near'] || 1;

            // Only mode leaves the normal page's reading position unchanged.
            // Load that location before mounting Core's stream so it can scroll there.
            await stream.goToNumber(number, true);
            if (app.current.get('stream') !== stream) return;

            app.current.set('threadmarksOnly', false);
            m.redraw();
          } else {
            const header = document.querySelector<HTMLElement>(app.screen() === 'phone' ? '#app-navigation' : '#header');
            const viewportTop = header?.getBoundingClientRect().bottom ?? 0;
            const visiblePost = Array.from(
              this.element.querySelectorAll<HTMLElement>(
                '.DiscussionPage-stream .PostStream-item[data-number], .DiscussionPage-stream .ThreadmarkTombstone[data-threadmark-number]'
              )
            ).find((item) => {
              const rect = item.getBoundingClientRect();
              return rect.height > 0 && rect.bottom > viewportTop && rect.top < window.innerHeight;
            });
            const currentNumber = Number(visiblePost?.dataset.number ?? visiblePost?.dataset.threadmarkNumber ?? this['near']) || 1;
            const threadmarkStream = new ThreadmarkStreamState(discussion);

            app.current.set('threadmarkStream', threadmarkStream);
            app.current.set('threadmarksOnly', true);

            void threadmarkStream.goToPostNumber(currentNumber, true);
          }
        }}
      >
        {active
          ? app.translator.trans('ffans-threadmarks.forum.discussion_controls.show_all_button')
          : app.translator.trans('ffans-threadmarks.forum.discussion_controls.show_threadmarks_button')}
      </Button>,
      0
    );
  });

  extend(DiscussionPage.prototype, 'view', function (view) {
    if (!app.current.get('threadmarksOnly')) return;

    const threadmarkStream = app.current.get('threadmarkStream') as ThreadmarkStreamState | undefined;
    if (!threadmarkStream) return;

    const streamContainer = findVnodeByClass(view, 'DiscussionPage-stream');

    if (!streamContainer) return;

    streamContainer.children = [<ThreadmarkOnlyStream stream={threadmarkStream} />];
  });

  extend(PostStream.prototype, 'oncreate', function () {
    if (!app.current.get('threadmarksOnly') && app.current.get('threadmarkStream')) {
      // Recalculate the normal stream's viewport after its DOM is restored.
      this.updateScrubber();
    }
  });

  override(PostStreamScrubber.prototype, 'view', function (original) {
    const threadmarkStream = app.current.get('threadmarkStream') as ThreadmarkStreamState | undefined;

    const stream = app.current.get('threadmarksOnly') && threadmarkStream ? threadmarkStream : (this.attrs as { stream: PostStreamState }).stream;

    if (this.stream !== stream) {
      this.stream = stream;
      // Core updates the handle's inline heights outside of the Mithril view.
      stream.forceUpdateScrubber = true;
    }

    return original();
  });
}
