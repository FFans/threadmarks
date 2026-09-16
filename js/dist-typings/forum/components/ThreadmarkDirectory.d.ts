import Mithril from 'mithril';
import Component from 'flarum/common/Component';
import { ThreadmarkListAttrs } from './ThreadmarkList';
interface ThreadmarkDirectoryAttrs extends ThreadmarkListAttrs {
    onlyModeControl?: Mithril.Children;
}
export default class ThreadmarkDirectory extends Component<ThreadmarkDirectoryAttrs> {
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
    oninit(vnode: Mithril.Vnode<ThreadmarkDirectoryAttrs, this>): void;
    oncreate(vnode: Mithril.VnodeDOM<ThreadmarkDirectoryAttrs, this>): void;
    onremove(vnode: Mithril.VnodeDOM<ThreadmarkDirectoryAttrs, this>): void;
    view(): JSX.Element;
    private open;
    private close;
    private clamp;
    private save;
    private window;
    private directoryContent;
}
export {};
