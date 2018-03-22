(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "../../components/view/index.js":
/*!****************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/view/index.js ***!
  \****************************************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"../../components/view/view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return _view__WEBPACK_IMPORTED_MODULE_0__[\"View\"]; });\n\n\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/view/index.js?");

/***/ }),

/***/ "../../components/view/view.css":
/*!****************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/view/view.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./view.css */ \"../../node_modules/css-loader/index.js!../../components/view/view.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/view/view.css?");

/***/ }),

/***/ "../../components/view/view.js":
/*!***************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/view/view.js ***!
  \***************************************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../../component/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ \"../../core/index.js\");\n/* harmony import */ var _view_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.css */ \"../../components/view/view.css\");\n/* harmony import */ var _view_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_view_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nclass View extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    const TRANSITION_IN = this.__repository.get('view.transitionIn') || this.__repository.get('view.transition') || 'slide';\n    const TRANSITION_OUT = this.__repository.get('view.transitionOut') || this.__repository.get('view.transition') || 'fade';\n\n    return Object.assign({}, super.props, {\n      uri: {\n        type: String,\n        required: true,\n      },\n      transitionIn: {\n        type: String,\n        value: TRANSITION_IN,\n      },\n      transitionOut: {\n        type: String,\n        value: TRANSITION_OUT,\n      },\n      index: {\n        type: Number,\n        value: 0,\n      },\n    });\n  }\n\n  focusing () {}\n\n  focused () {}\n\n  blurred () {}\n\n  created () {\n    super.created();\n\n    this.classList.add('xin-view');\n  }\n\n  ready () {\n    super.ready();\n\n    this.inFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n      element: this,\n      transition: this.transitionIn,\n      method: 'in',\n    });\n\n    this.outFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n      element: this,\n      transition: this.transitionOut,\n      method: 'out',\n    });\n  }\n\n  attached () {\n    super.attached();\n\n    this.classList.remove('xin-view--focus');\n    this.classList.remove('xin-view--visible');\n\n    if (!this.__app) {\n      console.warn('Cannot route view to undefined app');\n      return;\n    }\n\n    this.__app.route(this.uri, parameters => {\n      this.focus(parameters);\n    });\n\n    this.fire('routed');\n  }\n\n  async focus (parameters = {}) {\n    this.set('parameters', parameters);\n\n    await this.focusing(parameters);\n    this.fire('focusing', parameters);\n\n    this.async(() => {\n      if ('setFocus' in this.parentElement) {\n        this.parentElement.setFocus(this);\n      } else {\n        this.setVisible(true);\n        this.setFocus(true);\n      }\n    });\n  }\n\n  setVisible (visible) {\n    if (visible) {\n      this.classList.add('xin-view--visible');\n      this.fire('show', { view: this });\n      return;\n    }\n\n    this.classList.remove('xin-view--visible');\n    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));\n\n    this.fire('hide');\n  }\n\n  async setFocus (focus) {\n    if (focus) {\n      this.classList.add('xin-view--focus');\n      await this.focused();\n      this.fire('focus');\n      return;\n    }\n\n    this.classList.remove('xin-view--focus');\n    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--focus'), el => {\n      if ('setFocus' in el.parentElement) {\n        el.parentElement.setFocus(null);\n      } else {\n        el.setFocus(focus);\n      }\n    });\n\n    await this.blurred();\n    this.fire('blur');\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-view', View);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/view/view.js?");

/***/ }),

/***/ "../../node_modules/css-loader/index.js!../../components/view/view.css":
/*!************************************************************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/node_modules/css-loader!/Users/jafar/Workspaces/web/xin/components/view/view.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".xin-view {\\n  box-sizing: border-box;\\n  display: none;\\n}\\n\\n.xin-view.xin-view--visible {\\n  display: block;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/view/view.css?/Users/jafar/Workspaces/web/xin/node_modules/css-loader");

/***/ }),

/***/ "./views/x-app-route.html":
/*!********************************!*\
  !*** ./views/x-app-route.html ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"padding\\\">\\n  <h2>App, views, and routing</h2>\\n\\n  <p>\\n    Xin has built-in multi views application model. All you have to do is using\\n    xin-app, xin-view and xin-pager.\\n  </p>\\n\\n  <p>\\n    Below is example to create application with multiple views.\\n  </p>\\n\\n  <code><pre>\\n&lt;xin-app&gt;\\n  &lt;template&gt;\\n    &lt;div&gt;\\n      &lt;a href=\\\"#!/\\\"&gt;Home&lt;/a&gt;\\n      &lt;a href=\\\"#!/foo\\\"&gt;Foo&lt;/a&gt;\\n      &lt;a href=\\\"#!/bar\\\"&gt;Bar&lt;/a&gt;\\n    &lt;/div&gt;\\n\\n    &lt;xin-pager&gt;\\n      &lt;xin-view uri=\\\"/\\\"&gt;\\n        &lt;template&gt;\\n          This is home\\n        &lt;/template&gt;\\n      &lt;/xin-view&gt;\\n\\n      &lt;xin-view uri=\\\"/foo\\\"&gt;\\n        &lt;template&gt;\\n          This is foo\\n        &lt;/template&gt;\\n      &lt;/xin-view&gt;\\n\\n      &lt;xin-view uri=\\\"/bar\\\"&gt;\\n        &lt;template&gt;\\n          This is bar\\n        &lt;/template&gt;\\n      &lt;/xin-view&gt;\\n    &lt;/xin-pager&gt;\\n  &lt;/template&gt;\\n&lt;/xin-app&gt;</pre></code>\\n</div>\\n\";\n\n//# sourceURL=webpack:///./views/x-app-route.html?");

/***/ }),

/***/ "./views/x-app-route.js":
/*!******************************!*\
  !*** ./views/x-app-route.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _xinix_xin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xinix/xin */ \"../../index.js\");\n/* harmony import */ var _xinix_xin_components_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xinix/xin/components/view */ \"../../components/view/index.js\");\n\n\n\nclass XAppRoute extends _xinix_xin_components_view__WEBPACK_IMPORTED_MODULE_1__[\"View\"] {\n  get template () {\n    return __webpack_require__(/*! ./x-app-route.html */ \"./views/x-app-route.html\");\n  }\n}\n\nObject(_xinix_xin__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('x-app-route', XAppRoute);\n\n\n//# sourceURL=webpack:///./views/x-app-route.js?");

/***/ })

}]);