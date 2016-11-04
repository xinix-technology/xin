import xin from '../src';

import './view.css';

const SETUP_TRANSITION = xin.setup.get('xin.View.transition') || 'transition-slide';

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
    };
  }

  // get listeners () {
  //   return {
  //     focusing: 'focusing(evt)',
  //     focus: 'focused(evt)',
  //     blur: 'blurred(evt)',
  //   };
  // }

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

    if ('add' in this.parentElement) {
      this.parentElement.add(this);
    }

    this.__app.route(this.uri, this.focus.bind(this));
    this.fire('routed');
  }

  focus (parameters) {
    this.set('parameters', parameters || {});

    this.focusing();
    this.fire('focusing');

    this.async(() => {
      if ('setFocus' in this.parentElement) {
        this.parentElement.setFocus(this);
      } else {
        this.setFocus(true);
        this.setVisible(true);
      }
    });
  }

  setVisible (visible) {
    if (visible) {
      this.classList.add('xin-view--visible');
      this.fire('show');
    } else {
      this.classList.remove('xin-view--visible');
      this.fire('hide');

      [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));
    }
  }

  setFocus (focus) {
    if (focus) {
      this.classList.add('xin-view--focus');
      this.focused();
      this.fire('focus');
    } else {
      this.classList.remove('xin-view--focus');
      this.blurred();
      this.fire('blur');

      [].forEach.call(this.querySelectorAll('.xin-view.xin-view--focus'), el => {
        if ('setFocus' in el.parentElement) {
          el.parentElement.setFocus(null);
        } else {
          el.setFocus(focus);
        }
      });
    }
  }
}

xin.define('xin-view', View);

export default View;
