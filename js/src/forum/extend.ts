import Model from 'flarum/common/Model';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import app from 'flarum/forum/app';

import registerCommon from '../common/extend';
import Threadmark from './models/Threadmark';

export default function registerForum(target = app) {
  registerCommon(target);
  target.store.models.threadmarks = Threadmark;
  target.store.models['personal-threadmarks'] = Threadmark;
  Discussion.prototype.threadmarks = Model.hasMany<Threadmark>('threadmarks');
  Discussion.prototype.personalThreadmarks = Model.hasMany<Threadmark>('personalThreadmarks');
  Discussion.prototype.canManageThreadmarks = Model.attribute<boolean>('canManageThreadmarks');
  Discussion.prototype.canManagePersonalThreadmarks = Model.attribute<boolean>('canManagePersonalThreadmarks');
  Post.prototype.threadmark = Model.hasOne<Threadmark>('threadmark');
  Post.prototype.personalThreadmark = Model.hasOne<Threadmark>('personalThreadmark');
}
