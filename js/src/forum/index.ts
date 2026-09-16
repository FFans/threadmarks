import app from 'flarum/forum/app';

import register from './extend';
import addThreadmarkOnlyMode from './extenders/addThreadmarkOnlyMode';
import addThreadmarkPostBlock from './extenders/addThreadmarkPostBlock';
import addThreadmarkPostControl from './extenders/addThreadmarkPostControl';
import addThreadmarkPostFlash from './extenders/addThreadmarkPostFlash';
import addThreadmarkScrubberMarkers from './extenders/addThreadmarkScrubberMarkers';
import addThreadmarkTombstones from './extenders/addThreadmarkTombstones';
import syncThreadmarkAfterPostDelete from './extenders/syncThreadmarkAfterPostDelete';
import ThreadmarkTypeListState from './states/ThreadmarkTypeListState';

app.initializers.add('ffans-threadmarks', () => {
  register();
  app.threadmarkTypeList = new ThreadmarkTypeListState();

  addThreadmarkPostControl();
  addThreadmarkPostBlock();
  addThreadmarkScrubberMarkers();
  addThreadmarkPostFlash();
  addThreadmarkTombstones();
  syncThreadmarkAfterPostDelete();
  addThreadmarkOnlyMode();
});
