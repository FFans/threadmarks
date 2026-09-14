import Discussion from 'flarum/common/models/Discussion';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber';
import Threadmark from '../models/Threadmark';
export declare function getThreadmarkNavigationIndex(discussion: Discussion, threadmark: Threadmark): number | null;
export declare function navigateToThreadmark(this: Pick<PostStreamScrubber, 'stream' | 'updateScrubberValues'>, discussion: Discussion, threadmark: Threadmark): Promise<any>;
