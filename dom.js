/* globals HTMLElement, Event, CustomEvent */

const matches = HTMLElement.prototype.matches ||
  HTMLElement.prototype.matchesSelector ||
  HTMLElement.prototype.webkitMatchesSelector ||
  HTMLElement.prototype.mozMatchesSelector ||
  HTMLElement.prototype.msMatchesSelector;

class Dom {
  constructor (element) {
    this.element = element;
  }

  get childNodes () {
    return Array.prototype.slice.call(this.element.childNodes);
  }

  get children () {
    return Array.prototype.slice.call(this.element.children);
  }

  querySelector (selector) {
    return this.element.querySelector(selector);
  }

  querySelectorAll (selector) {
    return Array.prototype.slice.call(this.element.querySelectorAll(selector));
  }

  parent (selector) {
    var parent$ = this.element.parentElement;

    if (!selector) {
      return parent$;
    }

    while (parent$) {
      if (!selector || matches.call(parent$, selector)) {
        break;
      }
      parent$ = parent$.parentElement;
    }

    return parent$;
  }

  parents (selector) {
    var parents$ = [];
    var parent$ = this.element.parentElement;

    while (parent$) {
      if (!selector || matches.call(parent$, selector)) {
        parents$.push(parent$);
      }
      parent$ = parent$.parentElement;
    }

    return parents$;
  }

  matches (selector) {
    return matches.call(this.element, selector);
  }

  is (selector) {
    return matches.call(this.element, selector);
  }

  appendChild (node) {
    this.element.appendChild(node);
    return node;
  }

  insertBefore (node, refNode) {
    if (!refNode) {
      return this.appendChild(node);
    }

    this.element.insertBefore(node, refNode);

    return node;
  }

  remove () {
    this.element.parentNode.removeChild(this.element);
  }

  fire (type, detail, options) {
    options = options || {};
    detail = detail || {};

    var event;
    var node = options.node || this.element;
    var bubbles = options.bubbles === undefined ? true : options.bubbles;
    var cancelable = Boolean(options.cancelable);

    switch (type) {
      case 'click':
        event = new Event(type, {
          bubbles: bubbles,
          cancelable: cancelable,
        });

        // TODO check if without this works on every browsers
        // event = document.createEvent('HTMLEvents');
        // event.initEvent(type, true, false);

        node.dispatchEvent(event);

        break;
      default:
        event = new CustomEvent(type, {
          bubbles: Boolean(bubbles),
          cancelable: cancelable,
          detail: detail,
        });
        node.dispatchEvent(event);
        break;
    }

    return event;
  }

  transform (transform) {
    this.style.webkitTransform = transform;
    this.style.mozTransform = transform;
    this.style.msTransform = transform;
    this.style.oTransform = transform;
    this.style.transform = transform;
  }
}

function dom (element) {
  return new Dom(element);
}

module.exports = dom;
