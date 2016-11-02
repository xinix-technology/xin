import T from 'template-binding';
import Async from './async';

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
          // T.Event(this.element).off('webkitTransitionEnd', onEnd);
          T.Event(this.element).off('transitionend', onEnd);

          this.element.classList.remove('transition-slide-animate');

          resolve();

          Async.run(null, () => {
            this.element.classList.remove(directionClass);
            this.element.classList.remove('transition-slide-in');
          });
        };

        // T.Event(this.element).on('webkitTransitionEnd', onEnd);
        T.Event(this.element).on('transitionend', onEnd);
        this.element.classList.add(directionClass);

        Async.run(null, () => {
          this.element.classList.add('transition-slide-animate');
          Async.run(null, () => this.element.classList.add('transition-slide-in'));
        });
      });
    },
    out (direction) {
      var directionClass = direction > 0 ? 'transition-slide-out-left' : 'transition-slide-out-right';
      return new Promise((resolve) => {
        let onEnd = () => {
          // T.Event(this.element).off('webkitTransitionEnd', onEnd);
          T.Event(this.element).off('transitionend', onEnd);
          this.element.classList.remove('transition-slide-animate');

          resolve();

          Async.run(null, () => {
            this.element.classList.remove(directionClass);
            this.element.classList.remove('transition-slide-out');
          });
        };

        // T.Event(this.element).on('webkitTransitionEnd', onEnd);
        T.Event(this.element).on('transitionend', onEnd);
        this.element.classList.add(directionClass);

        Async.run(null, () => {
          this.element.classList.add('transition-slide-animate');
          Async.run(null, () => this.element.classList.add('transition-slide-out'));
        });
      });
    },
  },
};

export default Fx;
