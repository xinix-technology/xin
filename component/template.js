import { idGenerator } from '../helpers';
import { Modeler } from './modeler';
import { Binding } from './binding';
import { Renderer } from './renderer';
import { Eventer } from './eventer';

const nextId = idGenerator();

export class Template {
  constructor (template, props = {}) {
    this.__templateInitialize(template, props);
  }

  get $ () {
    return this.__templateHost.getElementsByTagName('*');
  }

  $$ (selector) {
    return this.__templateHost.querySelector(selector);
  }

  dispose () {
    this.__templateUninitialize();
  }

  on () {
    return this.__templateEventer.on(...arguments);
  }

  off () {
    return this.__templateEventer.off(...arguments);
  }

  once () {
    return this.__templateEventer.once(...arguments);
  }

  waitFor () {
    return this.__templateEventer.waitFor(...arguments);
  }

  fire (type, detail, options) {
    return this.__templateEventer.fire(type, detail, options);
  }

  get (path) {
    return this.__templateModeler.get(path);
  }

  set (path, value) { // eslint-disable-line complexity
    return this.__templateModeler.set(path, value);
  }

  push (path, ...values) {
    return this.__templateModeler.push(path, ...values);
  }

  pop (path) {
    return this.__templateModeler.pop(path);
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    return this.__templateModeler.splice(path, index, removeCount, ...values);
  }

  notify (path) {
    return this.__templateBinding.notify(path);
  }

  mount (host, marker) {
    if (this.__templateMounted) {
      throw new Error('Template already mounted');
    }

    if (!host) {
      throw new Error('Cannot mount to unknown host');
    }

    this.__templateMounted = true;
    this.__templateHost = host;
    this.__templateEventer.start(host);

    if (this.__templateRenderer) {
      this.__templateRenderer.render(host, marker);
    }

    this.__templateModeler.start();
    this.__templateBinding.start(this.__templateModeler);
  }

  unmount () {
    if (!this.__templateMounted) {
      throw new Error('Template already unmounted');
    }

    this.__templateMounted = false;
    this.__templateBinding.stop();
    this.__templateModeler.stop();
    this.__templateEventer.stop();

    if (this.__templateRenderer) {
      this.__templateRenderer.unrender();
    }

    this.__templateHost = undefined;
  }

  __templateInitialize (template, props = {}) {
    this.__id = nextId();
    this.__templateBinding = new Binding();
    this.__templateModeler = new Modeler({
      data: this,
      invoker: this,
      props,
      binding: this.__templateBinding,
    });
    this.__templateMounted = false;
    this.__templateEventer = new Eventer();

    if (template) {
      this.__templateRenderer = new Renderer({
        instance: this,
        binding: this.__templateBinding,
        eventer: this.__templateEventer,
        template: template,
      });
    }
  }

  __templateUninitialize () {
    if (this.__templateMounted) {
      this.unmount();
    }

    if (this.__templateRenderer) {
      this.__templateRenderer.dispose();
      this.__templateRenderer = undefined;
    }

    this.__templateEventer.dispose();
    this.__templateEventer = undefined;
    this.__templateBinding.dispose();
    this.__templateBinding = undefined;
    this.__templateModeler.dispose();
    this.__templateModeler = undefined;
  }
}
