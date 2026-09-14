import Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ThreadmarkStreamState from '../states/ThreadmarkStreamState';
export interface ThreadmarkOnlyStreamAttrs extends ComponentAttrs {
    stream: ThreadmarkStreamState;
}
export default class ThreadmarkOnlyStream extends Component<ThreadmarkOnlyStreamAttrs> {
    private loading;
    private scrollListener;
    oninit(vnode: Mithril.Vnode<ThreadmarkOnlyStreamAttrs, this>): void;
    view(): JSX.Element;
    oncreate(vnode: Mithril.VnodeDOM<ThreadmarkOnlyStreamAttrs, this>): void;
    onupdate(vnode: Mithril.VnodeDOM<ThreadmarkOnlyStreamAttrs, this>): void;
    onremove(vnode: Mithril.VnodeDOM<ThreadmarkOnlyStreamAttrs, this>): void;
    private viewThreadmark;
    private loadPosts;
    private triggerScroll;
    private scrollToIndex;
    private onscroll;
    private updatePosition;
    private getMarginTop;
}
