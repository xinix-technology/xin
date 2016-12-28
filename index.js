import setup from './setup';
import { get, put } from './repository';
import { Component, base, define } from './component';

const xin = (() => {
  if ('xin' in window && typeof window.xin === 'function') {
    return window.xin;
  }

  let xin = (id) => get(id);

  xin.put = put;
  xin.setup = setup;
  xin.Component = Component;
  xin.base = base;
  xin.define = define;

  return xin;
})();

window.xin = xin;

export default xin;
