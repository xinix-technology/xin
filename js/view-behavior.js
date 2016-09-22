(function(root) {
  'use strict';

  var xin = root.xin;

  var XIN_DEBUG = xin.setup('debug') || false;

  var setupOptions = xin.defaults(xin.setup('xin.ViewBehavior') || {}, {
    transition: 'transition-slide',
  });

  var ViewBehaviorImpl = {
    properties: {
      uri: {
        type: String,
        required: true,
      },
      transition: {
        type: String,
        value: setupOptions.transition,
      },
    },

    listeners: {
      focusing: '__focusing',
      focus: '__focused',
      blur: '__blurred',
    },

    created: function() {
      if (XIN_DEBUG) {
        console.info('Created    ' + this.__getId());
      }

      this.classList.add('xin-view-behavior');
    },

    attached: function() {
      if (XIN_DEBUG) {
        console.info('Attached   ' + this.__getId());
      }

      this.classList.remove('xin-view-focus');
      this.classList.remove('xin-view-visible');

      this.transitionFx = new xin.Fx(this);

      if (this.parentElement.add) {
        this.parentElement.add(this);
      }

      // deprecated in order of new uri parser
      // this._parameterNames = (this.uri.match(/((\(\?)?:\w+|\*\w+)/g) || []).map(function(param) {
      //   return param.substr(1);
      // });

      this.__getApp().route(this.uri, this.focus.bind(this));
      this.fire('routed');
    },

    __focusing: function() {
      if (XIN_DEBUG) {
        console.info('Focusing   ' + this.__getId());
      }

      if (typeof this.focusing === 'function') {
        return this.focusing.apply(this, arguments);
      }
    },

    __focused: function() {
      if (XIN_DEBUG) {
        console.info('Focused    ' + this.__getId());
      }

      if (typeof this.focused === 'function') {
        return this.focused.apply(this, arguments);
      }
    },

    focus: function(parameters) {
      this.set('parameters', parameters || {});

      this.fire('focusing');

      if (this.parentElement.setFocus) {
        this.parentElement.setFocus(this);
      } else {
        xin.dom(this.parentElement).children.forEach(function(element) {
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
    },

    __blurred: function() {
      if (typeof this.blurred === 'function') {
        return this.blurred.apply(this, arguments);
      }
    },

    setVisible: function(visible) {
      this.classList[visible ? 'add' : 'remove']('xin-view-visible');

      this.fire(visible ? 'show' : 'hide');

      if (!visible) {
        xin.dom(this).querySelectorAll('.xin-view-behavior.xin-view-visible').forEach(function(el) {
          el.setVisible(visible);
        });
      }
    },

    setFocus: function(focus) {
      this.classList[focus ? 'add' : 'remove']('xin-view-focus');

      this.fire(focus ? 'focus' : 'blur');

      if (!focus) {
        xin.dom(this).querySelectorAll('.xin-view-behavior.xin-view-focus').forEach(function(el) {
          if (el.parentElement.setFocus) {
            el.parentElement.setFocus(null);
          } else {
            el.setFocus(focus);
          }
        });
      }
    },
  };

  xin.ViewBehavior = xin.createBehavior('xin.ViewBehavior', ['xin.ContainerBehavior', ViewBehaviorImpl]);
})(this);
