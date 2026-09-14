import type Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Threadmark from '../models/Threadmark';
export interface ThreadmarkLabelAttrs extends ComponentAttrs {
    threadmark: Threadmark;
}
export default class ThreadmarkLabel extends Component<ThreadmarkLabelAttrs> {
    view(vnode: Mithril.Vnode<ThreadmarkLabelAttrs, this>): Mithril.Children;
}
