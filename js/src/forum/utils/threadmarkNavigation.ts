import Discussion from 'flarum/common/models/Discussion';
import app from 'flarum/forum/app';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber';

import Threadmark from '../models/Threadmark';
import type ThreadmarkStreamState from '../states/ThreadmarkStreamState';

export function getThreadmarkNavigationIndex(discussion: Discussion, threadmark: Threadmark): number | null {
  const index = discussion.postIds().indexOf(String(threadmark.originalPostId()));

  if (index !== -1) {
    return index;
  }

  if (threadmark.isPostDeleted()) {
    return threadmark.navigationIndex() ?? null;
  }

  return null;
}

export async function navigateToThreadmark(
  this: Pick<PostStreamScrubber, 'stream' | 'updateScrubberValues'>,
  discussion: Discussion,
  threadmark: Threadmark
) {
  const personalStream = app.current.get('threadmarkStream') as ThreadmarkStreamState | undefined;
  if (app.current.get('threadmarksOnly') && personalStream) {
    return personalStream.goToPostNumber(threadmark.originalPostNumber());
  }

  const index = getThreadmarkNavigationIndex(discussion, threadmark);

  if (index === null) return;

  if (!threadmark.isPostDeleted()) {
    const promise = this.stream.goToIndex(index);

    this.updateScrubberValues({ animate: true, forceHeightChange: true });
    this.stream.threadmarkFlashIndex = index;

    return promise;
  }

  const findTarget = () => document.querySelector<HTMLElement>(`.ThreadmarkTombstone[data-threadmark-id="${threadmark.key()}"]`);
  let target = findTarget();

  // Load missing posts without scheduling Core's separate scroll to the anchor post.
  if (!target) {
    this.stream.paused = true;

    try {
      await this.stream.loadNearIndex(index);
      m.redraw.sync();
      target = findTarget();
    } finally {
      this.stream.paused = false;
    }
  }

  if (!target) return;

  const header = app.screen() === 'phone' ? document.querySelector<HTMLElement>('#app-navigation') : document.querySelector<HTMLElement>('#header');
  const marginTop = header?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - marginTop;
  const $container = $('html, body').stop(true);

  $container.animate({ scrollTop: top }, 'fast');
  await $container.promise();

  this.updateScrubberValues({ animate: true, forceHeightChange: true });

  target.classList.remove('fadeIn', 'flash');
  void target.offsetWidth;
  target.classList.add('flash');

  const flashedTarget = target;
  target.addEventListener('animationend', () => flashedTarget.classList.remove('flash'), { once: true });
}
