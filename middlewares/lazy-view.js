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

    this.views = [];
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
      [].forEach.call(app.querySelectorAll('[lazy-view]'), el => {
        let loader = this.loaders.find(loader => {
          return el.nodeName.toLowerCase().match(loader.test);
        });

        let view = new View(this, el, loader);
        this.put(view);
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
