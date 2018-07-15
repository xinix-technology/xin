import { define } from '../component';
import { Middleware } from '../components/middleware';

export class Title extends Middleware {
  get props () {
    return Object.assign({}, super.props, {
      defaultTitle: {
        type: String,
        value: 'Xin',
      },

      formatter: {
        type: Function,
        value: () => this._defaultFormatter,
      },
    });
  }

  callback (options) {
    const self = this;
    return async function (ctx, next) {
      ctx.app.once('focus', async evt => {
        document.title = await self.formatter(evt.target) || self.defaultTitle;
      });

      await next();
    };
  }

  _defaultFormatter (el) {
    return el.title;
  }
}

define('xin-title-middleware', Title);
