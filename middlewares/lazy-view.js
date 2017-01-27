import xin from '../';
import Middleware from '../components/middleware';
import View from './lib/view';

class LazyView extends Middleware {
  get props () {
    return Object.assign({}, super.props, {
      loaders: {
        type: Array,
        value: () => (xin.setup.viewLoaders || []),
      },
    });
  }
  created () {
    super.created();

    this.views = new Map();
  }

  get (uri) {
    if (this.views.has(uri)) {
      return this.views.get(uri);
    }

    let iterator = this.views.values();
    for (let view of iterator) {
      if (view.route.getExecutorFor(uri)) {
        return view;
      }
    }
  }

  set (uri, view) {
    this.views.set(uri, view);
  }

  ensure (app, uri) {
    if (this.views.size === 0) {
      [].forEach.call(app.querySelectorAll('[lazy-view]'), el => {
        let loader = this.loaders.find(loader => {
          return el.nodeName.toLowerCase().match(loader.test);
        });

        let view = new View(this, el, loader);
        this.set(view.uri, view);
      });
    }

    let view = this.get(uri);
    if (!view) {
      throw new Error('Unknown view for ' + uri);
    }

    return view.load();
  }

  callback (options) {
    return async (ctx, next) => {
      await this.ensure(ctx.app, ctx.uri);

      await next();
    };
  }
}

xin.define('lazy-view-middleware', LazyView);

export default LazyView;
