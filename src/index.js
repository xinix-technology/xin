import { get, put } from './repository';
import { Component, base, define } from './component';
import Fx from './fx';
import setup from './setup';
import object from './object';
import T from 'template-binding';
import Async from './async';
import Debounce from './debounce';

if (typeof window.xin === 'object') {
  setup.load(window.xin);
}

const xin = (id) => get(id);

xin.put = put;
xin.Component = Component;
xin.define = define;
xin.base = base;
xin.object = object;
xin.setup = setup;
xin.filter = T.Filter;
xin.event = T.Event;
xin.Fx = Fx;
xin.Async = Async;
xin.Debounce = Debounce;

window.xin = xin;

export default xin;
