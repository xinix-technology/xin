import xin from 'xin';
import html from './doc-header.html';

import './doc-header.css';

class DocHeader extends xin.Component {
  get template () {
    return html;
  }

  showNav (evt) {
    evt.preventDefault();
    window.nav.open();
  }
}

xin.define('doc-header', DocHeader);
