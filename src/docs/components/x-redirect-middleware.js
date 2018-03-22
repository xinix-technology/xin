import { define } from '@xinix/xin';
import { Middleware } from '@xinix/xin/components';

class XRedirectMiddleware extends Middleware {
  callback (options) {
    return async function (ctx, next) {
      let uris = [...document.querySelector('xin-pager').children].map(v => v.getAttribute('uri'));
      if (uris.indexOf(ctx.uri) === -1) {
        ctx.uri = '/not-found';
      }

      await next();
    };
  }
}

define('x-redirect-middleware', XRedirectMiddleware);
