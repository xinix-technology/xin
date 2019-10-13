import { idGenerator } from '../helpers';
import { Modeler } from './modeler';
import { Presenter } from './presenter';

const nextId = idGenerator();

export class Template {
  constructor (template, props = {}) {
    this.__templateInitialize(template, props);
  }

  get $ () {
    return this.__templatePresenter.$;
  }

  $$ (selector) {
    return this.__templatePresenter.$$(selector);
  }

  dispose () {
    this.__templateUninitialize();
  }

  on () {
    return this.__templatePresenter.on(...arguments);
  }

  off () {
    return this.__templatePresenter.off(...arguments);
  }

  once () {
    return this.__templatePresenter.once(...arguments);
  }

  waitFor () {
    return this.__templatePresenter.waitFor(...arguments);
  }

  fire (type, detail, options) {
    return this.__templatePresenter.fire(type, detail, options);
  }

  get (path) {
    return this.__templateModeler.get(path);
  }

  set (path, value) {
    return this.__templateModeler.set(path, value);
  }

  push (path, ...values) {
    return this.__templateModeler.push(path, ...values);
  }

  pop (path) {
    return this.__templateModeler.pop(path);
  }

  /**
   * Splice an array at path
   * @param {any} path
   * @param {any} index
   * @param {any} removeCount
   * @param  {...any} values
   */
  splice () {
    return this.__templateModeler.splice(...arguments);
  }

  notify (path) {
    return this.__templateModeler.notify(path);
  }

  isMounted () {
    return this.__templatePresenter.running;
  }

  mount (host, marker) {
    if (this.isMounted()) {
      throw new Error('Template already mounted');
    }

    if (!host) {
      throw new Error('Cannot mount to unknown host');
    }

    this.__templatePresenter.start(host, marker);
    this.__templateModeler.start();
  }

  unmount () {
    if (!this.isMounted()) {
      throw new Error('Template already unmounted');
    }

    this.__templateModeler.stop();
    this.__templatePresenter.stop();
  }

  __templateInitialize (template, props = {}) {
    this.__id = nextId();

    const instance = this;
    const modeler = new Modeler({ instance, props });
    const presenter = new Presenter({ instance, modeler, template });

    this.__templateModeler = modeler;
    this.__templatePresenter = presenter;
  }

  __templateUninitialize () {
    if (this.isMounted()) {
      this.unmount();
    }

    this.__templatePresenter.dispose();
    this.__templatePresenter = undefined;
    this.__templateModeler.dispose();
    this.__templateModeler = undefined;
  }

  __xinInspect () {
    return `${this.is}:${this.__id}`;
  }
}
