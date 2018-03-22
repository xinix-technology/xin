import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components/view';

class XComponent extends View {
  get template () {
    return require('./x-component.html');
  }
}

define('x-component', XComponent);
