import ThreadmarkType from '../../common/models/ThreadmarkType';
export default class ThreadmarkTypeListState {
    loaded: boolean;
    private loadingPromise?;
    all(): ThreadmarkType[];
    load(): Promise<ThreadmarkType[]>;
}
