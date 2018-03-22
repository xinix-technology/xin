import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components/view';

class XMiddleware extends View {
  get template () {
    return require('./x-middleware.html');
  }
}

define('x-middleware', XMiddleware);
