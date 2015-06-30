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
  factory(root.xin);

})(this, function(root) {
  'use strict';

  root.get = function(url, options) {
    switch(arguments.length) {
      case 0:
        options = null;
        break;
      case 1:
        options = url;
        if (typeof url === 'string') {
          options = {
            url: url
          };
        } else {
          options = url;
        }
        break;
      default:
        options.url = url;
    }

    if (options) {
      options.method = 'get';
    }

    return root.xhr(options);
  };

  root.xhr = function(options) {
    if (!options) {
      throw new Error('No options')
    } else if (typeof options === 'string') {
      options = {url: options};
    }

    options.method = options.method || 'GET';

    var request = new XMLHttpRequest();
    var promise = new Promise(function(resolve, reject) {
      request.open(options.method.toUpperCase(), options.url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          resolve(request.responseText);
        } else {
          reject(new Error('HTTP fail with status ' + request.status));
        }
      };

      request.onerror = reject;

      request.send();
    });

    promise.xhr = request;

    return promise;
  };
});