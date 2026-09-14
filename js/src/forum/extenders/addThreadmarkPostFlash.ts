import { override } from 'flarum/common/extend';
import PostStream from 'flarum/forum/components/PostStream';

export default function addThreadmarkPostFlash() {
  override<PostStream, 'scrollToItem'>('flarum/forum/components/PostStream', 'scrollToItem', function (original, $item, animate, force, reply) {
    const index = $item.data('index');
    const result = original($item, animate, force, reply);

    if (reply || this.stream.threadmarkFlashIndex !== index) {
      return result;
    }

    return Promise.resolve(result).then(() => {
      // 防止点击一个跳转完成前又点一次
      if (this.stream.threadmarkFlashIndex !== index) {
        return;
      }

      const target = this.$(`.PostStream-item[data-index="${index}"]`);

      this.flashItem(target);

      delete this.stream.threadmarkFlashIndex;
    });
  });
}
