import { nothing, dashify, inspect, pathHead, pathString } from '../helpers';
import { Schema } from './schema';
import { Expr } from './expr';
import { Annotation } from './annotation';
import { Context } from '../core';
import { propertyWriter } from './writers';
import { Binding } from './binding';

/**
 * @typedef {import('./binding').Binding} Binding
 */

export class Modeler extends Context {
  /**
   * Create new modeler
   * @param {Object}  options
   * @param {Object}  options.instance
   * @param {Object}  options.props
   */
  constructor ({ instance, props }) {
    super(instance);

    this.binding = new Binding();
    this.initializers = {};

    this.deferredNotifications = [];

    this.schema = new Schema(props);
    this.schema.forEach(field => FIELD_INITIALIZERS.forEach(init => init(this, field)));
  }

  set (path, value) {
    if (typeof path === 'object') {
      return this.all(path);
    }

    const oldValue = this.get(path);
    if (this.schema.eq(path, value, oldValue)) {
      return;
    }

    const newValue = this.schema.get(path, value);
    super.set(path, newValue);
    this.notify(path);
  }

  push (path, ...values) {
    const result = super.push(path, ...values);
    this.notify(path);
    return result;
  }

  pop (path) {
    const result = super.pop(path);
    this.notify(path);
    return result;
  }

  notify (path) {
    if (!this.running) {
      return this.deferNotify(path);
    }

    this.binding.notify(path, { model: this });

    // const value = this.get(path);
    // const instance = this.instance;
    // instance.fire('model-change', { path, value, instance });
  }

  /**
   * Splice an array at path
   * @param {any} path
   * @param {any} index
   * @param {any} removeCount
   * @param  {...any} values
   */
  splice (path) {
    const result = super.splice(...arguments);
    this.notify(path);
    return result;
  }

  start () {
    this.running = true;

    this.schema.forEach(field => {
      const availableValue = this.get(field.name);
      if (!nothing(availableValue)) {
        this.notify(field.name);
        return;
      }

      const initializer = this.initializers[field.name];
      const value = initializer();
      if (field.required && nothing(value)) {
        throw new Error(`${this.is}:${this.__id} missing required ${field.name}`);
      }

      this.set(field.name, value);
    });

    this.deferredNotifications.forEach(path => this.notify(path));
    this.deferredNotifications = [];
  }

  stop () {
    this.deferredNotifications = [];
    this.running = false;
  }

  dispose () {
    this.instance = undefined;
    this.invoker = undefined;
    this.binding = undefined;
    this.schema = undefined;
  }

  annotate (path, annotation) {
    this.notify(pathHead(path));
    this.binding.traverse(path, true).addAnnotation(annotation);
  }

  deannotate (path, annotation) {
    this.binding.traverse(path).removeAnnotation(annotation);
  }

  bindFunction (path, fn) {
    const expr = new Expr(path, Expr.READONLY);
    const annotation = new Annotation(expr, fn);
    this.annotate(path, annotation);
    return annotation;
  }

  bindAnnotation (annotation) {
    if (annotation.expr.isInvocable()) {
      this.annotate(annotation.expr.fn.string, annotation);
    }

    annotation.expr.varArgs.forEach(arg => this.annotate(arg.string, annotation));
  }

  getAnnotatedPaths () {
    return this.binding.getAnnotatedPaths(...arguments);
  }

  deferNotify (path) {
    const pathStr = pathString(path);
    if (this.deferredNotifications.indexOf(pathStr) === -1) {
      this.deferredNotifications.push(pathStr);
    }
  }

  __xinInspect () {
    return inspect(this.instance);
  }
}

const FIELD_INITIALIZERS = [
  (modeler, field) => {
    if (field.computed) {
      const expr = field.computed;
      const annotation = new Annotation(expr, propertyWriter(modeler.instance, field.name));
      modeler.bindAnnotation(annotation);
      field.initializer = () => expr.eval(modeler);
    }
  },

  (modeler, field) => {
    if (field.observers.length) {
      field.observers.forEach(observer => {
        const annotation = new Annotation(observer);
        modeler.bindAnnotation(annotation);
      });
    }
  },

  (modeler, field) => {
    const attrName = dashify(field.name);
    const instance = modeler.instance;

    if (field.notify) {
      const path = field.name;
      modeler.bindFunction(field.name, value => instance.fire('change', { path, value }));
    }

    if (instance.hasAttribute && instance.hasAttribute(attrName)) {
      const attrVal = fixAttrValue(instance.getAttribute(attrName), field.type);
      if (!Expr.validate(attrVal)) {
        field.initializer = () => attrVal;
      }
    }
  },

  (modeler, field) => {
    modeler.initializers[field.name] = field.initializer || (() => {
      const value = field.getDefaultValue();
      return value;
    });
  },
];

function fixAttrValue (value, type) {
  if (type === Boolean && value === '') {
    return 'on';
  }

  return value;
}
