import type Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Threadmark from '../models/Threadmark';
export interface ThreadmarkTombstoneAttrs extends ComponentAttrs {
    threadmark: Threadmark;
}
export default class ThreadmarkTombstone extends Component<ThreadmarkTombstoneAttrs> {
    view(vnode: Mithril.Vnode<ThreadmarkTombstoneAttrs, this>): Mithril.Children;
}
