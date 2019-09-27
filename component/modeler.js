import { nothing, dashify, inspect } from '../helpers';
import { Schema } from './schema';
import { Expr } from './expr';
import { Annotation } from './annotation';
import { accessorFactory } from './accessor';
import { Context } from '../core';

export class Modeler extends Context {
  constructor ({ data, invoker, props, binding }) {
    super();

    this.data = data;
    this.invoker = invoker;
    this.binding = binding;
    this.initializers = {};
    this.schema = new Schema(props);
    this.schema.forEach(field => this.setupField(field));
  }

  set (path, value) {
    if (typeof path === 'object') {
      return this.all(path);
    }

    const oldValue = this.get(path);
    const newValue = this.schema.get(path, value);
    if (!nothing(oldValue) && this.schema.eq(path, value, oldValue)) {
      return;
    }

    super.set(path, newValue);
    this.binding.notify(path);
  }

  push (path, ...values) {
    const result = super.push(path, ...values);
    this.binding.notify(path);
    return result;
  }

  pop (path) {
    const result = super.pop(path);
    this.binding.notify(path);
    return result;
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    const result = super.splice(path, index, removeCount, ...values);
    this.binding.notify(path);
    return result;
  }

  setupField (field) { // eslint-disable-line complexity
    let initializer;

    if (field.computed) {
      const expr = Expr.createFn(field.computed, [], true);
      const annotation = new Annotation(expr, accessorFactory(this, field.name));
      this.binding.bindAnnotation(annotation);
      initializer = () => expr.returnValue(this);
    }

    if (field.observer) {
      const expr = Expr.createFn(field.observer, [field.name], true);
      const annotation = new Annotation(expr);
      this.binding.bindAnnotation(annotation);
    }

    /**
     * below from component
     */

    const attrName = dashify(field.name);
    if (this.data.hasAttribute && this.data.hasAttribute(attrName)) {
      const attrVal = fixAttrValue(this.data.getAttribute(attrName), field.type);
      const expr = Expr.create(attrVal);

      if (field.notify && expr.mode === Expr.READWRITE) {
        const path = expr.name;
        this.binding.bindFunction(field.name, value => this.data.__templateParent.set(path, value));
      }

      initializer = () => expr.returnValue(this.data.__templateParent);
    }

    if (!initializer) {
      initializer = () => field.get();
    }

    this.initializers[field.name] = initializer;
  }

  start () {
    this.schema.forEach(field => {
      const initializer = this.initializers[field.name];
      const value = initializer();

      if (field.required && nothing(value)) {
        throw new Error(`${this.is}:${this.__id} missing required ${field.name}`);
      }

      const availableValue = this.get(field.name);
      if (nothing(availableValue)) {
        this.set(field.name, value);
      } else {
        this.binding.notify(field.name);
      }
    });
  }

  stop () {
    // noop
  }

  dispose () {
    this.data = undefined;
    this.invoker = undefined;
    this.binding = undefined;
    this.schema = undefined;
  }

  __xinInspect () {
    return inspect(this.data);
  }
}

function fixAttrValue (value, type) {
  if (type === Boolean && value === '') {
    return 'on';
  }

  return value;
}
