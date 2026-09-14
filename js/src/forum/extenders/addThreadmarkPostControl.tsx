import Button from 'flarum/common/components/Button';
import { extend } from 'flarum/common/extend';
import Post from 'flarum/common/models/Post';
import ItemList from 'flarum/common/utils/ItemList';
import app from 'flarum/forum/app';
import PostControls from 'flarum/forum/utils/PostControls';

import ManageThreadmarkModal from '../components/ManageThreadmarkModal';

export default function addThreadmarkPostControl() {
  extend(PostControls, 'moderationControls', function (items: ItemList<any>, post: Post) {
    const discussion = post.discussion();
    if (!discussion || post.number() === 1 || post.contentType() !== 'comment' || post.isHidden()) return;
    if (!discussion.canManagePersonalThreadmarks() && !discussion.canManageThreadmarks()) return;

    items.add(
      'threadmark',
      <Button icon="fas fa-bookmark" onclick={() => app.modal.show(ManageThreadmarkModal, { discussion, post })}>
        {app.translator.trans('ffans-threadmarks.forum.post_controls.manage_button')}
      </Button>
    );
  });
}
