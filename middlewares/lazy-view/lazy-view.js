import { define } from '../../component';
import { Middleware } from '../../components/middleware';
import { View } from './view';

export class LazyView extends Middleware {
  get props () {
    return Object.assign({}, super.props, {
      loaders: {
        type: Array,
        value: () => {
          if (this.__repository.get('view.loaders')) {
            return this.__repository.get('view.loaders');
          }

          return [];
        },
      },
    });
  }

  created () {
    super.created();

    this.views = [];
  }

  attached () {
    super.attached();

    this.loaders.push({
      test: /^xin-/,
      load (view) {
        if (view.name === 'xin-view') {
          return import('../../components/view');
        }

        // TODO: Official view will be only xin-view so there will be no need to have other type views
        // let name = view.name.match(/^xin-(.+)-view$/)[1];
        // return import(`../../${name}`);
      },
    });
  }

  get (uri) {
    let view = this.views.find(view => view.uri === uri);
    if (view) {
      return view;
    }

    return this.views.find(view => {
      if (view.isStaticRoute && view.uri === uri) {
        return true;
      }

      return view.route.getExecutorFor(uri);
    });
  }

  put (view) {
    this.views.push(view);
  }

  ensure (app, uri) {
    if (this.views.length === 0) {
      app.querySelectorAll('[lazy-view]').forEach(el => {
        let loader = this.loaders.find(loader => {
          return el.nodeName.toLowerCase().match(loader.test);
        });

        let view = new View(this, el, loader);
        this.put(view);
      });
    }

    let view = this.get(uri);
    if (!view) {
      return;
    }

    return view.load();
  }

  callback (options) {
    const self = this;
    return async function (ctx, next) {
      await self.ensure(ctx.app, ctx.pathname);

      await next();
    };
  }
}

define('xin-lazy-view-middleware', LazyView);
