(function(root) {
  'use strict';

  var xin = root.xin;

  xin.Fx.add('slide', {
    in: function(direction) {
      var directionClass = direction > 0 ? 'slideInRight' : 'slideInLeft';
      return new Promise(function(resolve/* , reject */) {
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
    },
    out: function(direction) {
      var directionClass = direction > 0 ? 'slideOutLeft' : 'slideOutRight';
      return new Promise(function(resolve/* , reject */) {
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
    },
  });

  xin.Fx.add('slide-vertical', {
    in: function(direction) {
      var directionClass = direction > 0 ? 'slideInDown' : 'slideInUp';
      return new Promise(function(resolve/* , reject */) {
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
    },
    out: function(direction) {
      var directionClass = direction > 0 ? 'slideOutUp' : 'slideOutDown';
      return new Promise(function(resolve/* , reject */) {
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
    },
  });
})(this);
