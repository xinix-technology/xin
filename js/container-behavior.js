(function(root) {
  'use strict';

  var xin = root.xin;

  // TODO please write global notify after writing basic notify
  var ContainerBehavior = {
    properties: {
      ref: {
        type: Object,
        readOnly: true,
      }
    },

    created: function() {
      var property = this.getAttribute('ref');
      if (property && property.indexOf('{{$') === 0) {
        this._appProperty = property.slice(2, -2).trim();
        Object.defineProperty(this, 'ref', {
          set: function(value) {
            if (this._app) {
              this._app.set(this._appProperty, value);
            }
          },

          get: function() {
            if (this._app) {
              return this._app.get(this._appProperty);
            }
          }
        });
      }

    },

    attached: function() {
      this._app = xin.Dom(this).parent('.xin-app-behavior');

      if (!this._app) {
        throw new Error('Cannot use ContainerBehavior without AppBehavior on component: ' + this.is);
      }

      if (this._appProperty) {
        this._app._bind({
          kind: 'custom',
          mode: '{',
          target: this,
          property: this._appProperty,
          value: 'ref',
          effect: function(value) {
            this._app.fire('property-sync', {
              property: this._appProperty,
              value: value,
            });
          }.bind(this),
        });

        this.__syncProperty = this._syncProperty.bind(this);
        this._app.addEventListener('property-sync', this.__syncProperty);

        var createFn = function(key) {
          return function() {
            this._app[key].apply(this._app, arguments);
          };
        };

        for(var key in this._app) {
          if (key[0] !== '$' || this.hasOwnProperty(key)) continue;
          if (typeof this._app[key] !== 'function') {
            this.set(key, this._app[key]);
          } else if (!this[key]) {
            this[key] = createFn(key);
          }
        }

        this.set('ref', this);
      }
    },

    detached: function() {
      this._app._proxiedFunctions.forEach(function(fnName) {
        delete this[fnName];
      }.bind(this));

      this._app.removeEventListener('property-sync', this.__syncProperty);
      delete this.__syncProperty;

      delete this._app;
    },

    _syncProperty: function(evt) {
      this.set(evt.detail.property, evt.detail.value);
    }
  };

  xin.ContainerBehavior = xin.Behavior('xin.ContainerBehavior', ContainerBehavior);
})(this);
