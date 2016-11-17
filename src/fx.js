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
    this.running = false;
    this.method = 'in';
    this.direction = 0;

    this.adapter = Fx.get(this.transition);
  }

  async play (method, direction) {
    this.running = true;
    this.method = method;
    this.direction = direction;

    await this.adapter.play(this);
  }

  async stop () {
    await this.adapter.stop(this);

    this.running = false;
    this.method = 'in';
    this.direction = 0;
  }
}

const adapters = {
  'none': {
    async play () {},
    async stop () {},
  },
  'slide': {
    play (fx) {
      return new Promise(resolve => {
        T.Event(fx.element).once('transitionend', () => {
          fx.element.classList.remove('trans-slide__animate');
          resolve();
        });
        fx.element.classList.add(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);

        Async.nextFrame(() => {
          fx.element.classList.add('trans-slide__animate');
          Async.nextFrame(() => fx.element.classList.add(`trans-slide__${fx.method}`));
        });
      });
    },
    stop (fx) {
      return new Promise(resolve => {
        Async.nextFrame(() => {
          fx.element.classList.remove(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);
          fx.element.classList.remove(`trans-slide__${fx.method}`);
          resolve();
        });
      });
    },
  },
};

export default Fx;
