import { override } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import type PostType from 'flarum/forum/components/PostType';

import ThreadmarkBlock from '../components/ThreadmarkBlock';
import { postThreadmarks } from '../utils/discussionThreadmarks';

export default function addThreadmarkPostBlock() {
  override<PostType, 'view'>('flarum/forum/components/PostType', 'view', function (original) {
    const content = original();
    const threadmarks = postThreadmarks(this.attrs.post);

    if (!threadmarks.length || app.current.get('threadmarksOnly')) {
      return content;
    }

    return [...threadmarks.map((mark) => <ThreadmarkBlock threadmark={mark} />), content];
  });
}
