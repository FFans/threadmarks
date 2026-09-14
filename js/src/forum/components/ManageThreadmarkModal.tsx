import type Mithril from 'mithril';

import Button from 'flarum/common/components/Button';
import Form from 'flarum/common/components/Form';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Icon from 'flarum/common/components/Icon';
import Select from 'flarum/common/components/Select';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';
import app from 'flarum/forum/app';

import ThreadmarkType from '../../common/models/ThreadmarkType';
import Threadmark from '../models/Threadmark';
import threadmarkTypeLabel from '../utils/threadmarkTypeLabel';

type Scope = 'personal' | 'discussion';

export interface ManageThreadmarkModalAttrs extends IFormModalAttrs {
  discussion: Discussion;
  post?: Post;
  threadmark?: Threadmark;
}

export default class ManageThreadmarkModal extends FormModal<ManageThreadmarkModalAttrs> {
  activeScope: Scope = 'discussion';
  post?: Post;
  drafts = {
    personal: { typeId: Stream(''), note: Stream('') },
    discussion: { typeId: Stream(''), note: Stream('') },
  };

  oninit(vnode: Mithril.Vnode<ManageThreadmarkModalAttrs, this>) {
    super.oninit(vnode);
    this.post = this.attrs.post || app.store.getById<Post>('posts', String(this.attrs.threadmark?.originalPostId()));
    this.activeScope = this.attrs.threadmark?.isPersonal() ? 'personal' : 'discussion';
    this.resetDraft('personal');
    this.resetDraft('discussion');
    this.loading = !app.threadmarkTypeList.loaded;

    if (!this.loading) {
      this.finishLoading();
      return;
    }

    app.threadmarkTypeList
      .load()
      .catch(() => {})
      .finally(() => {
        this.finishLoading();
        m.redraw();
      });
  }

  private finishLoading() {
    for (const scope of ['personal', 'discussion'] as const) {
      if (!this.drafts[scope].typeId()) this.drafts[scope].typeId(this.types(scope)[0]?.id() || '');
    }
    if (!this.scopes().includes(this.activeScope)) this.activeScope = this.scopes()[0] || 'personal';
    this.loading = false;
  }

  className(): string {
    return 'ManageThreadmarkModal';
  }

  title(): string {
    return extractText(
      app.translator.trans('ffans-threadmarks.forum.manage_modal.title', {
        number: this.post?.number() ?? this.attrs.threadmark?.originalPostNumber(),
      })
    );
  }

  mark(scope = this.activeScope): Threadmark | undefined {
    const id = this.attrs.post ? Number(this.attrs.post.id()) : this.attrs.threadmark?.originalPostId();
    const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
    return (this.attrs.discussion[relationship]() || []).find((mark) => mark && mark.originalPostId() === id);
  }

  scopes(): Scope[] {
    const discussion = this.attrs.discussion;
    const canCreate =
      !this.attrs.threadmark?.isPostDeleted() &&
      (this.post
        ? this.post.contentType() === 'comment' && this.post.number() > 1 && !this.post.isHidden()
        : !!this.attrs.threadmark && this.attrs.threadmark.originalPostNumber() > 1);
    return (['discussion', 'personal'] as const).filter((scope) => {
      const mark = this.mark(scope);
      if (mark) return mark.canEdit();
      return !!canCreate && (scope === 'personal' ? discussion.canManagePersonalThreadmarks() : discussion.canManageThreadmarks());
    });
  }

  selectScope(scope: Scope) {
    if (this.loading || !this.scopes().includes(scope)) return;
    this.activeScope = scope;
    this.alertAttrs = null;
  }

  types(scope = this.activeScope): ThreadmarkType[] {
    const currentTypeId = this.mark(scope)?.type()?.id();
    return app.threadmarkTypeList
      .all()
      .filter((type) => type.isEnabled() || type.id() === currentTypeId)
      .sort((a, b) => a.position() - b.position());
  }

  resetDraft(scope: Scope) {
    const mark = this.mark(scope);
    this.drafts[scope].typeId(mark?.type()?.id() || this.types(scope)[0]?.id() || '');
    this.drafts[scope].note(mark?.note() || '');
  }

