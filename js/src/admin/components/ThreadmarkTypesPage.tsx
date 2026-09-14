import type Mithril from 'mithril';

import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Switch from 'flarum/common/components/Switch';
import extractText from 'flarum/common/utils/extractText';

import ThreadmarkType from '../../common/models/ThreadmarkType';
import CreateThreadmarkTypeModal from './CreateThreadmarkTypeModal';
import EditThreadmarkTypeModal from './EditThreadmarkTypeModal';

export default class ThreadmarkTypesPage extends ExtensionPage {
  sortable: any = null;
  sortableList: { destroy(): void } | null = null;
  savingTypes = new Set<string>();

  async setTypeEnabled(type: ThreadmarkType, isEnabled: boolean) {
    if (this.savingTypes.has(type.id()!)) return;
    this.savingTypes.add(type.id()!);
    try {
      await type.save({ isEnabled });
    } catch {
      // Model.save restores the previous value; the default request handler displays the error.
    } finally {
      this.savingTypes.delete(type.id()!);
      m.redraw();
    }
  }

  oninit(vnode: Mithril.Vnode<ExtensionPageAttrs, this>) {
    super.oninit(vnode);

    this.loading = true;

    // prettier-ignore
    Promise.all([
      app.store.find<ThreadmarkType[]>('threadmark-types'),
      import('flarum/admin/utils/loadSortable'),
    ]).then(([, sortableModule]) => {
      this.sortable = sortableModule.default;
      this.loading = false;

      m.redraw();
    });
  }

  get threadmarkTypes(): ThreadmarkType[] {
    return app.store.all<ThreadmarkType>('threadmark-types').sort((a, b) => a.position() - b.position());
  }

  onListCreate(vnode: Mithril.VnodeDOM) {
    this.sortableList = this.sortable.create(vnode.dom, {
      handle: '.ThreadmarkTypeList-handle',
      draggable: '.ThreadmarkTypeList-item',
      ghostClass: 'ThreadmarkTypeList-item--dragging',
      delay: 50,
      delayOnTouchOnly: true,
      touchStartThreshold: 5,
      animation: 150,
      swapThreshold: 0.65,

      onSort: () => this.onSortUpdate(),
    });
  }

  onSortUpdate() {
    const order = Array.from(
      // oxfmt-ignore
      this.element.querySelectorAll<HTMLElement>('.ThreadmarkTypeList-item')
    ).map((element) => element.dataset.id!);

    order.forEach((id, index) => {
      app.store.getById<ThreadmarkType>('threadmark-types', id)?.pushData({
        attributes: {
          position: index + 1,
        },
      });
    });

    app.request({
      url: `${app.forum.attribute('apiUrl')}/threadmark-types/order`,
      method: 'POST',
      body: { order },
    });
  }

  content(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): JSX.Element {
    if (this.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="ThreadmarkTypesPage container">
        <div className="ThreadmarkTypesPage-toolbar">
          <Button className="Button Button--primary" icon="fas fa-plus" onclick={() => app.modal.show(CreateThreadmarkTypeModal)}>
            {app.translator.trans('ffans-threadmarks.admin.types.add_button')}
          </Button>
        </div>
        <div
          className="ThreadmarkTypesPage-tableContainer"
          tabindex="0"
          role="region"
          aria-label={extractText(app.translator.trans('ffans-threadmarks.admin.types.table_a11y_label'))}
        >
          <table className="ThreadmarkTypeList" aria-label={extractText(app.translator.trans('ffans-threadmarks.admin.types.table_a11y_label'))}>
            <thead>
              <tr>
                <th scope="col" className="ThreadmarkTypeList-order">
                  <span className="sr-only">{app.translator.trans('ffans-threadmarks.admin.types.order_heading')}</span>
                </th>
                <th scope="col">{app.translator.trans('ffans-threadmarks.admin.types.type_heading')}</th>
                <th scope="col">{app.translator.trans('ffans-threadmarks.admin.types.key_heading')}</th>
                <th scope="col">{app.translator.trans('ffans-threadmarks.admin.types.source_heading')}</th>
                <th scope="col">{app.translator.trans('ffans-threadmarks.admin.types.enabled_heading')}</th>
                <th scope="col" className="ThreadmarkTypeList-actions">
                  {app.translator.trans('ffans-threadmarks.admin.types.actions_heading')}
                </th>
              </tr>
            </thead>
            <tbody
              oncreate={this.onListCreate.bind(this)}
              onremove={() => {
                this.sortableList?.destroy();
                this.sortableList = null;
              }}
            >
              {this.threadmarkTypes.map((type) => (
                <tr className="ThreadmarkTypeList-item" data-id={type.id()} key={type.id()}>
                  <td className="ThreadmarkTypeList-order">
                    <span
                      className="ThreadmarkTypeList-handle"
                      title={extractText(app.translator.trans('ffans-threadmarks.admin.types.reorder_tooltip'))}
                    >
                      <Icon name="fas fa-grip-vertical" />
                    </span>
                  </td>
                  <th scope="row" className="ThreadmarkTypeList-name">
                    <div className="ThreadmarkTypeList-preview">
                      <span className="ThreadmarkTypeList-icon" style={{ color: type.color() }}>
                        <Icon name={type.icon() || 'fas fa-bookmark'} />
                      </span>
                      <span>{type.name()}</span>
                    </div>
                  </th>
                  <td>
                    <code className="ThreadmarkTypeList-key">{type.key()}</code>
                  </td>
                  <td className="ThreadmarkTypeList-source">
                    {type.isBuiltin()
                      ? app.translator.trans('ffans-threadmarks.admin.types.builtin_label')
                      : app.translator.trans('ffans-threadmarks.admin.types.custom_label')}
                  </td>
                  <td>
                    <Switch
                      className="ThreadmarkTypeList-status"
                      state={type.isEnabled()}
                      loading={this.savingTypes.has(type.id()!)}
                      disabled={this.savingTypes.has(type.id()!)}
                      inputAttrs={{
                        'aria-label': extractText(
                          app.translator.trans('ffans-threadmarks.admin.types.enable_type_a11y_label', { name: type.name() })
                        ),
                      }}
                      onchange={(enabled: boolean) => this.setTypeEnabled(type, enabled)}
                    ></Switch>
                  </td>
                  <td className="ThreadmarkTypeList-actions">
                    <Button
                      className="Button Button--link"
                      icon="fas fa-pen"
                      aria-label={extractText(app.translator.trans('ffans-threadmarks.admin.types.edit_type_a11y_label', { name: type.name() }))}
                      onclick={() => {
                        app.modal.show(EditThreadmarkTypeModal, {
                          threadmarkType: type,
                        });
                      }}
                    ></Button>
                  </td>
                </tr>
              ))}
              {this.threadmarkTypes.length === 0 && (
                <tr>
                  <td colspan="6" className="ThreadmarkTypeList-empty">
                    {app.translator.trans('ffans-threadmarks.admin.types.empty_text')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
