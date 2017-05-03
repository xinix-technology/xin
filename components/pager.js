import { Component, define } from '../component';
import { Fx } from '../core';

import './css/pager.css';

export class Pager extends Component {
  ready () {
    super.ready();

    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {
      if ('set' in el) {
        el.set('index', i);
      } else {
        el.setAttribute('index', i);
      }
    }
  }

  setFocus (element) {
    if (element) {
      let index = element.index;
      let oldIndex = this.focused$ ? this.focused$.index : -1;
      if (oldIndex < index) {
        this.__transitionForward(this.focused$, element);
      } else if (oldIndex > index) {
        this.__transitionBackward(this.focused$, element);
      }
    } else if (this.focused$) {
      this.focused$.setFocus(false);
    }

    this.focused$ = element;
  }

  __transitionBackward (prevEl, nextEl) {
    Promise.all([
      nextEl.inFx.play(-1),
      prevEl.outFx.play(-1),
    ]).then(() => {
      prevEl.setVisible(false);
      nextEl.setVisible(true);
      prevEl.setFocus(false);
      nextEl.setFocus(true);
      this.$focused = nextEl;

      nextEl.inFx.stop();
      prevEl.outFx.stop();
    });
  }

  __transitionForward (prevEl, nextEl) {
    if (prevEl) {
      Promise.all([
        nextEl.inFx.play(1),
        prevEl.outFx.play(1),
      ]).then(() => {
        prevEl.setVisible(false);
        nextEl.setVisible(true);
        prevEl.setFocus(false);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        nextEl.inFx.stop();
        prevEl.outFx.stop();
      });
    } else {
      let transitionFx = new Fx({
        element: nextEl,
        transition: 'none',
      });

      transitionFx.play('in', 1).then(() => {
        nextEl.setVisible(true);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        transitionFx.stop();
      });
    }
  }
}

define('xin-pager', Pager);

export default Pager;
