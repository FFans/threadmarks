import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';

import type Threadmark from '../models/Threadmark';

export function discussionThreadmarks(discussion: Discussion): Threadmark[] {
  return [...(discussion.threadmarks() || []), ...(discussion.personalThreadmarks() || [])]
    .filter((mark): mark is Threadmark => !!mark)
    .sort(
      (a, b) => a.originalPostNumber() - b.originalPostNumber() || Number(a.isPersonal()) - Number(b.isPersonal()) || Number(a.id()) - Number(b.id())
    );
}

export function postThreadmarks(post: Post): Threadmark[] {
  const discussion = post.discussion();

  if (discussion) {
    return discussionThreadmarks(discussion).filter((mark) => mark.originalPostId() === Number(post.id()));
  }

  return [post.threadmark(), post.personalThreadmark()].filter((mark): mark is Threadmark => !!mark);
}
