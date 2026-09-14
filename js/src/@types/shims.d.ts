import Threadmark from '../forum/models/Threadmark';
import type ThreadmarkTypeListState from '../forum/states/ThreadmarkTypeListState';

declare module 'flarum/common/Application' {
  export default interface Application {
    threadmarkTypeList: ThreadmarkTypeListState;
  }
}

declare module 'flarum/common/models/Discussion' {
  export default interface Discussion {
    threadmarks: () => false | (Threadmark | undefined)[];
    personalThreadmarks: () => false | (Threadmark | undefined)[];
    canManageThreadmarks: () => boolean;
    canManagePersonalThreadmarks: () => boolean;
  }
}

declare module 'flarum/common/models/Post' {
  export default interface Post {
    threadmark: () => false | Threadmark;
    personalThreadmark: () => false | Threadmark;
  }
}
