import type Mithril from 'mithril';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import app from 'flarum/forum/app';

import Threadmark from '../models/Threadmark';
import ThreadmarkBlock from './ThreadmarkBlock';

export interface ThreadmarkTombstoneAttrs extends ComponentAttrs {
  threadmark: Threadmark;
}

export default class ThreadmarkTombstone extends Component<ThreadmarkTombstoneAttrs> {
  view(vnode: Mithril.Vnode<ThreadmarkTombstoneAttrs, this>): Mithril.Children {
    const threadmark = this.attrs.threadmark;

    return (
      <div class="PostStream-item ThreadmarkTombstone" data-threadmark-id={threadmark.key()} data-threadmark-number={threadmark.originalPostNumber()}>
        <ThreadmarkBlock threadmark={threadmark}></ThreadmarkBlock>

        <div class="ThreadmarkTombstone-content Post-body">{app.translator.trans('ffans-threadmarks.forum.threadmark.deleted_text')}</div>
      </div>
    );
  }
}
