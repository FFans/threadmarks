import type Mithril from 'mithril';
import type { ICheckboxAttrs } from 'flarum/common/components/Checkbox';
import Switch from 'flarum/common/components/Switch';
export default class ThreadmarkTypeSwitch extends Switch {
    view(vnode: Mithril.Vnode<ICheckboxAttrs, this>): JSX.Element;
}
