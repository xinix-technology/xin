import { define } from '../component';
import { Middleware } from '../components/middleware';

export class Title extends Middleware {
  get props () {
    return Object.assign({}, super.props, {
      defaultTitle: {
        type: String,
        value: 'Unknown',
      },
    });
  }

  callback (options) {
    const self = this;
    return async function (ctx, next) {
      ctx.app.once('focus', evt => {
        document.title = evt.target.title || self.defaultTitle;
      });

      await next();
    };
  }
}

define('xin-title-middleware', Title);
