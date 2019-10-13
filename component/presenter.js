import { Expr } from './expr';
import { empty, setupMarker, createFragment, slotName, teardownMarker, prepareTemplate, camelize } from '../helpers';
import { Annotation } from './annotation';
import {
  textWriter,
  htmlWriter,
  valueWriter,
  classWriter,
  styleWriter,
  attributeWriter,
  propertyWriter,
} from './writers';
import { event } from '../core';

export class Presenter {
  constructor ({ instance, modeler, template }) {
    if (template) {
      template = prepareTemplate(template);
    }

    this.instance = instance;
    this.modeler = modeler;
    this.template = template;
    this.nodes = [];
    this.handlers = [];
    this.isReplacing = true;

    this.initialize();
  }

  get $ () {
    return this.host.getElementsByTagName('*');
  }

  $$ (selector) {
    return this.host.querySelector(selector);
  }

  dispose () {
    if (this.running) {
      this.stop();
    }

    this.instance = undefined;
    this.modeler = undefined;
    this.template = undefined;
    this.parent = undefined;
    this.nodes = [];
    this.handlers = [];
  }

  initialize () {
    if (!this.template) {
      return;
    }

    const templateFragment = document.importNode(this.template.content, true);
    this.nodes = [...templateFragment.childNodes];
    this.nodes.forEach(node => this.parseNode(node));
  }

  setParent (parent) {
    this.parent = parent;
  }

  parseNode (node) {
    const nodeType = node.nodeType;

    if (nodeType === Node.TEXT_NODE) {
      return this.parseText(node);
    }

    if (nodeType === Node.ELEMENT_NODE) {
      return this.parseElement(node);
    }
  }

  parseText (node) {
    const content = node.textContent;
    if (!Expr.validate(content)) {
      return;
    }

    const expr = new Expr(content);

    // emptying text
    node.textContent = '';

    this.modeler.bindAnnotation(new Annotation(expr, textWriter(node)));
  }

  parseElement (element) {
    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateParsed) {
      return;
    }

    element.__templateParsed = true;

    if (element.__templatePresenter) {
      element.__templatePresenter.setParent(this.instance);
    }

    if (!empty(element.attributes)) {
      this.parseAttribute(element);
    }

    if (!empty(element.childNodes)) {
      const childNodes = [...element.childNodes];
      const childNodesLength = childNodes.length;

      for (let i = 0; i < childNodesLength; i++) {
        this.parseNode(childNodes[i]);
      }
    }

