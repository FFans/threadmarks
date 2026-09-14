export const DIRECTORY_OPEN_EVENT = 'ffans-threadmarks:open-directory';

export function openThreadmarkDirectory(discussionId: string) {
  window.dispatchEvent(new CustomEvent(DIRECTORY_OPEN_EVENT, { detail: discussionId }));
}
