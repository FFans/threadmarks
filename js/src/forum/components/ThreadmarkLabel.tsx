import type Mithril from 'mithril';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/forum/app';

import Threadmark from '../models/Threadmark';
import threadmarkTypeLabel from '../utils/threadmarkTypeLabel';

export interface ThreadmarkLabelAttrs extends ComponentAttrs {
  threadmark: Threadmark;
}

export default class ThreadmarkLabel extends Component<ThreadmarkLabelAttrs> {
  view(vnode: Mithril.Vnode<ThreadmarkLabelAttrs, this>): Mithril.Children {
    const threadmark = this.attrs.threadmark;
    const type = threadmark.type();

    return (
      <span
        className="ThreadmarkLabel"
        style={{
          '--threadmark-color': type.color(),
        }}
      >
        {type.icon() && <i className={`icon ${type.icon()}`} aria-hidden="true"></i>}

        <span className="ThreadmarkLabel-type">{threadmarkTypeLabel(type)}</span>

        {threadmark.note() && <span className="ThreadmarkLabel-note">{threadmark.note()}</span>}
        {threadmark.isPersonal() && (
          <span className="ThreadmarkMineBadge" title={extractText(app.translator.trans('ffans-threadmarks.forum.threadmark.personal_tooltip'))}>
            {app.translator.trans('ffans-threadmarks.forum.threadmark.mine_badge')}
          </span>
        )}
      </span>
    );
  }
}
