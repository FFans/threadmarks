import Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Discussion from 'flarum/common/models/Discussion';
import Threadmark from '../models/Threadmark';
export interface ThreadmarkScrubberMarkersAttrs extends ComponentAttrs {
    discussion: Discussion;
    onNavigate: (threadmark: Threadmark) => void;
}
export default class ThreadmarkScrubberMarkers extends Component<ThreadmarkScrubberMarkersAttrs> {
    private height;
    private resizeObserver?;
    oncreate(vnode: Mithril.VnodeDOM<ThreadmarkScrubberMarkersAttrs, this>): void;
    onremove(vnode: Mithril.VnodeDOM<ThreadmarkScrubberMarkersAttrs, this>): void;
    view(): JSX.Element;
    private viewMarkersCollapse;
    private updateHeight;
    /**
     * 聚合点
     * 0px, 10px, 20px -> [0, 10], [20]
     */
    private groupMarkers;
}
