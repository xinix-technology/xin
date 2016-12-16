import setup from './setup';
import { get, put } from './repository';
import { Component, base, define } from './component';

const xin = window.xin = (() => {
  if ('xin' in window) {
    switch (typeof window.xin) {
      case 'object':
        setup.load(window.xin);
        break;
      case 'function':
        console.warn('Duplicate xin library');
        return window.xin;
    }
  }

  let xin = (id) => get(id);

  xin.put = put;
  xin.setup = setup;
  xin.Component = Component;
  xin.base = base;
  xin.define = define;

  return xin;
})();

export default xin;
