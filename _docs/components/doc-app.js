import xin from '@xinix/xin';
import { App } from '@xinix/xin/components';
import html from './doc-app.html';

import '@xinix/xin/components/pager';
import './doc-header';
import './doc-nav';
import '@xinix/xin/middlewares/lazy-view';

class DocApp extends App {
  get template () {
    return html;
  }
}

xin.define('doc-app', DocApp);
