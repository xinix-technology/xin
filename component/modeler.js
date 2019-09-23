import { nothing, pathArray, dashify } from '../helpers';
import { Schema } from './schema';
import { Expr } from './expr';
import { Annotation } from './annotation';
import { accessorFactory } from './accessor';

export class Modeler {
  constructor ({ data, invoker, props, binding }) {
    this.data = data;
    this.invoker = invoker;
    this.binding = binding;
    this.initializers = {};
    this.schema = new Schema(props);
    this.schema.forEach(field => this.setupField(field));
  }

  traverse (path, immediateReturn) {
    return traverse(this.data, pathArray(path), immediateReturn);
  }

  get (path) {
    const { value } = this.traverse(path);
    return value;
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

    const { object, key } = this.traverse(path, false);

    object[key] = newValue;

    this.binding.notify(path);
  }

  all (data) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        this.set(key, data[key]);
      }
    }
  }

  push (path, ...values) {
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);

    const result = object[key].push(...values);
    this.binding.notify(path);

    return result;
  }

  pop (path) {
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);
    const result = object[key].pop();
    this.binding.notify(path);
    return result;
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);
    const result = object[key].splice(index, removeCount, ...values);
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

  }

  dispose () {
    this.data = undefined;
    this.invoker = undefined;
    this.binding = undefined;
    this.schema = undefined;
  }
}

function traverse (object, path, immediateReturn = true) { // eslint-disable-line max-params
  const key = path.shift();

  const value = nothing(object[key]) ? undefined : object[key];

  if (path.length === 0) {
    return { value, object, key, path };
  }

  if (nothing(value)) {
    if (immediateReturn) {
      const value = undefined;
      return { value, object, key, path };
    }

    object[key] = {};
  }

  return traverse(object[key], path, immediateReturn);
}

function fixAttrValue (value, type) {
  if (type === Boolean && value === '') {
    return 'on';
  }

  return value;
}
