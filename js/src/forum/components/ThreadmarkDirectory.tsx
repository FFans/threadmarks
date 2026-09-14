import Mithril from 'mithril';

import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/forum/app';

import { discussionThreadmarks } from '../utils/discussionThreadmarks';
import { DIRECTORY_OPEN_EVENT } from '../utils/threadmarkDirectory';
import ThreadmarkList, { ThreadmarkListAttrs, ThreadmarkScope } from './ThreadmarkList';

const POSITION_KEY = 'ffans-threadmarks.directory-position';

export default class ThreadmarkDirectory extends Component<ThreadmarkListAttrs> {
  private isOpened = false;
  private phone = false;
  private closeWatcher?: CloseWatcher;
  private scope: ThreadmarkScope = 'all';
  private openRequested = (event: Event) => {
    if ((event as CustomEvent<string>).detail !== this.attrs.discussion.id()) return;
    if (!this.isOpened) this.open();
    else (this.panel || this.element)?.querySelector<HTMLButtonElement>('.ThreadmarkDirectory-close')?.focus();
    m.redraw();
  };
  private host?: HTMLElement;
  private panel?: HTMLElement;
  private position?: { x: number; y: number };
  private drag?: { id: number; x: number; y: number; left: number; top: number };
  private resize = () => {
    const phone = app.screen() === 'phone';
    if (phone !== this.phone) {
      this.close();
      this.phone = phone;
    }
    if (this.isOpened) this.clamp();
    m.redraw();
  };

  oninit(vnode: Mithril.Vnode<ThreadmarkListAttrs, this>) {
    super.oninit(vnode);
    this.phone = app.screen() === 'phone';
  }

  oncreate(vnode: Mithril.VnodeDOM<ThreadmarkListAttrs, this>) {
    super.oncreate(vnode);
    this.$().on('shown.bs.dropdown.threadmarks', () => {
      this.isOpened = true;
      if ('CloseWatcher' in window) {
        this.closeWatcher?.destroy();
        this.closeWatcher = new CloseWatcher();
        this.closeWatcher.onclose = () => this.close();
      }
      m.redraw();
    });
    this.$().on('hidden.bs.dropdown.threadmarks', () => {
      this.isOpened = false;
      this.closeWatcher?.destroy();
      this.closeWatcher = undefined;
      m.redraw();
    });
    this.host = document.createElement('div');
    document.body.appendChild(this.host);
    m.mount(this.host, { view: () => this.window() });
    window.addEventListener('resize', this.resize);
    window.addEventListener(DIRECTORY_OPEN_EVENT, this.openRequested);
  }

  onremove(vnode: Mithril.VnodeDOM<ThreadmarkListAttrs, this>) {
    this.close();
    this.$().off('.threadmarks');
    this.closeWatcher?.destroy();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener(DIRECTORY_OPEN_EVENT, this.openRequested);
    if (this.host) {
      m.mount(this.host, null);
      this.host.remove();
    }
    super.onremove(vnode);
  }

  view() {
    return (
      <div className={this.phone ? 'Dropdown ThreadmarkDirectory-mobile' : 'ThreadmarkDirectory-control'}>
        <button
          type="button"
          className={`Button ThreadmarkDirectory-toggle ${this.phone ? 'Dropdown-toggle Button--icon' : 'Button--block App-secondaryControl'} ${this.isOpened ? 'active' : ''}`}
          data-toggle={this.phone ? 'dropdown' : undefined}
          aria-label={
            this.isOpened
              ? extractText(app.translator.trans('ffans-threadmarks.forum.directory.hide_button'))
              : extractText(app.translator.trans('ffans-threadmarks.forum.directory.show_button'))
          }
          aria-expanded={this.isOpened ? 'true' : 'false'}
          aria-pressed={this.isOpened ? 'true' : 'false'}
          onclick={
            this.phone
              ? undefined
              : (event: MouseEvent) => {
                  event.stopPropagation();
                  this.isOpened ? this.close() : this.open();
                }
          }
        >
          <Icon name="fas fa-list" className="Button-icon" />
          <span className="Button-label">
            {this.isOpened
              ? app.translator.trans('ffans-threadmarks.forum.directory.hide_button')
              : app.translator.trans('ffans-threadmarks.forum.directory.show_button')}
          </span>
        </button>
        {this.phone && (
          <div className="Dropdown-menu dropdown-menu ThreadmarkDirectory-mobileMenu">
            <header className="ThreadmarkDirectory-header">
              <strong className="ThreadmarkDirectory-mobileTitle">{app.translator.trans('ffans-threadmarks.forum.directory.title')}</strong>
              <button
                type="button"
                className="Button Button--icon Button--link ThreadmarkDirectory-close"
                aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.directory.close_a11y_label'))}
                onclick={() => this.close()}
              >
                <Icon name="fas fa-times" />
              </button>
            </header>
            {this.directoryContent()}
          </div>
        )}
      </div>
    );
  }

