import Mithril from 'mithril';

import { extend } from 'flarum/common/extend';
import ItemList from 'flarum/common/utils/ItemList';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

import ThreadmarkDirectory from '../components/ThreadmarkDirectory';
import Threadmark from '../models/Threadmark';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import { navigateToThreadmark } from '../utils/threadmarkNavigation';

export default function addThreadmarkList() {
  extend(DiscussionPage.prototype, 'sidebarItems', function (this: DiscussionPage, items: ItemList<Mithril.Children>) {
    const discussion = this.discussion;

    const threadmarks = discussion && discussionThreadmarks(discussion);

    if (!discussion || !threadmarks || !threadmarks.length || !this.stream) return;

    items.add(
      'threadmarks',
      <ThreadmarkDirectory
        discussion={discussion}
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
      -10
    );
  });
}
