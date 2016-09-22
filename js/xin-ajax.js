(function(root) {
  'use strict';

  var xin = root.xin;

  xin.createComponent({
    is: 'xin-ajax',

    properties: {
      method: {
        type: String,
        value: 'get',
      },

      url: {
        type: String,
        observer: '__urlChanged',
      },

      as: {
        type: String,
        value: 'intelligent',
        observer: '__asChanged',
      },

      debounceDuration: {
        type: Number,
        value: 0,
      },
    },

    __urlChanged: function() {
      this.debounce('__request', this.__request, this.debounceDuration);
    },

    __asChanged: function() {
      this.debounce('__request', this.__request, this.debounceDuration);
    },

    __request: function() {
      var url = this.generateUrl();
      if (!url) {
        return;
      }

      return this.request({
        method: this.method,
        url: url,
        as: this.as,
      }).then(function(xhr) {
        this.fire('response', {
          body: xhr.body,
          xhr: xhr,
        });
      }.bind(this), function(err) {
        this.fire('error', {
          error: err,
          xhr: err.xhr,
        });
      }.bind(this));
    },

    generateUrl: function() {
      return this.url;
    },

    __prepareOptions: function(options) {
      options = options || {};
      options.method = (options.method || 'get').toUpperCase();
      return options;
    },

    request: function(options) {
      options = this.__prepareOptions(options);
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        try {
          xhr.open(options.method, options.url, options.async || true);
          xhr.onload = function() {
            var handleAs = options.as;
            if (handleAs === 'intelligent') {
              var contentType = xhr.getResponseHeader('Content-Type');
              if (contentType.indexOf('json') >= 0) {
                handleAs = 'json';
              } else if (contentType.indexOf('html') >= 0) {
                handleAs = 'html';
              } else if (contentType.indexOf('xml') >= 0) {
                handleAs = 'xml';
              } else {
                handleAs = 'text';
              }
            }
            if (xhr.status >= 200 && xhr.status < 400) {
              switch (handleAs) {
                case 'json':
                  try {
                    xhr.body = JSON.parse(xhr.responseText);
                    resolve(xhr);
                  } catch (err) {
                    err.xhr = xhr;
                    reject(err);
                  }
                  break;
                case 'xml':
                  xhr.body = xhr.responseXML;
                  resolve(xhr);
                  break;
                default:
                  xhr.body = xhr.response;
                  resolve(xhr);
              }
            } else {
              var err = new Error('Http status ' + xhr.status);
              err.xhr = xhr;
              reject(err);
            }
          };
          xhr.onerror = function(err) {
            err.xhr = xhr;
            reject(err);
          };
          xhr.send(options.body);
        } catch (err) {
          err.xhr = xhr;
          reject(err);
        }
      });
    },
  });
})(this);
