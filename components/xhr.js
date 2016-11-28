import xin from '../';

class XHR extends xin.Component {
  get props () {
    return {
      auto: {
        type: Boolean,
        value: false,
      },

      method: {
        type: String,
        value: 'get',
      },

      url: {
        type: String,
        observer: '_urlChanged',
      },

      as: {
        type: String,
        value: 'intelligent',
        observer: '_asChanged',
      },

      debounceDuration: {
        type: Number,
        value: 0,
      },

      request: {
        type: Object,
        notify: true,
      },

      response: {
        type: Object,
        notify: true,
      },

      error: {
        type: Object,
        notify: true,
      },
    };
  }

  _urlChanged () {
    if (this.auto) {
      this.generateRequest();
    }
  }

  _asChanged () {
    if (this.auto) {
      this.generateRequest();
    }
  }

  _requestFlight () {
    let url = this.generateUrl();
    if (!url) {
      return;
    }

    return this.req({
      method: this.method,
      url: url,
      as: this.as,
    }).then(xhr => {
      // let body = xhr.body;
      this.fire('response', {
        // body: body,
        xhr: xhr,
      });
      return xhr.responseBody;
    }, err => {
      this.fire('error', {
        error: err,
        xhr: err.xhr,
      });
      throw err;
    });
  }

  generateRequest () {
    this.debounce('_requestFlight', this._requestFlight, this.debounceDuration);
  }

  generateUrl () {
    return this.url;
  }

  __prepareOptions (options) {
    options = options || {};
    options.method = (options.method || 'get').toUpperCase();
    return options;
  }

  req (options) {
    options = this.__prepareOptions(options);

    return new Promise((resolve, reject) => {
      let xhr = new window.XMLHttpRequest();
      let doResolve = () => {
        this.set('response', xhr.responseBody);
        resolve(xhr);
      };
      let doReject = err => {
        this.set('error', err);
        reject(err);
      };

      try {
        xhr.open(options.method, options.url, options.async || true);
        xhr.onload = () => {
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
                  xhr.responseBody = JSON.parse(xhr.responseText);
                } catch (err) {
                  return doReject(err);
                }
                break;
              case 'xml':
                xhr.responseBody = xhr.responseXML;
                break;
              default:
                xhr.responseBody = xhr.response;
                break;
            }
            doResolve();
          } else {
            doReject(new Error('Http status ' + xhr.status));
          }
        };
        xhr.onerror = doReject;
        xhr.send(options.body);
      } catch (err) {
        doReject(err);
      }
    });
  }
}

xin.define('xin-xhr', XHR);
xin.XHR = XHR;

export default XHR;
