import { define } from '@xinix/xin';
import { App } from '@xinix/xin/components';

import html from './x-app.html';

import '@xinix/xin/middlewares';

class XApp extends App {
  get template () {
    return html;
  }
}

define('x-app', XApp);
