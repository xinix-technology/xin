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

  var SEQUENCE_ID = 0;

  xin.templates = {};
  xin.instanceTemplates = {};

  xin.__fixNestedTemplate = function(template) {
    // dont have to fix if not polyfilled
    if (!HTMLTemplateElement.decorate) {
      return template;
    }

    if (!template.content) {
      HTMLTemplateElement.decorate(template);
    }

    Array.prototype.forEach.call(template.content.querySelectorAll('template'), function(t) {
      var isA = t.getAttribute('is');
      if (!isA) {
        var parent$ = t.parentNode;
        if (parent$.children && parent$.children.length === 1) {
          var id = String(SEQUENCE_ID++);
          parent$.setAttribute('template', id);
          xin.instanceTemplates[id] = t;
          parent$.removeChild(t);
        }
      }
    });

    return template;
  };

  xin.templateFor = function(element) {
    return xin.instanceTemplates[element.getAttribute('template')] || xin.templates[element.is];
  };

  xin.createComponent({
    is: 'xin-template',

    extends: 'template',

    properties: {
      for: String,
    },

    created: function() {
      this.for = this.getAttribute('for');
      xin.templates[this.for] = this;
    },
  });
})(this);
