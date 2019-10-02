import { Context } from '../context';

export class Repository extends Context {
  constructor () {
    super();

    this.reset();
  }

  reset () {
    this.$elements = this.$elements || {};

    for (const key in this) {
      if (key !== '$elements' && key !== 'data' && Object.prototype.hasOwnProperty.call(this, key)) {
        delete this[key];
      }
    }

    this.$global = window;
    this.$repository = this;

    // XXX someday we might want to have default config
    this.$config = {};
  }

  error (err) {
    const { errorHandler, silent } = this.$config;

    if (errorHandler) {
      errorHandler(err);
    }
    if (!silent) {
      throw err;
    }
  }

  warn (...args) {
    const { warnHandler } = this.$config;

    if (warnHandler) {
      warnHandler(...args);
    }
  }

  isSpecialScope (name) {
    if (name[0] !== '$') {
      return false;
    }

    if (name === '$' || name === '$$' || name[1] === '.') {
      return false;
    }

    return true;
  }
}

export const repository = window.xin$repository = window.xin$repository || new Repository();
