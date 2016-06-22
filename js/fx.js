(function(root) {
  'use strict';

  var xin = root.xin;

  var Fx = xin.Fx = function(element, transition) {
    this.element = element;
    this.duration = 0;
    this.transition = transition || element.transition || 'none';

    var merged = Fx.get(this.transition);
    for(var i in merged) {
      if ('function' === typeof merged[i]) {
        this[i] = merged[i];
      }
    }
  };

  Fx.prototype.play = function(method, direction) {
    // console.log('fx-play', method, direction);
    return this[method](direction);
  };

  var adapters = {
    none: {
      in: function(direction) {
        return Promise.resolve();
      },
      out: function(direction) {
        return Promise.resolve();
      }
    },
    'transition-slide': {
      in: function(direction) {
        var directionClass = direction > 0 ? 'transition-slide-in-right' : 'transition-slide-in-left';
        return new Promise(function(resolve, reject) {
          // console.log('in ' + directionClass)
          var onEnd = function () {
            this.element.removeEventListener('webkitTransitionEnd', onEnd);
            this.element.removeEventListener('transitionend', onEnd);

            this.element.classList.remove('transition-slide-animate');

            // console.log('in end: ' + this.element.classList)
            resolve();

            setTimeout(function() {
              // console.log('in clean')
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
        return new Promise(function(resolve, reject) {
          // console.log('out ' + directionClass)
          var onEnd = function () {
            this.element.removeEventListener('webkitTransitionEnd', onEnd);
            this.element.removeEventListener('transitionend', onEnd);

            this.element.classList.remove('transition-slide-animate');

            // console.log('out end: ' + this.element.classList)
            resolve();

            setTimeout(function() {
              // console.log('out clean')
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
      }
    },
    slide: {
      in: function(direction) {
        var directionClass = direction > 0 ? 'slideInRight' : 'slideInLeft';
        return new Promise(function(resolve, reject) {
          var onEnd = function () {
            this.element.removeEventListener('animationend', onEnd);
            this.element.classList.remove('trans-animated', directionClass);
            resolve();
          }.bind(this);
          this.element.addEventListener('animationend', onEnd);
          setTimeout(function() {
            this.element.classList.add('trans-animated', directionClass);
          }.bind(this), 50);
        }.bind(this));
      },
      out: function(direction) {
        var directionClass = direction > 0 ? 'slideOutLeft' : 'slideOutRight';
        return new Promise(function(resolve, reject) {
          var onEnd = function() {
            this.element.removeEventListener('animationend', onEnd);
            this.element.classList.remove('trans-animated', directionClass);
            resolve();
          }.bind(this);
          this.element.addEventListener('animationend', onEnd);
          setTimeout(function() {
            this.element.classList.add('trans-animated', directionClass);
          }.bind(this), 50);
        }.bind(this));
      }
    },
    'slide-vertical': {
      in: function(direction) {
        var directionClass = direction > 0 ? 'slideInDown' : 'slideInUp';
        return new Promise(function(resolve, reject) {
          var onEnd = function () {
            this.element.removeEventListener('animationend', onEnd);
            this.element.classList.remove('trans-animated', directionClass);
            resolve();
          }.bind(this);
          this.element.addEventListener('animationend', onEnd);
          setTimeout(function() {
            this.element.classList.add('trans-animated', directionClass);
          }.bind(this), 50);
        }.bind(this));
      },
      out: function(direction) {
        var directionClass = direction > 0 ? 'slideOutUp' : 'slideOutDown';
        return new Promise(function(resolve, reject) {
          var onEnd = function() {
            this.element.removeEventListener('animationend', onEnd);
            this.element.classList.remove('trans-animated', directionClass);
            resolve();
          }.bind(this);
          this.element.addEventListener('animationend', onEnd);
          setTimeout(function() {
            this.element.classList.add('trans-animated', directionClass);
          }.bind(this), 50);
        }.bind(this));
      }
    }
  };

  Fx.add = function(name, transition) {
    adapters[name] = transition;
  };

  Fx.get = function(name) {
    return adapters[name] || adapters.none;
  };
})(this);