    // element.querySelectorAll('slot').forEach(slot => {
    //   slot.childNodes.forEach(node => {
    //     this.parseNode(node);
    //   });
    // });
  }

  parseAttribute (element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    const len = element.attributes.length;
    const attributes = [...element.attributes];
    for (let i = 0; i < len; i++) {
      const attr = attributes[i];

      const { name, value } = attr;

      if (['id', 'class', 'style'].indexOf(name) !== -1) {
        continue;
      }

      if (name.indexOf('(') === 0) {
        this.parseEventAttribute(element, name, value);
      } else {
        this.parseValueAttribute(element, name, value);
      }
    }
  }

  parseValueAttribute (element, name, value) {
    if (!Expr.validate(value)) {
      return;
    }

    const expr = new Expr(value);
    const writer = resolveElementWriter(element, name);
    this.modeler.bindAnnotation(new Annotation(expr, writer));

    if (expr.isReadWrite()) {
      const selector = element;
      const exprPath = expr.args[0].string;
      const type = getEventType(selector);
      if (type) {
        const callback = evt => {
          if (evt.target.__id === undefined) {
            evt.stopImmediatePropagation();
            this.modeler.set(exprPath, evt.target.value);
            return;
          }

          if (name === evt.detail.path) {
            evt.stopImmediatePropagation();
            this.modeler.set(exprPath, evt.detail.value);
          }
        };

        this.addHandler(type, selector, callback);
      }
    }

    // remove attribute after ready to annotate
    element.removeAttribute(name);
  }

  parseEventAttribute (element, name, value) {
    // bind event annotation
    const expr = new Expr(value, Expr.READONLY);
    if (!expr.isInvocable()) {
      throw new Error(`Invalid expr for event, "${value}"`);
    }

    const type = name.slice(1, -1);
    const selector = element;
    const callback = evt => expr.eval(this.modeler, { evt });

    this.addHandler(type, selector, callback);
  }

  start (host, marker) {
    this.running = true;
    this.host = host;

    if (this.template) {
      this.marker = setupMarker(host, this.instance.__id, marker);
      this.render();
    }

    this.handlers.forEach(([type, selector, callback]) => this.on(type, selector, callback));
  }

  stop () {
    this.handlers.forEach(([type, selector, callback]) => this.off(type, selector, callback));

    if (this.template) {
      this.unrender();
      teardownMarker(this.host, this.instance.__id, this.marker);
      this.marker = undefined;
    }

    this.host = undefined;
    this.running = false;
  }

  render () {
    if (!this.template) {
      return;
    }

    const templateFragment = createFragment(this.nodes);

    if (this.isReplacing) {
      const contentFragment = createFragment([...this.host.childNodes], [this.marker]);
      templateFragment.querySelectorAll('slot').forEach(slot => {
        const name = slotName(slot);
        const parent = slot.parentElement || templateFragment;
        const slotMarker = document.createComment(`slot ${name}`);

        parent.insertBefore(slotMarker, slot);
        parent.removeChild(slot);

        if (name) {
          contentFragment.querySelectorAll(`[slot="${name}"]`).forEach(node => {
            parent.insertBefore(node, slotMarker);
          });
        } else {
          parent.insertBefore(contentFragment, slotMarker);
        }
      });
    }

    this.marker.parentElement.insertBefore(templateFragment, this.marker);
  }

  unrender () {
    this.nodes.forEach(node => {
      if (node.parentElement) {
        node.parentElement.removeChild(node);
      }
    });
  }

  on () {
    event(this.host).on(...arguments);
  }

  off () {
    event(this.host).off(...arguments);
  }

  once () {
    event(this.host).once(...arguments);
  }

  waitFor () {
    return event(this.host).waitFor(...arguments);
  }

  fire (type, detail, options) {
    return event(this.host).fire(type, detail, options);
  }

  addHandler (type, selector, callback) {
    if (!type) {
      throw new Error('Event handler must define type');
    }

    if (!callback) {
      throw new Error('Event handler must define callback');
    }

    this.handlers.push([type, selector, callback]);
  }

  removeHandler (type, selector, callback) {
    const matchType = hType => type === undefined || type === hType;
    const matchSelector = hSelector => selector === undefined || selector === hSelector;
    const matchListener = hCallback => callback === undefined || callback === hCallback;

    this.handlers = this.handlers.filter(([hType, hSelector, hCallback]) => {
      return !(matchType(hType) && matchSelector(hSelector) && matchListener(hCallback));
    });
  }
}

function getEventType (node) {
  const nodeName = node.nodeName;

  if (['INPUT', 'TEXTAREA'].includes(nodeName)) {
    const inputType = node.getAttribute('type');
    if (['radio', 'checkbox'].includes(inputType)) {
      throw new Error('Unimplemented yet');
    }

    return 'input';
  }

  return 'change';
}

const WRITER_RESOLVERS = [
  (node, name) => {
    if (name === 'value' && ['INPUT', 'SELECT'].includes(node.nodeName)) {
      return valueWriter(node);
    }
  },
  (node, name) => {
    if (name === 'text') {
      return textWriter(node);
    }
  },
  (node, name) => {
    if (name === 'html') {
      return htmlWriter(node);
    }
  },
  (node, name) => {
    if (name.startsWith('class.')) {
      return classWriter(node, name.split('.').splice(1).join('.'));
    }
  },
  (node, name) => {
    if (name.startsWith('style.')) {
      return styleWriter(node, name.split('.').splice(1).join('.'));
    }
  },
  (node, name) => {
    if (name.endsWith('$')) {
      return attributeWriter(node, name.slice(0, -1));
    }
  },
  (node, name) => {
    return propertyWriter(node, camelize(name));
  },
];

function resolveElementWriter (element, name) {
  for (let i = 0; i < WRITER_RESOLVERS.length; i++) {
    const writerResolve = WRITER_RESOLVERS[i];

    const writer = writerResolve(element, name);
    if (writer) {
      return writer;
    }
  }

  throw new Error(`Unable to resolve writer for ${element}:${name}`);
}
