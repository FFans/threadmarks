import { override } from 'flarum/common/extend';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import app from 'flarum/forum/app';

import { discussionThreadmarks } from '../utils/discussionThreadmarks';

export default function syncThreadmarkAfterPostDelete() {
  override(Post.prototype, 'delete', function (original, body, options) {
    const discussion = this.discussion();
    const threadmarks = discussion && discussionThreadmarks(discussion);

    // 当前 Discussion 没有 Threadmark，就没必要额外请求。
    if (!threadmarks || !threadmarks.length) {
      return original(body, options);
    }

    // 如果这是最后一条 Post，Discussion 本身也可能随之消失，Threadmark 会跟着 Discussion 一并清理，不需要刷新。
    const shouldRefresh = discussion.postIds().length > 1;

    return original(body, options).then(() => {
      if (!shouldRefresh || !discussion.id()) {
        return;
      }

      return app.store
        .find<Discussion>('discussions', discussion.id()!, {
          include: 'threadmarks,threadmarks.type,personalThreadmarks,personalThreadmarks.type',
        })
        .then(() => undefined)
        .catch(() => {
          // Post 删除本身已经成功。如果 Discussion 同时被删除或刷新失败，不应该把成功的 DELETE 重新变成一个前端错误。
        });
    });
  });
}
