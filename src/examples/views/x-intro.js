import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components/view';

class XIntro extends View {
  get template () {
    return require('./x-intro.html');
  }
}

define('x-intro', XIntro);
