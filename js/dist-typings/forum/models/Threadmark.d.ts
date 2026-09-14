import Model from 'flarum/common/Model';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import ThreadmarkType from '../../common/models/ThreadmarkType';
export default class Threadmark extends Model {
    discussion: () => false | Discussion;
    post: () => false | Post;
    originalPostId: () => number;
    originalPostNumber: () => number;
    type: () => ThreadmarkType;
    note: () => string | null;
    isPostDeleted: () => boolean;
    navigationIndex: () => number | null;
    isPersonal(): boolean;
    key(): string;
    canEdit(): boolean;
}
