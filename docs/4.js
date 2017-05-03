webpackJsonp([4,5,6],{

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".xin-view {\n  box-sizing: border-box;\n  display: none;\n}\n\n.xin-view.xin-view--visible {\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./view.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./view.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_css__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__view_css__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class View extends __WEBPACK_IMPORTED_MODULE_0____["c" /* default */].Component {
  get props() {
    const TRANSITION_IN = this.__config.get('xin.View.transitionIn') || this.__config.get('xin.View.transition') || 'slide';
    const TRANSITION_OUT = this.__config.get('xin.View.transitionOut') || this.__config.get('xin.View.transition') || 'fade';

    return Object.assign({}, super.props, {
      uri: {
        type: String,
        required: true
      },
      transitionIn: {
        type: String,
        value: TRANSITION_IN
      },
      transitionOut: {
        type: String,
        value: TRANSITION_OUT
      },
      index: {
        type: Number,
        value: 0
      }
    });
  }

  focusing() {}

  focused() {}

  blurred() {}

  created() {
    super.created();

    this.classList.add('xin-view');
  }

  ready() {
    super.ready();

    this.inFx = new __WEBPACK_IMPORTED_MODULE_1__core__["e" /* Fx */]({
      element: this,
      transition: this.transitionIn,
      method: 'in'
    });

    this.outFx = new __WEBPACK_IMPORTED_MODULE_1__core__["e" /* Fx */]({
      element: this,
      transition: this.transitionOut,
      method: 'out'
    });
  }

  attached() {
    super.attached();

    this.classList.remove('xin-view--focus');
    this.classList.remove('xin-view--visible');

    if (!this.__app) {
      console.warn('Cannot route view to undefined app');
      return;
    }

    this.__app.route(this.uri, parameters => {
      this.focus(parameters);
    });

    this.fire('routed');
  }

  focus(parameters = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.set('parameters', parameters);

      yield _this.focusing(parameters);
      _this.fire('focusing', parameters);

      _this.async(function () {
        if ('setFocus' in _this.parentElement) {
          _this.parentElement.setFocus(_this);
        } else {
          _this.setVisible(true);
          _this.setFocus(true);
        }
      });
    })();
  }

  setVisible(visible) {
    if (visible) {
      this.classList.add('xin-view--visible');
      this.fire('show', { view: this });
      return;
    }

    this.classList.remove('xin-view--visible');
    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));

    this.fire('hide');
  }

  setFocus(focus) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (focus) {
        _this2.classList.add('xin-view--focus');
        yield _this2.focused();
        _this2.fire('focus');
        return;
      }

      _this2.classList.remove('xin-view--focus');
      [].forEach.call(_this2.querySelectorAll('.xin-view.xin-view--focus'), function (el) {
        if ('setFocus' in el.parentElement) {
          el.parentElement.setFocus(null);
        } else {
          el.setFocus(focus);
        }
      });

      yield _this2.blurred();
      _this2.fire('blur');
    })();
  }
}
/* harmony export (immutable) */ __webpack_exports__["View"] = View;


__WEBPACK_IMPORTED_MODULE_0____["c" /* default */].define('xin-view', View);

/* harmony default export */ __webpack_exports__["default"] = (View);

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view__ = __webpack_require__(103);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "View", function() { return __WEBPACK_IMPORTED_MODULE_0__view__["View"]; });


/***/ })

});
//# sourceMappingURL=4.js.map