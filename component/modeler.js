import { nothing, dashify, inspect } from '../helpers';
import { Schema } from './schema';
import { Expr } from './expr';
import { Annotation } from './annotation';
import { Context } from '../core';
import { propertyWriter } from './writers';

/**
 * @typedef {import('./binding').Binding} Binding
 */

export class Modeler extends Context {
  /**
   * Create new modeler
   * @param {Object}  options
   * @param {Object}  options.instance
   * @param {Object}  options.invoker
   * @param {Object}  options.props
   * @param {Binding} options.binding
   */
  constructor ({ instance, invoker, props, binding }) {
    super();

    if (!instance) {
      throw new Error('Something wrong');
    }

    this.instance = instance;
    this.invoker = invoker;
    this.binding = binding;
    this.initializers = {};

    this.schema = new Schema(props);
    this.schema.forEach(field => FIELD_INITIALIZERS.forEach(init => init(this, field)));
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

  /**
   * Splice an array at path
   * @param {any} path
   * @param {any} index
   * @param {any} removeCount
   * @param  {...any} values
   */
  splice (path) {
    const result = super.splice(...arguments);
    this.binding.notify(path);
    return result;
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
    this.instance = undefined;
    this.invoker = undefined;
    this.binding = undefined;
    this.schema = undefined;
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
      modeler.binding.bindAnnotation(annotation);
      field.initializer = () => expr.eval(modeler);
    }
  },

  (modeler, field) => {
    if (field.observers.length) {
      field.observers.forEach(observer => {
        const annotation = new Annotation(observer);
        modeler.binding.bindAnnotation(annotation);
      });
    }
  },

  (modeler, field) => {
    const attrName = dashify(field.name);
    const instance = modeler.instance;
    if (instance.hasAttribute && instance.hasAttribute(attrName)) {
      const attrVal = fixAttrValue(instance.getAttribute(attrName), field.type);

      if (Expr.validate(attrVal)) {
        const expr = new Expr(attrVal);

        if (field.notify && expr.mode === Expr.READWRITE) {
          const exprPath = expr.args[0].string;
          modeler.binding.bindFunction(field.name, value => instance.__templateParent.set(exprPath, value));
        }

        field.initializer = () => expr.eval(instance.__templateParent);
      } else {
        field.initializer = () => attrVal;
      }
    }
  },

  (modeler, field) => {
    modeler.initializers[field.name] = field.initializer || (() => field.get());
  },
];

function fixAttrValue (value, type) {
  if (type === Boolean && value === '') {
    return 'on';
  }

  return value;
}
