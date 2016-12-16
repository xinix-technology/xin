import xin from '../';
import Fx from '../fx';

import './css/view.css';

const TRANSITION_IN = xin.setup.get('xin.View.transitionIn') || xin.setup.get('xin.View.transition') || 'slide';
const TRANSITION_OUT = xin.setup.get('xin.View.transitionOut') || xin.setup.get('xin.View.transition') || 'fade';

class View extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      uri: {
        type: String,
        required: true,
      },
      transitionIn: {
        type: String,
        value: TRANSITION_IN,
      },
      transitionOut: {
        type: String,
        value: TRANSITION_OUT,
      },
      index: {
        type: Number,
        value: 0,
      },
    });
  }

  focusing () {}

  focused () {}

  blurred () {}

  created () {
    super.created();

    this.classList.add('xin-view');
  }

  ready () {
    super.ready();

    this.inFx = new Fx({
      element: this,
      transition: this.transitionIn,
      method: 'in',
    });

    this.outFx = new Fx({
      element: this,
      transition: this.transitionOut,
      method: 'out',
    });
  }

  attached () {
    super.attached();

    this.classList.remove('xin-view--focus');
    this.classList.remove('xin-view--visible');

    this.__app.route(this.uri, parameters => {
      this.focus(parameters);
    });

    this.fire('routed');
  }

  async focus (parameters) {
    this.set('parameters', parameters || {});

    await this.focusing(parameters);
    this.fire('focusing', parameters);

    this.async(() => {
      if ('setFocus' in this.parentElement) {
        this.parentElement.setFocus(this);
      } else {
        this.setVisible(true);
        this.setFocus(true);
      }
    });
  }

  setVisible (visible) {
    if (visible) {
      this.classList.add('xin-view--visible');

      this.fire('show', { view: this });
    } else {
      this.classList.remove('xin-view--visible');
      [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));

      this.fire('hide');
    }
  }

  async setFocus (focus) {
    if (focus) {
      this.classList.add('xin-view--focus');

      await this.focused();
      this.fire('focus');
    } else {
      this.classList.remove('xin-view--focus');
      [].forEach.call(this.querySelectorAll('.xin-view.xin-view--focus'), el => {
        if ('setFocus' in el.parentElement) {
          el.parentElement.setFocus(null);
        } else {
          el.setFocus(focus);
        }
      });

      await this.blurred();
      this.fire('blur');
    }
  }
}

xin.define('xin-view', View);

export default View;
