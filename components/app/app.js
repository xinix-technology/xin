import { event } from '../../core';
import { Component, define } from '../../component';
import { Route } from './route';

const debug = require('debug')('xin:components:app');

export class App extends Component {
  get props () {
    return {
      title: {
        type: String,
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

      hash: {
        type: String,
        value: '#!',
      },

      startDelay: {
        type: Number,
        value: 100,
      },

      location: {
        type: Object,
        value: () => window.location,
      },

      history: {
        type: Object,
        value: () => window.history,
      },
    };
  }

  get hashRegexp () {
    if (!this._hashRegexp || this._hash !== this.hash) {
      this._hashRegexp = new RegExp(`${this.hash}(.*)$`);
      this._hash = this.hash;
    }

    return this._hashRegexp;
  }

  notFound (fragment) {
    console.warn(`Route not found: ${fragment}`);
  }

  _titleChanged (title) {
    if (title) {
      document.title = title;
    }
  }

  created () {
    this.__appSignature = true;

    // default values
    this.handlers = [];
    this.middlewares = [];

    this.__started = false;
    this.__starting = false;

    this.classList.add('xin-app');
  }

  attached () {
    if (this.manual) {
      return;
    }

    this.async(() => {
      this.start();
    }, 1); // working for safari (delay=1), chrome (delay=0)
  }

  detached () {
    super.detached();

    if (this.mode === 'history') {
      event(window).off('popstate', this.__navCallback);
      event(document).off('click', this.__clickCallback);
      delete this.__clickCallback;
    } else {
      event(window).off('hashchange', this.__navCallback);
    }
    delete this.__navCallback;
  }

  route (route, callback) {
    this.handlers.push(new Route(route, callback));
  }

  async start () {
    if (this.__started || this.__starting) {
      return;
    }

    this.__middlewareChainRun = compose(this.middlewares);

    this.__listenNavigation();

    debug(`Starting ${this.is}:${this.__id} ...`);

    this.__starting = true;
    let executed = await this.__execute();

    this.async(() => {
      this.__starting = false;

      if (executed) {
        debug(`Started ${this.is}:${this.__id}`);

        this.__started = true;

        this.fire('started');
      }
    }, this.startDelay);
  }

  __listenNavigation () {
    this.__navCallback = () => {
      this.__execute();
    };

    if (this.mode === 'history') {
      this.__clickCallback = evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          this.__navCallback();
        }
      };
      event(window).on('popstate', this.__navCallback);
      event(document).on('click', this.__clickCallback);
    } else {
      event(window).on('hashchange', this.__navCallback);
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

  async __execute () {
    let navParameters = this.__navParameters;
    delete this.__navParameters;

    let fragment = this.getFragment();
    let context = { app: this, uri: fragment, navParameters };

    // run middleware chain then execute all executors
    let willContinue = await this.__middlewareChainRun(context, () => {
      let executors = this.getFragmentExecutors(context.uri);
      if (executors.length === 0) {
        this.notFound(fragment);
        this.fire('route-not-found', fragment);
        return;
      }

      executors.forEach(executor => {
        let parameters = Object.assign({}, executor.args, navParameters);
        executor.handler.callback(parameters, context);
      });
    });

    if (willContinue === false) {
      return false;
    }

    this.fire('navigated', context);

    return true;
  }

  navigate (path = '/', options = {}) {
    this.__navParameters = options.parameters;

    if (this.mode === 'history') {
      let url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
      if (this.location.href.replace(this.location.origin, '') !== url) {
        this.history[options.replace ? 'replaceState' : 'pushState'](
          this.__navParameters, document.title, url
        );
        this.__execute();
      }
    } else {
      if (options.replace) {
        this.location.replace(this.hash + path);
      } else {
        this.location.hash = this.hash + path;
      }
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
        let match = this.location.href.match(this.hashRegexp);
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

define('xin-app', App);

function compose (middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return (context, next) => {
    // last called middlewares #
    let index = -1;

    function dispatch (i) {
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

      return fn(context, () => dispatch(i + 1));
    }

    return dispatch(0);
  };
}
