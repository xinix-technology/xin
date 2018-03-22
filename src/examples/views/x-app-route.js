import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components/view';

class XAppRoute extends View {
  get template () {
    return require('./x-app-route.html');
  }
}

define('x-app-route', XAppRoute);
