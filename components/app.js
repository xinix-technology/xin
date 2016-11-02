import xin from '../src';

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
        type: String,
        value: '#!',
        observer: '_hashSeparatorChanged',
      },
    };
  }

  get listeners () {
    return {
      'route-not-found': 'handleRouteNotFound(evt)',
    };
  }

  handleRouteNotFound (evt) {
    console.error('Route not found: ' + evt.detail);
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

    this.__started = false;
  }

  _hashSeparatorChanged (hashSeparator) {
    this.reHashSeparator = new RegExp(hashSeparator + '(.*)$');
  }

  attached () {
    if (!this.manual) {
      this.async(this.start);
    }
  }

  __isStatic (pattern) {
    return !pattern.match(/[[{]/);
  }

  __routeRegExp (str) {
    let chunks = str.split('[');

    if (chunks.length > 2) {
      throw new Error('Invalid use of optional params');
    }

    let tokens = [];
    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
      tokens.push(token);
      return '([^/]+)';
    }).replace(/\//g, '\\/');

    let optRe = '';

    if (chunks[1]) {
      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
        tokens.push(token);
        return '([^/]+)';
      }).replace(/\//g, '\\/') + ')?';
    }
    return [ new RegExp('^' + re + optRe + '$'), tokens ];
  }

  route (route, callback) {
    let routeHandler = {
      route: route,
      type: 's',
      pattern: null,
      args: [],
      callback: callback,
    };

    if (!this.__isStatic(route)) {
      let result = this.__routeRegExp(route);

      routeHandler.type = 'v';
      routeHandler.pattern = result[0];
      routeHandler.args = result[1];
    }

    this.handlers.push(routeHandler);
  }

  async start () {
    if (this.__started) {
      return;
    }

    this.__middlewareChainRun = compose(this.middlewares);

    // this.__starting = true;
    let executed = await this.__execute();
    // this.__starting = false;

    if (executed) {
      console.info(`Started ${this.is}:${this.__id}`);

      this.__started = true;

      this.__listenNavigation();

      this.fire('started');
    }
  }

  __listenNavigation () {
    let callback = this.__executeCallback = () => {
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
    fragment = fragment || this.getFragment();

    return this.handlers.reduce((executors, handler) => {
      if (handler.type === 's') {
        if (fragment === handler.route) {
          executors.push({ handler: handler, args: {} });
        }
      } else if (handler.type === 'v') {
        let result = fragment.match(handler.pattern);
        if (result) {
          let args = {};

          handler.args.forEach(function (name, index) {
            args[name] = result[index + 1];
          });

          executors.push({
            handler: handler,
            args: args,
          });
        }
      }
      return executors;
    }, []);
  }

  async __execute () {
    let fragment = this.getFragment();

    let executors = this.getFragmentExecutors(fragment);
    if (executors.length === 0) {
      this.fire('route-not-found', fragment);
      return false;
    }

    let context = { uri: fragment };

    this.fire('navigated', context);

    // run middleware chain then execute all executors
    await this.__middlewareChainRun(context, () => {
      executors.forEach(executor => executor.handler.callback(executor.args, context));
    });

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
      this.location.href.match(this.reHashSeparator);
      this.location.href = this.location.href.replace(this.reHashSeparator, '') + this.hashSeparator + path;
    }
    return this;
  }

  use (middleware) {
    this.middlewares.push(middleware);
  }

  getFragment () {
    let fragment;
    if (this.mode === 'history') {
      fragment = decodeURI(this.location.pathname + this.location.search);
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
    } else {
      let match = this.location.href.match(this.reHashSeparator);
      fragment = match ? match[1] : '';
    }

    return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  // $back (evt) {
  //   evt.preventDefault();
  //   this.history.back();
  // }
}

xin.define('xin-app', App);

function compose (middlewares) {
  for (const fn of middlewares) {
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

xin.App = App;

export default App;