  content(): Mithril.Children {
    const scopes = this.scopes();
    const draft = this.drafts[this.activeScope];
    const mark = this.mark();
    const types = this.types();
    const selectedType = types.find((type) => type.id() === draft.typeId());
    const hasSelectedType = !!selectedType;
    return (
      <div className="Modal-body">
        <div
          className="ManageThreadmarkModal-tabs"
          role="tablist"
          aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.manage_modal.scope_a11y_label'))}
        >
          {scopes.map((scope) => (
            <Button
              key={scope}
              id={`threadmark-tab-${scope}`}
              type="button"
              role="tab"
              className={`Button ManageThreadmarkModal-tab ${scope === this.activeScope ? 'Button--primary' : 'Button--link'}`}
              icon={this.mark(scope) ? 'fas fa-check' : undefined}
              active={scope === this.activeScope}
              aria-selected={scope === this.activeScope}
              aria-controls="threadmark-panel"
              disabled={this.loading}
              onclick={() => this.selectScope(scope)}
            >
              {scope === 'personal'
                ? app.translator.trans('ffans-threadmarks.forum.manage_modal.personal_tab')
                : app.translator.trans('ffans-threadmarks.forum.manage_modal.discussion_tab')}
            </Button>
          ))}
        </div>
        <div id="threadmark-panel" role="tabpanel" aria-labelledby={`threadmark-tab-${this.activeScope}`}>
          {!scopes.includes(this.activeScope) ? (
            <p className="helpText">
              {this.loading
                ? app.translator.trans('ffans-threadmarks.forum.manage_modal.loading_text')
                : app.translator.trans('ffans-threadmarks.forum.manage_modal.unavailable_text')}
            </p>
          ) : (
            <Form>
              <div className="Form-group">
                <label for="threadmark-type">{app.translator.trans('ffans-threadmarks.forum.manage_modal.type_label')}</label>
                <div className="ManageThreadmarkModal-typeSelect">
                  {selectedType && (
                    <span className="ManageThreadmarkModal-typePreview" aria-hidden="true" style={{ color: selectedType.color() }}>
                      <Icon name={selectedType.icon() || 'fas fa-bookmark'} />
                    </span>
                  )}
                  <Select
                    id="threadmark-type"
                    value={hasSelectedType ? draft.typeId() : ''}
                    onchange={draft.typeId}
                    options={{
                      ...(!hasSelectedType ? { '': extractText(app.translator.trans('ffans-threadmarks.forum.manage_modal.type_placeholder')) } : {}),
                      ...Object.fromEntries(types.map((type) => [type.id(), threadmarkTypeLabel(type)])),
                    }}
                    disabled={this.loading || !types.length}
                  />
                </div>
              </div>
              <div className="Form-group">
                <label for="threadmark-note">{app.translator.trans('ffans-threadmarks.forum.manage_modal.note_label')}</label>
                <textarea
                  id="threadmark-note"
                  name="note"
                  className="FormControl"
                  bidi={draft.note}
                  placeholder={extractText(app.translator.trans('ffans-threadmarks.forum.manage_modal.note_placeholder'))}
                  maxlength={100}
                  disabled={this.loading}
                />
              </div>
              <div className="Form-group Form-controls">
                <Button type="submit" className="Button Button--primary" loading={this.loading} disabled={this.loading || !hasSelectedType}>
                  {mark
                    ? app.translator.trans('ffans-threadmarks.forum.manage_modal.save_button')
                    : app.translator.trans('ffans-threadmarks.forum.manage_modal.add_button')}
                </Button>
                {mark && (
                  <Button
                    type="button"
                    icon="fas fa-trash-alt"
                    className="Button Button--danger"
                    disabled={this.loading}
                    onclick={() => this.deleteThreadmark()}
                  >
                    {app.translator.trans('ffans-threadmarks.forum.manage_modal.delete_button')}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </div>
      </div>
    );
  }

  async onsubmit(event: SubmitEvent) {
    event.preventDefault();
    const scope = this.activeScope;
    if (this.loading || !this.scopes().includes(scope)) return;
    const draft = this.drafts[scope];
    const type = app.store.getById<ThreadmarkType>('threadmark-types', draft.typeId());
    const existing = this.mark(scope);
    if (!type || (!type.isEnabled() && type.id() !== existing?.type()?.id())) return;
    const postId = this.post?.id() || this.attrs.threadmark?.originalPostId();
    if (!existing && !postId) return;
    const mark = existing || app.store.createRecord<Threadmark>(scope === 'personal' ? 'personal-threadmarks' : 'threadmarks');
    this.loading = true;
    try {
      const saved = await mark.save({
        note: draft.note().trim() || null,
        relationships: existing
          ? { type }
          : {
              type,
              // just for relationship
              post: this.post || new Post({ type: 'posts', id: String(postId) }),
            },
      });
      if (!existing) {
        const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
        this.attrs.discussion.pushData({
          relationships: { [relationship]: [...(this.attrs.discussion[relationship]() || []).filter((item): item is Threadmark => !!item), saved] },
        });
      }
      this.post?.pushData({});
      this.hide();
    } catch {
      // Flarum displays request errors in the active modal.
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  async deleteThreadmark() {
    const scope = this.activeScope;
    const mark = this.mark(scope);
    if (this.loading || !mark || !this.scopes().includes(scope)) return;
    if (
      !confirm(
        scope === 'personal'
          ? extractText(app.translator.trans('ffans-threadmarks.forum.manage_modal.delete_personal_confirmation'))
          : extractText(app.translator.trans('ffans-threadmarks.forum.manage_modal.delete_discussion_confirmation'))
      )
    )
      return;
    this.loading = true;
    try {
      await mark.delete();
      const relationship = scope === 'personal' ? 'personalThreadmarks' : 'threadmarks';
      this.attrs.discussion.pushData({
        relationships: {
          [relationship]: (this.attrs.discussion[relationship]() || []).filter((item): item is Threadmark => !!item && item.id() !== mark.id()),
        },
      });
      this.post?.pushData({});
      this.resetDraft(scope);
      if (!this.scopes().includes(scope)) this.activeScope = this.scopes()[0] || scope;
    } catch {
      // Flarum displays request errors in the active modal.
    } finally {
      this.loading = false;
      m.redraw();
    }
  }
}
