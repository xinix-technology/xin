const xin = require('../');
const setup = require('../setup');
const Fx = require('../fx');

require('./view.css');

const SETUP = setup.withDefault('xin.View', {
  transition: 'transition-slide',
});

class View extends xin.Component {
  get props () {
    return {
      uri: {
        type: String,
        required: true,
      },
      transition: {
        type: String,
        value: SETUP.transition,
      },
    };
  }

  get listeners () {
    return {
      focusing: '__focusing',
      focus: '__focused',
      blur: '__blurred',
    };
  }

  created () {
    this.classList.add('xin-view');
  }

  attached () {
    this.classList.remove('xin-view--focus');
    this.classList.remove('xin-view--visible');

    this.transitionFx = new Fx(this);

    if (this.parentElement.add) {
      this.parentElement.add(this);
    }

    // deprecated in order of new uri parser
    // this._parameterNames = (this.uri.match(/((\(\?)?:\w+|\*\w+)/g) || []).map(function(param) {
    //   return param.substr(1);
    // });

    this.__app.route(this.uri, this.focus.bind(this));
    this.fire('routed');
  }

  __focusing () {
    if (typeof this.focusing === 'function') {
      return this.focusing.apply(this, arguments);
    }
  }

  __focused () {
    if (typeof this.focused === 'function') {
      return this.focused.apply(this, arguments);
    }
  }

  focus (parameters) {
    this.set('parameters', parameters || {});

    this.fire('focusing');

    if (this.parentElement.setFocus) {
      this.parentElement.setFocus(this);
    } else {
      [].forEach.call(this.parentElement.children, element => {
        if (element.setFocus) {
          element.setFocus(false);
          element.setVisible(false);
        }
      });

      if (this.setFocus) {
        this.setFocus(true);
        this.setVisible(true);
      }
    }
  }

  __blurred () {
    if (typeof this.blurred === 'function') {
      return this.blurred.apply(this, arguments);
    }
  }

  setVisible (visible) {
    this.classList[visible ? 'add' : 'remove']('xin-view--visible');

    this.fire(visible ? 'show' : 'hide');

    if (!visible) {
      [].forEach.call(this.querySelectorAll('.xin-view-behavior.xin-view--visible'), el => el.setVisible(visible));
    }
  }

  setFocus (focus) {
    this.classList[focus ? 'add' : 'remove']('xin-view--focus');

    this.fire(focus ? 'focus' : 'blur');

    if (!focus) {
      [].forEach.call(this.querySelectorAll('.xin-view-behavior.xin-view--focus'), el => {
        if (el.parentElement.setFocus) {
          el.parentElement.setFocus(null);
        } else {
          el.setFocus(focus);
        }
      });
    }
  }
}

xin.define('xin-view', View);
xin.View = View;

module.exports = View;
