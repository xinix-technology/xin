import setup from './setup';
import { get, put } from './repository';
import { Component, base, define } from './component';

if (typeof window.xin === 'object') {
  setup.load(window.xin);
}

const xin = (id) => get(id);

xin.put = put;
xin.setup = setup;
xin.Component = Component;
xin.base = base;
xin.define = define;

if (typeof window !== 'undefined') {
  window.xin = xin;
}

export default xin;
