webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* globals Node */
	
	var xin = __webpack_require__(1);
	var T = __webpack_require__(4);
	
	var FILTER_ALL = function FILTER_ALL() {
	  return true;
	};
	
	var RepeatRow = function (_T) {
	  _inherits(RepeatRow, _T);
	
	  function RepeatRow(repeat, item, index) {
	    _classCallCheck(this, RepeatRow);
	
	    var _this = _possibleConstructorReturn(this, (RepeatRow.__proto__ || Object.getPrototypeOf(RepeatRow)).call(this, repeat, repeat.__templateModel, repeat));
	
	    _this.__repeat = repeat;
	    _this.__repeatAs = repeat.as;
	    _this.__repeatIndexAs = repeat.indexAs;
	
	    _this.__templateChildNodes.forEach(function (node) {
	      if (node.nodeType === Node.ELEMENT_NODE) {
	        node.__repeatModel = _this;
	      }
	    });
	
	    _this.update(item, index);
	
	    _this.render();
	    return _this;
	  }
	
	  _createClass(RepeatRow, [{
	    key: 'update',
	    value: function update(item, index) {
	      this[this.__repeatAs] = item;
	      this[this.__repeatIndexAs] = index;
	      this.notify(this.__repeatAs, item);
	      this.notify(this.__repeatIndexAs, index);
	    }
	  }, {
	    key: 'set',
	    value: function set(path, value) {
	      path = this.__templateGetPathAsArray(path);
	
	      if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
	        return _get(RepeatRow.prototype.__proto__ || Object.getPrototypeOf(RepeatRow.prototype), 'set', this).call(this, path, value);
	      }
	
	      return this.__templateHost.set(path, value);
	    }
	  }, {
	    key: 'get',
	    value: function get(path) {
	      path = this.__templateGetPathAsArray(path);
	
	      if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
	        return _get(RepeatRow.prototype.__proto__ || Object.getPrototypeOf(RepeatRow.prototype), 'get', this).call(this, path);
	      }
	
	      return this.__templateHost.get(path);
	    }
	  }, {
	    key: 'notify',
	    value: function notify(path, value) {
	      path = this.__templateGetPathAsArray(path);
	
	      if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
	        return _get(RepeatRow.prototype.__proto__ || Object.getPrototypeOf(RepeatRow.prototype), 'notify', this).call(this, path, value);
	      }
	
	      return this.__templateHost.notify(path, value);
	    }
	  }]);
	
	  return RepeatRow;
	}(T);
	
	;
	
	var Repeat = function (_xin$base) {
	  _inherits(Repeat, _xin$base);
	
	  function Repeat() {
	    _classCallCheck(this, Repeat);
	
	    return _possibleConstructorReturn(this, (Repeat.__proto__ || Object.getPrototypeOf(Repeat)).apply(this, arguments));
	  }
	
	  _createClass(Repeat, [{
	    key: '__initTemplate',
	    value: function __initTemplate() {
	      T.prototype.__templateInitialize.call(this, null, this);
	    }
	  }, {
	    key: '_itemsChanged',
	    value: function _itemsChanged(items) {
	      var _this3 = this;
	
	      this.rows = this.rows || [];
	
	      var len = 0;
	
	      if (items && items.length) {
	        (function () {
	          var filter = _this3.filter || FILTER_ALL;
	          items.forEach(function (item, index) {
	            if (filter(item)) {
	              if (_this3.rows[index]) {
	                _this3.rows[index].update(item, index);
	              } else {
	                _this3.rows.push(new RepeatRow(_this3, item, index));
	              }
	
	              len++;
	            }
	          });
	        })();
	      }
	
	      this.rows.splice(len).forEach(function (row) {
	        row.__templateUninitialize();
	      });
	    }
	  }, {
	    key: 'itemForElement',
	    value: function itemForElement(element) {
	      while (element && !element.__repeatModel) {
	        element = element.parentElement;
	      }
	      return element.__repeatModel.get(this.as);
	    }
	  }, {
	    key: 'indexForElement',
	    value: function indexForElement(element) {
	      while (element && !element.__repeatModel) {
	        element = element.parentElement;
	      }
	      return element.__repeatModel.get(this.indexAs);
	    }
	  }, {
	    key: 'modelForElement',
	    value: function modelForElement(element) {
	      while (element && !element.__repeatModel) {
	        element = element.parentElement;
	      }
	      return element.__repeatModel;
	    }
	  }, {
	    key: '_filterChanged',
	    value: function _filterChanged(filter) {
	      if (typeof filter !== 'function') {
	        return;
	      }
	
	      this._itemsChanged(this.items);
	    }
	  }, {
	    key: 'props',
	    get: function get() {
	      return {
	        items: {
	          type: Array,
	          observer: '_itemsChanged'
	        },
	
	        as: {
	          type: String,
	          value: 'item'
	        },
	
	        indexAs: {
	          type: String,
	          value: 'index'
	        },
	
	        filter: {
	          type: Object,
	          observer: '_filterChanged'
	        }
	      };
	    }
	  }]);
	
	  return Repeat;
	}(xin.base('HTMLTemplateElement'));
	
	xin.define('xin-repeat', Repeat, { extends: 'template' });
	xin.Repeat = Repeat;
	
	module.exports = Repeat;

/***/ }
]);
//# sourceMappingURL=repeat.js.map