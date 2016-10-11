/* eslint no-proto: 0 */
/**
 * getPrototypeOf()
 */
if (typeof Object.getPrototypeOf !== 'function') {
  Object.getPrototypeOf = (function () {
    'use strict';

    function getPrototypeValue (o, p) {
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
      return function (object) {
        return getPrototypeValue(object, '__proto__');
      };
    } else {
      return function (object) {
        getPrototypeValue(object, 'constructor').prototype;
      };
    }
  }());
}
