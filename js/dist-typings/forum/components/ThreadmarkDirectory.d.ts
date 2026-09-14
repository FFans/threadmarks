import Mithril from 'mithril';
import Component from 'flarum/common/Component';
import { ThreadmarkListAttrs } from './ThreadmarkList';
export default class ThreadmarkDirectory extends Component<ThreadmarkListAttrs> {
    private isOpened;
    private phone;
    private closeWatcher?;
    private scope;
    private openRequested;
    private host?;
    private panel?;
    private position?;
    private drag?;
    private resize;
    oninit(vnode: Mithril.Vnode<ThreadmarkListAttrs, this>): void;
    oncreate(vnode: Mithril.VnodeDOM<ThreadmarkListAttrs, this>): void;
    onremove(vnode: Mithril.VnodeDOM<ThreadmarkListAttrs, this>): void;
    view(): JSX.Element;
    private open;
    private close;
    private clamp;
    private save;
    private window;
    private directoryContent;
}
