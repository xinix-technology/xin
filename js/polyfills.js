/* eslint no-proto: 0 */

/**
 * getPrototypeOf()
 */
if (typeof Object.getPrototypeOf !== 'function') {
  Object.getPrototypeOf = (function() {
    'use strict';

    function getPrototypeValue(o, p) {
      if (o.hasOwnProperty(p)) {
        var ownValue = o[ p ];
        if (delete o[ p ]) {
          var prototypeValue = o[ p ];
          o[ p ] = ownValue;
          return prototypeValue;
        } else {
          return o[ p ];
        }
      } else {
        return o[ p ];
      }
    }
    if (typeof ''.__proto__ === 'object') {
      return function(object) {
        return getPrototypeValue(object, '__proto__');
      };
    } else {
      return function(object) {
        getPrototypeValue(object, 'constructor').prototype;
      };
    }
  }());
}

/**
 * setPrototypeOf()
 */
/* jslint devel: true, indent: 2 */
// 15.2.3.2
if (!Object.setPrototypeOf) {
  Object.setPrototypeOf = (function(Object, magic) {
    'use strict';
    var set;
    function checkArgs(O, proto) {
      if (typeof O !== 'object' || O === null) {
        throw new TypeError('can not set prototype on a non-object');
      }
      if (typeof proto !== 'object' && proto !== null) {
        throw new TypeError('can only set prototype to an object or null');
      }
    }
    function setPrototypeOf(O, proto) {
      checkArgs(O, proto);
      set.call(O, proto);
      return O;
    }
    try {
      // this works already in Firefox and Safari
      set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
      set.call({}, null);
    } catch (err) {
      if (
        // IE < 11 cannot be shimmed
        Object.prototype !== {}[magic] ||
        // neither can any browser that actually
        // implemented __proto__ correctly
        // (all but old V8 will return here)
        {__proto__: null}.__proto__ === void 0
        // this case means null objects cannot be passed
        // through setPrototypeOf in a reliable way
        // which means here a **Sham** is needed instead
      ) {
        // reekoheek hacked!
        // return;
        return function(O, proto) {
          O.__proto__ = proto;
          return O;
        };
      }
      // nodejs 0.8 and 0.10 are (buggy and..) fine here
      // probably Chrome or some old Mobile stock browser
      set = function(proto) {
        this[magic] = proto;
      };
      // please note that this will **not** work
      // in those browsers that do not inherit
      // __proto__ by mistake from Object.prototype
      // in these cases we should probably throw an error
      // or at least be informed about the issue
      setPrototypeOf.polyfill = setPrototypeOf(
        setPrototypeOf({}, null),
        Object.prototype
      ) instanceof Object;
      // setPrototypeOf.polyfill === true means it works as meant
      // setPrototypeOf.polyfill === false means it's not 100% reliable
      // setPrototypeOf.polyfill === undefined
      // or
      // setPrototypeOf.polyfill ==  null means it's not a polyfill
      // which means it works as expected
      // we can even delete Object.prototype.__proto__;
    }
    return setPrototypeOf;
  }(Object, '__proto__'));
}

// @license http://opensource.org/licenses/MIT
// copyright Paul Irish 2015

// Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
//   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
// as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

// if you want values similar to what you'd get with real perf.now, place this towards the head of the page
// but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed

(function() {
  'use strict';

  if ('performance' in window === false) {
    window.performance = {};
  }

  Date.now = (Date.now || function() {  // thanks IE8
    return new Date().getTime();
  });

  if ('now' in window.performance === false) {
    var nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }
})();
