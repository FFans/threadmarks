import Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Discussion from 'flarum/common/models/Discussion';
import Threadmark from '../models/Threadmark';
export type ThreadmarkScope = 'all' | 'discussion' | 'personal';
export interface ThreadmarkListAttrs extends ComponentAttrs {
    discussion: Discussion;
    onNavigate: (threadmark: Threadmark) => void;
    scope?: ThreadmarkScope;
}
export default class ThreadmarkList extends Component<ThreadmarkListAttrs> {
    view(vnode: Mithril.Vnode<ThreadmarkListAttrs, this>): Mithril.Children;
    threadmarks(): Threadmark[];
    goToThreadmark(threadmark: Threadmark): void;
}
