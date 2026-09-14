import type Mithril from 'mithril';

import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import ColorPreviewInput from 'flarum/common/components/ColorPreviewInput';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';

import ThreadmarkType from '../../common/models/ThreadmarkType';

export interface ICreateThreadmarkTypeModalAttrs extends IInternalModalAttrs {
  onCreated?: (type: ThreadmarkType) => void;
}

export default class CreateThreadmarkTypeModal extends Modal<ICreateThreadmarkTypeModalAttrs> {
  key!: Stream<string>;
  name!: Stream<string>;
  color!: Stream<string>;
  icon!: Stream<string>;

  oninit(vnode: Mithril.Vnode<ICreateThreadmarkTypeModalAttrs, this>) {
    super.oninit(vnode);

    this.key = Stream('');
    this.name = Stream('');
    this.color = Stream('');
    this.icon = Stream('');
  }

  className(): string {
    return 'CreateThreadmarkTypeModal Modal--small';
  }

  title(): Mithril.Children {
    return app.translator.trans('ffans-threadmarks.admin.create_type_modal.title');
  }

  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label for="create-threadmark-type-key">{app.translator.trans('ffans-threadmarks.lib.type_form.key_label')}</label>
            <input
              id="create-threadmark-type-key"
              className="FormControl"
              type="text"
              name="key"
              value={this.key()}
              oninput={(event: InputEvent) => this.key((event.target as HTMLInputElement).value)}
              disabled={this.loading}
              required
            />
          </div>
          <div className="Form-group">
            <label for="create-threadmark-type-name">{app.translator.trans('ffans-threadmarks.lib.type_form.name_label')}</label>
            <input
              id="create-threadmark-type-name"
              className="FormControl"
              type="text"
              name="name"
              value={this.name()}
              oninput={(event: InputEvent) => this.name((event.target as HTMLInputElement).value)}
              disabled={this.loading}
              required
            />
          </div>
          <div className="Form-group">
            <label for="create-threadmark-type-color">{app.translator.trans('ffans-threadmarks.lib.type_form.color_label')}</label>
            <ColorPreviewInput
              id="create-threadmark-type-color"
              name="color"
              value={this.color()}
              oninput={(event: InputEvent) => this.color((event.target as HTMLInputElement).value)}
              disabled={this.loading}
              required
              aria-label={extractText(app.translator.trans('ffans-threadmarks.lib.type_form.color_label'))}
            />
          </div>
          <div className="Form-group">
            <label for="create-threadmark-type-icon">{app.translator.trans('ffans-threadmarks.lib.type_form.icon_label')}</label>
            <div className="ThreadmarkTypeIconInput">
              <span className="ThreadmarkTypeIconInput-preview" aria-hidden="true" style={{ color: this.color() }}>
                {icon(this.icon().trim() || 'fas fa-bookmark')}
              </span>
              <input
                id="create-threadmark-type-icon"
                className="FormControl"
                type="text"
                name="icon"
                value={this.icon()}
                oninput={(event: InputEvent) => this.icon((event.target as HTMLInputElement).value)}
                disabled={this.loading}
                required
                placeholder={extractText(app.translator.trans('ffans-threadmarks.lib.type_form.icon_placeholder'))}
              />
            </div>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary Button--block" type="submit" loading={this.loading}>
              {app.translator.trans('ffans-threadmarks.admin.create_type_modal.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    this.loading = true;

    app.store
      .createRecord<ThreadmarkType>('threadmark-types')
      .save(
        {
          key: this.key().trim(),
          name: this.name().trim(),
          color: this.color().trim(),
          icon: this.icon().trim(),
        },
        {
          errorHandler: this.onerror.bind(this),
        }
      )
      .then((type) => {
        this.attrs.onCreated?.(type);
        this.alertAttrs = null;
        this.hide();
      })
      .finally(() => {
        this.loaded();
      });
  }
}
