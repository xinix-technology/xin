import { event } from './event';
import { Async } from './fn';

export class Fx {
  static add (name, transition) {
    adapters[name] = transition;
  }

  static get (name) {
    return adapters[name] || adapters.none;
  }

  constructor ({ element, duration = 0, transition = 'none', method = '', adapter } = {}) {
    this.element = element;
    this.duration = duration;
    this.transition = transition;
    this.method = method;

    this.adapter = adapter || Fx.get(this.transition);

    this.running = false;
    this.direction = 0;
  }

  async play (direction) {
    this.running = true;
    this.direction = direction;

    await this.adapter.play(this);
  }

  async stop () {
    await this.adapter.stop(this);

    this.running = false;
    this.direction = 0;
  }
}

// TODO: refactor adapters to each own file
const adapters = {
  none: {
    async play () {},

    async stop () {},
  },

  slide: {
    play (fx) {
      return new Promise(resolve => {
        event(fx.element).once('transitionend', () => {
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

  fade: {
    play (fx) {
      return new Promise(resolve => {
        event(fx.element).once('transitionend', () => {
          resolve();
        });

        fx.element.classList.add(`trans-fade__${fx.method}`);

        Async.nextFrame(() => {
          fx.element.classList.add(`trans-fade__${fx.method}-animate`);
        });
      });
    },

    stop (fx) {
      return new Promise(resolve => {
        fx.element.classList.remove(`trans-fade__${fx.method}`);

        Async.nextFrame(() => {
          fx.element.classList.remove(`trans-fade__${fx.method}-animate`);
          resolve();
        });
      });
    },
  },
};
