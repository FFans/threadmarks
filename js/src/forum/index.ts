import app from 'flarum/forum/app';

import addThreadmarkList from './extenders/addThreadmarkList';
import addThreadmarkOnlyMode from './extenders/addThreadmarkOnlyMode';
import addThreadmarkPostBlock from './extenders/addThreadmarkPostBlock';
import addThreadmarkPostControl from './extenders/addThreadmarkPostControl';
import addThreadmarkPostFlash from './extenders/addThreadmarkPostFlash';
import addThreadmarkScrubberMarkers from './extenders/addThreadmarkScrubberMarkers';
import addThreadmarkTombstones from './extenders/addThreadmarkTombstones';
import syncThreadmarkAfterPostDelete from './extenders/syncThreadmarkAfterPostDelete';
import ThreadmarkTypeListState from './states/ThreadmarkTypeListState';

export { default as extend } from './extend';

app.initializers.add('ffans-threadmarks', () => {
  app.threadmarkTypeList = new ThreadmarkTypeListState();

  addThreadmarkPostControl();
  addThreadmarkPostBlock();
  addThreadmarkList();
  addThreadmarkScrubberMarkers();
  addThreadmarkPostFlash();
  addThreadmarkTombstones();
  syncThreadmarkAfterPostDelete();
  addThreadmarkOnlyMode();
});
