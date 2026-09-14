import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type Threadmark from '../models/Threadmark';
export declare function discussionThreadmarks(discussion: Discussion): Threadmark[];
export declare function postThreadmarks(post: Post): Threadmark[];
