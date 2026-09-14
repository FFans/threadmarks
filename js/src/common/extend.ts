import Application from 'flarum/common/Application';

import ThreadmarkType from './models/ThreadmarkType';

export default function registerCommon(app: Pick<Application, 'store'>) {
  app.store.models['threadmark-types'] = ThreadmarkType;
}
