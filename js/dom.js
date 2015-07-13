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

(function(root, factory) {
  'use strict';

  root.xin = root.xin || {};
  root.xin.dom = factory(root, root.xin);

})(this, function(root, xin) {
  'use strict';

  var matches = function(element, selector) {
    return (element.matches ||
      element.matchesSelector ||
      element.msMatchesSelector ||
      element.mozMatchesSelector ||
      element.webkitMatchesSelector ||
      element.oMatchesSelector).call(element, selector);
  };

  var Dom = function(element) {
    if (!(this instanceof Dom)) return new Dom(element);

    this.element = element;
  };

  Dom.prototype.parent = function(selector) {
    var $parent = this.element.parentElement;

    while($parent && !matches($parent, selector)) {
      $parent = $parent.parentElement;
    }

    return $parent;
  };

  Dom.prototype.parents = function(selector) {
    var $parents = [];
    var $parent = this.element.parentElement;

    while($parent) {
      if (matches($parent, selector)) {
        $parents.push($parent);
      }
      $parent = $parent.parentElement;
    }

    return $parents;
  };

  return Dom;
});