webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var xin = __webpack_require__(1);
	
	__webpack_require__(22);
	
	var SETUP = xin.setup.withDefault('xin.View', {
	  transition: 'transition-slide'
	});
	
	var View = function (_xin$Component) {
	  _inherits(View, _xin$Component);
	
	  function View() {
	    _classCallCheck(this, View);
	
	    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
	  }
	
	  _createClass(View, [{
	    key: 'created',
	    value: function created() {
	      this.classList.add('xin-view');
	    }
	  }, {
	    key: 'attached',
	    value: function attached() {
	      this.classList.remove('xin-view--focus');
	      this.classList.remove('xin-view--visible');
	
	      this.transitionFx = new xin.Fx(this);
	
	      if (this.parentElement.add) {
	        this.parentElement.add(this);
	      }
	
	      this.__app.route(this.uri, this.focus.bind(this));
	      this.fire('routed');
	    }
	  }, {
	    key: '__focusing',
	    value: function __focusing() {
	      if (typeof this.focusing === 'function') {
	        return this.focusing.apply(this, arguments);
	      }
	    }
	  }, {
	    key: '__focused',
	    value: function __focused() {
	      if (typeof this.focused === 'function') {
	        return this.focused.apply(this, arguments);
	      }
	    }
	  }, {
	    key: 'focus',
	    value: function focus(parameters) {
	      this.set('parameters', parameters || {});
	
	      this.fire('focusing');
	
	      if (this.parentElement.setFocus) {
	        this.parentElement.setFocus(this);
	      } else {
	        [].forEach.call(this.parentElement.children, function (element) {
	          if (element.setFocus) {
	            element.setFocus(false);
	            element.setVisible(false);
	          }
	        });
	
	        if (this.setFocus) {
	          this.setFocus(true);
	          this.setVisible(true);
	        }
	      }
	    }
	  }, {
	    key: '__blurred',
	    value: function __blurred() {
	      if (typeof this.blurred === 'function') {
	        return this.blurred.apply(this, arguments);
	      }
	    }
	  }, {
	    key: 'setVisible',
	    value: function setVisible(visible) {
	      this.classList[visible ? 'add' : 'remove']('xin-view--visible');
	
	      this.fire(visible ? 'show' : 'hide');
	
	      if (!visible) {
	        [].forEach.call(this.querySelectorAll('.xin-view-behavior.xin-view--visible'), function (el) {
	          return el.setVisible(visible);
	        });
	      }
	    }
	  }, {
	    key: 'setFocus',
	    value: function setFocus(focus) {
	      this.classList[focus ? 'add' : 'remove']('xin-view--focus');
	
	      this.fire(focus ? 'focus' : 'blur');
	
	      if (!focus) {
	        [].forEach.call(this.querySelectorAll('.xin-view-behavior.xin-view--focus'), function (el) {
	          if (el.parentElement.setFocus) {
	            el.parentElement.setFocus(null);
	          } else {
	            el.setFocus(focus);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'props',
	    get: function get() {
	      return {
	        uri: {
	          type: String,
	          required: true
	        },
	        transition: {
	          type: String,
	          value: SETUP.transition
	        }
	      };
	    }
	  }, {
	    key: 'listeners',
	    get: function get() {
	      return {
	        focusing: '__focusing',
	        focus: '__focused',
	        blur: '__blurred'
	      };
	    }
	  }]);
	
	  return View;
	}(xin.Component);
	
	xin.define('xin-view', View);
	xin.View = View;
	
	module.exports = View;

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./view.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./view.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports
	
	
	// module
	exports.push([module.id, ".xin-view {\n  box-sizing: border-box;\n  display: none;\n}\n\n.xin-view.xin-view--visible {\n  display: block;\n}\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=view.js.map