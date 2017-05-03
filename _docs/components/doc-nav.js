import xin from '@xinix/xin';
import html from './doc-nav.html';

import './doc-nav.css';

class DocNav extends xin.Component {
  get template () {
    return html;
  }

  get listeners () {
    return {
      'click a': 'tryClose(evt)',
    };
  }

  attached () {
    super.attached();

    this.navigatedCallback = (evt) => {
      let re = new RegExp(evt.detail.uri + '$');
      [...this.querySelectorAll('.doc-nav__item')].forEach(item => {
        if (item.href.match(re)) {
          item.classList.add('doc-nav--selected');
        } else {
          item.classList.remove('doc-nav--selected');
        }
      });
    };
    this.__app.on('navigated', this.navigatedCallback);
  }

  detached () {
    this.__app.off('navigated', this.navigatedCallback);
  }

  open (evt) {
    if (evt) {
      evt.preventDefault();
    }

    this.classList.add('doc-nav--visible');
  }

  close (evt) {
    if (evt) {
      evt.preventDefault();
    }

    this.classList.remove('doc-nav--visible');
  }

  tryClose (evt) {
    this.async(() => {
      this.close();
    }, 300);
  }
}

xin.define('doc-nav', DocNav);
