import Model from 'flarum/common/Model';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';

import ThreadmarkType from '../../common/models/ThreadmarkType';

export default class Threadmark extends Model {
  discussion = Model.hasOne<Discussion>('discussion');
  post = Model.hasOne<Post>('post').call(this);

  originalPostId = Model.attribute<number>('originalPostId');
  originalPostNumber = Model.attribute<number>('originalPostNumber');

  type = Model.hasOne<ThreadmarkType>('type') as () => ThreadmarkType;

  note = Model.attribute<string | null>('note');

  isPostDeleted = Model.attribute<boolean>('isPostDeleted');
  navigationIndex = Model.attribute<number | null>('navigationIndex');

  isPersonal(): boolean {
    return this.data.type === 'personal-threadmarks';
  }

  key(): string {
    return `${this.data.type}-${this.id()}`;
  }

  canEdit(): boolean {
    const discussion = this.discussion();

    return this.isPersonal() ? !!this.attribute('canManage') : !!discussion && discussion.canManageThreadmarks();
  }
}
