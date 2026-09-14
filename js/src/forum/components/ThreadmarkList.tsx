import Mithril from 'mithril';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import Discussion from 'flarum/common/models/Discussion';
import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/forum/app';

import Threadmark from '../models/Threadmark';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import threadmarkTypeLabel from '../utils/threadmarkTypeLabel';
import ManageThreadmarkModal from './ManageThreadmarkModal';

export type ThreadmarkScope = 'all' | 'discussion' | 'personal';

export interface ThreadmarkListAttrs extends ComponentAttrs {
  discussion: Discussion;
  onNavigate: (threadmark: Threadmark) => void;
  scope?: ThreadmarkScope;
}

export default class ThreadmarkList extends Component<ThreadmarkListAttrs> {
  view(vnode: Mithril.Vnode<ThreadmarkListAttrs, this>): Mithril.Children {
    const threadmarks = this.threadmarks();

    if (!threadmarks.length) return;

    return (
      <div class="ThreadmarkList">
        <ul class="ThreadmarkList-items">
          {threadmarks.map((threadmark) => {
            const type = threadmark.type();
            const number = threadmark.originalPostNumber();
            const note = threadmark.note();

            return (
              <li class="ThreadmarkList-item" key={threadmark.key()}>
                <button type="button" className="ThreadmarkList-button" onclick={() => this.goToThreadmark(threadmark)}>
                  <span className="ThreadmarkList-number">#{number}</span>

                  <span className="ThreadmarkList-type" style={{ color: type.color() }}>
                    {type.icon() && icon(type.icon())}
                  </span>

                  {note ? (
                    <span className="ThreadmarkList-note">{note}</span>
                  ) : (
                    <span className="ThreadmarkList-label">{threadmarkTypeLabel(type)}</span>
                  )}
                  {threadmark.isPersonal() && (
                    <span className="ThreadmarkMineBadge">{app.translator.trans('ffans-threadmarks.forum.threadmark.mine_badge')}</span>
                  )}
                </button>

                {threadmark.canEdit() && (
                  <button
                    type="button"
                    className="Button Button--icon Button--link ThreadmarkList-edit"
                    title={
                      threadmark.isPersonal()
                        ? extractText(app.translator.trans('ffans-threadmarks.forum.threadmark.edit_personal_tooltip'))
                        : extractText(app.translator.trans('ffans-threadmarks.forum.threadmark.edit_discussion_tooltip'))
                    }
                    aria-label={
                      threadmark.isPersonal()
                        ? extractText(app.translator.trans('ffans-threadmarks.forum.threadmark.edit_personal_a11y_label', { number }))
                        : extractText(app.translator.trans('ffans-threadmarks.forum.threadmark.edit_discussion_a11y_label', { number }))
                    }
                    onclick={(event: MouseEvent) => {
                      event.stopPropagation();
                      app.modal.show(ManageThreadmarkModal, { discussion: this.attrs.discussion, threadmark });
                    }}
                  >
                    {icon('icon fas fa-pencil-alt')}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  threadmarks(): Threadmark[] {
    const scope = this.attrs.scope ?? 'all';
    return discussionThreadmarks(this.attrs.discussion).filter(
      (mark) => scope === 'all' || scope === (mark.isPersonal() ? 'personal' : 'discussion')
    );
  }

  goToThreadmark(threadmark: Threadmark) {
    this.attrs.onNavigate(threadmark);
  }
}
