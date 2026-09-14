import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber';

import ThreadmarkScrubberMarkers from '../components/ThreadmarkScrubberMarkers';
import { navigateToThreadmark } from '../utils/threadmarkNavigation';
import { findVnodeByClass } from '../utils/vnode';

export default function addThreadmarkScrubberMarkers() {
  extend(PostStreamScrubber.prototype, 'view', function (view) {
    if (app.current.get('threadmarksOnly')) return;

    const discussion = this.stream.discussion;

    // scrollbar markers
    const scrollbar = findVnodeByClass(view, 'Scrubber-scrollbar');

    if (scrollbar && Array.isArray(scrollbar.children)) {
      scrollbar.children.push(<ThreadmarkScrubberMarkers discussion={discussion} onNavigate={navigateToThreadmark.bind(this, discussion)} />);
    }
  });
}
