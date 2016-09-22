(function(root) {
  'use strict';

  var xin = root.xin;

  var Fx = xin.Fx = function(element, transition) {
    this.element = element;
    this.duration = 0;
    this.transition = transition || element.transition || 'none';

    var merged = Fx.get(this.transition);
    for (var i in merged) {
      if (typeof merged[i] === 'function') {
        this[i] = merged[i];
      }
    }
  };

  Fx.prototype.play = function(method, direction) {
    return this[method](direction);
  };

  var adapters = {
    'none': {
      in: function(/* direction */) {
        return Promise.resolve();
      },
      out: function(/* direction */) {
        return Promise.resolve();
      },
    },
    'transition-slide': {
      in: function(direction) {
        var directionClass = direction > 0 ? 'transition-slide-in-right' : 'transition-slide-in-left';

        return new Promise(function(resolve/* , reject */) {
          var onEnd = function() {
            this.element.removeEventListener('webkitTransitionEnd', onEnd);
            this.element.removeEventListener('transitionend', onEnd);

            this.element.classList.remove('transition-slide-animate');

            resolve();

            setTimeout(function() {
              this.element.classList.remove(directionClass);
              this.element.classList.remove('transition-slide-in');
            }.bind(this), 50);
          }.bind(this);

          this.element.addEventListener('webkitTransitionEnd', onEnd);
          this.element.addEventListener('transitionend', onEnd);
          this.element.classList.add(directionClass);

          setTimeout(function() {
            this.element.classList.add('transition-slide-animate');

            setTimeout(function() {
              this.element.classList.add('transition-slide-in');
            }.bind(this), 50);
          }.bind(this), 50);
        }.bind(this));
      },
      out: function(direction) {
        var directionClass = direction > 0 ? 'transition-slide-out-left' : 'transition-slide-out-right';
        return new Promise(function(resolve/* , reject */) {
          var onEnd = function() {
            this.element.removeEventListener('webkitTransitionEnd', onEnd);
            this.element.removeEventListener('transitionend', onEnd);

            this.element.classList.remove('transition-slide-animate');

            resolve();

            setTimeout(function() {
              this.element.classList.remove(directionClass);
              this.element.classList.remove('transition-slide-out');
            }.bind(this), 50);
          }.bind(this);

          this.element.addEventListener('webkitTransitionEnd', onEnd);
          this.element.addEventListener('transitionend', onEnd);
          this.element.classList.add(directionClass);

          setTimeout(function() {
            this.element.classList.add('transition-slide-animate');

            setTimeout(function() {
              this.element.classList.add('transition-slide-out');
            }.bind(this), 50);
          }.bind(this), 50);
        }.bind(this));
      },
    },
  };

  Fx.add = function(name, transition) {
    adapters[name] = transition;
  };

  Fx.get = function(name) {
    return adapters[name] || adapters.none;
  };
})(this);
