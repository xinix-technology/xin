import { idGenerator, val, deserialize, pathArray, pathString, pathGet, pathSet } from '../../helpers';
import { Repository, event } from '../../core';
import { Expr } from '../expr';
import { Binding } from '../binding';
import { accessorFactory } from '../accessor';
import { Annotation } from '../annotation';
import { fix, slotName } from './helpers';

const nextId = idGenerator();

export class Template {
  constructor (template, props = {}) {
    this.__templateInitialize(template, props);
  }

  get $ () {
    return this.__templateHost.getElementsByTagName('*');
  }

  get $global () {
    return window;
  }

  get $repository () {
    return Repository.singleton();
  }

  $$ (selector) {
    return this.__templateHost.querySelector(selector);
  }

  dispose () {
    this.__templateUninitialize();
  }

  on () {
    event(this.__templateHost).on(...arguments);
  }

  off () {
    event(this.__templateHost).off(...arguments);
  }

  once () {
    event(this.__templateHost).once(...arguments);
  }

  waitFor () {
    return event(this.__templateHost).waitFor(...arguments);
  }

  fire (type, detail, options) {
    return event(this.__templateHost).fire(type, detail, options);
  }

  get (path) {
    return pathGet(this, path);
  }

  set (path, value) {
    if (arguments.length === 1 && typeof path === 'object') {
      const data = path;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          this.set(key, data[key]);
        }
      }
      return;
    }

    value = this.__templatePropCasting(path, value);
    if (value === this.get(path)) {
      return;
    }

    pathSet(this, path, value);

    this.notify(path);
  }

  push (path, ...values) {
    path = pathArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    const property = path.slice(-1).pop();

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    const result = object[property].push(...values);
    this.notify(path);

    return result;
  }

  pop (path) {
    path = pathArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    const property = path.slice(-1).pop();

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    const result = object[property].pop();
    this.notify(path);

    return result;
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    path = pathArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    const property = path.slice(-1).pop();

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    const result = object[property].splice(index, removeCount, ...values);
    this.notify(path);

    return result;
  }

  notify (path) {
    path = pathString(path);

    if (!this.__templateMounted) {
      this.__templateNotifyOnMounted = this.__templateNotifyOnMounted || [];
      if (this.__templateNotifyOnMounted.indexOf(path) === -1) {
        this.__templateNotifyOnMounted.push(path);
      }
      return;
    }

    const binding = this.__templateGetBinding(path);
    if (binding) {
      binding.dispatchEffect({ model: this });
    }
  }

  mount (host, marker) {
    if (this.__templateMounted) {
      throw new Error('Template already mounted');
    }

    if (!host) {
      throw new Error('Cannot mount to unknown host');
    }

    this.__templateHost = host;
    this.__templateStartListening();

    if (this.__template) {
      if (!marker) {
        if (this.__template.parentElement === this.__templateHost) {
          // when template parent is template host, it means that template is specific template
          // then use template as marker
          marker = this.__template;
        } else {
          // when template is not child of host, put marker to host
          marker = document.createComment(`marker-${this.__id}`);
          this.__templateHost.appendChild(marker);
        }
      }
      this.__templateMarker = marker;

      this.__templateRender();
    }

    this.__templateMounted = true;
    this.__templateNotifyOnMounted.forEach(key => this.notify(key));
    this.__templateNotifyOnMounted = [];

    this.notify('$global');
    this.notify('$repository');
  }

  unmount () {
    if (!this.__templateMounted) {
      throw new Error('Template already unmounted');
    }

    this.__templateMounted = false;
    this.__templateNotifyOnMounted = [];

    this.__templateStopListening();
    this.__templateRemoveGeneratedMarker();

    this.__templateHost = undefined;
    this.__templateMarker = undefined;

    if (this.__template) {
      this.__templateUnrender();
    }
  }

  __templatePropCasting (path, value) {
    if (!this.__templateProps) {
      return value;
    }

    path = pathArray(path);

    const prop = this.__templateProps[path[0]];
    if (!prop) {
      return value;
    }

    return deserialize(value, prop.type);
  }

  __templateInitData () {
    if (this.__id !== undefined) {
      return;
    }

    this.__id = nextId();
    this.__templateBinding = new Binding();
    this.__templateListeners = [];
    this.__templateDelegator = this;
    this.__templateMounted = false;
    this.__templateNotifyOnMounted = [];
  }

  __templateInitialize (template, props = {}) {
    this.__templateInitData();
    this.__templateInitProps(props);
    this.__templateInitValues();

    if (!template) {
      return;
    }

    if (typeof template === 'string') {
      const t = template;
      // create new template based on template property
      template = document.createElement('template');
      template.innerHTML = t;
    }

    // do below only if template is exists
    this.__template = fix(template);
    this.__templateChildNodes = [];

    this.__templateParseAnnotations();
  }

  __templateInitProps (props = {}) {
    this.__templateProps = { ...props };
    this.__templateInitialValues = {};

    props = this.__templateProps;
    for (const propKey in props) {
      this.__templateInitProp(propKey, props[propKey]);
    }
  }

  __templateInitProp (propKey, prop) {
    if ('computed' in prop) {
      const expr = Expr.getFn(prop.computed, [], true);
      this.__templateAnnotate(expr, accessorFactory(this, propKey));

      this.__templateInitialValues[propKey] = () => expr.invoke(this);
    }

    if ('observer' in prop) {
      const expr = Expr.getFn(prop.observer, [propKey], true);
      this.__templateAnnotate(expr);
    }
  }

  __templateInitValues () {
    const props = this.__templateProps;
    for (const propKey in props) {
      const prop = props[propKey];

      // set and force notify for the first time
      this[propKey] = this.__templateGetInitialValue(propKey, prop);

      // only notify if propValue already defined otherwise undefined value will be propagated to model
      if (this[propKey] !== undefined) {
        this.notify(propKey);
      }
    }
  }

  __templateGetInitialValue (propKey, prop) {
    let propValue;

    if (this.__templateInitialValues[propKey]) {
      propValue = this.__templateInitialValues[propKey]();
    } else {
      propValue = this[propKey];
    }

    if ('value' in prop && isUndefinedPropValue(propKey, propValue)) {
      propValue = val(prop.value);
    }

    // when property is undefined, throw error when property is required
    if (prop.required && propValue === undefined) {
      throw new Error(`${this.is}:${this.__id} missing required ${propKey}`);
    }

    return propValue;
  }

  __templateUninitialize () {
    this.__templateRemoveEventListener();

    if (this.__templateMounted) {
      this.unmount();
    }

    this.__templateUninitData();
  }

  __templateUninitData () {
    this.__templateBinding.dispose();
    this.__templateBinding = undefined;
    this.__templateChildNodes = undefined;
    this.__template = undefined;
    this.__templateDelegator = undefined;
  }

  __templateRemoveGeneratedMarker () {
    if (this.__templateMarker &&
      this.__templateMarker.parentElement === this.__templateHost &&
      this.__templateMarker.nodeType === Node.COMMENT_NODE &&
      this.__templateMarker.data === `marker-${this.__id}`) {
      this.__templateHost.removeChild(this.__templateMarker);
    }
  }

  __templateStartListening () {
    this.__templateListeners.forEach(({ name, selector, listener }) => this.on(name, selector, listener));
  }

  __templateStopListening () {
    this.__templateListeners.forEach(({ name, selector, listener }) => this.off(name, selector, listener));
  }

  __templateRender () {
    const contentFragment = document.createDocumentFragment();
    [...this.__templateHost.childNodes].forEach(node => {
      if (node === this.__templateMarker) return;
      contentFragment.appendChild(node);
    });

    const templateFragment = document.createDocumentFragment();
    this.__templateChildNodes.forEach(node => templateFragment.appendChild(node));

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

  __templateParseAnnotations () {
    const templateFragment = document.importNode(this.__template.content, true);
    this.__templateChildNodes = [...templateFragment.childNodes];

    const len = this.__templateChildNodes.length;

    for (let i = 0; i < len; i++) {
      const node = this.__templateChildNodes[i];

      this.__templateParseNodeAnnotations(node);
    }
  }

  __templateParseEventAnnotations (element, attrName) {
    // bind event annotation
    const attrValue = element.getAttribute(attrName);
    const name = attrName.slice(1, -1);
    const expr = Expr.getFn(attrValue, [], true);
    const selector = element;
    const listener = evt => expr.invoke(this, { evt });

    this.__templateAddEventListener({ name, selector, listener, expr });
  }

  __templateParseAttributeAnnotations (element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    const len = element.attributes.length;

    for (let i = 0; i < len; i++) {
      const attr = element.attributes[i];

      const attrName = attr.name;

      if (['id', 'class', 'style'].indexOf(attrName) !== -1) {
        continue;
      }

      if (attrName.indexOf('(') === 0) {
        this.__templateParseEventAnnotations(element, attrName);
      } else {
        const expr = Expr.get(attr.value);
        if (expr.type === Expr.STATIC) {
          continue;
        }

        // bind property annotation
        this.__templateAnnotate(expr, accessorFactory(element, attrName));
      }
    }
  }

  __templateParseElementAnnotations (element) {
    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateModel) {
      return;
    }

    element.__templateModel = this;

    if (notEmpty(element.attributes)) {
      this.__templateParseAttributeAnnotations(element);
    }

    if (notEmpty(element.childNodes)) {
      const childNodes = [].slice.call(element.childNodes);
      const childNodesLength = childNodes.length;

      for (let i = 0; i < childNodesLength; i++) {
        this.__templateParseNodeAnnotations(childNodes[i]);
      }
    }

    element.querySelectorAll('slot').forEach(slot => {
      slot.childNodes.forEach(node => {
        this.__templateParseNodeAnnotations(node);
      });
    });
  }

  __templateParseNodeAnnotations (node) {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        return this.__templateParseTextAnnotations(node);
      case Node.ELEMENT_NODE:
        return this.__templateParseElementAnnotations(node);
    }
  }

  __templateParseTextAnnotations (node) {
    const expr = Expr.get(node.textContent);
    if (expr.type === Expr.STATIC) {
      return false;
    }

    return this.__templateAnnotate(expr, accessorFactory(node));
  }

  __templateAnnotate (expr, accessor) {
    if (expr.type === Expr.STATIC) {
      throw new Error('Do not annotate static expr');
    }

    if (expr.constant) {
      accessor.set(expr.invoke(this));
      return false;
    }

    this.__templateAnnotateRead(expr, accessor);

    // register event notifier
    if (expr.mode === Expr.READWRITE && expr.type === Expr.PROPERTY && accessor.node instanceof HTMLElement) {
      this.__templateAnnotateWrite(expr, accessor);
    }

    return true;
  }

  __templateAnnotateRead (expr, accessor) {
    // annotate every paths
    const annotation = new Annotation(expr, accessor);

    if (annotation.expr.type === Expr.METHOD) {
      this.__templateAddAnnotationBinding(annotation.expr.fn.name, annotation);
    }

    annotation.expr.varArgs.forEach(arg => {
      this.__templateAddAnnotationBinding(arg.name, annotation);
    });
  }

  __templateAnnotateWrite (expr, accessor) {
    const { node } = accessor;
    const { nodeName } = node;

    const selector = node;
    const listener = evt => this.set(expr.name, accessor.get());

    if (nodeName === 'INPUT') {
      const inputType = node.getAttribute('type');
      if (inputType === 'radio' || inputType === 'checkbox') {
        throw new Error('Unimplemented yet');
      } else {
        this.__templateAddEventListener({ name: 'input', selector, listener });
      }
    } else if (nodeName === 'TEXTAREA') {
      this.__templateAddEventListener({ name: 'input', selector, listener });
    } else if (nodeName === 'SELECT') {
      this.__templateAddEventListener({ name: 'change', selector, listener });
    }
  }

  __templateAddEventListener (handler) {
    if (!handler.name) {
      throw new Error('Event listener must define name');
    }

    if (!handler.listener) {
      throw new Error('Event listener must define listener callback');
    }

    this.__templateListeners.push(handler);
  }

  __templateRemoveEventListener ({ name, selector, listener } = {}) {
    const matchName = elName => name === undefined || name === elName;
    const matchSelector = elSelector => selector === undefined || selector === elSelector;
    const matchListener = elListener => listener === undefined || listener === elListener;

    this.__templateListeners = this.__templateListeners.filter(el => {
      return !(matchName(el.name) && matchSelector(el.selector) && matchListener(el.listener));
    });
  }

  /**
   * Get binding object
   *
   * @param {string|array} path
   * @returns {Binding}
   */
  __templateGetBinding (path) {
    if (!path) {
      return this.__templateBinding;
    }

    const segments = pathArray(path);

    return segments.reduce((binding, segment) => binding.getChild(segment), this.__templateBinding);
  }

  __templateAddCallbackBinding (propKey, callback) {
    const annotation = new Annotation(Expr.get(propKey, true), accessorFactory(callback));
    this.__templateGetBinding(propKey).annotate(annotation);
    return annotation;
  }

  __templateAddAnnotationBinding (propKey, annotation) {
    this.__templateGetBinding(propKey).annotate(annotation);
  }
}

function isUndefinedPropValue (propName, propValue) {
  return propValue === undefined || (propName === 'title' && !propValue);
}

function notEmpty (iter) {
  return iter && iter.length;
}
