import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components';

class LazyView1 extends View {
  get template () {
    return `
      lazyview 1
    `;
  }
}

define('test-lazyview-1-view', LazyView1);
