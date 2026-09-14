import type Mithril from 'mithril';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
import ThreadmarkType from '../../common/models/ThreadmarkType';
export interface ICreateThreadmarkTypeModalAttrs extends IFormModalAttrs {
    onCreated?: (type: ThreadmarkType) => void;
}
export default class CreateThreadmarkTypeModal extends FormModal<ICreateThreadmarkTypeModalAttrs> {
    key: Stream<string>;
    name: Stream<string>;
    color: Stream<string>;
    icon: Stream<string>;
    oninit(vnode: Mithril.Vnode<ICreateThreadmarkTypeModalAttrs, this>): void;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    onsubmit(e: SubmitEvent): void;
}
