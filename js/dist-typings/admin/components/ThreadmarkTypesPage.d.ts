import type Mithril from 'mithril';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import ThreadmarkType from '../../common/models/ThreadmarkType';
export default class ThreadmarkTypesPage extends ExtensionPage {
    sortable: any;
    sortableList: {
        destroy(): void;
    } | null;
    savingTypes: Set<string>;
    setTypeEnabled(type: ThreadmarkType, isEnabled: boolean): Promise<void>;
    oninit(vnode: Mithril.Vnode<ExtensionPageAttrs, this>): void;
    get threadmarkTypes(): ThreadmarkType[];
    onListCreate(vnode: Mithril.VnodeDOM): void;
    onSortUpdate(): void;
    content(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): JSX.Element;
}
