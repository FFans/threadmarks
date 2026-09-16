import app from 'flarum/admin/app';

export { default as extend } from './extend';

app.initializers.add('ffans-threadmarks', () => {
  app.registry
    .for('ffans-threadmarks')
    .registerPermission(
      {
        icon: 'fa-solid fa-book-bookmark',
        label: app.translator.trans('ffans-threadmarks.admin.permissions.manage_personal_label'),
        permission: 'discussion.ffans-threadmarks.managePersonalThreadmarks',
      },
      'reply',
      50
    )
    .registerPermission(
      {
        icon: 'fa-solid fa-book-bookmark',
        label: app.translator.trans('ffans-threadmarks.admin.permissions.manage_own_discussion_label'),
        permission: 'discussion.ffans-threadmarks.manageOwnDiscussionThreadmarks',
      },
      'reply',
      50
    )
    .registerPermission(
      {
        icon: 'fa-solid fa-book-bookmark',
        label: app.translator.trans('ffans-threadmarks.admin.permissions.manage_discussion_label'),
        permission: 'discussion.ffans-threadmarks.manageDiscussionThreadmarks',
      },
      'moderate',
      50
    );
});
