import type Mithril from 'mithril';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Stream from 'flarum/common/utils/Stream';
import ThreadmarkType from '../../common/models/ThreadmarkType';
export interface IEditThreadmarkTypeModalAttrs extends IInternalModalAttrs {
    threadmarkType: ThreadmarkType;
}
export default class EditThreadmarkTypeModal extends Modal<IEditThreadmarkTypeModalAttrs> {
    threadmarkType: ThreadmarkType;
    deleting: boolean;
    name: Stream<string>;
    color: Stream<string>;
    icon: Stream<string>;
    oninit(vnode: Mithril.Vnode<IEditThreadmarkTypeModalAttrs, this>): void;
    className(): string;
    title(): Mithril.Children;
    content(): Mithril.Children;
    onsubmit(e: SubmitEvent): void;
    deleteThreadmarkType(): void;
}
