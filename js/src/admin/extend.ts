import app from 'flarum/admin/app';

import registerCommon from '../common/extend';
import ThreadmarkTypesPage from './components/ThreadmarkTypesPage';

export default function registerAdmin() {
  registerCommon(app);
  app.extensionData.for('ffans-threadmarks').registerPage(ThreadmarkTypesPage);
}
