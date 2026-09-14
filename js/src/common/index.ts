import app from 'flarum/common/app';

app.initializers.add('ffans-threadmarks-common', () => {
  console.log('[ffans/threadmarks] Hello, forum and admin!');
});
