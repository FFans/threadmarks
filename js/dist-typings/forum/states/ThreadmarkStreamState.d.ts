import Discussion from 'flarum/common/models/Discussion';
import Threadmark from '../models/Threadmark';
export default class ThreadmarkStreamState {
    discussion: Discussion;
    index: number;
    visible: number;
    paused: boolean;
    description: string;
    forceUpdateScrubber: boolean;
    loadPromise: Promise<void>;
    needsScroll: boolean;
    targetIndex: number | null;
    targetAtTop: boolean;
    animateScroll: boolean;
    constructor(discussion: Discussion);
    threadmarks(): Threadmark[];
    count(): number;
    disabled(): boolean;
    sanitizeIndex(index: number): number;
    goToFirst(): Promise<void>;
    goToLast(): Promise<void>;
    goToPostNumber(number: number, noAnimation?: boolean): Promise<void>;
    goToIndex(index: number, noAnimation?: boolean, atTop?: boolean): Promise<void>;
    current(): Threadmark | undefined;
}
