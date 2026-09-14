import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';

import ThreadmarkLabel from '../components/ThreadmarkLabel';

export default function addThreadmarkPostLabel() {
  extend(CommentPost.prototype, 'headerItems', function (items) {
    const threadmark = this.attrs.post.threadmark();

    if (!threadmark) return;

    items.add('threadmark', <ThreadmarkLabel threadmark={threadmark}></ThreadmarkLabel>);
  });
}
