import Extend from 'flarum/common/extenders';

import commonExtend from '../common/extend';
import ThreadmarkTypesPage from './components/ThreadmarkTypesPage';

// prettier-ignore
export default [
  ...commonExtend,

  new Extend.Admin().page(ThreadmarkTypesPage)
];
