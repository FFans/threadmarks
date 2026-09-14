import Extend from 'flarum/common/extenders';

import ThreadmarkType from './models/ThreadmarkType';

// oxfmt-ignore
export default [
  new Extend.Store().add('threadmark-types', ThreadmarkType),
];
