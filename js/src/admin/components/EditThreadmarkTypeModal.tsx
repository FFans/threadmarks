import type Mithril from 'mithril';

import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import ColorPreviewInput from 'flarum/common/components/ColorPreviewInput';
import Form from 'flarum/common/components/Form';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Icon from 'flarum/common/components/Icon';
import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';

import ThreadmarkType from '../../common/models/ThreadmarkType';

export interface IEditThreadmarkTypeModalAttrs extends IFormModalAttrs {
  threadmarkType: ThreadmarkType;
}

export default class EditThreadmarkTypeModal extends FormModal<IEditThreadmarkTypeModalAttrs> {
  threadmarkType!: ThreadmarkType;
  deleting = false;

  name!: Stream<string>;
  color!: Stream<string>;
  icon!: Stream<string>;

  oninit(vnode: Mithril.Vnode<IEditThreadmarkTypeModalAttrs, this>) {
    super.oninit(vnode);

    this.threadmarkType = this.attrs.threadmarkType;

    this.name = Stream(this.attrs.threadmarkType.name() || '');
    this.color = Stream(this.attrs.threadmarkType.color() || '');
    this.icon = Stream(this.attrs.threadmarkType.icon() || '');
  }

  className(): string {
    return 'EditThreadmarkTypeModal Modal--small';
  }

  title(): Mithril.Children {
    return app.translator.trans('ffans-threadmarks.admin.edit_type_modal.title');
  }

  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <Form>
          <div className="Form-group">
            <label for="edit-threadmark-type-key">{app.translator.trans('ffans-threadmarks.lib.type_form.key_label')}</label>
            <input id="edit-threadmark-type-key" className="FormControl" value={this.threadmarkType.key()} disabled />
          </div>
          <div className="Form-group">
            <label for="edit-threadmark-type-name">{app.translator.trans('ffans-threadmarks.lib.type_form.name_label')}</label>
            <input id="edit-threadmark-type-name" className="FormControl" type="text" name="name" bidi={this.name} disabled={this.loading} required />
          </div>
          <div className="Form-group">
            <label for="edit-threadmark-type-color">{app.translator.trans('ffans-threadmarks.lib.type_form.color_label')}</label>
            <ColorPreviewInput
              id="edit-threadmark-type-color"
              name="color"
              bidi={this.color}
              disabled={this.loading}
              required
              aria-label={extractText(app.translator.trans('ffans-threadmarks.lib.type_form.color_label'))}
            />
          </div>
          <div className="Form-group">
            <label for="edit-threadmark-type-icon">{app.translator.trans('ffans-threadmarks.lib.type_form.icon_label')}</label>
            <div className="ThreadmarkTypeIconInput">
              <span className="ThreadmarkTypeIconInput-preview" aria-hidden="true" style={{ color: this.color() }}>
                <Icon name={this.icon().trim() || 'fas fa-bookmark'} />
              </span>
              <input
                id="edit-threadmark-type-icon"
                className="FormControl"
                type="text"
                name="icon"
                bidi={this.icon}
                disabled={this.loading}
                required
                placeholder={extractText(app.translator.trans('ffans-threadmarks.lib.type_form.icon_placeholder'))}
              />
            </div>
          </div>

          <div className="Form-group Form-controls">
            <Button className="Button Button--primary" type="submit" loading={this.loading && !this.deleting} disabled={this.loading}>
              {app.translator.trans('ffans-threadmarks.admin.edit_type_modal.submit_button')}
            </Button>
            <Button
              className="Button Button--danger EditThreadmarkTypeModal-delete"
              type="button"
              icon="fas fa-trash-alt"
              loading={this.deleting}
              disabled={this.loading || this.threadmarkType.canDelete() === false}
              aria-describedby={this.threadmarkType.canDelete() === false ? 'threadmark-type-delete-reason' : undefined}
              onclick={this.deleteThreadmarkType.bind(this)}
            >
              {app.translator.trans('ffans-threadmarks.admin.edit_type_modal.delete_button')}
            </Button>
          </div>
          {this.threadmarkType.canDelete() === false && (
            <p className="helpText EditThreadmarkTypeModal-deleteReason" id="threadmark-type-delete-reason">
              {app.translator.trans('ffans-threadmarks.lib.validation.type_in_use')}
            </p>
          )}
        </Form>
      </div>
    );
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.loading) return;

    this.loading = true;

    this.threadmarkType
      .save(
        {
          name: this.name().trim(),
          color: this.color().trim(),
          icon: this.icon().trim(),
        },
        {
          errorHandler: this.onerror.bind(this),
        }
      )
      .then(this.hide.bind(this))
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }

  deleteThreadmarkType() {
    if (this.loading || this.threadmarkType.canDelete() === false) return;
    if (confirm(extractText(app.translator.trans('ffans-threadmarks.admin.edit_type_modal.delete_confirmation')))) {
      this.loading = true;
      this.deleting = true;
      this.threadmarkType
        .delete({}, { errorHandler: this.onerror.bind(this) })
        .then(this.hide.bind(this))
        .catch(() => {
          this.loading = false;
          this.deleting = false;
          m.redraw();
        });
    }
  }
}
