import xin from '../src';

import './pager.css';

class Pager extends xin.Component {
  add (element) {
    this.views = this.views || [];
    this.views.push(element);
  }

  setFocus (element) {
    if (element) {
      var index = this.views.indexOf(element);
      var oldIndex = -1;
      if (this.focused$) {
        oldIndex = this.views.indexOf(this.focused$);
      }

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
      prevEl.transitionFx.play('out', -1),
      nextEl.transitionFx.play('in', -1),
    ]).then(function () {
      prevEl.setVisible(false);
      prevEl.setFocus(false);
      nextEl.setVisible(true);
      nextEl.setFocus(true);
      this.$focused = nextEl;
    }.bind(this));
  }

  __transitionForward (prevEl, nextEl) {
    if (prevEl) {
      Promise.all([
        prevEl.transitionFx.play('out', 1),
        nextEl.transitionFx.play('in', 1),
      ]).then(function () {
        prevEl.setVisible(false);
        prevEl.setFocus(false);
        nextEl.setVisible(true);
        nextEl.setFocus(true);
        this.$focused = nextEl;
      }.bind(this));
    } else {
      (new xin.Fx(nextEl, 'none')).play('in', 1).then(function () {
        nextEl.setVisible(true);
        nextEl.setFocus(true);
        this.$focused = nextEl;
      }.bind(this));
    }
  }
}

xin.define('xin-pager', Pager);
xin.Pager = Pager;

export default Pager;
