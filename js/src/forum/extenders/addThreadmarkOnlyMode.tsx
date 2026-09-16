import Mithril from 'mithril';

import Button from 'flarum/common/components/Button';
import { extend, override } from 'flarum/common/extend';
import extractText from 'flarum/common/utils/extractText';
import ItemList from 'flarum/common/utils/ItemList';
import app from 'flarum/forum/app';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import PostStream from 'flarum/forum/components/PostStream';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber';
import PostStreamState from 'flarum/forum/states/PostStreamState';

import ThreadmarkDirectory from '../components/ThreadmarkDirectory';
import ThreadmarkOnlyStream from '../components/ThreadmarkOnlyStream';
import Threadmark from '../models/Threadmark';
import ThreadmarkStreamState from '../states/ThreadmarkStreamState';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import { navigateToThreadmark } from '../utils/threadmarkNavigation';
import { findVnodeByClass } from '../utils/vnode';

export default function addThreadmarkOnlyMode() {
  extend(DiscussionPage.prototype, 'sidebarItems', function (this: DiscussionPage, items: ItemList<Mithril.Children>) {
    const discussion = this.discussion;

    const active = !!app.current.get('threadmarksOnly');

    if (!discussion || (!active && !discussionThreadmarks(discussion).length)) return;

    const onlyModeControl = (
      <Button
        icon={active ? 'fa-solid fa-book-bookmark' : 'fa-solid fa-book-bookmark'}
        className={`Button ThreadmarkOnlyButton ${active ? 'active' : ''}`}
        aria-pressed={active ? 'true' : 'false'}
        aria-label={
          active
            ? extractText(app.translator.trans('ffans-threadmarks.forum.discussion_controls.show_all_button_a11y_label'))
            : extractText(app.translator.trans('ffans-threadmarks.forum.discussion_controls.show_threadmarks_button_a11y_label'))
        }
        noStyleOverride
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
      </Button>
    );

    items.add(
      'threadmarksOnly',
      <ThreadmarkDirectory
        discussion={discussion}
        onlyModeControl={onlyModeControl}
        onNavigate={(threadmark: Threadmark) =>
          navigateToThreadmark.call(
            {
              stream: this.stream,
              updateScrubberValues: () => {
                this.stream!.forceUpdateScrubber = true;
                m.redraw();
              },
            },
            discussion,
            threadmark
          )
        }
      />,
      0
    );
  });

  extend<DiscussionPage, 'view'>('flarum/forum/components/DiscussionPage', 'view', function (view) {
    if (!app.current.get('threadmarksOnly')) return;

    const threadmarkStream = app.current.get('threadmarkStream') as ThreadmarkStreamState | undefined;
    if (!threadmarkStream) return;

    const streamContainer = findVnodeByClass(view, 'DiscussionPage-stream');

    if (!streamContainer) return;

    streamContainer.children = [<ThreadmarkOnlyStream stream={threadmarkStream} />];
  });

  extend<PostStream, 'oncreate'>('flarum/forum/components/PostStream', 'oncreate', function () {
    if (!app.current.get('threadmarksOnly') && app.current.get('threadmarkStream')) {
      // Recalculate the normal stream's viewport after its DOM is restored.
      this.updateScrubber();
    }
  });

  override<PostStreamScrubber, 'view'>('flarum/forum/components/PostStreamScrubber', 'view', function (original) {
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
