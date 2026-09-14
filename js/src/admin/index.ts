import app from 'flarum/admin/app';

import register from './extend';

app.initializers.add('ffans-threadmarks', () => {
  register();
  app.extensionData
    .for('ffans-threadmarks')
    .registerPermission(
      {
        icon: 'fas fa-bookmark',
        label: app.translator.trans('ffans-threadmarks.admin.permissions.manage_personal_label'),
        permission: 'discussion.ffans-threadmarks.managePersonalThreadmarks',
      },
      'reply',
      50
    )
    .registerPermission(
      {
        icon: 'fas fa-bookmark',
        label: app.translator.trans('ffans-threadmarks.admin.permissions.manage_own_discussion_label'),
        permission: 'discussion.ffans-threadmarks.manageOwnDiscussionThreadmarks',
      },
      'reply',
      50
    )
    .registerPermission(
      {
        icon: 'fas fa-bookmark',
        label: app.translator.trans('ffans-threadmarks.admin.permissions.manage_discussion_label'),
        permission: 'discussion.ffans-threadmarks.manageDiscussionThreadmarks',
      },
      'moderate',
      50
    );
});
