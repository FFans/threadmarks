import Model from 'flarum/common/Model';

export default class ThreadmarkType extends Model {
  key = Model.attribute<string>('key');

  name = Model.attribute<string>('name');
  color = Model.attribute<string>('color');
  icon = Model.attribute<string>('icon');

  position = Model.attribute<number>('position');
  isBuiltin = Model.attribute<boolean>('isBuiltin');
  isEnabled = Model.attribute<boolean>('isEnabled');
  canDelete = Model.attribute<boolean>('canDelete');

  createdAt = Model.attribute('createdAt', Model.transformDate);
  updatedAt = Model.attribute('updatedAt', Model.transformDate);
}
