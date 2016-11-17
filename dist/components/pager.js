webpackJsonp([1],{

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./pager.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./pager.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "xin-pager {\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\n\nxin-pager .xin-view {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ },

/***/ 29:
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

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pager = function (_xin$Component) {
  _inherits(Pager, _xin$Component);

  function Pager() {
    _classCallCheck(this, Pager);

    return _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).apply(this, arguments));
  }

  _createClass(Pager, [{
    key: 'ready',
    value: function ready() {
      _get(Pager.prototype.__proto__ || Object.getPrototypeOf(Pager.prototype), 'ready', this).call(this);

      for (var el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {
        if ('set' in el) {
          el.set('index', i);
        } else {
          el.setAttribute('index', i);
        }
      }
    }
  }, {
    key: 'setFocus',
    value: function setFocus(element) {
      if (element) {
        var index = element.index;
        var oldIndex = this.focused$ ? this.focused$.index : -1;
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
      var _this2 = this;

      Promise.all([prevEl.transitionFx.play('out', -1), nextEl.transitionFx.play('in', -1)]).then(function () {
        prevEl.setVisible(false);
        nextEl.setVisible(true);
        prevEl.setFocus(false);
        nextEl.setFocus(true);
        _this2.$focused = nextEl;

        prevEl.transitionFx.stop();
        nextEl.transitionFx.stop();
      });
    }
  }, {
    key: '__transitionForward',
    value: function __transitionForward(prevEl, nextEl) {
      var _this3 = this;

      if (prevEl) {
        Promise.all([nextEl.transitionFx.play('in', 1), prevEl.transitionFx.play('out', 1)]).then(function () {
          prevEl.setVisible(false);
          nextEl.setVisible(true);
          prevEl.setFocus(false);
          nextEl.setFocus(true);
          _this3.$focused = nextEl;

          prevEl.transitionFx.stop();
          nextEl.transitionFx.stop();
        });
      } else {
        new _src2.default.Fx(nextEl, 'none').play('in', 1).then(function () {
          nextEl.setVisible(true);
          nextEl.setFocus(true);
          _this3.$focused = nextEl;

          nextEl.transitionFx.stop();
        });
      }
    }
  }]);

  return Pager;
}(_src2.default.Component);

_src2.default.define('xin-pager', Pager);
// xin.Pager = Pager;

exports.default = Pager;

/***/ }

},[29]);
//# sourceMappingURL=pager.js.map