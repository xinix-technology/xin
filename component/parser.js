import { Expr } from './expr';
import { accessorFactory } from './accessor';
import { empty } from '../helpers';
import { Annotation } from './annotation';

export class Parser {
  constructor (parent, annotateCallback, eventCallback) {
    this.parent = parent;
    this.annotateCallback = annotateCallback;
    this.eventCallback = eventCallback;
  }

  parse (template) {
    const templateFragment = document.importNode(template.content, true);
    const childNodes = [...templateFragment.childNodes];

    childNodes.forEach(node => this.parseNode(node));

    return childNodes;
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
    const expr = Expr.create(node.textContent);
    if (expr.type === Expr.STATIC) {
      return false;
    }

    // emptying text
    node.textContent = '';

    this.annotateCallback(new Annotation(expr, accessorFactory(node)));
  }

  parseElement (element) {
    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateParent) {
      return;
    }

    element.__templateParent = this.parent;

    if (!empty(element.attributes)) {
      this.parseAttribute(element);
    }

    if (!empty(element.childNodes)) {
      const childNodes = [].slice.call(element.childNodes);
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

    for (let i = 0; i < len; i++) {
      const attr = element.attributes[i];

      const attrName = attr.name;

      if (['id', 'class', 'style'].indexOf(attrName) !== -1) {
        continue;
      }

      if (attrName.indexOf('(') === 0) {
        this.parseEvent(element, attrName);
      } else {
        const expr = Expr.create(attr.value);
        if (expr.type === Expr.STATIC) {
          continue;
        }

        // remove attribute after ready to annotate
        element.removeAttribute(attrName);

        this.annotateCallback(new Annotation(expr, accessorFactory(element, attrName)));
      }
    }
  }

  parseEvent (element, attrName) {
    // bind event annotation
    const attrValue = element.getAttribute(attrName);
    const name = attrName.slice(1, -1);
    const expr = Expr.createFn(attrValue, [], true);
    const selector = element;
    const listener = evt => expr.invoke(this.parent, { evt });

    this.eventCallback({ name, selector, listener, expr });
  }
}
