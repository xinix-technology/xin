/**
 * Copyright (c) 2015 Xinix Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

(function(root) {
  'use strict';

  var xin = root.xin;

  var matches = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;

  var Dom = xin.Dom = function(element) {
    if (!(this instanceof Dom)) {
      return new Dom(element);
    }

    this.element = element;

    //Object.defineProperties(this, {
    //  childNodes: {
    //    get: function() {
    //      return Array.prototype.slice.call(this.element.childNodes);
    //    }
    //  },
    //  children: {
    //    get: function() {
    //      return Array.prototype.slice.call(this.element.children);
    //    }
    //  }
    //});
  };

  Dom.prototype = {
    get childNodes() {
      return Array.prototype.slice.call(this.element.childNodes);
    },

    get children() {
      return Array.prototype.slice.call(this.element.children);
    },
  };

  Dom.prototype.querySelector = function(selector) {
    return this.element.querySelector(selector);
  };

  Dom.prototype.querySelectorAll = function(selector) {
    return Array.prototype.slice.call(this.element.querySelectorAll(selector));
  };

  Dom.prototype.parent = function(selector) {
    var parent$ = this.element.parentElement;

    if (!selector) {
      return parent$;
    }

    while(parent$) {
      if (!selector || matches.call(parent$, selector)) {
        break;
      }
      parent$ = parent$.parentElement;
    }

    return parent$;
  };

  Dom.prototype.parents = function(selector) {
    var parents$ = [];
    var parent$ = this.element.parentElement;

    while(parent$) {
      if (!selector || matches.call(parent$, selector)) {
        parents$.push(parent$);
      }
      parent$ = parent$.parentElement;
    }

    return parents$;
  };

  Dom.prototype.matches = function(selector) {
    return matches.call(this.element, selector);
  };

  Dom.prototype.is = function(selector) {
    return matches.call(this.element, selector);
  };

  Dom.prototype.appendChild = function(node) {
    this.element.appendChild(node);
    return node;
  };

  Dom.prototype.insertBefore = function(node, refNode) {
    if (!refNode) {
      return this.appendChild(node);
    }

    this.element.insertBefore(node, refNode);

    return node;
  };

  Dom.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };

  Dom.prototype.fire = function(type, detail, options) {
    options = options || {};
    detail = detail || {};

    var event;
    var node = options.node || this.element;
    var bubbles = options.bubbles === undefined ? true : options.bubbles;
    var cancelable = Boolean(options.cancelable);

    switch(type) {
      case 'click':
        event = new Event(type, {
          bubbles: bubbles,
          cancelable: cancelable
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
          detail: detail
        });
        node.dispatchEvent(event);
        break;
    }

    return event;
  };

  Dom.prototype.transform = function(transform) {
    node = this;
    node.style.webkitTransform = transform;
    node.style.mozTransform = transform;
    node.style.msTransform = transform;
    node.style.oTransform = transform;
    node.style.transform = transform;
  };
})(this);
