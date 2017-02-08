import xin from '../';
import event from 'event-helper';
import Route from './lib/route';

import './css/app.css';

class App extends xin.Component {
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
    xin.put('app', this);

    this.__appSignature = true;
    this.location = window.location;
    this.history = window.history;

    // default values
    this.handlers = [];
    this.middlewares = [];

    this.__started = false;
    this.__starting = false;

    this.classList.add('xin-app');
  }

  attached () {
    if (!this.manual) {
      this.async(() => {
        this.start();
      });
    }
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
      event(window).on('popstate', callback);
      event(document).on('click', evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          callback();
        }
      });
    } else {
      event(window).on('hashchange', callback);
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
    let fragment = this.getFragment();
    let context = { app: this, uri: fragment };

    // run middleware chain then execute all executors
    let willContinue = await this.__middlewareChainRun(context, () => {
      let executors = this.getFragmentExecutors(context.uri);
      if (executors.length === 0) {
        this.notFound(fragment);
        this.fire('route-not-found', fragment);
        return;
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
      this.location.hash = this.hash + path;
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

xin.define('xin-app', App);

function compose (middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return (context, next) => {
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

export default App;
