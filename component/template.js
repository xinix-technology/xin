import { idGenerator, prepareTemplate, slotName, dashify, nothing, createFragment } from '../helpers';
import { Modeler } from './modeler';
import { Expr } from './expr';
import { Binding } from './binding';
import { Parser } from './parser';
import { accessorFactory } from './accessor';
import { Annotation } from './annotation';
import { Schema } from './schema';
import { Eventer } from './eventer';
import { ValueAccessor } from './accessor/value';

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
    if (arguments.length === 1 && typeof path === 'object') {
      const data = path;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          this.set(key, data[key]);
        }
      }
      return;
    }

    const oldValue = this.get(path);
    const newValue = this.__templateSchema.get(path, value);
    if (!nothing(oldValue) && this.__templateSchema.eq(path, value, oldValue)) {
      return;
    }

    this.__templateModeler.set(path, newValue);
    this.notify(path);
  }

  push (path, ...values) {
    const result = this.__templateModeler.push(path, ...values);
    this.notify(path);
    return result;
  }

  pop (path) {
    const result = this.__templateModeler.pop(path);
    this.notify(path);
    return result;
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    const result = this.__templateModeler.splice(path, index, removeCount, ...values);
    this.notify(path);
    return result;
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

    this.__templateHost = host;
    this.__templateEventer.start(host);

    if (this.__template) {
      this.__templateSetupMarker(marker);
      this.__templateRender();
    }

    this.__templateMounted = true;
    this.__templateBinding.start(this);
  }

  unmount () {
    if (!this.__templateMounted) {
      throw new Error('Template already unmounted');
    }

    this.__templateMounted = false;
    this.__templateBinding.stop();

    this.__templateHost = undefined;
    this.__templateEventer.stop();

    if (this.__template) {
      this.__templateTeardownMarker();
      this.__templateUnrender();
    }
  }

  __templateSetupMarker (marker) {
    if (!marker) {
      marker = document.createComment(`marker-${this.__id}`);
      this.__templateHost.appendChild(marker);
    }

    this.__templateMarker = marker;
  }

  __templateTeardownMarker () {
    if (this.__templateMarker &&
      this.__templateMarker.parentElement === this.__templateHost &&
      this.__templateMarker.nodeType === Node.COMMENT_NODE &&
      this.__templateMarker.data === `marker-${this.__id}`) {
      this.__templateHost.removeChild(this.__templateMarker);
    }
    this.__templateMarker = undefined;
  }

  __templateInitialize (template, props = {}) {
    this.__id = nextId();
    this.__templateModeler = new Modeler(this);
    this.__templateBinding = new Binding();
    this.__templateChildNodes = [];
    this.__templateInvoker = this;
    this.__templateMounted = false;
    this.__templateDeferredNotifications = [];
    this.__templateSchema = new Schema(props);
    this.__templateSchema.forEach(field => this.__templateSetupField(field));
    this.__templateEventer = new Eventer();

    if (!template) {
      return;
    }

    // do below only if template is exists
    this.__template = prepareTemplate(template);

    const annotateCallback = annotation => {
      this.__templateBinding.bindAnnotation(annotation);

      // register event notifier
      const { expr, accessor } = annotation;
      if (expr.mode === Expr.READWRITE && accessor instanceof ValueAccessor) {
        const eventName = getEventName(accessor.node);
        if (eventName) {
          const name = expr.name;
          const selector = accessor.node;
          const listener = evt => this.__templateHandleChangeEvent(evt, name);
          this.__templateEventer.addHandler({ name: eventName, selector, listener });
        }
      }
    };
    const eventCallback = handler => this.__templateEventer.addHandler(handler);
    this.__templateParser = new Parser(this, annotateCallback, eventCallback);
    this.__templateChildNodes = this.__templateParser.parse(this.__template);
  }

  __templateHandleChangeEvent (evt, name) {
    this.set(name, evt.target.value);
  }

  __templateSetupField (field) { // eslint-disable-line complexity
    let value;

    if (field.computed) {
      const expr = Expr.createFn(field.computed, [], true);
      const annotation = new Annotation(expr, accessorFactory(this, field.name));
      this.__templateBinding.bindAnnotation(annotation);
      value = expr.returnValue(this);
    }

    if (field.observer) {
      const expr = Expr.createFn(field.observer, [field.name], true);
      const annotation = new Annotation(expr);
      this.__templateBinding.bindAnnotation(annotation);
    }

    /**
     * below from component
     */

    const attrName = dashify(field.name);
    if (this.hasAttribute && this.hasAttribute(attrName)) {
      const attrVal = fixAttrValue(this.getAttribute(attrName), field.type);
      const expr = Expr.create(attrVal);

      if (field.notify && expr.mode === Expr.READWRITE) {
        const path = expr.name;
        this.__templateBinding.bindFunction(field.name, value => this.__templateParent.set(path, value));
      }

      value = expr.returnValue(this.__templateParent);
    }

    if (field.required && nothing(value)) {
      throw new Error(`${this.is}:${this.__id} missing required ${field.name}`);
    }

    this.set(field.name, value);
  }

  __templateUninitialize () {
    if (this.__templateMounted) {
      this.unmount();
    }

    this.__templateEventer.dispose();
    this.__templateEventer = undefined;
    this.__templateBinding.dispose();
    this.__templateBinding = undefined;
    this.__templateModeler.dispose();
    this.__templateModeler = undefined;
    this.__templateChildNodes = [];
    this.__template = undefined;
    this.__templateInvoker = undefined;
  }

  __templateRender () {
    const contentFragment = createFragment([...this.__templateHost.childNodes], [this.__templateMarker]);
    const templateFragment = createFragment(this.__templateChildNodes);

    templateFragment.querySelectorAll('slot').forEach(slot => {
      const name = slotName(slot);
      const parent = slot.parentElement || templateFragment;
      const marker = document.createComment(`slot ${name}`);

      parent.insertBefore(marker, slot);
      parent.removeChild(slot);

      if (name) {
        contentFragment.querySelectorAll(`[slot="${name}"]`).forEach(node => {
          parent.insertBefore(node, marker);
        });
      } else {
        parent.insertBefore(contentFragment, marker);
      }
    });

    this.__templateMarker.parentElement.insertBefore(templateFragment, this.__templateMarker);
  }

  __templateUnrender () {
    this.__templateChildNodes.forEach(node => {
      if (node.parentElement) {
        node.parentElement.removeChild(node);
      }
    });
  }
}

function getEventName (node) {
  const nodeName = node.nodeName;
  if (nodeName === 'INPUT') {
    const inputType = node.getAttribute('type');
    if (inputType === 'radio' || inputType === 'checkbox') {
      throw new Error('Unimplemented yet');
    }

    return 'input';
  }

  if (nodeName === 'TEXTAREA') {
    return 'input';
  }

  if (nodeName === 'SELECT') {
    return 'change';
  }
}

// function isUndefinedPropValue (propName, propValue) {
//   return propValue === undefined || (propName === 'title' && !propValue);
// }

function fixAttrValue (value, type) {
  if (type === Boolean && value === '') {
    return 'on';
  }

  return value;
}
