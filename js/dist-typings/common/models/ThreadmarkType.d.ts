import Model from 'flarum/common/Model';
export default class ThreadmarkType extends Model {
    key: () => string;
    name: () => string;
    color: () => string;
    icon: () => string;
    position: () => number;
    isBuiltin: () => boolean;
    isEnabled: () => boolean;
    canDelete: () => boolean;
    createdAt: () => Date | null | undefined;
    updatedAt: () => Date | null | undefined;
}
