import xin from '../src';
import Route from './lib/route';

// const NOOP = () => {};

class App extends xin.Component {
  get props () {
    return {
      docTitle: {
        type: String,
        value: 'Application',
        observer: '_titleChanged',
      },

      manual: {
        type: Boolean,
      },

      mode: {
        type: String,
        value: 'hash',
      },

      rootUri: {
        type: String,
        value: '/',
      },

      hashSeparator: {
        type: RegExp,
        value: () => /#!(.*)$/,
      },
    };
  }

  notFound (fragment) {
    console.warn(`Route not found: ${fragment}`);
  }

  _titleChanged (title) {
    document.title = title;
  }

  created () {
    xin.put('app', this);

    // this.classList.add('xin-app');

    this.__appSignature = true;
    this.location = window.location;
    this.history = window.history;

    // default values
    this.handlers = [];
    this.middlewares = [];

    // this.__awaitRouteCallback = NOOP;
    this.__started = false;
    this.__starting = false;
  }

  attached () {
    if (!this.manual) {
      this.async(() => {
        // this.__availableUris = [].map.call(this.querySelectorAll('.xin-view'), el => el.uri);
        this.start();
      });
    }
  }

  route (route, callback) {
    this.handlers.push(new Route(route, callback));
    // this.__awaitRouteCallback(this.getFragmentExecutors(this.getFragment()));
  }

  async start () {
    if (this.__started || this.__starting) {
      return;
    }

    this.__middlewareChainRun = compose(this.middlewares);

    this.__listenNavigation();

    console.info(`Starting ${this.is}:${this.__id} ...`);

    this.__starting = true;
    let executed = await this.__execute();
    this.__starting = false;

    if (executed) {
      console.info(`Started ${this.is}:${this.__id}`);

      this.__started = true;

      this.fire('started');
    }
  }

  __listenNavigation () {
    let callback = () => {
      this.__execute();
    };

    if (this.mode === 'history') {
      xin.event(window).on('popstate', callback);
      xin.event(document).on('click', evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          callback();
        }
      });
    } else {
      xin.event(window).on('hashchange', callback);
    }
  }

  get started () {
    return this.__started || false;
  }

  getFragmentExecutors (fragment) {
    return this.handlers.reduce((executors, handler) => {
      let executor = handler.getExecutorFor(fragment);
      if (executor) executors.push(executor);
      return executors;
    }, []);
  }

  // __waitForRoute () {
  //   return new Promise((resolve, reject) => {
  //     this.__awaitRouteCallback = (executors) => {
  //       if (executors.length === 0) {
  //         return;
  //       }
  //
  //       this.__awaitRouteCallback = NOOP;
  //       resolve(executors);
  //     };
  //   });
  // }

  async __execute () {
    let fragment = this.getFragment();
    let context = { app: this, uri: fragment };

    // run middleware chain then execute all executors
    let willContinue = await this.__middlewareChainRun(context, () => {
      let executors = this.getFragmentExecutors(context.uri);
      if (executors.length === 0) {
        this.notFound(fragment);
        this.fire('route-not-found', fragment);
        return;
        // if (this.__availableUris.indexOf(fragment) === -1) {
        // }
        // executors = await this.__waitForRoute();
      }

      executors.forEach(executor => {
        executor.handler.callback(executor.args, context);
      });
    });

    if (willContinue === false) {
      return false;
    }

    this.fire('navigated', context);
    return true;
  }

  navigate (path, options) {
    path = path || '/';
    options = options || {};

    if (this.mode === 'history') {
      let url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
      if (this.location.href.replace(this.location.origin, '') !== url) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
        this.__execute();
      }
    } else {
      this.location.href.match(this.hashSeparator);
      this.location.href = this.location.href.replace(this.hashSeparator, '') + this.hashSeparator + path;
    }
    return this;
  }

  use (middleware) {
    this.middlewares.push(middleware);
  }

  getFragment () {
    try {
      let fragment;
      if (this.mode === 'history') {
        fragment = decodeURI(this.location.pathname + this.location.search);
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
      } else {
        let match = this.location.href.match(this.hashSeparator);
        fragment = match ? match[1] : '';
      }

      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    } catch (err) {
      console.error('Fragment is not match any pattern, fallback to /');
      return '/';
    }
  }

  // $back (evt) {
  //   evt.preventDefault();
  //   this.history.back();
  // }
}

xin.define('xin-app', App);

function compose (middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return async (context, next) => {
    // last called middlewares #
    let index = -1;

    async function dispatch (i) {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }

      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) {
        fn = next;
      }
      if (!fn) {
        return;
      }

      return await fn(context, () => dispatch(i + 1));
    }

    return dispatch(0);
  };
}

// xin.App = App;
export default App;
