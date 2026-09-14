import extractText from 'flarum/common/utils/extractText';
import app from 'flarum/forum/app';

import type ThreadmarkType from '../../common/models/ThreadmarkType';

const builtinNames: Record<string, string> = {
  default: 'Threadmark',
  notice: 'Notice',
  highlight: 'Highlight',
  progress: 'Progress',
  update: 'Update',
  chapter: 'Chapter',
};

export default function threadmarkTypeLabel(type: ThreadmarkType): string {
  const name = type.name();

  // Keep administrator overrides and custom types verbatim.
  if (!type.isBuiltin() || builtinNames[type.key()] !== name) return name;

  const key = `ffans-threadmarks.forum.type_labels.${type.key()}`;
  const label = extractText(app.translator.trans(key));

  return label === key ? name : label;
}
