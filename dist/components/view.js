webpackJsonp([0],{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./view.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./view.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, ".xin-view {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  box-sizing: border-box;\n  display: none;\n}\n\n.xin-view.xin-view--visible {\n  display: block;\n}\n", ""]);

// exports


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _src = __webpack_require__(0);

var _src2 = _interopRequireDefault(_src);

__webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SETUP_TRANSITION = _src2.default.setup.get('xin.View.transition') || 'slide';

var View = function (_xin$Component) {
  _inherits(View, _xin$Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'focusing',
    value: function focusing() {}
  }, {
    key: 'focused',
    value: function focused() {}
  }, {
    key: 'blurred',
    value: function blurred() {}
  }, {
    key: 'created',
    value: function created() {
      _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'created', this).call(this);

      this.classList.add('xin-view');
    }
  }, {
    key: 'ready',
    value: function ready() {
      _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'ready', this).call(this);

      this.transitionFx = new _src2.default.Fx(this);
    }
  }, {
    key: 'attached',
    value: function attached() {
      var _this2 = this;

      _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'attached', this).call(this);

      this.classList.remove('xin-view--focus');
      this.classList.remove('xin-view--visible');

      this.__app.route(this.uri, function (parameters) {
        return _this2.focus(parameters);
      });
      this.fire('routed');
    }
  }, {
    key: 'focus',
    value: function focus(parameters) {
      var _this3 = this;

      this.set('parameters', parameters || {});

      this.focusing(parameters);
      this.fire('focusing', parameters);

      this.async(function () {
        if ('setFocus' in _this3.parentElement) {
          _this3.parentElement.setFocus(_this3);
        } else {
          _this3.setVisible(true);
          _this3.setFocus(true);
        }
      });
    }
  }, {
    key: 'setVisible',
    value: function setVisible(visible) {
      if (visible) {
        this.classList.add('xin-view--visible');

        this.fire('show');
      } else {
        this.classList.remove('xin-view--visible');
        [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), function (el) {
          return el.setVisible(visible);
        });

        this.fire('hide');
      }
    }
  }, {
    key: 'setFocus',
    value: function setFocus(focus) {
      if (focus) {
        this.classList.add('xin-view--focus');

        this.focused();
        this.fire('focus');
      } else {
        this.classList.remove('xin-view--focus');
        [].forEach.call(this.querySelectorAll('.xin-view.xin-view--focus'), function (el) {
          if ('setFocus' in el.parentElement) {
            el.parentElement.setFocus(null);
          } else {
            el.setFocus(focus);
          }
        });

        this.blurred();
        this.fire('blur');
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
          value: SETUP_TRANSITION
        },
        index: {
          type: Number,
          value: 0
        }
      };
    }
  }]);

  return View;
}(_src2.default.Component);

_src2.default.define('xin-view', View);

exports.default = View;

/***/ }

},[31]);
//# sourceMappingURL=view.js.map