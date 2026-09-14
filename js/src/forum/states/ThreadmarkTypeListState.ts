import app from 'flarum/common/app';

import ThreadmarkType from '../../common/models/ThreadmarkType';

export default class ThreadmarkTypeListState {
  loaded = false;
  private loadingPromise?: Promise<ThreadmarkType[]>;

  all(): ThreadmarkType[] {
    return app.store.all<ThreadmarkType>('threadmark-types');
  }

  load(): Promise<ThreadmarkType[]> {
    if (this.loaded) return Promise.resolve(this.all());

    return (this.loadingPromise ??= app.store
      .find<ThreadmarkType[]>('threadmark-types')
      .then(() => {
        this.loaded = true;
        return this.all();
      })
      .finally(() => {
        this.loadingPromise = undefined;
      }));
  }
}
