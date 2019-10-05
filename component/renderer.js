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

export class Renderer {
  constructor ({ instance, binding, eventer, template }) {
    this.instance = instance;
    this.binding = binding;
    this.eventer = eventer;
    this.childNodes = [];

    this.parse(prepareTemplate(template));
    this.setRenderCallback(() => this._defaultRenderCallback());
  }

  dispose () {
    this.instance = undefined;
    this.binding = undefined;
    this.eventer = undefined;
    this.childNodes = [];
  }

  setRenderCallback (callback) {
    this.renderCallback = callback;
  }

  parse (template) {
    const templateFragment = document.importNode(template.content, true);
    this.childNodes = [...templateFragment.childNodes];
    this.childNodes.forEach(node => this.parseNode(node));
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

    this.binding.bindAnnotation(new Annotation(expr, textWriter(node)));
  }

  parseElement (element) {
    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateParent) {
      return;
    }

    element.__templateParent = this.instance;

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

    element.querySelectorAll('slot').forEach(slot => {
      slot.childNodes.forEach(node => {
        this.parseNode(node);
      });
    });
  }

  parseAttribute (element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    const len = element.attributes.length;
    const attributes = [...element.attributes];
    for (let i = 0; i < len; i++) {
      const attr = attributes[i];

      const attrName = attr.name;

      if (['id', 'class', 'style'].indexOf(attrName) !== -1) {
        continue;
      }

      if (attrName.indexOf('(') === 0) {
        this.parseEvent(element, attrName);
      } else {
        const content = attr.value;

        if (!Expr.validate(content)) {
          continue;
        }

        const expr = new Expr(content);
        const writer = resolveElementWriter(element, attrName);
        this.binding.bindAnnotation(new Annotation(expr, writer));

        if (expr.isReadWrite()) {
          const selector = element;
          const name = getEventName(selector);
          const exprPath = expr.args[0].string;
          const listener = evt => {
            const { path = exprPath, value = evt.target.value } = evt.detail || {};
            if (path !== exprPath) {
              return;
            }

            evt.stopImmediatePropagation();
            this.instance.set(path, value);
          };
          this.eventer.addHandler({ name, selector, listener });
        }

        // remove attribute after ready to annotate
        element.removeAttribute(attrName);
      }
    }
  }

  parseEvent (element, attrName) {
    // bind event annotation
    const attrValue = element.getAttribute(attrName);
    const name = attrName.slice(1, -1);
    const expr = new Expr(attrValue, Expr.READONLY);
    if (!expr.isInvocable()) {
      throw new Error(`Invalid expr for event, "${attrValue}"`);
    }
    const selector = element;
    const listener = evt => expr.eval({
      ...this.instance,
      evt,
    });

    this.eventer.addHandler({ name, selector, listener, expr });
  }

  render (host, marker) {
    this.host = host;
    this.marker = setupMarker(host, this.instance.__id, marker);
    this.renderCallback(this);
  }

  _defaultRenderCallback () {
    const contentFragment = createFragment([...this.host.childNodes], [this.marker]);
    const templateFragment = createFragment(this.childNodes);

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

    this.marker.parentElement.insertBefore(templateFragment, this.marker);
  }

  unrender () {
    teardownMarker(this.host, this.instance.__id, this.marker);

    this.marker = undefined;
    this.host = undefined;

    this.childNodes.forEach(node => {
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
