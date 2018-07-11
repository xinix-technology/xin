import { define } from '@xinix/xin';
import { App } from '@xinix/xin/components';

import '@xinix/xin/middlewares';
import './x-redirect-middleware';

class XApp extends App {
  get template () {
    return require('./x-app.html');
  }
}

define('x-app', XApp);
