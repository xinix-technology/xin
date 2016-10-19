webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var xin = __webpack_require__(1);
	var T = __webpack_require__(4);
	
	var FILTER_ALL = function FILTER_ALL() {
	  return true;
	};
	
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
	      var _this2 = this;
	
	      if (this.rows && this.rows.length) {
	        this.rows.forEach(function (row) {
	          row.__children.forEach(function (node) {
	            node.parentElement.removeChild(node);
	          });
	        });
	      }
	
	      if (!items) {
	        return;
	      }
	
	      this.rows = [];
	      items.filter(this.filter || FILTER_ALL).forEach(function (item, index) {
	        try {
	          var row = new T(_this2, _this2.__templateModel, _this2);
	          row.set(_this2.as, item);
	          row.set(_this2.indexAs, index);
	
	          row.render();
	          _this2.rows.push(row);
	        } catch (err) {
	          console.error(err.stack);
	        }
	      });
	    }
	  }, {
	    key: 'itemForElement',
	    value: function itemForElement(element) {
	      while (element && !element.__model) {
	        element = element.parentElement;
	      }
	      return element.__item;
	    }
	  }, {
	    key: 'indexForElement',
	    value: function indexForElement(element) {
	      while (element && !element.__model) {
	        element = element.parentElement;
	      }
	      return element.__index;
	    }
	  }, {
	    key: 'modelForElement',
	    value: function modelForElement(element) {
	      while (element && !element.__model) {
	        element = element.parentElement;
	      }
	      return element.__model;
	    }
	  }, {
	    key: '_filterChanged',
	    value: function _filterChanged(filter) {
	      if (typeof filter !== 'function') {
	        return;
	      }
	
	      this._itemsChanged(this.items);
	    }
	
	    // created () {
	    //   console.log('created', this);
	    //   // this.rowProto = {}; //xin.Component;
	    //   // xin.base({
	    //   //   is: '$xin-repeat-row',
	    //   // });
	    //
	    //   // var templateHost = this;
	    //   // var __set = this.rowProto.set;
	    //   // this.rowProto.set = function (name, value) {
	    //   //   var nameSegments = name.split('.');
	    //   //   switch (nameSegments[0]) {
	    //   //     case templateHost.as:
	    //   //     case templateHost.indexAs:
	    //   //       return __set.apply(this, arguments);
	    //   //     default:
	    //   //       // var oldValue = this.__host.get(name);
	    //   //       return this.__host.set(name, value);
	    //   //   }
	    //   // };
	    //   //
	    //   // var __get = this.rowProto.get;
	    //   // this.rowProto.get = function (name) {
	    //   //   var nameSegments = name.split('.');
	    //   //   switch (nameSegments[0]) {
	    //   //     case templateHost.as:
	    //   //     case templateHost.indexAs:
	    //   //       return __get.apply(this, arguments);
	    //   //     default:
	    //   //       return this.__host.get(name);
	    //   //   }
	    //   // };
	    //
	    //   // if (!this.content && HTMLTemplateElement.decorate) {
	    //   //   HTMLTemplateElement.decorate(this);
	    //   // }
	    //
	    //   // Row is class to create new row
	    //   // var self = this;
	    //   // this.Row = function (item, index) {
	    //   //   var row = this;
	    //   //   var fragment = this.fragment = document.importNode(self.content, true);
	    //   //   this.__root = xin.dom(fragment).childNodes.map(function (node) {
	    //   //     node.__model = row;
	    //   //     node.__index = index;
	    //   //     node.__item = item;
	    //   //     return node;
	    //   //   });
	    //   //
	    //   //   this.__initialize();
	    //   //
	    //   //   this.__host = self.__parent;
	    //   //
	    //   //   this.__parseAnnotations();
	    //   //
	    //   //   this.set(self.as, item);
	    //   //
	    //   //   // if (self.parentElement) {
	    //   //   //  xin.dom(self.parentElement).insertBefore(fragment, self);
	    //   //   // }
	    //   // };
	    //   // this.Row.prototype = this.rowProto;
	    // }
	
	    // __insertRow (item, index) {
	    //   console.log(item, index);
	    //   // var fragment = document.importNode(this.content, true);
	    //   // var row = {
	    //   //  __root: xin.dom(fragment).childNodes
	    //   // };
	    //
	    //   // row.__root.forEach(function(node) {
	    //   //  node.__model = row;
	    //   //  node.__index = index;
	    //   //  node.__item = item;
	    //   // });
	    //
	    //   // Object.setPrototypeOf(row, this.rowProto);
	    //
	    //   // row.__initialize();
	    //
	    //   // row.__host = this.__parent;
	    //
	    //   // row.__parseAnnotations();
	    //
	    //   // row.set(this.as, item);
	    //
	    //   // if (this.parentElement) {
	    //   //  xin.dom(this.parentElement).insertBefore(fragment, this);
	    //   // }
	    //
	    //   var row = new this.Row(item, index);
	    //
	    //   return row;
	    // }
	
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