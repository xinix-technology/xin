webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Fx = __webpack_require__(20);
	var xin = __webpack_require__(1);
	
	__webpack_require__(25);
	
	var Pager = function (_xin$Component) {
	  _inherits(Pager, _xin$Component);
	
	  function Pager() {
	    _classCallCheck(this, Pager);
	
	    return _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).apply(this, arguments));
	  }
	
	  _createClass(Pager, [{
	    key: 'add',
	    value: function add(element) {
	      this.views = this.views || [];
	      this.views.push(element);
	    }
	  }, {
	    key: 'setFocus',
	    value: function setFocus(element) {
	      if (element) {
	        var index = this.views.indexOf(element);
	        var oldIndex = -1;
	        if (this.focused$) {
	          oldIndex = this.views.indexOf(this.focused$);
	        }
	
	        if (oldIndex < index) {
	          this.__transitionForward(this.focused$, element);
	        } else if (oldIndex > index) {
	          this.__transitionBackward(this.focused$, element);
	        }
	      } else if (this.focused$) {
	        this.focused$.setFocus(false);
	      }
	
	      this.focused$ = element;
	    }
	  }, {
	    key: '__transitionBackward',
	    value: function __transitionBackward(prevEl, nextEl) {
	      Promise.all([prevEl.transitionFx.play('out', -1), nextEl.transitionFx.play('in', -1)]).then(function () {
	        prevEl.setVisible(false);
	        prevEl.setFocus(false);
	        nextEl.setVisible(true);
	        nextEl.setFocus(true);
	        this.$focused = nextEl;
	      }.bind(this));
	    }
	  }, {
	    key: '__transitionForward',
	    value: function __transitionForward(prevEl, nextEl) {
	      if (prevEl) {
	        Promise.all([prevEl.transitionFx.play('out', 1), nextEl.transitionFx.play('in', 1)]).then(function () {
	          prevEl.setVisible(false);
	          prevEl.setFocus(false);
	          nextEl.setVisible(true);
	          nextEl.setFocus(true);
	          this.$focused = nextEl;
	        }.bind(this));
	      } else {
	        new Fx(nextEl, 'none').play('in', 1).then(function () {
	          nextEl.setVisible(true);
	          nextEl.setFocus(true);
	          this.$focused = nextEl;
	        }.bind(this));
	      }
	    }
	  }]);
	
	  return Pager;
	}(xin.Component);
	
	xin.define('xin-pager', Pager);
	xin.Pager = Pager;
	
	module.exports = Pager;

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./pager.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./pager.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(23)();
	// imports
	
	
	// module
	exports.push([module.id, "xin-pager {\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\n\nxin-pager .xin-view {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=pager.js.map