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
  factory(root, root.xin);

})(this, function(root, xin) {
  'use strict';

  xin.params = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  xin.get = function(url, options) {
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

    return xin.xhr(options);
  };

  xin.post = function(url, options) {
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
      options.method = 'post';
    }

    return xin.xhr(options);
  };

  xin.xhr = function(options) {
    if (!options) {
      throw new Error('No options');
    } else if (typeof options === 'string') {
      options = {url: options};
    }

    options.method = options.method || 'GET';
    var headers = {};
    if (options.headers) {
      for(var i in options.headers) {
        headers[i.toLowerCase()] = options.headers[i];
      }
    }

    var request = new XMLHttpRequest();
    var promise = new Promise(function(resolve, reject) {
      request.open(options.method.toUpperCase(), options.url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var response = request.responseText;
          switch(headers['content-type']) {
            case 'application/json':
              response = JSON.parse(response);
              break;
          }
          resolve(response);
        } else {
          reject(new Error('HTTP fail with status ' + request.status));
        }
      };

      request.onerror = reject;

      var params;

      if (options.method.toUpperCase() === 'POST') {
        headers['content-type'] = headers['content-type'] || 'application/x-www-form-urlencoded';
        switch(headers['content-type']) {
          case 'application/json':
            params = JSON.stringify(options.data);
            break;
          default:
            params = xin.params(options.data);
            break;
        }

        // FIXME vulnerable?
        // headers['content-length'] = headers['content-length'] || params.length;
        // headers['connection'] = 'close';
      }

      for(var i in headers) {
        request.setRequestHeader(i, headers[i]);
      }

      if (options.method.toUpperCase() === 'GET') {
        request.send();
      } else {
        request.send(params);
      }
    });

    promise.xhr = request;

    return promise;
  };

  xin.import = function(url) {
    return new Promise(function(resolve, reject) {
      var $link = document.createElement('link');
      $link.setAttribute('href', url);
      $link.setAttribute('rel', 'import');

      $link.addEventListener('load', function(evt) {
        resolve($link);
      });

      $link.addEventListener('error', function(evt) {
        reject($link);
      });

      document.head.appendChild($link);
    });
  };

});