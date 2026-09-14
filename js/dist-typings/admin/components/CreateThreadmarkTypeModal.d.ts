import type Mithril from 'mithril';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Stream from 'flarum/common/utils/Stream';
import ThreadmarkType from '../../common/models/ThreadmarkType';
export interface ICreateThreadmarkTypeModalAttrs extends IInternalModalAttrs {
    onCreated?: (type: ThreadmarkType) => void;
}
export default class CreateThreadmarkTypeModal extends Modal<ICreateThreadmarkTypeModalAttrs> {
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
