import type Mithril from 'mithril';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import ThreadmarkType from '../../common/models/ThreadmarkType';
import Threadmark from '../models/Threadmark';
type Scope = 'personal' | 'discussion';
export interface ManageThreadmarkModalAttrs extends IInternalModalAttrs {
    discussion: Discussion;
    post?: Post;
    threadmark?: Threadmark;
}
export default class ManageThreadmarkModal extends Modal<ManageThreadmarkModalAttrs> {
    activeScope: Scope;
    post?: Post;
    drafts: {
        personal: {
            typeId: any;
            note: any;
        };
        discussion: {
            typeId: any;
            note: any;
        };
    };
    oninit(vnode: Mithril.Vnode<ManageThreadmarkModalAttrs, this>): void;
    private finishLoading;
    className(): string;
    title(): string;
    mark(scope?: Scope): Threadmark | undefined;
    scopes(): Scope[];
    selectScope(scope: Scope): void;
    types(scope?: Scope): ThreadmarkType[];
    resetDraft(scope: Scope): void;
    content(): Mithril.Children;
    onsubmit(event: SubmitEvent): Promise<void>;
    deleteThreadmark(): Promise<void>;
}
export {};
