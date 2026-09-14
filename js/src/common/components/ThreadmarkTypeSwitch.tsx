import type Mithril from 'mithril';

import type { ICheckboxAttrs } from 'flarum/common/components/Checkbox';
import Switch from 'flarum/common/components/Switch';

// Flarum 1.x does not forward inputAttrs from Checkbox to its native input.
export default class ThreadmarkTypeSwitch extends Switch {
  view(vnode: Mithril.Vnode<ICheckboxAttrs, this>) {
    const view = super.view(vnode);
    const input = (view.children as Mithril.Vnode[])[0];
    Object.assign(input.attrs, (this.attrs as ICheckboxAttrs & { inputAttrs?: Record<string, unknown> }).inputAttrs);
    return view;
  }
}