  private open() {
    if (this.phone) {
      this.element.querySelector<HTMLButtonElement>('.Dropdown-toggle')?.click();
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(POSITION_KEY) || 'null');
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) this.position = saved;
    } catch {
      /* Storage can be unavailable. */
    }
    if (!this.position) {
      const anchor = this.element.getBoundingClientRect();
      this.position = { x: anchor.left - 376, y: anchor.top };
    }
    this.isOpened = true;
    const dropdown = this.element.closest('.Dropdown.open');
    dropdown?.querySelector<HTMLButtonElement>('[data-toggle="dropdown"]')?.click();
  }

  private close() {
    if (this.phone && this.isOpened) {
      this.element.querySelector<HTMLButtonElement>('.Dropdown-toggle')?.click();
    }
    this.isOpened = false;
    this.drag = undefined;
    this.element.querySelector<HTMLButtonElement>('.ThreadmarkDirectory-toggle')?.focus();
  }

  private clamp() {
    if (!this.panel || !this.position || window.matchMedia('(max-width: 767px)').matches) return;
    this.position.x = Math.max(8, Math.min(this.position.x, document.documentElement.clientWidth - this.panel.offsetWidth - 8));
    this.position.y = Math.max(8, Math.min(this.position.y, document.documentElement.clientHeight - this.panel.offsetHeight - 8));
    this.panel.style.left = `${this.position.x}px`;
    this.panel.style.top = `${this.position.y}px`;
  }

  private save() {
    try {
      localStorage.setItem(POSITION_KEY, JSON.stringify(this.position));
    } catch {
      /* Optional preference. */
    }
  }

  private window() {
    if (!this.isOpened || this.phone) return null;
    return (
      <section
        className="ThreadmarkDirectory"
        role="dialog"
        aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.directory.title'))}
        style={{ left: `${this.position?.x ?? 8}px`, top: `${this.position?.y ?? 8}px` }}
        oncreate={(vnode: Mithril.VnodeDOM) => {
          this.panel = vnode.dom as HTMLElement;
          this.clamp();
          this.panel.querySelector<HTMLButtonElement>('.ThreadmarkDirectory-close')?.focus();
        }}
        onremove={() => {
          this.panel = undefined;
        }}
        onkeydown={(event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            this.close();
          }
        }}
      >
        <header className="ThreadmarkDirectory-header">
          <div
            className="ThreadmarkDirectory-drag"
            onpointerdown={(event: PointerEvent) => {
              if (event.button !== 0 || window.matchMedia('(max-width: 767px)').matches || !this.position) return;
              event.preventDefault();
              (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
              this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: this.position.x, top: this.position.y };
            }}
            onpointermove={(event: PointerEvent) => {
              if (!this.drag || this.drag.id !== event.pointerId) return;
              this.position = { x: this.drag.left + event.clientX - this.drag.x, y: this.drag.top + event.clientY - this.drag.y };
              this.clamp();
            }}
            onpointerup={() => {
              this.drag = undefined;
              this.save();
            }}
            onpointercancel={() => {
              this.drag = undefined;
            }}
          >
            <Icon name="fas fa-grip-vertical" />
            <strong>{app.translator.trans('ffans-threadmarks.forum.directory.title')}</strong>
          </div>
          <button
            type="button"
            className="Button Button--icon Button--link ThreadmarkDirectory-close"
            aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.directory.close_a11y_label'))}
            onclick={() => this.close()}
          >
            <Icon name="fas fa-times" />
          </button>
        </header>
        {this.directoryContent()}
      </section>
    );
  }

  private directoryContent() {
    const marks = discussionThreadmarks(this.attrs.discussion);
    const hasDiscussion = marks.some((mark) => !mark.isPersonal());
    const hasPersonal = marks.some((mark) => mark.isPersonal());
    const scopes = (['all', 'discussion', 'personal'] as const).filter((scope) =>
      scope === 'all' ? hasDiscussion && hasPersonal : scope === 'discussion' ? hasDiscussion : hasPersonal
    );
    if (!scopes.includes(this.scope)) this.scope = scopes[0] ?? 'all';
    return (
      <>
        {scopes.length > 1 && (
          <div
            className="ThreadmarkDirectory-filters"
            role="group"
            aria-label={extractText(app.translator.trans('ffans-threadmarks.forum.directory.scope_a11y_label'))}
          >
            {scopes.map((scope) => (
              <Button
                key={scope}
                type="button"
                className={`Button Button--small ${this.scope === scope ? 'Button--primary' : 'Button--block'}`}
                aria-pressed={this.scope === scope ? 'true' : 'false'}
                onclick={(event: MouseEvent) => {
                  event.stopPropagation();
                  this.scope = scope;
                }}
              >
                {scope === 'all'
                  ? app.translator.trans('ffans-threadmarks.forum.directory.all_filter')
                  : scope === 'personal'
                    ? app.translator.trans('ffans-threadmarks.forum.directory.personal_filter')
                    : app.translator.trans('ffans-threadmarks.forum.directory.discussion_filter')}
              </Button>
            ))}
          </div>
        )}
        <div className="ThreadmarkDirectory-content">
          <ThreadmarkList discussion={this.attrs.discussion} onNavigate={this.attrs.onNavigate} scope={this.scope} />
        </div>
      </>
    );
  }
}
