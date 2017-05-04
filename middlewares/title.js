import { define } from '../component';
import { Middleware } from '../components';

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
    return async (ctx, next) => {
      ctx.app.once('focus', (evt) => {
        document.title = evt.target.title || this.defaultTitle;
      });

      await next();
    };
  }
}

define('xin-title-middleware', Title);
