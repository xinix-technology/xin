import xin from '../src';
import './css/view.css';

const SETUP_TRANSITION = xin.setup.get('xin.View.transition') || 'slide';

class View extends xin.Component {
  get props () {
    return {
      uri: {
        type: String,
        required: true,
      },
      transition: {
        type: String,
        value: SETUP_TRANSITION,
      },
      index: {
        type: Number,
        value: 0,
      },
    };
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

    this.transitionFx = new xin.Fx(this);
  }

  attached () {
    super.attached();

    this.classList.remove('xin-view--focus');
    this.classList.remove('xin-view--visible');

    this.__app.route(this.uri, parameters => this.focus(parameters));
    this.fire('routed');
  }

  focus (parameters) {
    this.set('parameters', parameters || {});

    this.focusing(parameters);
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

      this.fire('show');
    } else {
      this.classList.remove('xin-view--visible');
      [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));

      this.fire('hide');
    }
  }

  setFocus (focus) {
    if (focus) {
      this.classList.add('xin-view--focus');

      this.focused();
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

      this.blurred();
      this.fire('blur');
    }
  }
}

xin.define('xin-view', View);

export default View;
