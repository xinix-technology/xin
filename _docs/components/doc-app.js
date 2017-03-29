import xin from 'xin';
import App from 'xin/components/app';
import html from './doc-app.html';

import 'xin/components/pager';
import './doc-header';
import './doc-nav';
import 'xin/middlewares/lazy-view';

class DocApp extends App {
  get template () {
    return html;
  }
}

xin.define('doc-app', DocApp);
