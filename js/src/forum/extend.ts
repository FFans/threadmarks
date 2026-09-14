import Extend from 'flarum/common/extenders';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';

import commonExtend from '../common/extend';
import Threadmark from './models/Threadmark';

export default [
  ...commonExtend,

  new Extend.Store().add('threadmarks', Threadmark),
  new Extend.Store().add('personal-threadmarks', Threadmark),

  new Extend.Model(Discussion)
    .hasMany<Threadmark>('threadmarks')
    .hasMany<Threadmark>('personalThreadmarks')
    .attribute<boolean>('canManageThreadmarks')
    .attribute<boolean>('canManagePersonalThreadmarks'),
  new Extend.Model(Post).hasOne<Threadmark>('threadmark').hasOne<Threadmark>('personalThreadmark'),
];
