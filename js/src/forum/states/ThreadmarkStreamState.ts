import Discussion from 'flarum/common/models/Discussion';

import Threadmark from '../models/Threadmark';
import { discussionThreadmarks } from '../utils/discussionThreadmarks';

export default class ThreadmarkStreamState {
  discussion: Discussion;

  index = 1;
  visible = 1;

  paused = false;

  description = '';

  forceUpdateScrubber = false;

  loadPromise: Promise<void> = Promise.resolve();

  needsScroll = false;
  targetIndex: number | null = null;
  targetAtTop = false;
  animateScroll = false;

  constructor(discussion: Discussion) {
    this.discussion = discussion;
  }

  threadmarks(): Threadmark[] {
    const seen = new Set<number>();

    return discussionThreadmarks(this.discussion).filter((mark) => {
      const id = mark.originalPostId();
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }

  count(): number {
    return this.threadmarks().length;
  }

  disabled(): boolean {
    return this.visible >= this.count();
  }

  sanitizeIndex(index: number): number {
    return Math.max(0, Math.min(this.count(), Math.floor(index)));
  }

  goToFirst(): Promise<void> {
    return this.goToIndex(0);
  }

  goToLast(): Promise<void> {
    return this.goToIndex(this.count() - 1);
  }

  goToPostNumber(number: number, noAnimation = false): Promise<void> {
    const threadmarks = this.threadmarks();
    const nextIndex = threadmarks.findIndex((threadmark) => threadmark.originalPostNumber() > number);
    const index = nextIndex === -1 ? threadmarks.length - 1 : Math.max(0, nextIndex - 1);

    return this.goToIndex(index, noAnimation, nextIndex === 0);
  }
  goToIndex(index: number, noAnimation = false, atTop = index === 0): Promise<void> {
    const count = this.count();

    if (!count) {
      return Promise.resolve();
    }

    const targetIndex = Math.max(0, Math.min(count - 1, Math.floor(index)));

    this.paused = true;

    this.targetIndex = targetIndex;
    this.targetAtTop = atTop;
    this.needsScroll = true;
    this.animateScroll = !noAnimation;

    // Scrubber settled position is 1-based.
    this.index = targetIndex + 1;

    this.forceUpdateScrubber = true;
    this.loadPromise = Promise.resolve();

    m.redraw();

    return this.loadPromise;
  }

  current(): Threadmark | undefined {
    return this.threadmarks()[Math.max(0, Math.floor(this.index) - 1)];
  }
}
