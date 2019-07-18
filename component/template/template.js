import { event } from '../../core';
import { idGenerator } from '../../core/helpers/id-generator';
import { Expr } from '../expr';
import { Binding } from '../binding';
import { accessorFactory } from '../accessor';
import { Annotation } from '../annotation';

import { fix } from './fix';
import { slotName } from './slot';

const nextId = idGenerator();

export class Template {
  constructor (template) {
    this.__templateInitialize(template);
  }

  get $ () {
    return this.__templateHost.getElementsByTagName('*');
  }

  $$ (selector) {
    return this.querySelector(selector);
  }

  on () {
    event(this.__templateHost || this).on(...arguments);
  }

  off () {
    event(this.__templateHost || this).off(...arguments);
  }

  once () {
    event(this.__templateHost || this).once(...arguments);
  }

  waitFor () {
    return event(this.__templateHost || this).waitFor(...arguments);
  }

  all (obj) {
    for (const i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        this.set(i, obj[i]);
      }
    }
  }

  get (path) {
    let object = this;

    this.__templateGetPathAsArray(path).some(segment => {
      if (object === undefined || object === null) {
        object = undefined;
        return true;
      }

      object = object[segment];
      return false;
    });

    return object;
  }

  set (path, value) {
    if (arguments.length === 1 && typeof path === 'object') {
      const data = path;
      for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
          this.set(i, data[i]);
        }
      }
      return;
    }

    path = this.__templateGetPathAsArray(path);

    const oldValue = this.get(path);

    if (value === oldValue) {
      return;
    }

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

    object[property] = value;

    this.notify(path, value);
  }

  push (path, ...values) {
    path = this.__templateGetPathAsArray(path);

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
    this.notify(path, object[property]);

    return result;
  }

  pop (path) {
    path = this.__templateGetPathAsArray(path);

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
    this.notify(path, object[property]);

    return result;
  }

  splice (path, index, removeCount, ...values) {
    path = this.__templateGetPathAsArray(path);

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
    this.notify(path, object[property]);

    return result;
  }

  notify (path, value) {
    path = this.__templateGetPathAsString(path);

    if (!this.__templateReady) {
      this.__templateNotifyOnReady = this.__templateNotifyOnReady || [];
      if (this.__templateNotifyOnReady.indexOf(path) === -1) {
        this.__templateNotifyOnReady.push(path);
      }
      return;
    }

    const binding = this.__templateGetBinding(path);
    if (binding) {
      if (value === undefined) {
        value = this.get(path);
      }

      binding.walkEffect('set', value);
    }
  }

  __templateInitialize (template) {
    this.__templateId = nextId();
    this.__templateBindings = {};

    this.__templateReady = false;
    this.__templateNotifyOnReady = [];

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

    this.__templateFragment = document.importNode(this.__template.content, true);
    this.__templateParseAnnotations();
  }

  mount (host, marker) {
    this.__templateHost = host;
    this.__templateMarker = marker;

    if (!this.__template) {
      return this.__templateRender();
    }

    if (!marker) {
      if (this.__template && this.__template.parentElement === this.__templateHost) {
        // when template parent is template host, it means that template is specific template
        // then use template as marker
        this.__templateMarker = this.__template;
      } else {
        // when template is not child of host, put marker to host
        this.__templateMarker = document.createComment(`marker-${this.__templateId}`);
        this.__templateHost.appendChild(this.__templateMarker);
      }
    }

    let contentFragment;

    if (this.__template) {
      contentFragment = document.createDocumentFragment();
      [].slice.call(host.childNodes).forEach(node => {
        if (node === this.__templateMarker) return;
        contentFragment.appendChild(node);
      });
    }

    this.__templateRender(contentFragment);
  }

  dismount () {
    this.__templateUninitialize();
  }

  __templateRender (contentFragment) {
    this.__templateReady = true;

    this.__templateNotifyOnReady.forEach(key => {
      this.notify(key, this.get(key));
    });
    this.__templateNotifyOnReady = [];

    if (!this.__template) {
      return;
    }

    const fragment = this.__templateFragment;
    this.__templateFragment = null;

    if (contentFragment && contentFragment instanceof window.DocumentFragment) {
      fragment.querySelectorAll('slot').forEach(slot => {
        const name = slotName(slot);
        const parent = slot.parentElement || fragment;
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
    }

    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);
  }

  __templateUninitialize () {
    this.__templateChildNodes.forEach(node => {
      if (node.parentElement) {
        node.parentElement.removeChild(node);
      }
    });
  }

  __templateGetPathAsArray (path) {
    if (typeof path !== 'string') {
      return path;
    }

    return path.split('.');
  }

  __templateGetPathAsString (path) {
    if (typeof path === 'string') {
      return path;
    }

    return path.join('.');
  }

  __templateParseAnnotations () {
    this.__templateChildNodes = [...this.__templateFragment.childNodes];

    const len = this.__templateChildNodes.length;

    for (let i = 0; i < len; i++) {
      const node = this.__templateChildNodes[i];

      switch (node.nodeType) {
        case window.Node.ELEMENT_NODE:
          this.__templateParseElementAnnotations(node);
          break;
        case window.Node.TEXT_NODE:
          this.__templateParseTextAnnotations(node);
          break;
      }
    }
  }

  __templateParseEventAnnotations (element, attrName) {
    // bind event annotation
    const attrValue = element.getAttribute(attrName);
    let eventName = attrName.slice(1, -1);

    if (eventName === 'tap') {
      eventName = 'click';
    }

    const context = this;
    const expr = Expr.getFn(attrValue, [], true);

    this.on(eventName, element, evt => {
      expr.invoke(context, { evt });
    });
  }

  __templateParseAttributeAnnotations (element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    let annotated = false;

    const len = element.attributes.length;

    for (let i = 0; i < len; i++) {
      const attr = element.attributes[i];

      const attrName = attr.name;

      if (attrName === 'id' || attrName === 'class' || attrName === 'style') {
        continue;
      }

      if (attrName.indexOf('(') === 0) {
        this.__templateParseEventAnnotations(element, attrName);
      } else {
        // bind property annotation
        annotated = this.__templateAnnotate(Expr.get(attr.value), accessorFactory(element, attrName)) || annotated;
      }
    }

    return annotated;
  }

  __templateParseElementAnnotations (element) {
    let annotated = false;

    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateModel) {
      return annotated;
    }

    element.__templateModel = this;

    if (element.attributes && element.attributes.length) {
      annotated = this.__templateParseAttributeAnnotations(element) || annotated;
    }

    if (element.childNodes && element.childNodes.length) {
      const childNodes = [].slice.call(element.childNodes);
      const childNodesLength = childNodes.length;

      for (let i = 0; i < childNodesLength; i++) {
        annotated = this.__templateParseNodeAnnotations(childNodes[i]) || annotated;
      }
    }

    element.querySelectorAll('slot').forEach(slot => {
      slot.childNodes.forEach(node => {
        annotated = this.__templateParseNodeAnnotations(node) || annotated;
      });
    });

    return annotated;
  }

  __templateParseNodeAnnotations (node) {
    switch (node.nodeType) {
      case window.Node.TEXT_NODE:
        return this.__templateParseTextAnnotations(node);
      case window.Node.ELEMENT_NODE:
        return this.__templateParseElementAnnotations(node);
    }
  }

  __templateParseTextAnnotations (node) {
    const expr = Expr.get(node.textContent);
    const accessor = accessorFactory(node);
    return this.__templateAnnotate(expr, accessor);
  }

  __templateAnnotate (expr, accessor) {
    if (expr.type === 's') {
      return false;
    }

    if (expr.constant) {
      accessor.set(expr.invoke(this));
      return false;
    }

    // annotate every paths
    const annotation = new Annotation(this, expr, accessor);

    if (expr.type === 'm') {
      this.__templateGetBinding(expr.fn.name).annotate(annotation);
    }

    expr.vpaths.forEach(arg => {
      this.__templateGetBinding(arg.name).annotate(annotation);
    });

    return true;
  }

  __templateGetBinding (path) {
    const segments = path.split('.');
    let bindings;
    let binding;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      bindings = binding ? binding.paths : this.__templateBindings;

      if (!bindings[segment]) {
        bindings[segment] = new Binding(this, segment);
      }

      binding = bindings[segment];
    }

    return binding;
  }
}
