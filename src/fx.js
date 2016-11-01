import '../css/transition-animate.css';

class Fx {
  static add (name, transition) {
    adapters[name] = transition;
  }

  static get (name) {
    return adapters[name] || adapters.none;
  }

  constructor (element, transition) {
    this.element = element;
    this.duration = 0;
    this.transition = transition || element.transition || 'none';

    var merged = Fx.get(this.transition);
    for (var i in merged) {
      if (typeof merged[i] === 'function') {
        this[i] = merged[i];
      }
    }
  }

  play (method, direction) {
    return this[method](direction);
  }
}

const adapters = {
  'none': {
    in: () => Promise.resolve(),
    out: () => Promise.resolve(),
  },
  'transition-slide': {
    in (direction) {
      var directionClass = direction > 0 ? 'transition-slide-in-right' : 'transition-slide-in-left';

      return new Promise((resolve) => {
        var onEnd = () => {
          this.element.removeEventListener('webkitTransitionEnd', onEnd);
          this.element.removeEventListener('transitionend', onEnd);

          this.element.classList.remove('transition-slide-animate');

          resolve();

          setTimeout(() => {
            this.element.classList.remove(directionClass);
            this.element.classList.remove('transition-slide-in');
          }, 50);
        };

        this.element.addEventListener('webkitTransitionEnd', onEnd);
        this.element.addEventListener('transitionend', onEnd);
        this.element.classList.add(directionClass);

        setTimeout(() => {
          this.element.classList.add('transition-slide-animate');

          setTimeout(() => this.element.classList.add('transition-slide-in'), 50);
        }, 50);
      });
    },
    out (direction) {
      var directionClass = direction > 0 ? 'transition-slide-out-left' : 'transition-slide-out-right';
      return new Promise((resolve) => {
        let onEnd = () => {
          this.element.removeEventListener('webkitTransitionEnd', onEnd);
          this.element.removeEventListener('transitionend', onEnd);

          this.element.classList.remove('transition-slide-animate');

          resolve();

          setTimeout(() => {
            this.element.classList.remove(directionClass);
            this.element.classList.remove('transition-slide-out');
          }, 50);
        };

        this.element.addEventListener('webkitTransitionEnd', onEnd);
        this.element.addEventListener('transitionend', onEnd);
        this.element.classList.add(directionClass);

        setTimeout(() => {
          this.element.classList.add('transition-slide-animate');
          setTimeout(() => this.element.classList.add('transition-slide-out'), 50);
        }, 50);
      });
    },
  },
};

export default Fx;
