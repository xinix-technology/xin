/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./xin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../component/accessor.js":
/*!********************************!*\
  !*** ../component/accessor.js ***!
  \********************************/
/*! exports provided: Accessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Accessor\", function() { return Accessor; });\n/* harmony import */ var _accessors_attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessors/attribute */ \"../component/accessors/attribute.js\");\n/* harmony import */ var _accessors_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accessors/text */ \"../component/accessors/text.js\");\n/* harmony import */ var _accessors_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accessors/html */ \"../component/accessors/html.js\");\n/* harmony import */ var _accessors_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accessors/value */ \"../component/accessors/value.js\");\n/* harmony import */ var _accessors_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accessors/class */ \"../component/accessors/class.js\");\n/* harmony import */ var _accessors_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accessors/style */ \"../component/accessors/style.js\");\n/* harmony import */ var _accessors_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./accessors/property */ \"../component/accessors/property.js\");\n// import { BaseAccessor } from './accessors/base';\n\n\n\n\n\n\n\n\nconst accessors = [\n  _accessors_value__WEBPACK_IMPORTED_MODULE_3__[\"ValueAccessor\"],\n  _accessors_text__WEBPACK_IMPORTED_MODULE_1__[\"TextAccessor\"],\n  _accessors_html__WEBPACK_IMPORTED_MODULE_2__[\"HTMLAccessor\"],\n  _accessors_class__WEBPACK_IMPORTED_MODULE_4__[\"ClassAccessor\"],\n  _accessors_style__WEBPACK_IMPORTED_MODULE_5__[\"StyleAccessor\"],\n  _accessors_attribute__WEBPACK_IMPORTED_MODULE_0__[\"AttributeAccessor\"],\n  _accessors_property__WEBPACK_IMPORTED_MODULE_6__[\"PropertyAccessor\"],\n  // BaseAccessor, // TODO: unused?\n];\nconst Accessor = {\n  get (node, name) {\n    let Accessor = accessors.find(accessor => accessor.test(node, name));\n    if (Accessor) {\n      return new Accessor(node, name);\n    }\n\n    throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType} name: ${name}`);\n  },\n};\n\n\n//# sourceURL=webpack:///../component/accessor.js?");

/***/ }),

/***/ "../component/accessors/attribute.js":
/*!*******************************************!*\
  !*** ../component/accessors/attribute.js ***!
  \*******************************************/
/*! exports provided: AttributeAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AttributeAccessor\", function() { return AttributeAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass AttributeAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return node.nodeType === window.Node.ELEMENT_NODE && name.endsWith('$');\n  }\n\n  constructor (node, name) {\n    super(node, name.slice(0, -1));\n  }\n\n  set (value) {\n    if (value) {\n      if (value !== this.node.getAttribute(this.name)) {\n        this.node.setAttribute(this.name, value);\n      }\n    } else {\n      this.node.removeAttribute(this.name);\n    }\n  }\n\n  get () {\n    return this.node.getAttribute(this.name);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/attribute.js?");

/***/ }),

/***/ "../component/accessors/base.js":
/*!**************************************!*\
  !*** ../component/accessors/base.js ***!
  \**************************************/
/*! exports provided: BaseAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseAccessor\", function() { return BaseAccessor; });\nclass BaseAccessor {\n  static test (node, name) {\n    // FIXME: please implement this for unsupported yet\n    // console.log(node, name);\n  }\n\n  constructor (node, name) {\n    this.node = node;\n    this.name = name;\n  }\n\n  set (value) {\n    if (typeof this.node.set === 'function') {\n      this.node.set(this.name, value);\n    } else {\n      this.node[this.name] = value;\n    }\n  }\n\n  get () {\n    if (typeof this.node.get === 'function') {\n      return this.node.get(this.name);\n    } else {\n      return this.node[this.name];\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/base.js?");

/***/ }),

/***/ "../component/accessors/class.js":
/*!***************************************!*\
  !*** ../component/accessors/class.js ***!
  \***************************************/
/*! exports provided: ClassAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ClassAccessor\", function() { return ClassAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass ClassAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return name && name.startsWith('class.');\n  }\n\n  constructor (node, name) {\n    super(node, name.split('.').splice(1).join('.'));\n  }\n\n  set (value) {\n    if (value) {\n      this.node.classList.add(this.name);\n    } else {\n      this.node.classList.remove(this.name);\n    }\n  }\n\n  get () {\n    throw new Error('Unimplemented');\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/class.js?");

/***/ }),

/***/ "../component/accessors/html.js":
/*!**************************************!*\
  !*** ../component/accessors/html.js ***!
  \**************************************/
/*! exports provided: HTMLAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HTMLAccessor\", function() { return HTMLAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass HTMLAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return name === 'html' && node.nodeType === window.Node.ELEMENT_NODE;\n  }\n\n  set (value = '') {\n    this.node.innerHTML = value;\n  }\n\n  get () {\n    return this.node.innerHTML;\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/html.js?");

/***/ }),

/***/ "../component/accessors/property.js":
/*!******************************************!*\
  !*** ../component/accessors/property.js ***!
  \******************************************/
/*! exports provided: PropertyAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PropertyAccessor\", function() { return PropertyAccessor; });\n/* harmony import */ var _core_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/string */ \"../core/string/index.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\n\nconst { ELEMENT_NODE } = window.Node;\n\nclass PropertyAccessor extends _base__WEBPACK_IMPORTED_MODULE_1__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return node.nodeType === ELEMENT_NODE;\n  }\n\n  constructor (node, name) {\n    super();\n\n    this.node = node;\n    this.name = Object(_core_string__WEBPACK_IMPORTED_MODULE_0__[\"camelize\"])(name);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/property.js?");

/***/ }),

/***/ "../component/accessors/style.js":
/*!***************************************!*\
  !*** ../component/accessors/style.js ***!
  \***************************************/
/*! exports provided: StyleAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StyleAccessor\", function() { return StyleAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass StyleAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return name && name.startsWith('style.');\n  }\n\n  constructor (node, name) {\n    super(node, name.split('.').splice(1).join('.'));\n  }\n\n  set (value = '') {\n    this.node.style[this.name] = value;\n  }\n\n  get () {\n    throw new Error('Unimplemented');\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/style.js?");

/***/ }),

/***/ "../component/accessors/text.js":
/*!**************************************!*\
  !*** ../component/accessors/text.js ***!
  \**************************************/
/*! exports provided: TextAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TextAccessor\", function() { return TextAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nconst { TEXT_NODE, ELEMENT_NODE } = window.Node;\n\nclass TextAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    if (node.nodeType === TEXT_NODE) {\n      return true;\n    }\n\n    return name === 'text' && node.nodeType === ELEMENT_NODE;\n  }\n\n  constructor (node) {\n    super(node, 'textContent');\n  }\n\n  set (value = '') {\n    if (value !== this.node.textContent) {\n      this.node.textContent = value;\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/text.js?");

/***/ }),

/***/ "../component/accessors/value.js":
/*!***************************************!*\
  !*** ../component/accessors/value.js ***!
  \***************************************/
/*! exports provided: ValueAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ValueAccessor\", function() { return ValueAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nconst { TEXT_NODE, ELEMENT_NODE } = window.Node;\nclass ValueAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    if (name === 'value' && node.nodeType === ELEMENT_NODE && node.nodeName === 'INPUT') {\n      return true;\n    }\n\n    if (node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {\n      return true;\n    }\n  }\n\n  constructor (node) {\n    super(node, 'value');\n\n    if (node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {\n      this.node = node.parentElement;\n    }\n  }\n\n  set (value = '') {\n    if (document.activeElement !== this.node) {\n      super.set(value);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/value.js?");

/***/ }),

/***/ "../component/annotation/annotation.js":
/*!*********************************************!*\
  !*** ../component/annotation/annotation.js ***!
  \*********************************************/
/*! exports provided: Annotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Annotation\", function() { return Annotation; });\nclass Annotation {\n  constructor (model, expr, accessor) {\n    this.model = model;\n    this.expr = expr;\n    this.accessor = accessor;\n  }\n\n  effect (type, value) {\n    if (this.accessor) {\n      this.accessor.set(this.expr.invoke(this.model));\n    } else {\n      this.expr.invoke(this.model);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/annotation/annotation.js?");

/***/ }),

/***/ "../component/annotation/index.js":
/*!****************************************!*\
  !*** ../component/annotation/index.js ***!
  \****************************************/
/*! exports provided: Annotation, NotifyAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotation */ \"../component/annotation/annotation.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Annotation\", function() { return _annotation__WEBPACK_IMPORTED_MODULE_0__[\"Annotation\"]; });\n\n/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notify */ \"../component/annotation/notify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NotifyAnnotation\", function() { return _notify__WEBPACK_IMPORTED_MODULE_1__[\"NotifyAnnotation\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../component/annotation/index.js?");

/***/ }),

/***/ "../component/annotation/notify.js":
/*!*****************************************!*\
  !*** ../component/annotation/notify.js ***!
  \*****************************************/
/*! exports provided: NotifyAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NotifyAnnotation\", function() { return NotifyAnnotation; });\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../expr */ \"../component/expr.js\");\n\n\nclass NotifyAnnotation {\n  constructor (model, name) {\n    let expr = _expr__WEBPACK_IMPORTED_MODULE_0__[\"Expr\"].get(model.getAttribute(name));\n    this.model = model;\n    this.name = expr.name;\n  }\n\n  effect (type, value) {\n    this.model.__templateModel.set(this.name, value);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/annotation/notify.js?");

/***/ }),

/***/ "../component/base.js":
/*!****************************!*\
  !*** ../component/base.js ***!
  \****************************/
/*! exports provided: base */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return base; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n/* harmony import */ var _core_id_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/id-generator */ \"../core/id-generator.js\");\n/* harmony import */ var _core_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/string */ \"../core/string/index.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ \"../component/helpers/index.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template */ \"../component/template.js\");\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./expr */ \"../component/expr.js\");\n/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./accessor */ \"../component/accessor.js\");\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./annotation */ \"../component/annotation/index.js\");\n/* harmony import */ var _core_fn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/fn */ \"../core/fn/index.js\");\n\n\n\n\n\n\n\n\n\n// import { sprintf } from 'sprintf-js';\n\nconst debug = __webpack_require__(/*! debug */ \"../node_modules/debug/src/browser.js\")('xin::component');\nconst nextId = Object(_core_id_generator__WEBPACK_IMPORTED_MODULE_1__[\"idGenerator\"])();\nconst baseComponents = {};\n\nfunction base (base) {\n  const repository = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"])();\n\n  if (baseComponents[base]) {\n    return baseComponents[base];\n  }\n\n  let BaseElement;\n  if (repository.get('customElements.version') === 'v1') {\n    BaseElement = window[base];\n  } else {\n    BaseElement = function () {};\n    BaseElement.prototype = Object.create(window[base].prototype);\n  }\n\n  class Component extends BaseElement {\n    constructor () {\n      super();\n\n      this.is = this.nodeName.toLowerCase();\n\n      this.createdCallback();\n    }\n\n    get $ () {\n      return this.__templateHost.getElementsByTagName('*');\n    }\n\n    created () {}\n\n    ready () {}\n\n    attached () {}\n\n    detached () {}\n\n    createdCallback () {\n      if (debug.enabled) debug(`CREATED ${this.is}`);\n\n      this.__id = nextId();\n\n      this.created();\n\n      this.__initData();\n\n      // move to readyCallback\n      // this.__initProps();\n      //\n      // this.__initListeners();\n      // move to readyCallback\n\n      // move to attachedCallback\n      // this.async(this.readyCallback);\n      // move to attachedCallback\n    }\n\n    readyCallback () {\n      this.__componentReady = true;\n\n      this.fire('before-ready');\n\n      if (debug.enabled) debug(`READY ${this.is}`);\n\n      // moved from attachedCallback\n      if (!this.hasAttribute('xin-id')) {\n        // deferred set attributes until connectedCallback\n        this.setAttribute('xin-id', this.__id);\n      }\n      // moved from attachedCallback\n\n      // moved from createdCallback\n      this.__initListeners();\n\n      this.__initTemplate();\n\n      this.__initProps();\n      // moved from createdCallback\n\n      this.__initPropValues();\n\n      let contentFragment;\n\n      if (this.__template) {\n        contentFragment = document.createDocumentFragment();\n        [].slice.call(this.childNodes).forEach(node => {\n          if (node === this.__templateMarker) return;\n          contentFragment.appendChild(node);\n        });\n      }\n\n      this.__templateRender(contentFragment);\n\n      this.ready();\n\n      this.fire('ready');\n\n      if (this.__componentAttaching) {\n        this.attachedCallback();\n      }\n    }\n\n    // FIXME: note that connectedCallback can be called more than once, so any\n    // initialization work that is truly one-time will need a guard to prevent\n    // it from running twice.\n    attachedCallback () {\n      this.__repository.put(this.__id, this);\n\n      this.__componentAttaching = true;\n\n      // moved from createdCallback\n      if (!this.__componentReady) {\n        if (!this.__componentBeforeReady) {\n          this.__componentBeforeReady = true;\n          this.async(this.readyCallback);\n        }\n        return;\n      }\n      // moved from createdCallback\n\n      // notify default props\n      this.notify('__global');\n      this.notify('__repository');\n      this.notify('__app');\n\n      if (debug.enabled) debug(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);\n\n      this.attached();\n\n      this.__componentAttaching = false;\n    }\n\n    detachedCallback () {\n      this.__repository.remove(this.__id);\n\n      this.detached();\n    }\n\n    connectedCallback () {\n      return this.attachedCallback();\n    }\n\n    disconnectedCallback () {\n      return this.detachedCallback();\n    }\n\n    get __app () {\n      if (!this.__app$) {\n        if (this.__appSignature) {\n          this.__app$ = this;\n        } else {\n          let app = this.parentElement;\n          while (app && !app.__appSignature) {\n            app = app.parentElement;\n          }\n          this.__app$ = app;\n        }\n      }\n\n      return this.__app$;\n    }\n\n    get __global () {\n      return window;\n    }\n\n    get __repository () {\n      return repository;\n    }\n\n    __initData () {\n      this.__componentContent = [];\n      this.__componentDebouncers = {};\n      this.__componentNotifiers = {};\n      this.__componentReady = false;\n      this.__componentBeforeReady = false;\n      this.__componentAttaching = false;\n      this.__componentInitialPropValues = {};\n      this.__componentNotifiedProps = {};\n    }\n\n    __initProps () {\n      let props = this.__getProps();\n      for (let propName in props) {\n        let property = props[propName];\n        let attrName = Object(_core_string__WEBPACK_IMPORTED_MODULE_2__[\"dashify\"])(propName);\n\n        if ('computed' in property) {\n          let accessor = _accessor__WEBPACK_IMPORTED_MODULE_6__[\"Accessor\"].get(this, propName);\n          let expr = _expr__WEBPACK_IMPORTED_MODULE_5__[\"Expr\"].getFn(property.computed, [], true);\n          this.__templateAnnotate(expr, accessor);\n\n          this.__componentInitialPropValues[propName] = () => expr.invoke(this);\n        } else if (this.hasAttribute(attrName)) {\n          let attrVal = this.getAttribute(attrName);\n\n          // copy value from attribute to property\n          // fallback to property.value\n          let expr = _expr__WEBPACK_IMPORTED_MODULE_5__[\"Expr\"].get(attrVal);\n          if (expr.type === 's') {\n            this.__componentInitialPropValues[propName] = () => Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"deserialize\"])(attrVal, property.type);\n          } else {\n            if ('notify' in property && expr.mode === '{') {\n              this.__componentNotifiedProps[propName] = true;\n              this.__templateGetBinding(propName).annotate(new _annotation__WEBPACK_IMPORTED_MODULE_7__[\"NotifyAnnotation\"](this, propName));\n            }\n            this.__componentInitialPropValues[propName] = () => expr.invoke(this.__templateModel);\n          }\n        }\n\n        if ('observer' in property) {\n          let expr = _expr__WEBPACK_IMPORTED_MODULE_5__[\"Expr\"].getFn(property.observer, [ propName ], true);\n          this.__templateAnnotate(expr);\n        }\n      }\n    }\n\n    __getProps () {\n      if (!this._props) {\n        this._props = this.props;\n      }\n      return this._props;\n    }\n\n    __initPropValues () {\n      let props = this.__getProps();\n\n      for (let propName in props) {\n        let property = props[propName];\n\n        let propValue;\n\n        if (this.__componentInitialPropValues[propName]) {\n          propValue = this.__componentInitialPropValues[propName]();\n        } else {\n          propValue = this[propName];\n        }\n\n        if ('value' in property && isUndefinedPropValue(propName, propValue)) {\n          propValue = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"val\"])(property.value);\n        }\n\n        // when property is undefined, log error when property is required otherwise assign to default value\n        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {\n          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);\n        }\n\n        // set and force notify for the first time\n        this[propName] = propValue;\n\n        // only notify if propValue already defined otherwise undefined value will be propagated to model\n        if (propValue !== undefined) {\n          this.notify(propName, propValue);\n        }\n      }\n    }\n\n    __isNotified (name) {\n      return (name in this.__componentNotifiedProps);\n    }\n\n    __initTemplate () {\n      let template;\n\n      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE' && !this.firstElementChild.hasAttribute('is')) {\n        // when instance template exist detach from component content\n        template = this.firstElementChild;\n        this.removeChild(template);\n      } else if (this.template) {\n        // create new template based on template property\n        template = document.createElement('template');\n        template.innerHTML = this.template;\n      }\n\n      this.__templateInitialize(template, this);\n    }\n\n    __initListeners () {\n      if (!this.listeners) {\n        return;\n      }\n\n      Object.keys(this.listeners).forEach(key => {\n        let meta = parseListenerMetadata(key);\n        let expr = _expr__WEBPACK_IMPORTED_MODULE_5__[\"Expr\"].getFn(this.listeners[key], [], true);\n        if (meta.selector) {\n          this.on(meta.eventName, meta.selector, evt => {\n            expr.invoke(this, { evt });\n          });\n        } else {\n          this.on(meta.eventName, evt => {\n            expr.invoke(this, { evt });\n          });\n        }\n      });\n    }\n\n    __addNotifier (eventName) {\n      if (this.__componentNotifiers[eventName]) {\n        return;\n      }\n\n      this.__componentNotifiers[eventName] = (evt) => {\n        let element = evt.target;\n\n        if (element.__templateModel !== this) {\n          return;\n        }\n\n        evt.stopImmediatePropagation();\n\n        if ('__componentNotifyKey' in element && '__componentNotifyAccessor' in element) {\n          element.__templateModel.set(element.__componentNotifyKey, element[element.__componentNotifyAccessor]);\n        }\n      };\n\n      this.on(eventName, this.__componentNotifiers[eventName]);\n    }\n\n    __removeNotifier (eventName) {\n      if (!this.__componentNotifiers[eventName]) {\n        return;\n      }\n\n      this.off(eventName, this.__componentNotifiers[eventName]);\n\n      delete this.__componentNotifiers[eventName];\n    }\n\n    fire (type, detail, options) {\n      return Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this).fire(type, detail, options);\n    }\n\n    async (callback, waitTime) {\n      return (new _core_fn__WEBPACK_IMPORTED_MODULE_8__[\"Async\"](this)).start(callback, waitTime);\n    }\n\n    debounce (job, callback, wait, immediate) {\n      let debouncer = this.__componentDebouncers[job];\n      if (debouncer && debouncer.running) {\n        debouncer.cancel();\n      } else {\n        debouncer = this.__componentDebouncers[job] = new _core_fn__WEBPACK_IMPORTED_MODULE_8__[\"Debounce\"](this, immediate);\n      }\n      debouncer.start(callback, wait);\n\n      return debouncer;\n    }\n\n    nextFrame (callback) {\n      return _core_fn__WEBPACK_IMPORTED_MODULE_8__[\"Async\"].nextFrame(callback.bind(this));\n    }\n\n    // sprintf (...args) {\n    //   return sprintf(...args);\n    // }\n\n    // T overriden\n    // -------------------------------------------------------------------------\n    //\n\n    __templateAnnotate (expr, accessor) {\n      if (!_template__WEBPACK_IMPORTED_MODULE_4__[\"T\"].prototype.__templateAnnotate.call(this, expr, accessor)) {\n        return false;\n      }\n\n      // register event notifier\n      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof window.HTMLElement) {\n        const node = accessor.node;\n        const nodeName = node.nodeName;\n\n        const startNotify = (name) => {\n          node.__componentNotifyKey = expr.name;\n          node.__componentNotifyAccessor = accessor.name;\n          this.__addNotifier(name);\n        };\n\n        if (nodeName === 'INPUT') {\n          const inputType = node.getAttribute('type');\n          if (inputType === 'radio' || inputType === 'checkbox') {\n            throw new Error('Unimplemented yet');\n          } else {\n            startNotify('input');\n          }\n        } else if (nodeName === 'TEXTAREA') {\n          startNotify('input');\n        } else if (nodeName === 'SELECT') {\n          startNotify('change');\n        }\n      }\n\n      return true;\n    }\n  }\n\n  let tproto = _template__WEBPACK_IMPORTED_MODULE_4__[\"T\"].prototype;\n  for (let key in tproto) {\n    // exclude __templateAnnotate because will be override\n    if (!tproto.hasOwnProperty(key)) {\n      continue;\n    }\n\n    if (key === '$' || key === '__templateAnnotate') {\n      continue;\n    }\n\n    Component.prototype[key] = tproto[key];\n  }\n\n  baseComponents[base] = Component;\n\n  return Component;\n}\n\nfunction parseListenerMetadata (key) {\n  key = key.trim();\n  let [ eventName, ...selectorArr ] = key.split(/\\s+/);\n  let selector = selectorArr.length ? selectorArr.join(' ') : null;\n  let metadata = { key, eventName, selector };\n  return metadata;\n}\n\nfunction isUndefinedPropValue (propName, propValue) {\n  return propValue === undefined || (propName === 'title' && !propValue);\n}\n\n\n//# sourceURL=webpack:///../component/base.js?");

/***/ }),

/***/ "../component/binding.js":
/*!*******************************!*\
  !*** ../component/binding.js ***!
  \*******************************/
/*! exports provided: Binding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Binding\", function() { return Binding; });\nclass Binding {\n  constructor (context, model) {\n    this.context = context;\n    this.model = model;\n    this.paths = {};\n    this.annotations = [];\n  }\n\n  annotate (annotation) {\n    this.annotations.push(annotation);\n  }\n\n  walkEffect (type, value) {\n    this.annotations.forEach(annotation => {\n      annotation.effect(type, value/* , this.model */);\n    });\n\n    Object.keys(this.paths).forEach(i => {\n      this.paths[i].walkEffect(type, value);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///../component/binding.js?");

/***/ }),

/***/ "../component/component.js":
/*!*********************************!*\
  !*** ../component/component.js ***!
  \*********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/base.js\");\n\n\nconst Component = Object(_base__WEBPACK_IMPORTED_MODULE_0__[\"base\"])('HTMLElement');\n\n\n//# sourceURL=webpack:///../component/component.js?");

/***/ }),

/***/ "../component/define.js":
/*!******************************!*\
  !*** ../component/define.js ***!
  \******************************/
/*! exports provided: define */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return define; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n\n\nconst debug = __webpack_require__(/*! debug */ \"../node_modules/debug/src/browser.js\")('xin::core:define');\n\nfunction define (name, Component, options) {\n  const repository = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"])();\n\n  let ElementClass = repository.get(name);\n\n  if (ElementClass) {\n    if (debug.enabled) debug(`Duplicate registering \"${name}\"`);\n    return ElementClass;\n  }\n\n  if (repository.get('customElements.version') === 'v1') {\n    // v1 the element class is the component itself\n    ElementClass = Component;\n    window.customElements.define(name, Component, options);\n  } else {\n    let prototype = Object.create(Component.prototype, { is: { value: name } });\n    let ElementPrototype = { prototype };\n\n    if (options && options.extends) {\n      ElementPrototype.extends = options.extends;\n    }\n\n    ElementClass = document.registerElement(name, ElementPrototype);\n  }\n\n  repository.put(name, ElementClass);\n\n  return ElementClass;\n}\n\n\n//# sourceURL=webpack:///../component/define.js?");

/***/ }),

/***/ "../component/expr.js":
/*!****************************!*\
  !*** ../component/expr.js ***!
  \****************************/
/*! exports provided: Expr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Expr\", function() { return Expr; });\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token */ \"../component/token.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ \"../component/filter/index.js\");\n\n\n\nconst CACHE = {\n  's': {\n    '[': {},\n    '{': {},\n  },\n  'v': {\n    '[': {},\n    '{': {},\n  },\n};\n\nfunction _get (value, mode, type) {\n  let cache = CACHE[type][mode];\n  if (value in cache) {\n    return cache[value];\n  }\n\n  let expr = new Expr(value, mode, type);\n  if (type !== 's') {\n    cache[value] = expr;\n  }\n\n  return expr;\n}\n\nclass Expr {\n  static get CACHE () {\n    return CACHE;\n  }\n\n  static get (value, unwrapped) {\n    value = (value || '').trim();\n\n    if (unwrapped) {\n      return _get(value, '[', 'v');\n    }\n\n    let mode = value[0];\n    if ((mode === '[' || mode === '{') && value[1] === mode) {\n      value = value.slice(2, -2).trim();\n      return _get(value, mode, 'v');\n    }\n\n    return _get(value, '[', 's');\n  }\n\n  static getFn (value, args, unwrapped) {\n    return Expr.get(value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value, unwrapped);\n  }\n\n  static rawTokenize (str) {\n    let count = 0;\n    let tokens = [];\n\n    while (str && count++ < 10) {\n      let matches = str.match(/^\\s*(\"[^\"]*\"|[^,]+),?/);\n\n      str = str.substr(matches[0].length);\n      tokens.push(matches[1].trim());\n    }\n\n    return tokens;\n  }\n\n  static tokenize (str) {\n    return Expr.rawTokenize(str).map(token => _token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(token));\n  }\n\n  constructor (value, mode, type) {\n    // define base properties\n    this.mode = mode;\n    this.type = type;\n    this.name = '';\n    this.args = [];\n    this.filters = [];\n    this.value = value;\n\n    if (type === 's') {\n      return;\n    }\n\n    let tokens = value.split('|');\n    let token = tokens[0].trim();\n\n    this.filters = tokens.slice(1).map(word => {\n      return _filter__WEBPACK_IMPORTED_MODULE_1__[\"Filter\"].get(word.trim());\n    });\n\n    if (token.indexOf('(') < 0) {\n      this.type = 'p';\n      this.name = token;\n      this.args.push(_token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(token));\n    } else {\n      // force mode to '[' when type is !p\n      this.mode = '[';\n      this.type = 'm';\n\n      let matches = token.match(/([^(]+)\\(([^)]*)\\)/);\n\n      this.name = matches[1].trim();\n      this.fn = _token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(this.name);\n\n      this.args = Expr.tokenize(matches[2]);\n    }\n  }\n\n  get constant () {\n    return this.type !== 'm' && this.vpaths.length !== this.args.length;\n  }\n\n  get vpaths () {\n    if (!this._vpaths) {\n      let paths = [];\n      this.args.forEach(arg => {\n        if (arg.type === 'v' && paths.indexOf(arg.name) === -1) {\n          paths.push(arg);\n        }\n      });\n      this._vpaths = paths;\n    }\n\n    return this._vpaths;\n  }\n\n  invoke (context, otherArgs) {\n    if (this.type === 'p') {\n      let val = this.args[0].value(context, otherArgs);\n      return this.filters.reduce((val, filter) => filter.invoke(val), val);\n    }\n\n    let args = this.args.map(arg => {\n      return arg.value(context, otherArgs);\n    });\n\n    return this.fn.invoke(args, context, context.__templateHost);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/expr.js?");

/***/ }),

/***/ "../component/filter/filter.js":
/*!*************************************!*\
  !*** ../component/filter/filter.js ***!
  \*************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return Filter; });\nconst registry = {};\n\nclass Filter {\n  constructor (name, callback, otherArgs) {\n    this.name = name;\n    this.callback = callback;\n    this.otherArgs = otherArgs;\n  }\n\n  invoke (val) {\n    let args = [val];\n    [].push.apply(args, this.otherArgs);\n    return this.callback.apply(null, args);\n  }\n\n  static put (name, callback) {\n    registry[name] = callback;\n  }\n\n  static get (name) {\n    let segments = name.split(':');\n    let args = segments.splice(1).join(':').split(',');\n    let key = segments.pop();\n\n    let callback = registry[key];\n    if (typeof callback !== 'function') {\n      try {\n        callback = __webpack_require__(\"../component/filter/filters sync recursive ^\\\\.\\\\/.*$\")(`./${key}`).default;\n      } catch (err) {\n        // noop\n      }\n    }\n\n    if (!callback) {\n      throw new Error(`Filter \"${name}\" not found.`);\n    }\n\n    return new Filter(key, callback, args);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/filter/filter.js?");

/***/ }),

/***/ "../component/filter/filters sync recursive ^\\.\\/.*$":
/*!*************************************************!*\
  !*** ../component/filter/filters sync ^\.\/.*$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./boolean\": \"../component/filter/filters/boolean.js\",\n\t\"./boolean.js\": \"../component/filter/filters/boolean.js\",\n\t\"./consoleError\": \"../component/filter/filters/consoleError.js\",\n\t\"./consoleError.js\": \"../component/filter/filters/consoleError.js\",\n\t\"./consoleInfo\": \"../component/filter/filters/consoleInfo.js\",\n\t\"./consoleInfo.js\": \"../component/filter/filters/consoleInfo.js\",\n\t\"./consoleLog\": \"../component/filter/filters/consoleLog.js\",\n\t\"./consoleLog.js\": \"../component/filter/filters/consoleLog.js\",\n\t\"./consoleTrace\": \"../component/filter/filters/consoleTrace.js\",\n\t\"./consoleTrace.js\": \"../component/filter/filters/consoleTrace.js\",\n\t\"./consoleWarn\": \"../component/filter/filters/consoleWarn.js\",\n\t\"./consoleWarn.js\": \"../component/filter/filters/consoleWarn.js\",\n\t\"./cssurl\": \"../component/filter/filters/cssurl.js\",\n\t\"./cssurl.js\": \"../component/filter/filters/cssurl.js\",\n\t\"./currency\": \"../component/filter/filters/currency.js\",\n\t\"./currency.js\": \"../component/filter/filters/currency.js\",\n\t\"./default\": \"../component/filter/filters/default.js\",\n\t\"./default.js\": \"../component/filter/filters/default.js\",\n\t\"./json\": \"../component/filter/filters/json.js\",\n\t\"./json.js\": \"../component/filter/filters/json.js\",\n\t\"./lower\": \"../component/filter/filters/lower.js\",\n\t\"./lower.js\": \"../component/filter/filters/lower.js\",\n\t\"./not\": \"../component/filter/filters/not.js\",\n\t\"./not.js\": \"../component/filter/filters/not.js\",\n\t\"./number\": \"../component/filter/filters/number.js\",\n\t\"./number.js\": \"../component/filter/filters/number.js\",\n\t\"./required\": \"../component/filter/filters/required.js\",\n\t\"./required.js\": \"../component/filter/filters/required.js\",\n\t\"./slice\": \"../component/filter/filters/slice.js\",\n\t\"./slice.js\": \"../component/filter/filters/slice.js\",\n\t\"./string\": \"../component/filter/filters/string.js\",\n\t\"./string.js\": \"../component/filter/filters/string.js\",\n\t\"./upper\": \"../component/filter/filters/upper.js\",\n\t\"./upper.js\": \"../component/filter/filters/upper.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"../component/filter/filters sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///../component/filter/filters_sync_^\\.\\/.*$?");

/***/ }),

/***/ "../component/filter/filters/boolean.js":
/*!**********************************************!*\
  !*** ../component/filter/filters/boolean.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return `${Boolean(val)}`;\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/boolean.js?");

/***/ }),

/***/ "../component/filter/filters/consoleError.js":
/*!***************************************************!*\
  !*** ../component/filter/filters/consoleError.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.error(val));\n\n\n//# sourceURL=webpack:///../component/filter/filters/consoleError.js?");

/***/ }),

/***/ "../component/filter/filters/consoleInfo.js":
/*!**************************************************!*\
  !*** ../component/filter/filters/consoleInfo.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.info(val));\n\n\n//# sourceURL=webpack:///../component/filter/filters/consoleInfo.js?");

/***/ }),

/***/ "../component/filter/filters/consoleLog.js":
/*!*************************************************!*\
  !*** ../component/filter/filters/consoleLog.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.log(val)); // eslint-disable-line\n\n\n//# sourceURL=webpack:///../component/filter/filters/consoleLog.js?");

/***/ }),

/***/ "../component/filter/filters/consoleTrace.js":
/*!***************************************************!*\
  !*** ../component/filter/filters/consoleTrace.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.trace(val)); // eslint-disable-line\n\n\n//# sourceURL=webpack:///../component/filter/filters/consoleTrace.js?");

/***/ }),

/***/ "../component/filter/filters/consoleWarn.js":
/*!**************************************************!*\
  !*** ../component/filter/filters/consoleWarn.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.warn(val));\n\n\n//# sourceURL=webpack:///../component/filter/filters/consoleWarn.js?");

/***/ }),

/***/ "../component/filter/filters/cssurl.js":
/*!*********************************************!*\
  !*** ../component/filter/filters/cssurl.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (v) {\n  return `url(${v})`;\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/cssurl.js?");

/***/ }),

/***/ "../component/filter/filters/currency.js":
/*!***********************************************!*\
  !*** ../component/filter/filters/currency.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return (val || 0).toFixed(2).replace(/(\\d)(?=(\\d{3})+\\.)/g, '$1,');\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/currency.js?");

/***/ }),

/***/ "../component/filter/filters/default.js":
/*!**********************************************!*\
  !*** ../component/filter/filters/default.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val, defVal) {\n  return (val || defVal);\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/default.js?");

/***/ }),

/***/ "../component/filter/filters/json.js":
/*!*******************************************!*\
  !*** ../component/filter/filters/json.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((val, indent) => JSON.stringify(val, null, Number(indent)));\n\n\n//# sourceURL=webpack:///../component/filter/filters/json.js?");

/***/ }),

/***/ "../component/filter/filters/lower.js":
/*!********************************************!*\
  !*** ../component/filter/filters/lower.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return String(val || '').toLowerCase();\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/lower.js?");

/***/ }),

/***/ "../component/filter/filters/not.js":
/*!******************************************!*\
  !*** ../component/filter/filters/not.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return Boolean(!val);\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/not.js?");

/***/ }),

/***/ "../component/filter/filters/number.js":
/*!*********************************************!*\
  !*** ../component/filter/filters/number.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return Number(val || 0).toLocaleString();\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/number.js?");

/***/ }),

/***/ "../component/filter/filters/required.js":
/*!***********************************************!*\
  !*** ../component/filter/filters/required.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  if (val === undefined || val === null || val === '') {\n    throw new Error('Value is required');\n  }\n  return val;\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/required.js?");

/***/ }),

/***/ "../component/filter/filters/slice.js":
/*!********************************************!*\
  !*** ../component/filter/filters/slice.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val, begin, end) {\n  return Array.prototype.slice.call(val || [], begin, end);\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/slice.js?");

/***/ }),

/***/ "../component/filter/filters/string.js":
/*!*********************************************!*\
  !*** ../component/filter/filters/string.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  if (val === undefined || val === null) {\n    return '';\n  }\n  return String(val);\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/string.js?");

/***/ }),

/***/ "../component/filter/filters/upper.js":
/*!********************************************!*\
  !*** ../component/filter/filters/upper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return String(val || '').toUpperCase();\n});\n\n\n//# sourceURL=webpack:///../component/filter/filters/upper.js?");

/***/ }),

/***/ "../component/filter/index.js":
/*!************************************!*\
  !*** ../component/filter/index.js ***!
  \************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter */ \"../component/filter/filter.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _filter__WEBPACK_IMPORTED_MODULE_0__[\"Filter\"]; });\n\n\n\n\n//# sourceURL=webpack:///../component/filter/index.js?");

/***/ }),

/***/ "../component/helpers/deserialize.js":
/*!*******************************************!*\
  !*** ../component/helpers/deserialize.js ***!
  \*******************************************/
/*! exports provided: deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deserialize\", function() { return deserialize; });\nfunction deserialize (value, type) {\n  switch (type) {\n    case Number:\n      value = Number(value);\n      break;\n\n    case Boolean:\n      value = Boolean(value === '' || value === 'true' || value === '1' || value === 'on');\n      break;\n\n    case Object:\n      try {\n        value = JSON.parse(value);\n      } catch (err) {\n        // allow non-JSON literals like Strings and Numbers\n        // console.warn('Failed decode json: \"' + value + '\" to Object');\n      }\n      break;\n\n    case Array:\n      try {\n        value = JSON.parse(value);\n      } catch (err) {\n        // .console.warn('Failed decode json: \"' + value + '\" to Array');\n        value = null;\n      }\n      break;\n\n    case Date:\n      value = new Date(value);\n      break;\n\n    case RegExp:\n      value = new RegExp(value);\n      break;\n\n    case Function:\n      value = new Function(value); // eslint-disable-line\n      break;\n\n    // behave like default for now\n    // case String:\n    default:\n      break;\n  }\n  return value;\n}\n\n\n//# sourceURL=webpack:///../component/helpers/deserialize.js?");

/***/ }),

/***/ "../component/helpers/index.js":
/*!*************************************!*\
  !*** ../component/helpers/index.js ***!
  \*************************************/
/*! exports provided: slotName, fix, deserialize, val */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slot */ \"../component/helpers/slot.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"slotName\", function() { return _slot__WEBPACK_IMPORTED_MODULE_0__[\"slotName\"]; });\n\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template */ \"../component/helpers/template.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fix\", function() { return _template__WEBPACK_IMPORTED_MODULE_1__[\"fix\"]; });\n\n/* harmony import */ var _deserialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deserialize */ \"../component/helpers/deserialize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deserialize\", function() { return _deserialize__WEBPACK_IMPORTED_MODULE_2__[\"deserialize\"]; });\n\n/* harmony import */ var _val__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./val */ \"../component/helpers/val.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"val\", function() { return _val__WEBPACK_IMPORTED_MODULE_3__[\"val\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../component/helpers/index.js?");

/***/ }),

/***/ "../component/helpers/slot.js":
/*!************************************!*\
  !*** ../component/helpers/slot.js ***!
  \************************************/
/*! exports provided: slotName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"slotName\", function() { return slotName; });\nconst SLOT_SUPPORTED = (() => {\n  if (typeof window === 'undefined') {\n    return false;\n  }\n\n  return (\n    'HTMLUnknownElement' in window &&\n    !(document.createElement('slot') instanceof window.HTMLUnknownElement)\n  );\n})();\n\nfunction slotName (element) {\n  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');\n}\n\n\n\n\n//# sourceURL=webpack:///../component/helpers/slot.js?");

/***/ }),

/***/ "../component/helpers/template.js":
/*!****************************************!*\
  !*** ../component/helpers/template.js ***!
  \****************************************/
/*! exports provided: fix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fix\", function() { return fix; });\nfunction fix (template) {\n  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {\n    window.HTMLTemplateElement.decorate(template);\n  }\n  return template;\n}\n\nfunction needFixImportNode () {\n  if (document.__importNode) {\n    // already fixed\n    return false;\n  }\n  let template = document.createElement('template');\n  template.innerHTML = '<template>i</template>';\n  let imported = document.importNode(template.content, true);\n  return !imported.firstChild.content.firstChild || imported.firstChild.content.firstChild.textContent !== 'i';\n}\n\nif (needFixImportNode()) {\n  document.__importNode = document.importNode;\n  document.importNode = function (node, deep) {\n    if (!deep) {\n      return document.__importNode(node, deep);\n    }\n\n    let sourceTpls = [].slice.call(node.querySelectorAll('template'));\n    let imported = document.__importNode(node, deep);\n    imported.querySelectorAll('template').forEach((child, i) => {\n      child.innerHTML = sourceTpls[i].innerHTML;\n    });\n\n    return imported;\n  };\n}\n\n\n\n\n//# sourceURL=webpack:///../component/helpers/template.js?");

/***/ }),

/***/ "../component/helpers/val.js":
/*!***********************************!*\
  !*** ../component/helpers/val.js ***!
  \***********************************/
/*! exports provided: val */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"val\", function() { return val; });\nfunction val (value, ...args) {\n  return typeof value === 'function' ? value(...args) : value;\n}\n\n\n//# sourceURL=webpack:///../component/helpers/val.js?");

/***/ }),

/***/ "../component/index.js":
/*!*****************************!*\
  !*** ../component/index.js ***!
  \*****************************/
/*! exports provided: define, base, Component, T, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ \"../component/define.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return _define__WEBPACK_IMPORTED_MODULE_0__[\"define\"]; });\n\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"../component/base.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return _base__WEBPACK_IMPORTED_MODULE_1__[\"base\"]; });\n\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ \"../component/component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"Component\"]; });\n\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ \"../component/template.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return _template__WEBPACK_IMPORTED_MODULE_3__[\"T\"]; });\n\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ \"../component/filter/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _filter__WEBPACK_IMPORTED_MODULE_4__[\"Filter\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../component/index.js?");

/***/ }),

/***/ "../component/template.js":
/*!********************************!*\
  !*** ../component/template.js ***!
  \********************************/
/*! exports provided: T */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return T; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n/* harmony import */ var _core_id_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/id-generator */ \"../core/id-generator.js\");\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expr */ \"../component/expr.js\");\n/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binding */ \"../component/binding.js\");\n/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accessor */ \"../component/accessor.js\");\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./annotation */ \"../component/annotation/index.js\");\n/* harmony import */ var _helpers_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/template */ \"../component/helpers/template.js\");\n/* harmony import */ var _helpers_slot__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/slot */ \"../component/helpers/slot.js\");\n\n\n\n\n\n\n\n\n\n\nconst nextId = Object(_core_id_generator__WEBPACK_IMPORTED_MODULE_1__[\"idGenerator\"])();\n\nfunction T (template, host, marker) {\n  this.__templateInitialize(template, host, marker);\n  this.__templateRender();\n}\n\nT.prototype = {\n  get $ () {\n    return this.__templateHost.getElementsByTagName('*');\n  },\n\n  $$ (selector) {\n    return this.querySelector(selector);\n  },\n\n  // replace with waitFor(eventName);\n  // promised (eventName, selector) {\n  //   return new Promise(resolve => {\n  //     if (selector) {\n  //       this.once(eventName, selector, resolve);\n  //     } else {\n  //       this.once(eventName, resolve);\n  //     }\n  //   });\n  // },\n\n  on () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).on(...arguments);\n  },\n\n  off () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).off(...arguments);\n  },\n\n  once () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).once(...arguments);\n  },\n\n  waitFor () {\n    return Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).waitFor(...arguments);\n  },\n\n  all (obj) {\n    for (let i in obj) {\n      if (obj.hasOwnProperty(i)) {\n        this.set(i, obj[i]);\n      }\n    }\n  },\n\n  get (path) {\n    let object = this;\n\n    this.__templateGetPathAsArray(path).some(segment => {\n      if (object === undefined || object === null) {\n        object = undefined;\n        return true;\n      }\n\n      object = object[segment];\n      return false;\n    });\n\n    return object;\n  },\n\n  set (path, value) {\n    if (arguments.length === 1 && typeof path === 'object') {\n      let data = path;\n      for (let i in data) {\n        if (data.hasOwnProperty(i)) {\n          this.set(i, data[i]);\n        }\n      }\n      return;\n    }\n\n    path = this.__templateGetPathAsArray(path);\n\n    let oldValue = this.get(path);\n\n    if (value === oldValue) {\n      return;\n    }\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    object[property] = value;\n\n    this.notify(path, value);\n  },\n\n  push (path, ...values) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    let result = object[property].push(...values);\n    this.notify(path, object[property]);\n\n    // let index = object[property].length;\n    // let removed = [];\n    // let addedCount = values.length;\n    // let result = object[property].push(...values);\n    //\n    // object = object[property];\n    //\n    // this.notifySplices(path, [\n    //   { index, removed, addedCount, object, type: 'splice' },\n    // ]);\n\n    return result;\n  },\n\n  pop (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    let result = object[property].pop();\n    this.notify(path, object[property]);\n\n    // let index = object[property].length;\n    // let addedCount = 0;\n    // let result = object[property].pop();\n    // let removed = [ result ];\n    //\n    // object = object[property];\n    //\n    // this.notifySplices(path, [\n    //   { index, removed, addedCount, object, type: 'splice' },\n    // ]);\n\n    return result;\n  },\n\n  splice (path, index, removeCount, ...values) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    let result = object[property].splice(index, removeCount, ...values);\n    this.notify(path, object[property]);\n\n    // let addedCount = values.length;\n    // let result = object[property].splice(...values);\n    // let removed = result;\n    //\n    // object = object[property];\n    //\n    // this.notifySplices(path, [\n    //   { index, removed, addedCount, object, type: 'splice' },\n    // ]);\n\n    return result;\n  },\n\n  notify (path, value) {\n    path = this.__templateGetPathAsString(path);\n\n    if (!this.__templateReady) {\n      this.__templateNotifyOnReady = this.__templateNotifyOnReady || [];\n      if (this.__templateNotifyOnReady.indexOf(path) === -1) {\n        this.__templateNotifyOnReady.push(path);\n      }\n      return;\n    }\n\n    let binding = this.__templateGetBinding(path);\n    if (binding) {\n      if (value === undefined) {\n        value = this.get(path);\n      }\n\n      binding.walkEffect('set', value);\n    }\n  },\n\n  // notifySplices (path, splices) {\n  //   path = this.__templateGetPathAsString(path);\n  //\n  //   if (!this.__templateReady) {\n  //     if (this.__templateNotifyOnReady.indexOf(path) === -1) {\n  //       this.__templateNotifyOnReady.push(path);\n  //     }\n  //     return;\n  //   }\n  //\n  //   let binding = this.__templateGetBinding(path);\n  //   if (binding) {\n  //     binding.walkEffect('splice', splices);\n  //   }\n  // },\n\n  __templateInitialize (template, host, marker) {\n    this.__templateId = nextId();\n    this.__templateBindings = {};\n    this.__templateHost = host || (template ? template.parentElement : null);\n    this.__templateMarker = marker;\n\n    this.__templateReady = false;\n    this.__templateNotifyOnReady = [];\n\n    if (!template) {\n      return;\n    }\n\n    // do below only if template is exists\n    this.__template = Object(_helpers_template__WEBPACK_IMPORTED_MODULE_6__[\"fix\"])(template);\n    this.__templateChildNodes = [];\n\n    this.__templateFragment = document.importNode(this.__template.content, true);\n    this.__parseAnnotations();\n\n    if (marker) {\n      return;\n    }\n\n    if (this.__template.parentElement === this.__templateHost) {\n      // when template parent is template host, it means that template is specific template\n      // then use template as marker\n      this.__templateMarker = this.__template;\n    } else {\n      // when template is not child of host, put marker to host\n      this.__templateMarker = document.createComment(`marker-${this.__templateId}`);\n      this.__templateHost.appendChild(this.__templateMarker);\n    }\n  },\n\n  __templateRender (contentFragment) {\n    this.__templateReady = true;\n\n    this.__templateNotifyOnReady.forEach(key => {\n      this.notify(key, this.get(key));\n    });\n    this.__templateNotifyOnReady = [];\n\n    if (!this.__template) {\n      return;\n    }\n\n    let fragment = this.__templateFragment;\n    this.__templateFragment = null;\n\n    if (contentFragment && contentFragment instanceof window.DocumentFragment) {\n      // try {\n      fragment.querySelectorAll('slot').forEach(slot => {\n        let name = Object(_helpers_slot__WEBPACK_IMPORTED_MODULE_7__[\"slotName\"])(slot);\n        let parent = slot.parentElement || fragment;\n        let marker = document.createComment(`slot ${name}`);\n\n        parent.insertBefore(marker, slot);\n        parent.removeChild(slot);\n\n        if (name) {\n          contentFragment.querySelectorAll(`[slot=\"${name}\"]`).forEach(node => {\n            parent.insertBefore(node, marker);\n          });\n        } else {\n          parent.insertBefore(contentFragment, marker);\n        }\n      });\n    }\n\n    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);\n  },\n\n  __templateUninitialize () {\n    this.__templateChildNodes.forEach(node => {\n      node.parentElement.removeChild(node);\n    });\n  },\n\n  __templateGetPathAsArray (path) {\n    // if (!path) {\n    //   throw new Error(`Unknown path ${path} to set to ${this.is}`);\n    // }\n\n    if (typeof path !== 'string') {\n      return path;\n    }\n\n    return path.split('.');\n  },\n\n  __templateGetPathAsString (path) {\n    if (typeof path === 'string') {\n      return path;\n    }\n\n    return path.join('.');\n  },\n\n  __parseAnnotations () {\n    this.__templateChildNodes = [ ...this.__templateFragment.childNodes ];\n\n    let len = this.__templateChildNodes.length;\n\n    for (let i = 0; i < len; i++) {\n      let node = this.__templateChildNodes[i];\n\n      switch (node.nodeType) {\n        case window.Node.ELEMENT_NODE:\n          this.__parseElementAnnotations(node);\n          break;\n        case window.Node.TEXT_NODE:\n          this.__parseTextAnnotations(node);\n          break;\n      }\n    }\n  },\n\n  __parseEventAnnotations (element, attrName) {\n    // bind event annotation\n    let attrValue = element.getAttribute(attrName);\n    let eventName = attrName.slice(1, -1);\n    // let eventName = attrName.substr(3);\n    if (eventName === 'tap') {\n      eventName = 'click';\n    }\n\n    let context = this;\n    let expr = _expr__WEBPACK_IMPORTED_MODULE_2__[\"Expr\"].getFn(attrValue, [], true);\n\n    this.on(eventName, element, evt => {\n      expr.invoke(context, { evt });\n    });\n  },\n\n  __parseAttributeAnnotations (element) {\n    // clone attributes to array first then foreach because we will remove\n    // attribute later if already processed\n    // this hack to make sure when attribute removed the attributes index doesnt shift.\n    let annotated = false;\n\n    let len = element.attributes.length;\n\n    for (let i = 0; i < len; i++) {\n      let attr = element.attributes[i];\n\n      let attrName = attr.name;\n\n      if (attrName === 'id' || attrName === 'class' || attrName === 'style') {\n        continue;\n      }\n\n      if (attrName.indexOf('(') === 0) {\n        this.__parseEventAnnotations(element, attrName);\n      } else {\n        // bind property annotation\n        annotated = this.__templateAnnotate(_expr__WEBPACK_IMPORTED_MODULE_2__[\"Expr\"].get(attr.value), _accessor__WEBPACK_IMPORTED_MODULE_4__[\"Accessor\"].get(element, attrName)) || annotated;\n      }\n    }\n\n    return annotated;\n  },\n\n  __parseElementAnnotations (element) {\n    let annotated = false;\n\n    // when element already has template model it means it already parsed, skip\n    // parsing that element\n    if (element.__templateModel) {\n      return annotated;\n    }\n\n    element.__templateModel = this;\n\n    if (element.attributes && element.attributes.length) {\n      annotated = this.__parseAttributeAnnotations(element) || annotated;\n    }\n\n    if (element.childNodes && element.childNodes.length) {\n      let childNodes = [].slice.call(element.childNodes);\n      let childNodesLength = childNodes.length;\n\n      for (let i = 0; i < childNodesLength; i++) {\n        annotated = this.__parseNodeAnnotations(childNodes[i]) || annotated;\n      }\n    }\n\n    element.querySelectorAll('slot').forEach(slot => {\n      slot.childNodes.forEach(node => {\n        annotated = this.__parseNodeAnnotations(node) || annotated;\n      });\n    });\n\n    return annotated;\n  },\n\n  __parseNodeAnnotations (node) {\n    switch (node.nodeType) {\n      case window.Node.TEXT_NODE:\n        return this.__parseTextAnnotations(node);\n      case window.Node.ELEMENT_NODE:\n        return this.__parseElementAnnotations(node);\n    }\n  },\n\n  __parseTextAnnotations (node) {\n    let expr = _expr__WEBPACK_IMPORTED_MODULE_2__[\"Expr\"].get(node.textContent);\n    let accessor = _accessor__WEBPACK_IMPORTED_MODULE_4__[\"Accessor\"].get(node);\n    return this.__templateAnnotate(expr, accessor);\n  },\n\n  __templateAnnotate (expr, accessor) {\n    if (expr.type === 's') {\n      return false;\n    }\n\n    if (expr.constant) {\n      let val = expr.invoke(this);\n      accessor.set(val);\n      return false;\n    }\n\n    // annotate every paths\n    let annotation = new _annotation__WEBPACK_IMPORTED_MODULE_5__[\"Annotation\"](this, expr, accessor);\n\n    if (expr.type === 'm') {\n      this.__templateGetBinding(expr.fn.name).annotate(annotation);\n    }\n\n    expr.vpaths.forEach(arg => {\n      this.__templateGetBinding(arg.name).annotate(annotation);\n    });\n\n    return true;\n  },\n\n  __templateGetBinding (path) {\n    let segments = path.split('.');\n    let bindings;\n    let binding;\n\n    for (let i = 0; i < segments.length; i++) {\n      let segment = segments[i];\n\n      bindings = binding ? binding.paths : this.__templateBindings;\n\n      if (!bindings[segment]) {\n        bindings[segment] = new _binding__WEBPACK_IMPORTED_MODULE_3__[\"Binding\"](this, segment);\n      }\n\n      binding = bindings[segment];\n    }\n\n    return binding;\n  },\n};\n\n\n//# sourceURL=webpack:///../component/template.js?");

/***/ }),

/***/ "../component/token.js":
/*!*****************************!*\
  !*** ../component/token.js ***!
  \*****************************/
/*! exports provided: Token */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Token\", function() { return Token; });\nconst CACHE = {};\n\nclass Token {\n  static get CACHE () {\n    return CACHE;\n  }\n\n  static get (name) {\n    if (name in CACHE) {\n      return CACHE[name];\n    }\n\n    let token = new Token(name);\n    CACHE[name] = token;\n    return token;\n  }\n\n  constructor (name) {\n    this.name = name;\n    this.contextName = '';\n    this.baseName = '';\n    this._value = null;\n    this.type = 'v';\n\n    if (!this.name.match(/^[a-zA-Z_]/)) {\n      try {\n        this._value = JSON.parse(this.name);\n        this.type = 's';\n        return;\n      } catch (err) {\n        // noop\n      }\n    }\n\n    if (this.type === 'v') {\n      let nameSegments = this.name.split('.');\n      this.baseName = nameSegments.pop();\n      this.contextName = nameSegments.join('.');\n    }\n  }\n\n  value (...contexts) {\n    if (this.type === 's') {\n      return this._value;\n    }\n\n    for (let context of contexts) {\n      if (!context) {\n        continue;\n      }\n\n      let val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];\n      if (val !== undefined) {\n        return val;\n      }\n    }\n  }\n\n  invoke (args, ...contexts) {\n    if (contexts.length === 0) {\n      throw new Error(`Cannot invoke method ${this.name} of undefined context`);\n    }\n\n    if (this.type === 's') {\n      let [ context ] = contexts;\n      throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);\n    }\n\n    for (let context of contexts) {\n      if (!context) {\n        continue;\n      }\n\n      if (typeof context.get === 'function') {\n        let ctx = this.contextName ? context.get(this.contextName) : context;\n        if (typeof ctx[this.baseName] === 'function') {\n          return ctx[this.baseName](...args);\n        }\n      } else if (typeof context[this.name] === 'function') {\n        return context[this.name].apply(context, args);\n      }\n    }\n\n    let [ context ] = contexts;\n    throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/token.js?");

/***/ }),

/***/ "../components/app/app.js":
/*!********************************!*\
  !*** ../components/app/app.js ***!
  \********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route */ \"../components/app/route.js\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! url */ \"../node_modules/url/url.js\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! querystring */ \"../node_modules/querystring-es3/index.js\");\n/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst debug = __webpack_require__(/*! debug */ \"../node_modules/debug/src/browser.js\")('xin:components:app');\n\nclass App extends _component__WEBPACK_IMPORTED_MODULE_1__[\"Component\"] {\n  get props () {\n    return {\n      title: {\n        type: String,\n        observer: '_titleChanged',\n      },\n\n      manual: {\n        type: Boolean,\n      },\n\n      mode: {\n        type: String,\n        value: 'hash',\n      },\n\n      rootUri: {\n        type: String,\n        value: '/',\n      },\n\n      hash: {\n        type: String,\n        value: '#!',\n      },\n\n      startDelay: {\n        type: Number,\n        value: 100,\n      },\n\n      location: {\n        type: Object,\n        value: () => window.location,\n      },\n\n      history: {\n        type: Object,\n        value: () => window.history,\n      },\n    };\n  }\n\n  get hashRegexp () {\n    if (!this._hashRegexp || this._hash !== this.hash) {\n      this._hashRegexp = new RegExp(`${this.hash}(.*)$`);\n      this._hash = this.hash;\n    }\n\n    return this._hashRegexp;\n  }\n\n  notFound (fragment) {\n    console.warn(`Route not found: ${fragment}`);\n  }\n\n  _titleChanged (title) {\n    if (title) {\n      document.title = title;\n    }\n  }\n\n  created () {\n    this.__appSignature = true;\n\n    // default values\n    this.handlers = [];\n    this.middlewares = [];\n\n    this.__started = false;\n    this.__starting = false;\n\n    this.classList.add('xin-app');\n  }\n\n  attached () {\n    if (this.manual) {\n      return;\n    }\n\n    this.async(() => {\n      this.start();\n    }, 1); // working for safari (delay=1), chrome (delay=0)\n  }\n\n  detached () {\n    super.detached();\n\n    if (this.mode === 'history') {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).off('popstate', this.__navCallback);\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(document).off('click', this.__clickCallback);\n      delete this.__clickCallback;\n    } else {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).off('hashchange', this.__navCallback);\n    }\n    delete this.__navCallback;\n  }\n\n  route (route, callback) {\n    this.handlers.push(new _route__WEBPACK_IMPORTED_MODULE_2__[\"Route\"](route, callback));\n  }\n\n  async start () {\n    if (this.__started || this.__starting) {\n      return;\n    }\n\n    this.__middlewareChainRun = compose(this.middlewares);\n\n    this.__listenNavigation();\n\n    if (debug.enabled) debug(`Starting ${this.is}:${this.__id} ...`);\n\n    this.__starting = true;\n    let executed = await this.__execute();\n\n    this.async(() => {\n      this.__starting = false;\n\n      if (executed) {\n        if (debug.enabled) debug(`Started ${this.is}:${this.__id}`);\n\n        this.__started = true;\n\n        this.fire('started');\n      }\n    }, this.startDelay);\n  }\n\n  __listenNavigation () {\n    this.__navCallback = () => {\n      this.__execute();\n    };\n\n    if (this.mode === 'history') {\n      this.__clickCallback = evt => {\n        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {\n          evt.preventDefault();\n\n          let state = { url: evt.target.getAttribute('href') };\n          this.history.pushState(state, evt.target.innerHTML, evt.target.href);\n\n          this.__navCallback();\n        }\n      };\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).on('popstate', this.__navCallback);\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(document).on('click', this.__clickCallback);\n    } else {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).on('hashchange', this.__navCallback);\n    }\n  }\n\n  get started () {\n    return this.__started || false;\n  }\n\n  getFragmentExecutors (fragment) {\n    return this.handlers.reduce((executors, handler) => {\n      let executor = handler.getExecutorFor(fragment);\n      if (executor) executors.push(executor);\n      return executors;\n    }, []);\n  }\n\n  async __execute () {\n    let navParameters = this.__navParameters;\n    delete this.__navParameters;\n\n    let fragment = this.getFragment();\n    let { pathname, query } = url__WEBPACK_IMPORTED_MODULE_3___default.a.parse(fragment);\n    let queryParameters = querystring__WEBPACK_IMPORTED_MODULE_4___default.a.parse(query);\n\n    let context = { app: this, uri: fragment, pathname, queryParameters, navParameters };\n\n    // run middleware chain then execute all executors\n    let willContinue = await this.__middlewareChainRun(context, () => {\n      let executors = this.getFragmentExecutors(context.pathname);\n      if (executors.length === 0) {\n        this.notFound(fragment);\n        this.fire('route-not-found', fragment);\n        return;\n      }\n\n      executors.forEach(executor => {\n        let parameters = Object.assign({}, executor.args, queryParameters, navParameters);\n        executor.handler.callback(parameters, context);\n      });\n    });\n\n    if (willContinue === false) {\n      return false;\n    }\n\n    this.fire('navigated', context);\n\n    return true;\n  }\n\n  navigate (path = '/', options = {}) {\n    this.__navParameters = options.parameters;\n\n    if (this.mode === 'history') {\n      let url = this.rootUri + path.toString().replace(/\\/$/, '').replace(/^\\//, '');\n      if (this.location.href.replace(this.location.origin, '') !== url) {\n        this.history[options.replace ? 'replaceState' : 'pushState'](\n          this.__navParameters, document.title, url\n        );\n        this.__execute();\n      }\n    } else {\n      if (options.replace) {\n        this.location.replace(this.hash + path);\n      } else {\n        this.location.hash = this.hash + path;\n      }\n    }\n    return this;\n  }\n\n  use (middleware) {\n    this.middlewares.push(middleware);\n  }\n\n  getFragment () {\n    try {\n      let fragment;\n      if (this.mode === 'history') {\n        fragment = decodeURI(this.location.pathname + this.location.search);\n        fragment = fragment.replace(/\\?(.*)$/, '');\n        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');\n      } else {\n        let match = this.location.href.match(this.hashRegexp);\n        fragment = match ? match[1] : '';\n      }\n\n      return '/' + fragment.toString().replace(/\\/$/, '').replace(/^\\//, '');\n    } catch (err) {\n      console.error('Fragment is not match any pattern, fallback to /');\n      return '/';\n    }\n  }\n\n  // $back (evt) {\n  //   evt.preventDefault();\n  //   this.history.back();\n  // }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_1__[\"define\"])('xin-app', App);\n\nfunction compose (middlewares) {\n  for (let fn of middlewares) {\n    if (typeof fn !== 'function') {\n      throw new TypeError('Middleware must be composed of functions!');\n    }\n  }\n\n  return (context, next) => {\n    // last called middlewares #\n    let index = -1;\n\n    function dispatch (i) {\n      if (i <= index) {\n        throw new Error('next() called multiple times');\n      }\n\n      index = i;\n      let fn = middlewares[i];\n      if (i === middlewares.length) {\n        fn = next;\n      }\n      if (!fn) {\n        return;\n      }\n\n      return fn(context, () => dispatch(i + 1));\n    }\n\n    return dispatch(0);\n  };\n}\n\n\n//# sourceURL=webpack:///../components/app/app.js?");

/***/ }),

/***/ "../components/app/index.js":
/*!**********************************!*\
  !*** ../components/app/index.js ***!
  \**********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"../components/app/app.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return _app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]; });\n\n\n\n\n//# sourceURL=webpack:///../components/app/index.js?");

/***/ }),

/***/ "../components/app/route.js":
/*!**********************************!*\
  !*** ../components/app/route.js ***!
  \**********************************/
/*! exports provided: Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Route\", function() { return Route; });\nclass Route {\n  static routeRegExp (str) {\n    let chunks = str.split('[');\n\n    if (chunks.length > 2) {\n      throw new Error('Invalid use of optional params');\n    }\n\n    let tokens = [];\n    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {\n      tokens.push(token);\n      return '([^/]+)';\n    }).replace(/\\//g, '\\\\/');\n\n    let optRe = '';\n\n    if (chunks[1]) {\n      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {\n        let [ realToken, re = '[^/]+' ] = token.split(':');\n        tokens.push(realToken);\n        return `(${re})`;\n      }).replace(/\\//g, '\\\\/') + ')?';\n    }\n\n    return [ new RegExp('^' + re + optRe + '$'), tokens ];\n  }\n\n  static isStatic (pattern) {\n    return !pattern.match(/[[{]/);\n  }\n\n  constructor (route, callback) {\n    this.route = route;\n    this.callback = callback;\n\n    if (Route.isStatic(route)) {\n      this.type = 's';\n      this.pattern = null;\n      this.args = [];\n    } else {\n      let result = Route.routeRegExp(route);\n      this.type = 'v';\n      this.pattern = result[0];\n      this.args = result[1];\n    }\n  }\n\n  getExecutorFor (fragment) {\n    if (this.type === 's') {\n      if (fragment === this.route) {\n        return { handler: this, args: {} };\n      }\n    } else if (this.type === 'v') {\n      let result = fragment.match(this.pattern);\n      if (result) {\n        return {\n          handler: this,\n          args: this.args.reduce((args, name, index) => {\n            args[name] = result[index + 1];\n            return args;\n          }, {}),\n        };\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../components/app/route.js?");

/***/ }),

/***/ "../components/fixture.js":
/*!********************************!*\
  !*** ../components/fixture.js ***!
  \********************************/
/*! exports provided: Fixture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return Fixture; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n/* harmony import */ var _core_fn_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/fn/async */ \"../core/fn/async.js\");\n\n\n\nclass Fixture extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  static create (template, data = {}) {\n    const d = document.createElement('div');\n    d.innerHTML = `<xin-fixture><template>${template}</template></xin-fixture>`;\n    const fixture = d.firstElementChild;\n    fixture.__initialData = data;\n    document.body.appendChild(fixture);\n\n    // return as promised element because at v0 it wont be created yet!\n    return new Promise(resolve => resolve(fixture));\n  }\n\n  attached () {\n    super.attached();\n    this.set(this.__initialData);\n    this.connected = true;\n\n    // delay connected to make sure children is already connected\n    // TODO: really need this?\n    this.async(() => this.fire('connected'));\n  }\n\n  detached () {\n    super.detached();\n\n    this.connected = false;\n    this.fire('disconnected');\n  }\n\n  dispose () {\n    this.parentElement.removeChild(this);\n  }\n\n  async waitConnected (timeout) {\n    if (!this.connected) {\n      await this.waitFor('connected');\n    }\n\n    await _core_fn_async__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].sleep(timeout);\n  }\n\n  // async waitDisconnected (timeout) {\n  //   if (this.connected) {\n  //     await this.waitFor('disconnected');\n  //   }\n\n  //   await Async.sleep(timeout);\n  // }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-fixture', Fixture);\n\n\n//# sourceURL=webpack:///../components/fixture.js?");

/***/ }),

/***/ "../components/for/for.js":
/*!********************************!*\
  !*** ../components/for/for.js ***!
  \********************************/
/*! exports provided: For */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return For; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row */ \"../components/for/row.js\");\n\n\n\nconst FILTER_ALL = () => true;\n\nclass For extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      items: {\n        type: Array,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      as: {\n        type: String,\n        value: 'item',\n      },\n\n      indexAs: {\n        type: String,\n        value: 'index',\n      },\n\n      filter: {\n        type: Function,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      to: {\n        type: String,\n        value: '',\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.rows = [];\n  }\n\n  __initTemplate () {\n    this.__templateFor = this.firstElementChild;\n    if (!this.__templateFor) {\n      throw new Error('Invalid xin-for definition, must be <xin-for items=\"[[items]]\"><template>...</template></xin-for>');\n    }\n    // this.__templateFor.__templateHost = this.__templateHost;\n    this.removeChild(this.__templateFor);\n\n    let marker = this;\n    let toAttr = this.getAttribute('to');\n    if (toAttr) {\n      let container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);\n      if (!container) {\n        throw new Error(`xin-for render to unknown element ${toAttr}`);\n      }\n      marker = document.createComment(`marker-for`);\n      container.appendChild(marker);\n    }\n\n    _component__WEBPACK_IMPORTED_MODULE_0__[\"T\"].prototype.__templateInitialize.call(this, null, this, marker);\n  }\n\n  _itemsChanged (items, filter) {\n    this.debounce('_itemsChanged', () => {\n      let len = 0;\n\n      if (items && items.length) {\n        let filter = this.filter || FILTER_ALL;\n        items.filter(filter).forEach((item, index) => {\n          if (this.rows[index]) {\n            this.rows[index].update(item, index);\n          } else {\n            this.rows.push(new _row__WEBPACK_IMPORTED_MODULE_1__[\"Row\"](this.__templateFor, this, item, index));\n          }\n\n          len++;\n        });\n      }\n\n      // move to detach\n      this.rows.splice(len).forEach(row => {\n        row.__templateUninitialize();\n      });\n    });\n  }\n\n  itemForElement (element) {\n    return this.modelForElement(element).get(this.as);\n  }\n\n  indexForElement (element) {\n    return this.modelForElement(element).get(this.indexAs);\n  }\n\n  modelForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel;\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-for', For);\n\n\n//# sourceURL=webpack:///../components/for/for.js?");

/***/ }),

/***/ "../components/for/index.js":
/*!**********************************!*\
  !*** ../components/for/index.js ***!
  \**********************************/
/*! exports provided: For */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for */ \"../components/for/for.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_0__[\"For\"]; });\n\n\n\n\n//# sourceURL=webpack:///../components/for/index.js?");

/***/ }),

/***/ "../components/for/row.js":
/*!********************************!*\
  !*** ../components/for/row.js ***!
  \********************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Row\", function() { return Row; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _component_annotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/annotation */ \"../component/annotation/index.js\");\n\n\n\nclass Row extends _component__WEBPACK_IMPORTED_MODULE_0__[\"T\"] {\n  constructor (template, host, item, index) {\n    super();\n\n    this.__repeat = host;\n    this.__repeatAs = host.as;\n    this.__repeatIndexAs = host.indexAs;\n\n    // override T constructor\n    this.__templateInitialize(template, host.__templateModel, host.__templateMarker);\n\n    this.is = '$repeat-row';\n    this.__id = this.__templateId;\n\n    this.__templateChildNodes.forEach(node => {\n      if (node.nodeType === window.Node.ELEMENT_NODE) {\n        node.__repeatModel = this;\n      }\n    });\n\n    this.update(item, index);\n\n    this.__templateRender();\n  }\n\n  get __app () {\n    return this.__templateHost.__app;\n  }\n\n  update (item, index) {\n    this[this.__repeatAs] = item;\n    this[this.__repeatIndexAs] = index;\n    this.notify(this.__repeatAs, item);\n    this.notify(this.__repeatIndexAs, index);\n  }\n\n  set (path, value) {\n    if (arguments.length === 1 && typeof path === 'object') {\n      let data = path;\n      for (let i in data) {\n        if (data.hasOwnProperty(i)) {\n          this.set(i, data[i]);\n        }\n      }\n      return;\n    }\n\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.set(path, value);\n    }\n\n    // do not change parent data\n    // parent data works stream down only\n    // return this.__templateHost.set(path, value);\n  }\n\n  get (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.get(path);\n    }\n\n    return this.__templateHost.get(path);\n  }\n\n  // notify (path, value) {\n  //   path = this.__templateGetPathAsArray(path);\n\n  //   if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n  //     return super.notify(path, value);\n  //   }\n\n  //   // do not notify parent data\n  //   // parent data works stream down only\n  //   // return this.__templateHost.notify(path, value);\n  // }\n\n  __templateAnnotate (expr, accessor) {\n    if (!super.__templateAnnotate(expr, accessor)) {\n      return false;\n    }\n\n    let path = this.__templateGetPathAsArray(expr.name);\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return true;\n    }\n\n    for (let i in this.__templateBindings) {\n      if (i === path[0]) {\n        delete this.__templateBindings[i];\n      }\n    }\n\n    // annotate every paths\n    if (expr.type === 'm') {\n      let annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this, expr, accessor);\n      this.__templateHost.__templateGetBinding(expr.fn.name).annotate(annotation);\n    }\n\n    let annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this.__templateHost, expr, accessor);\n    expr.vpaths.forEach(arg => {\n      this.__templateHost.__templateGetBinding(arg.name).annotate(annotation);\n    });\n\n    // manually set by accessor to render\n    accessor.set(expr.invoke(this.__templateHost));\n\n    return true;\n  }\n\n  __templateUninitialize () {\n    super.__templateUninitialize();\n\n    // FIXME: remove annotation from templateHost or memory leak\n  }\n}\n\n\n//# sourceURL=webpack:///../components/for/row.js?");

/***/ }),

/***/ "../components/index.js":
/*!******************************!*\
  !*** ../components/index.js ***!
  \******************************/
/*! exports provided: App, Fixture, Middleware, Pager, For, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"../components/app/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return _app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]; });\n\n/* harmony import */ var _fixture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixture */ \"../components/fixture.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return _fixture__WEBPACK_IMPORTED_MODULE_1__[\"Fixture\"]; });\n\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ \"../components/middleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Middleware\", function() { return _middleware__WEBPACK_IMPORTED_MODULE_2__[\"Middleware\"]; });\n\n/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pager */ \"../components/pager/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return _pager__WEBPACK_IMPORTED_MODULE_3__[\"Pager\"]; });\n\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./for */ \"../components/for/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_4__[\"For\"]; });\n\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view */ \"../components/view/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return _view__WEBPACK_IMPORTED_MODULE_5__[\"View\"]; });\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../components/index.js?");

/***/ }),

/***/ "../components/middleware.js":
/*!***********************************!*\
  !*** ../components/middleware.js ***!
  \***********************************/
/*! exports provided: Middleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Middleware\", function() { return Middleware; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n\n\nclass Middleware extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  attached () {\n    super.attached();\n\n    this.__app.use(this.callback());\n  }\n}\n\n\n//# sourceURL=webpack:///../components/middleware.js?");

/***/ }),

/***/ "../components/pager/index.js":
/*!************************************!*\
  !*** ../components/pager/index.js ***!
  \************************************/
/*! exports provided: Pager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pager */ \"../components/pager/pager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return _pager__WEBPACK_IMPORTED_MODULE_0__[\"Pager\"]; });\n\n\n\n\n//# sourceURL=webpack:///../components/pager/index.js?");

/***/ }),

/***/ "../components/pager/pager.js":
/*!************************************!*\
  !*** ../components/pager/pager.js ***!
  \************************************/
/*! exports provided: Pager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return Pager; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n\n\n\nclass Pager extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  ready () {\n    super.ready();\n\n    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {\n      el.setAttribute('index', i);\n    }\n  }\n\n  setFocus (element) {\n    if (element) {\n      let index = element.getAttribute('index');\n      let oldIndex = this.focused$ ? this.focused$.getAttribute('index') : -1;\n      if (oldIndex < index) {\n        this.__transitionForward(this.focused$, element);\n      } else if (oldIndex > index) {\n        this.__transitionBackward(this.focused$, element);\n      }\n    } else if (this.focused$) {\n      this.focused$.setFocus(false);\n    }\n\n    this.focused$ = element;\n  }\n\n  __transitionBackward (prevEl, nextEl) {\n    Promise.all([\n      nextEl.inFx.play(-1),\n      prevEl.outFx.play(-1),\n    ]).then(() => {\n      prevEl.setVisible(false);\n      nextEl.setVisible(true);\n      prevEl.setFocus(false);\n      nextEl.setFocus(true);\n      this.$focused = nextEl;\n\n      nextEl.inFx.stop();\n      prevEl.outFx.stop();\n    });\n  }\n\n  __transitionForward (prevEl, nextEl) {\n    if (prevEl) {\n      Promise.all([\n        nextEl.inFx.play(1),\n        prevEl.outFx.play(1),\n      ]).then(() => {\n        prevEl.setVisible(false);\n        nextEl.setVisible(true);\n        prevEl.setFocus(false);\n        nextEl.setFocus(true);\n        this.$focused = nextEl;\n\n        nextEl.inFx.stop();\n        prevEl.outFx.stop();\n      });\n    } else {\n      let transitionFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n        element: nextEl,\n        transition: 'none',\n      });\n\n      transitionFx.play('in', 1).then(() => {\n        nextEl.setVisible(true);\n        nextEl.setFocus(true);\n        this.$focused = nextEl;\n\n        transitionFx.stop();\n      });\n    }\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-pager', Pager);\n\n\n//# sourceURL=webpack:///../components/pager/pager.js?");

/***/ }),

/***/ "../components/view/index.js":
/*!***********************************!*\
  !*** ../components/view/index.js ***!
  \***********************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"../components/view/view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return _view__WEBPACK_IMPORTED_MODULE_0__[\"View\"]; });\n\n\n\n\n//# sourceURL=webpack:///../components/view/index.js?");

/***/ }),

/***/ "../components/view/view.js":
/*!**********************************!*\
  !*** ../components/view/view.js ***!
  \**********************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n\n\n\nclass View extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    const TRANSITION_IN = this.__repository.get('view.transitionIn') || this.__repository.get('view.transition') || 'slide';\n    const TRANSITION_OUT = this.__repository.get('view.transitionOut') || this.__repository.get('view.transition') || 'fade';\n\n    return Object.assign({}, super.props, {\n      uri: {\n        type: String,\n        required: true,\n      },\n\n      transitionIn: {\n        type: String,\n        value: TRANSITION_IN,\n      },\n\n      transitionOut: {\n        type: String,\n        value: TRANSITION_OUT,\n      },\n\n      title: {\n        type: String,\n        value: () => `View ${this.uri}`,\n      },\n    });\n  }\n\n  focusing () {}\n\n  focused () {}\n\n  blurred () {}\n\n  created () {\n    super.created();\n\n    this.classList.add('xin-view');\n  }\n\n  ready () {\n    super.ready();\n\n    this.inFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n      element: this,\n      transition: this.transitionIn,\n      method: 'in',\n    });\n\n    this.outFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n      element: this,\n      transition: this.transitionOut,\n      method: 'out',\n    });\n  }\n\n  attached () {\n    super.attached();\n\n    this.classList.remove('xin-view--focus');\n    this.classList.remove('xin-view--visible');\n\n    if (!this.__app) {\n      console.error('Cannot route view to undefined app');\n      return;\n    }\n\n    this.__app.route(this.uri, parameters => {\n      this.focus(parameters);\n    });\n\n    this.fire('routed');\n  }\n\n  async focus (parameters = {}) {\n    this.set('parameters', parameters);\n\n    await this.focusing(parameters);\n    this.fire('focusing', parameters);\n\n    this.async(() => {\n      if ('setFocus' in this.parentElement) {\n        this.parentElement.setFocus(this);\n      } else {\n        this.setVisible(true);\n        this.setFocus(true);\n      }\n    });\n  }\n\n  setVisible (visible) {\n    if (visible) {\n      this.classList.add('xin-view--visible');\n      this.fire('show', { view: this });\n      return;\n    }\n\n    this.classList.remove('xin-view--visible');\n    this.querySelectorAll('.xin-view.xin-view--visible').forEach(el => el.setVisible(visible));\n\n    this.fire('hide', { view: this });\n  }\n\n  async setFocus (focus) {\n    if (focus) {\n      this.classList.add('xin-view--focus');\n      await this.focused();\n      this.fire('focus', { view: this });\n      return;\n    }\n\n    this.classList.remove('xin-view--focus');\n    this.querySelectorAll('.xin-view.xin-view--focus').forEach(el => {\n      if ('setFocus' in el.parentElement) {\n        el.parentElement.setFocus(null);\n      } else {\n        el.setFocus(focus);\n      }\n    });\n\n    await this.blurred();\n    this.fire('blur', { view: this });\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-view', View);\n\n\n//# sourceURL=webpack:///../components/view/view.js?");

/***/ }),

/***/ "../core/event.js":
/*!************************!*\
  !*** ../core/event.js ***!
  \************************/
/*! exports provided: event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return event; });\n/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id-generator */ \"../core/id-generator.js\");\n\n\nconst nextEventId = Object(_id_generator__WEBPACK_IMPORTED_MODULE_0__[\"idGenerator\"])();\n\nlet _matcher;\nlet _level = 0;\nlet _id = 0;\nlet _handlers = {};\nlet _delegatorInstances = {};\n\nfunction _addEvent (delegator, type, callback) {\n  if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {\n    delegator.element.addEventListener(type, callback, { passive: true });\n    return;\n  }\n  // blur and focus do not bubble up but if you use event capturing\n  // then you will get them\n  let useCapture = type === 'blur' || type === 'focus';\n  delegator.element.addEventListener(type, callback, useCapture);\n}\n\nfunction _cancel (evt) {\n  evt.preventDefault();\n  evt.stopPropagation();\n}\n\n/**\n * returns function to use for determining if an element\n * matches a query selector\n *\n * @returns {Function}\n */\nfunction _getMatcher (element) {\n  if (_matcher) {\n    return _matcher;\n  }\n\n  if (element.matches) {\n    _matcher = element.matches;\n    return _matcher;\n  }\n\n  if (element.webkitMatchesSelector) {\n    _matcher = element.webkitMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.mozMatchesSelector) {\n    _matcher = element.mozMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.msMatchesSelector) {\n    _matcher = element.msMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.oMatchesSelector) {\n    _matcher = element.oMatchesSelector;\n    return _matcher;\n  }\n\n  // if it doesn't match a native browser method\n  // fall back to the delegator function\n  _matcher = Delegator.matchesSelector;\n  return _matcher;\n}\n\n/**\n * determines if the specified element matches a given selector\n *\n * @param {Node} element - the element to compare against the selector\n * @param {string} selector\n * @param {Node} boundElement - the element the listener was attached to\n * @returns {void|Node}\n */\nfunction _matchesSelector (element, selector, boundElement) {\n  // no selector means this event was bound directly to this element\n  if (selector === '_root') {\n    return boundElement;\n  }\n\n  // if we have moved up to the element you bound the event to\n  // then we have come too far\n  if (element === boundElement) {\n    return;\n  }\n\n  if (_getMatcher(element).call(element, selector)) {\n    return element;\n  }\n\n  // if this element did not match but has a parent we should try\n  // going up the tree to see if any of the parent elements match\n  // for example if you are looking for a click on an <a> tag but there\n  // is a <span> inside of the a tag that it is the target,\n  // it should still work\n  if (element.parentNode) {\n    _level++;\n    return _matchesSelector(element.parentNode, selector, boundElement);\n  }\n}\n\nfunction _addHandler (delegator, event, selector, callback) {\n  if (!_handlers[delegator.id]) {\n    _handlers[delegator.id] = {};\n  }\n\n  if (!_handlers[delegator.id][event]) {\n    _handlers[delegator.id][event] = {};\n  }\n\n  if (!_handlers[delegator.id][event][selector]) {\n    _handlers[delegator.id][event][selector] = [];\n  }\n\n  _handlers[delegator.id][event][selector].push(callback);\n}\n\nfunction _removeHandler (delegator, event, selector, callback) {\n  // if there are no events tied to this element at all\n  // then don't do anything\n  if (!_handlers[delegator.id]) {\n    return;\n  }\n\n  // if there is no event type specified then remove all events\n  // example: Delegator(element).off()\n  if (!event) {\n    for (let type in _handlers[delegator.id]) {\n      if (_handlers[delegator.id].hasOwnProperty(type)) {\n        _handlers[delegator.id][type] = {};\n      }\n    }\n    return;\n  }\n\n  // if no callback or selector is specified remove all events of this type\n  // example: Delegator(element).off('click')\n  if (!callback && !selector) {\n    _handlers[delegator.id][event] = {};\n    return;\n  }\n\n  // if a selector is specified but no callback remove all events\n  // for this selector\n  // example: Delegator(element).off('click', '.sub-element')\n  if (!callback) {\n    delete _handlers[delegator.id][event][selector];\n    return;\n  }\n\n  // if we have specified an event type, selector, and callback then we\n  // need to make sure there are callbacks tied to this selector to\n  // begin with.  if there aren't then we can stop here\n  if (!_handlers[delegator.id][event][selector]) {\n    return;\n  }\n\n  // if there are then loop through all the callbacks and if we find\n  // one that matches remove it from the array\n  for (let i = 0; i < _handlers[delegator.id][event][selector].length; i++) {\n    if (_handlers[delegator.id][event][selector][i] === callback) {\n      _handlers[delegator.id][event][selector].splice(i, 1);\n      break;\n    }\n  }\n}\n\nfunction _handleEvent (id, e, type) {\n  if (!_handlers[id][type]) {\n    return;\n  }\n\n  let target = e.target || e.srcElement;\n  let selector;\n  let match;\n  let matches = {};\n  let i = 0;\n  let j = 0;\n\n  // find all events that match\n  _level = 0;\n  for (selector in _handlers[id][type]) {\n    if (_handlers[id][type].hasOwnProperty(selector)) {\n      match = _matchesSelector(target, selector, _delegatorInstances[id].element);\n\n      if (match && Delegator.matchesEvent(type, _delegatorInstances[id].element, match, selector === '_root', e)) {\n        _level++;\n        _handlers[id][type][selector].match = match;\n        matches[_level] = _handlers[id][type][selector];\n      }\n    }\n  }\n\n  // stopPropagation() fails to set cancelBubble to true in Webkit\n  // @see http://code.google.com/p/chromium/issues/detail?id=162270\n  e.stopPropagation = function () {\n    e.cancelBubble = true;\n  };\n\n  for (i = 0; i <= _level; i++) {\n    if (matches[i]) {\n      for (j = 0; j < matches[i].length; j++) {\n        if (matches[i][j].call(matches[i].match, e) === false) {\n          Delegator.cancel(e);\n          return;\n        }\n\n        if (e.cancelBubble) {\n          return;\n        }\n      }\n    }\n  }\n}\n\nconst aliases = {};\nconst aliasesDefaultTranslator = name => ([ name ]);\nconst aliasesTranslators = {\n  transitionend (name) {\n    let el = document.createElement('fakeelement');\n    let transitions = {\n      'OTransition': 'oTransitionEnd',\n      'MozTransition': 'transitionend',\n      'WebkitTransition': 'webkitTransitionEnd',\n      'transition': 'transitionend',\n    };\n\n    for (let t in transitions) {\n      if (el.style[t] !== undefined) {\n        return [transitions[t]];\n      }\n    }\n  },\n};\n\nfunction _aliases (name) {\n  let theAliases;\n  if (name in aliases) {\n    theAliases = aliases[name];\n  } else {\n    let translator = aliasesTranslators[name] || aliasesDefaultTranslator;\n    theAliases = translator(name);\n    aliases[name] = theAliases;\n  }\n\n  return theAliases;\n}\n\n/**\n * binds the specified events to the element\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @param {boolean=} remove\n * @returns {Object}\n */\nfunction _bind (events, selector, callback, remove) {\n  // fail silently if you pass null or undefined as an alement\n  // in the Delegator constructor\n  if (!this.element) {\n    return;\n  }\n\n  if (!(events instanceof Array)) {\n    events = [events];\n  }\n\n  if (!callback && typeof (selector) === 'function') {\n    callback = selector;\n    selector = '_root';\n  }\n\n  if (selector instanceof window.Element) {\n    let id;\n    if (selector.hasAttribute('bind-event-id')) {\n      id = selector.getAttribute('bind-event-id');\n    } else {\n      id = nextEventId();\n      selector.setAttribute('bind-event-id', id);\n    }\n    selector = `[bind-event-id=\"${id}\"]`;\n  }\n\n  let id = this.id;\n  let i;\n\n  function _getGlobalCallback (type) {\n    return function (e) {\n      _handleEvent(id, e, type);\n    };\n  }\n\n  for (i = 0; i < events.length; i++) {\n    _aliases(events[i]).forEach(alias => {\n      if (remove) {\n        _removeHandler(this, alias, selector, callback);\n        return;\n      }\n\n      if (!_handlers[id] || !_handlers[id][alias]) {\n        Delegator.addEvent(this, alias, _getGlobalCallback(alias));\n      }\n\n      _addHandler(this, alias, selector, callback);\n    });\n  }\n\n  return this;\n}\n\n/**\n * Delegator object constructor\n *\n * @param {Node} element\n */\nfunction Delegator (element, id) {\n  this.element = element;\n  this.id = id;\n}\n\n/**\n * adds an event\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @returns {Object}\n */\nDelegator.prototype.on = function (events, selector, callback) {\n  return _bind.call(this, events, selector, callback);\n};\n\n/**\n * removes an event\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @returns {Object}\n */\nDelegator.prototype.off = function (events, selector, callback) {\n  return _bind.call(this, events, selector, callback, true);\n};\n\nDelegator.prototype.once = function (events, selector, callback) {\n  if (!callback && typeof (selector) === 'function') {\n    callback = selector;\n    selector = '_root';\n  }\n\n  const proxyCallback = (...args) => {\n    this.off(events, selector, proxyCallback);\n    return callback(...args); // eslint-disable-line standard/no-callback-literal\n  };\n\n  return this.on(events, selector, proxyCallback);\n};\n\nDelegator.prototype.waitFor = function (events, timeout = 3000) {\n  return new Promise((resolve, reject) => {\n    let onResolve = evt => {\n      clearTimeout(t);\n      resolve(evt);\n    };\n    let t;\n    if (timeout > 0) {\n      t = setTimeout(() => {\n        this.off(events, onResolve);\n        reject(new Error('Event#waitFor got timeout'));\n      }, timeout);\n    }\n    this.once(events, onResolve);\n  });\n};\n\nDelegator.prototype.fire = function (type, detail, options) {\n  options = options || {};\n  detail = detail || {};\n\n  let evt;\n  let bubbles = options.bubbles === undefined ? true : options.bubbles;\n  let cancelable = Boolean(options.cancelable);\n\n  switch (type) {\n    case 'click':\n      evt = new window.Event(type, {\n        bubbles: bubbles,\n        cancelable: cancelable,\n        // XXX is it ok to have detail here?\n        detail: detail,\n      });\n\n      // XXX check if without this works on every browsers\n      // evt = document.createEvent('HTMLEvents');\n      // evt.initEvent(type, true, false);\n      break;\n    default:\n      evt = new window.CustomEvent(type, {\n        bubbles: Boolean(bubbles),\n        cancelable: cancelable,\n        detail: detail,\n      });\n      break;\n  }\n\n  this.element.dispatchEvent(evt);\n\n  return evt;\n};\n\nDelegator.matchesSelector = function () {};\nDelegator.cancel = _cancel;\nDelegator.addEvent = _addEvent;\nDelegator.aliases = _aliases;\nDelegator.matchesEvent = function () {\n  return true;\n};\n\nfunction event (element) {\n  // only keep one Delegator instance per node to make sure that\n  // we don't create a ton of new objects if you want to delegate\n  // multiple events from the same node\n  //\n  // for example: event(document).on(...\n  for (let key in _delegatorInstances) {\n    if (_delegatorInstances[key].element === element) {\n      return _delegatorInstances[key];\n    }\n  }\n\n  _id++;\n  _delegatorInstances[_id] = new Delegator(element, _id);\n\n  return _delegatorInstances[_id];\n}\n\n\n//# sourceURL=webpack:///../core/event.js?");

/***/ }),

/***/ "../core/fn/async.js":
/*!***************************!*\
  !*** ../core/fn/async.js ***!
  \***************************/
/*! exports provided: Async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return Async; });\n/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../id-generator */ \"../core/id-generator.js\");\n\n\nconst nextId = Object(_id_generator__WEBPACK_IMPORTED_MODULE_0__[\"idGenerator\"])();\n\nconst requestAnimationFrame = (\n  window.requestAnimationFrame || /* istanbul ignore next */\n  window.webkitRequestAnimationFrame || /* istanbul ignore next */\n  window.mozRequestAnimationFrame || /* istanbul ignore next */\n  window.oRequestAnimationFrame || /* istanbul ignore next */\n  window.msRequestAnimationFrame\n);\n\nconst cancelAnimationFrame = (\n  window.cancelAnimationFrame || /* istanbul ignore next */\n  window.webkitCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.webkitCancelAnimationFrame || /* istanbul ignore next */\n  window.mozCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.mozCancelAnimationFrame || /* istanbul ignore next */\n  window.oCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.oCancelAnimationFrame || /* istanbul ignore next */\n  window.msCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.msCancelAnimationFrame\n);\n\nclass Async {\n  static nextFrame (callback) {\n    return requestAnimationFrame(callback);\n  }\n\n  static sleep (wait) {\n    return new Promise(resolve => {\n      setTimeout(() => this.nextFrame(resolve), wait);\n    });\n  }\n\n  static run (callback, wait) {\n    return (new Async()).start(callback, wait);\n  }\n\n  constructor (context) {\n    this.id = nextId();\n    this.context = context;\n    // this.handle = null;\n    // this.frameHandle = null;\n    this.cleared = true;\n  }\n\n  start (callback, wait) {\n    if (typeof callback !== 'function') {\n      throw new Error('Async should specify function');\n    }\n\n    if (!this.cleared) {\n      throw new Error('Async already run');\n    }\n\n    this.cleared = false;\n\n    let self = this;\n    let context = this.context;\n    let boundCallback = function () {\n      self.frameHandle = requestAnimationFrame(() => {\n        self.__clear();\n        callback.call(context);\n      });\n    };\n\n    if (wait) {\n      this.handle = setTimeout(boundCallback, wait);\n    } else {\n      boundCallback();\n    }\n  }\n\n  __clear () {\n    this.cleared = true;\n\n    cancelAnimationFrame(~~this.frameHandle);\n    clearTimeout(~~this.handle);\n    this.handle = this.frameHandle = undefined;\n  }\n\n  cancel () {\n    this.__clear();\n  }\n}\n\n\n//# sourceURL=webpack:///../core/fn/async.js?");

/***/ }),

/***/ "../core/fn/debounce.js":
/*!******************************!*\
  !*** ../core/fn/debounce.js ***!
  \******************************/
/*! exports provided: Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return Debounce; });\n/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async */ \"../core/fn/async.js\");\n\n\nclass Debounce {\n  constructor (context, immediate) {\n    this.context = context;\n    this.immediate = Boolean(immediate);\n    this.async = null;\n    this.running = false;\n  }\n\n  start (callback, wait) {\n    if (this.immediate) {\n      throw new Error('Unimplemented yet!');\n    }\n\n    this.running = true;\n    this.async = new _async__WEBPACK_IMPORTED_MODULE_0__[\"Async\"](this.context);\n    this.async.start(() => {\n      callback.call(this.context);\n      this.running = false;\n      this.async = null;\n    }, wait);\n  }\n\n  cancel () {\n    this.running = false;\n    this.async.cancel();\n    this.async = null;\n  }\n}\n\n\n//# sourceURL=webpack:///../core/fn/debounce.js?");

/***/ }),

/***/ "../core/fn/index.js":
/*!***************************!*\
  !*** ../core/fn/index.js ***!
  \***************************/
/*! exports provided: Async, Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async */ \"../core/fn/async.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return _async__WEBPACK_IMPORTED_MODULE_0__[\"Async\"]; });\n\n/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce */ \"../core/fn/debounce.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return _debounce__WEBPACK_IMPORTED_MODULE_1__[\"Debounce\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../core/fn/index.js?");

/***/ }),

/***/ "../core/fx/fx.js":
/*!************************!*\
  !*** ../core/fx/fx.js ***!
  \************************/
/*! exports provided: Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return Fx; });\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../event */ \"../core/event.js\");\n/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn */ \"../core/fn/index.js\");\n\n\n\nclass Fx {\n  static add (name, transition) {\n    adapters[name] = transition;\n  }\n\n  static get (name) {\n    return adapters[name] || adapters.none;\n  }\n\n  constructor (options) {\n    options = options || {};\n    this.element = options.element;\n    this.duration = options.duration || 0;\n    this.transition = options.transition || 'none';\n    this.method = options.method || '';\n\n    this.adapter = options.adapter || Fx.get(this.transition);\n\n    this.running = false;\n    this.direction = 0;\n  }\n\n  async play (direction) {\n    this.running = true;\n    this.direction = direction;\n\n    await this.adapter.play(this);\n  }\n\n  async stop () {\n    await this.adapter.stop(this);\n\n    this.running = false;\n    this.direction = 0;\n  }\n}\n\n// TODO: refactor adapters to each own file\nconst adapters = {\n  'none': {\n    async play () {},\n\n    async stop () {},\n  },\n\n  'slide': {\n    play (fx) {\n      return new Promise(resolve => {\n        Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(fx.element).once('transitionend', () => {\n          fx.element.classList.remove('trans-slide__animate');\n          resolve();\n        });\n        fx.element.classList.add(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.add('trans-slide__animate');\n          _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => fx.element.classList.add(`trans-slide__${fx.method}`));\n        });\n      });\n    },\n\n    stop (fx) {\n      return new Promise(resolve => {\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.remove(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);\n          fx.element.classList.remove(`trans-slide__${fx.method}`);\n          resolve();\n        });\n      });\n    },\n  },\n\n  'fade': {\n    play (fx) {\n      return new Promise(resolve => {\n        Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(fx.element).once('transitionend', () => {\n          resolve();\n        });\n\n        fx.element.classList.add(`trans-fade__${fx.method}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.add(`trans-fade__${fx.method}-animate`);\n        });\n      });\n    },\n\n    stop (fx) {\n      return new Promise(resolve => {\n        fx.element.classList.remove(`trans-fade__${fx.method}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.remove(`trans-fade__${fx.method}-animate`);\n          resolve();\n        });\n      });\n    },\n  },\n};\n\n\n//# sourceURL=webpack:///../core/fx/fx.js?");

/***/ }),

/***/ "../core/fx/index.js":
/*!***************************!*\
  !*** ../core/fx/index.js ***!
  \***************************/
/*! exports provided: Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fx */ \"../core/fx/fx.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _fx__WEBPACK_IMPORTED_MODULE_0__[\"Fx\"]; });\n\n\n\n\n//# sourceURL=webpack:///../core/fx/index.js?");

/***/ }),

/***/ "../core/id-generator.js":
/*!*******************************!*\
  !*** ../core/id-generator.js ***!
  \*******************************/
/*! exports provided: idGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"idGenerator\", function() { return idGenerator; });\nfunction idGenerator () {\n  let value = 0;\n  return function next () {\n    return value++;\n  };\n}\n\n\n//# sourceURL=webpack:///../core/id-generator.js?");

/***/ }),

/***/ "../core/index.js":
/*!************************!*\
  !*** ../core/index.js ***!
  \************************/
/*! exports provided: event, Async, bootstrap, getInstance, Repository, Fx, Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"../core/repository/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"]; });\n\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event */ \"../core/event.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _event__WEBPACK_IMPORTED_MODULE_1__[\"event\"]; });\n\n/* harmony import */ var _fx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fx */ \"../core/fx/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _fx__WEBPACK_IMPORTED_MODULE_2__[\"Fx\"]; });\n\n/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn */ \"../core/fn/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return _fn__WEBPACK_IMPORTED_MODULE_3__[\"Async\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return _fn__WEBPACK_IMPORTED_MODULE_3__[\"Debounce\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../core/index.js?");

/***/ }),

/***/ "../core/repository/bootstrap.js":
/*!***************************************!*\
  !*** ../core/repository/bootstrap.js ***!
  \***************************************/
/*! exports provided: bootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return bootstrap; });\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"../core/repository/repository.js\");\n\n\nfunction bootstrap (data) {\n  window.xin = window.xin || {};\n\n  let instance = window.xin.__repository;\n  if (instance) {\n    instance.update(data);\n  } else {\n    instance = window.xin.__repository = new _repository__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"](data);\n  }\n\n  return instance;\n}\n\n\n//# sourceURL=webpack:///../core/repository/bootstrap.js?");

/***/ }),

/***/ "../core/repository/get-instance.js":
/*!******************************************!*\
  !*** ../core/repository/get-instance.js ***!
  \******************************************/
/*! exports provided: getInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return getInstance; });\n/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ \"../core/repository/bootstrap.js\");\n/* harmony import */ var _has_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./has-instance */ \"../core/repository/has-instance.js\");\n\n\n\nfunction getInstance () {\n  if (!Object(_has_instance__WEBPACK_IMPORTED_MODULE_1__[\"hasInstance\"])()) {\n    Object(_bootstrap__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"])();\n  }\n\n  let instance = window.xin.__repository;\n  if (typeof instance.update !== 'function') {\n    throw new Error('Invalid global xin repository found!');\n  }\n\n  return instance;\n}\n\n\n//# sourceURL=webpack:///../core/repository/get-instance.js?");

/***/ }),

/***/ "../core/repository/has-instance.js":
/*!******************************************!*\
  !*** ../core/repository/has-instance.js ***!
  \******************************************/
/*! exports provided: hasInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasInstance\", function() { return hasInstance; });\nfunction hasInstance () {\n  return window.xin && window.xin.__repository;\n}\n\n\n//# sourceURL=webpack:///../core/repository/has-instance.js?");

/***/ }),

/***/ "../core/repository/index.js":
/*!***********************************!*\
  !*** ../core/repository/index.js ***!
  \***********************************/
/*! exports provided: bootstrap, getInstance, Repository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ \"../core/repository/bootstrap.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _bootstrap__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony import */ var _get_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-instance */ \"../core/repository/get-instance.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return _get_instance__WEBPACK_IMPORTED_MODULE_1__[\"getInstance\"]; });\n\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repository */ \"../core/repository/repository.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _repository__WEBPACK_IMPORTED_MODULE_2__[\"Repository\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///../core/repository/index.js?");

/***/ }),

/***/ "../core/repository/repository.js":
/*!****************************************!*\
  !*** ../core/repository/repository.js ***!
  \****************************************/
/*! exports provided: Repository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return Repository; });\nconst debug = __webpack_require__(/*! debug */ \"../node_modules/debug/src/browser.js\")('xin::core');\n\nclass Repository {\n  constructor (data = {}) {\n    if (debug.enabled) debug('Repository construct...');\n    this.data = Object.assign({\n      'customElements.version': 'v1',\n    }, data);\n  }\n\n  update (data = {}) {\n    if (debug.enabled) debug('Repository update data...');\n    this.data = Object.assign(this.data, data);\n  }\n\n  get (id) {\n    return this.data[id];\n  }\n\n  put (id, value) {\n    if (value === undefined) {\n      return this.remove(id);\n    }\n    this.data[id] = value;\n  }\n\n  remove (id) {\n    delete this.data[id];\n  }\n}\n\n\n//# sourceURL=webpack:///../core/repository/repository.js?");

/***/ }),

/***/ "../core/string/camelize.js":
/*!**********************************!*\
  !*** ../core/string/camelize.js ***!
  \**********************************/
/*! exports provided: camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return camelize; });\nlet camelized = {};\n\nfunction camelize (dash) {\n  let mapped = camelized[dash];\n  if (mapped) {\n    return mapped;\n  }\n  if (dash.indexOf('-') < 0) {\n    camelized[dash] = dash;\n  } else {\n    camelized[dash] = dash.replace(/-([a-z])/g,\n      function (m) {\n        return m[1].toUpperCase();\n      }\n    );\n  }\n\n  return camelized[dash];\n}\n\n\n//# sourceURL=webpack:///../core/string/camelize.js?");

/***/ }),

/***/ "../core/string/dashify.js":
/*!*********************************!*\
  !*** ../core/string/dashify.js ***!
  \*********************************/
/*! exports provided: dashify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dashify\", function() { return dashify; });\nlet dashified = {};\n\nfunction dashify (camel) {\n  let mapped = dashified[camel];\n  if (mapped) {\n    return mapped;\n  }\n  dashified[camel] = camel.replace(/([a-z][A-Z])/g,\n    function (g) {\n      return g[0] + '-' + g[1].toLowerCase();\n    }\n  );\n\n  return dashified[camel];\n}\n\n\n//# sourceURL=webpack:///../core/string/dashify.js?");

/***/ }),

/***/ "../core/string/index.js":
/*!*******************************!*\
  !*** ../core/string/index.js ***!
  \*******************************/
/*! exports provided: dashify, camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dashify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashify */ \"../core/string/dashify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dashify\", function() { return _dashify__WEBPACK_IMPORTED_MODULE_0__[\"dashify\"]; });\n\n/* harmony import */ var _camelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camelize */ \"../core/string/camelize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return _camelize__WEBPACK_IMPORTED_MODULE_1__[\"camelize\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../core/string/index.js?");

/***/ }),

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! exports provided: event, Async, define, base, Component, T, bootstrap, getInstance, Repository, Fx, Debounce, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"../core/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"event\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"Async\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"Fx\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"Debounce\"]; });\n\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ \"../component/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"define\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"base\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"Component\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"T\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"Filter\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../index.js?");

/***/ }),

/***/ "../middlewares/index.js":
/*!*******************************!*\
  !*** ../middlewares/index.js ***!
  \*******************************/
/*! exports provided: Title, LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lazy_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-view */ \"../middlewares/lazy-view/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return _lazy_view__WEBPACK_IMPORTED_MODULE_0__[\"LazyView\"]; });\n\n/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./title */ \"../middlewares/title.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Title\", function() { return _title__WEBPACK_IMPORTED_MODULE_1__[\"Title\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../middlewares/index.js?");

/***/ }),

/***/ "../middlewares/lazy-view/index.js":
/*!*****************************************!*\
  !*** ../middlewares/lazy-view/index.js ***!
  \*****************************************/
/*! exports provided: LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lazy_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-view */ \"../middlewares/lazy-view/lazy-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return _lazy_view__WEBPACK_IMPORTED_MODULE_0__[\"LazyView\"]; });\n\n\n\n\n//# sourceURL=webpack:///../middlewares/lazy-view/index.js?");

/***/ }),

/***/ "../middlewares/lazy-view/lazy-view.js":
/*!*********************************************!*\
  !*** ../middlewares/lazy-view/lazy-view.js ***!
  \*********************************************/
/*! exports provided: LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return LazyView; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _components_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/middleware */ \"../components/middleware.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"../middlewares/lazy-view/view.js\");\n\n\n\n\nclass LazyView extends _components_middleware__WEBPACK_IMPORTED_MODULE_1__[\"Middleware\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      loaders: {\n        type: Array,\n        value: () => {\n          if (this.__repository.get('view.loaders')) {\n            return this.__repository.get('view.loaders');\n          }\n\n          return [];\n        },\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.views = [];\n  }\n\n  attached () {\n    super.attached();\n\n    this.loaders.push({\n      test: /^xin-/,\n      load (view) {\n        if (view.name === 'xin-view') {\n          return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../components/view */ \"../components/view/index.js\"));\n        }\n\n        // TODO: Official view will be only xin-view so there will be no need to have other type views\n        // let name = view.name.match(/^xin-(.+)-view$/)[1];\n        // return import(`../../${name}`);\n      },\n    });\n  }\n\n  get (uri) {\n    let view = this.views.find(view => view.uri === uri);\n    if (view) {\n      return view;\n    }\n\n    return this.views.find(view => {\n      if (view.isStaticRoute && view.uri === uri) {\n        return true;\n      }\n\n      return view.route.getExecutorFor(uri);\n    });\n  }\n\n  put (view) {\n    this.views.push(view);\n  }\n\n  ensure (app, uri) {\n    if (this.views.length === 0) {\n      app.querySelectorAll('[lazy-view]').forEach(el => {\n        let loader = this.loaders.find(loader => {\n          return el.nodeName.toLowerCase().match(loader.test);\n        });\n\n        let view = new _view__WEBPACK_IMPORTED_MODULE_2__[\"View\"](this, el, loader);\n        this.put(view);\n      });\n    }\n\n    let view = this.get(uri);\n    if (!view) {\n      return;\n    }\n\n    return view.load();\n  }\n\n  callback (options) {\n    const self = this;\n    return async function (ctx, next) {\n      await self.ensure(ctx.app, ctx.pathname);\n\n      await next();\n    };\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-lazy-view-middleware', LazyView);\n\n\n//# sourceURL=webpack:///../middlewares/lazy-view/lazy-view.js?");

/***/ }),

/***/ "../middlewares/lazy-view/view.js":
/*!****************************************!*\
  !*** ../middlewares/lazy-view/view.js ***!
  \****************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _components_app_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/app/route */ \"../components/app/route.js\");\n/* harmony import */ var _core_fn_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/fn/async */ \"../core/fn/async.js\");\n\n\n\n\nclass View {\n  constructor (bag, element, loader) {\n    this.name = element.nodeName.toLowerCase();\n    this.uri = element.getAttribute('uri');\n    this.element = element;\n    this.loader = loader;\n    this.route = new _components_app_route__WEBPACK_IMPORTED_MODULE_1__[\"Route\"](this.uri);\n    this.isStaticRoute = _components_app_route__WEBPACK_IMPORTED_MODULE_1__[\"Route\"].isStatic(this.uri);\n    this.bag = bag;\n  }\n\n  get loaded () {\n    if (this._loaded) {\n      return true;\n    }\n\n    const loaded = this.element.classList.contains('xin-view');\n    if (loaded) {\n      this._loaded = true;\n      return true;\n    }\n\n    return false;\n  }\n\n  async load () {\n    if (this.loaded) {\n      return;\n    }\n\n    if (!this.loader) {\n      throw new Error(`Cannot lazy load view: ${this.name}`);\n    }\n\n    this.loader.load(this);\n    await Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.element).waitFor('routed');\n\n    this._loaded = true;\n\n    // FIXME: hack to wait for sub views to be ready before routed\n    if (this.element.querySelector('.xin-view')) {\n      await _core_fn_async__WEBPACK_IMPORTED_MODULE_2__[\"Async\"].sleep(300);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../middlewares/lazy-view/view.js?");

/***/ }),

/***/ "../middlewares/title.js":
/*!*******************************!*\
  !*** ../middlewares/title.js ***!
  \*******************************/
/*! exports provided: Title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Title\", function() { return Title; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n/* harmony import */ var _components_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/middleware */ \"../components/middleware.js\");\n\n\n\nclass Title extends _components_middleware__WEBPACK_IMPORTED_MODULE_1__[\"Middleware\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      defaultTitle: {\n        type: String,\n        value: 'Xin',\n      },\n\n      formatter: {\n        type: Function,\n        value: () => this._defaultFormatter,\n      },\n    });\n  }\n\n  callback (options) {\n    const self = this;\n    return async function (ctx, next) {\n      ctx.app.once('focus', async evt => {\n        document.title = await self.formatter(evt.target) || self.defaultTitle;\n      });\n\n      await next();\n    };\n  }\n\n  _defaultFormatter (el) {\n    return el.title;\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-title-middleware', Title);\n\n\n//# sourceURL=webpack:///../middlewares/title.js?");

/***/ }),

/***/ "../node_modules/debug/node_modules/ms/index.js":
/*!******************************************************!*\
  !*** ../node_modules/debug/node_modules/ms/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isNaN(val) === false) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^((?:\\d+)?\\-?\\d?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'weeks':\n    case 'week':\n    case 'w':\n      return n * w;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (msAbs >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (msAbs >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (msAbs >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return plural(ms, msAbs, d, 'day');\n  }\n  if (msAbs >= h) {\n    return plural(ms, msAbs, h, 'hour');\n  }\n  if (msAbs >= m) {\n    return plural(ms, msAbs, m, 'minute');\n  }\n  if (msAbs >= s) {\n    return plural(ms, msAbs, s, 'second');\n  }\n  return ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, msAbs, n, name) {\n  var isPlural = msAbs >= n * 1.5;\n  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');\n}\n\n\n//# sourceURL=webpack:///../node_modules/debug/node_modules/ms/index.js?");

/***/ }),

/***/ "../node_modules/debug/src/browser.js":
/*!********************************************!*\
  !*** ../node_modules/debug/src/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */\n\n/**\n * This is the web browser implementation of `debug()`.\n */\n\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = localstorage();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n\t'#0000CC',\n\t'#0000FF',\n\t'#0033CC',\n\t'#0033FF',\n\t'#0066CC',\n\t'#0066FF',\n\t'#0099CC',\n\t'#0099FF',\n\t'#00CC00',\n\t'#00CC33',\n\t'#00CC66',\n\t'#00CC99',\n\t'#00CCCC',\n\t'#00CCFF',\n\t'#3300CC',\n\t'#3300FF',\n\t'#3333CC',\n\t'#3333FF',\n\t'#3366CC',\n\t'#3366FF',\n\t'#3399CC',\n\t'#3399FF',\n\t'#33CC00',\n\t'#33CC33',\n\t'#33CC66',\n\t'#33CC99',\n\t'#33CCCC',\n\t'#33CCFF',\n\t'#6600CC',\n\t'#6600FF',\n\t'#6633CC',\n\t'#6633FF',\n\t'#66CC00',\n\t'#66CC33',\n\t'#9900CC',\n\t'#9900FF',\n\t'#9933CC',\n\t'#9933FF',\n\t'#99CC00',\n\t'#99CC33',\n\t'#CC0000',\n\t'#CC0033',\n\t'#CC0066',\n\t'#CC0099',\n\t'#CC00CC',\n\t'#CC00FF',\n\t'#CC3300',\n\t'#CC3333',\n\t'#CC3366',\n\t'#CC3399',\n\t'#CC33CC',\n\t'#CC33FF',\n\t'#CC6600',\n\t'#CC6633',\n\t'#CC9900',\n\t'#CC9933',\n\t'#CCCC00',\n\t'#CCCC33',\n\t'#FF0000',\n\t'#FF0033',\n\t'#FF0066',\n\t'#FF0099',\n\t'#FF00CC',\n\t'#FF00FF',\n\t'#FF3300',\n\t'#FF3333',\n\t'#FF3366',\n\t'#FF3399',\n\t'#FF33CC',\n\t'#FF33FF',\n\t'#FF6600',\n\t'#FF6633',\n\t'#FF9900',\n\t'#FF9933',\n\t'#FFCC00',\n\t'#FFCC33'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\n// eslint-disable-next-line complexity\nfunction useColors() {\n\t// NB: In an Electron preload script, document will be defined but not fully\n\t// initialized. Since we know we're in Chrome, we'll just detect this case\n\t// explicitly\n\tif (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {\n\t\treturn true;\n\t}\n\n\t// Internet Explorer and Edge do not support colors.\n\tif (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/)) {\n\t\treturn false;\n\t}\n\n\t// Is webkit? http://stackoverflow.com/a/16459606/376773\n\t// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n\treturn (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||\n\t\t// Is firebug? http://stackoverflow.com/a/398120/376773\n\t\t(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||\n\t\t// Is firefox >= v31?\n\t\t// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||\n\t\t// Double check webkit in userAgent just in case we are in a worker\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/));\n}\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n\targs[0] = (this.useColors ? '%c' : '') +\n\t\tthis.namespace +\n\t\t(this.useColors ? ' %c' : ' ') +\n\t\targs[0] +\n\t\t(this.useColors ? '%c ' : ' ') +\n\t\t'+' + module.exports.humanize(this.diff);\n\n\tif (!this.useColors) {\n\t\treturn;\n\t}\n\n\tconst c = 'color: ' + this.color;\n\targs.splice(1, 0, c, 'color: inherit');\n\n\t// The final \"%c\" is somewhat tricky, because there could be other\n\t// arguments passed either before or after the %c, so we need to\n\t// figure out the correct index to insert the CSS into\n\tlet index = 0;\n\tlet lastC = 0;\n\targs[0].replace(/%[a-zA-Z%]/g, match => {\n\t\tif (match === '%%') {\n\t\t\treturn;\n\t\t}\n\t\tindex++;\n\t\tif (match === '%c') {\n\t\t\t// We only are interested in the *last* %c\n\t\t\t// (the user may have provided their own)\n\t\t\tlastC = index;\n\t\t}\n\t});\n\n\targs.splice(lastC, 0, c);\n}\n\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a \"function\".\n *\n * @api public\n */\nfunction log(...args) {\n\t// This hackery is required for IE8/9, where\n\t// the `console.log` function doesn't have 'apply'\n\treturn typeof console === 'object' &&\n\t\tconsole.log &&\n\t\tconsole.log(...args);\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\nfunction save(namespaces) {\n\ttry {\n\t\tif (namespaces) {\n\t\t\texports.storage.setItem('debug', namespaces);\n\t\t} else {\n\t\t\texports.storage.removeItem('debug');\n\t\t}\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\nfunction load() {\n\tlet r;\n\ttry {\n\t\tr = exports.storage.getItem('debug');\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n\n\t// If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n\tif (!r && typeof process !== 'undefined' && 'env' in process) {\n\t\tr = process.env.DEBUG;\n\t}\n\n\treturn r;\n}\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage() {\n\ttry {\n\t\t// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context\n\t\t// The Browser also has localStorage in the global context.\n\t\treturn localStorage;\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\nmodule.exports = __webpack_require__(/*! ./common */ \"../node_modules/debug/src/common.js\")(exports);\n\nconst {formatters} = module.exports;\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nformatters.j = function (v) {\n\ttry {\n\t\treturn JSON.stringify(v);\n\t} catch (error) {\n\t\treturn '[UnexpectedJSONParseError]: ' + error.message;\n\t}\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/debug/src/browser.js?");

/***/ }),

/***/ "../node_modules/debug/src/common.js":
/*!*******************************************!*\
  !*** ../node_modules/debug/src/common.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n */\n\nfunction setup(env) {\n\tcreateDebug.debug = createDebug;\n\tcreateDebug.default = createDebug;\n\tcreateDebug.coerce = coerce;\n\tcreateDebug.disable = disable;\n\tcreateDebug.enable = enable;\n\tcreateDebug.enabled = enabled;\n\tcreateDebug.humanize = __webpack_require__(/*! ms */ \"../node_modules/debug/node_modules/ms/index.js\");\n\n\tObject.keys(env).forEach(key => {\n\t\tcreateDebug[key] = env[key];\n\t});\n\n\t/**\n\t* Active `debug` instances.\n\t*/\n\tcreateDebug.instances = [];\n\n\t/**\n\t* The currently active debug mode names, and names to skip.\n\t*/\n\n\tcreateDebug.names = [];\n\tcreateDebug.skips = [];\n\n\t/**\n\t* Map of special \"%n\" handling functions, for the debug \"format\" argument.\n\t*\n\t* Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n\t*/\n\tcreateDebug.formatters = {};\n\n\t/**\n\t* Selects a color for a debug namespace\n\t* @param {String} namespace The namespace string for the for the debug instance to be colored\n\t* @return {Number|String} An ANSI color code for the given namespace\n\t* @api private\n\t*/\n\tfunction selectColor(namespace) {\n\t\tlet hash = 0;\n\n\t\tfor (let i = 0; i < namespace.length; i++) {\n\t\t\thash = ((hash << 5) - hash) + namespace.charCodeAt(i);\n\t\t\thash |= 0; // Convert to 32bit integer\n\t\t}\n\n\t\treturn createDebug.colors[Math.abs(hash) % createDebug.colors.length];\n\t}\n\tcreateDebug.selectColor = selectColor;\n\n\t/**\n\t* Create a debugger with the given `namespace`.\n\t*\n\t* @param {String} namespace\n\t* @return {Function}\n\t* @api public\n\t*/\n\tfunction createDebug(namespace) {\n\t\tlet prevTime;\n\n\t\tfunction debug(...args) {\n\t\t\t// Disabled?\n\t\t\tif (!debug.enabled) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tconst self = debug;\n\n\t\t\t// Set `diff` timestamp\n\t\t\tconst curr = Number(new Date());\n\t\t\tconst ms = curr - (prevTime || curr);\n\t\t\tself.diff = ms;\n\t\t\tself.prev = prevTime;\n\t\t\tself.curr = curr;\n\t\t\tprevTime = curr;\n\n\t\t\targs[0] = createDebug.coerce(args[0]);\n\n\t\t\tif (typeof args[0] !== 'string') {\n\t\t\t\t// Anything else let's inspect with %O\n\t\t\t\targs.unshift('%O');\n\t\t\t}\n\n\t\t\t// Apply any `formatters` transformations\n\t\t\tlet index = 0;\n\t\t\targs[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {\n\t\t\t\t// If we encounter an escaped % then don't increase the array index\n\t\t\t\tif (match === '%%') {\n\t\t\t\t\treturn match;\n\t\t\t\t}\n\t\t\t\tindex++;\n\t\t\t\tconst formatter = createDebug.formatters[format];\n\t\t\t\tif (typeof formatter === 'function') {\n\t\t\t\t\tconst val = args[index];\n\t\t\t\t\tmatch = formatter.call(self, val);\n\n\t\t\t\t\t// Now we need to remove `args[index]` since it's inlined in the `format`\n\t\t\t\t\targs.splice(index, 1);\n\t\t\t\t\tindex--;\n\t\t\t\t}\n\t\t\t\treturn match;\n\t\t\t});\n\n\t\t\t// Apply env-specific formatting (colors, etc.)\n\t\t\tcreateDebug.formatArgs.call(self, args);\n\n\t\t\tconst logFn = self.log || createDebug.log;\n\t\t\tlogFn.apply(self, args);\n\t\t}\n\n\t\tdebug.namespace = namespace;\n\t\tdebug.enabled = createDebug.enabled(namespace);\n\t\tdebug.useColors = createDebug.useColors();\n\t\tdebug.color = selectColor(namespace);\n\t\tdebug.destroy = destroy;\n\t\tdebug.extend = extend;\n\t\t// Debug.formatArgs = formatArgs;\n\t\t// debug.rawLog = rawLog;\n\n\t\t// env-specific initialization logic for debug instances\n\t\tif (typeof createDebug.init === 'function') {\n\t\t\tcreateDebug.init(debug);\n\t\t}\n\n\t\tcreateDebug.instances.push(debug);\n\n\t\treturn debug;\n\t}\n\n\tfunction destroy() {\n\t\tconst index = createDebug.instances.indexOf(this);\n\t\tif (index !== -1) {\n\t\t\tcreateDebug.instances.splice(index, 1);\n\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\tfunction extend(namespace, delimiter) {\n\t\treturn createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);\n\t}\n\n\t/**\n\t* Enables a debug mode by namespaces. This can include modes\n\t* separated by a colon and wildcards.\n\t*\n\t* @param {String} namespaces\n\t* @api public\n\t*/\n\tfunction enable(namespaces) {\n\t\tcreateDebug.save(namespaces);\n\n\t\tcreateDebug.names = [];\n\t\tcreateDebug.skips = [];\n\n\t\tlet i;\n\t\tconst split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n\t\tconst len = split.length;\n\n\t\tfor (i = 0; i < len; i++) {\n\t\t\tif (!split[i]) {\n\t\t\t\t// ignore empty strings\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tnamespaces = split[i].replace(/\\*/g, '.*?');\n\n\t\t\tif (namespaces[0] === '-') {\n\t\t\t\tcreateDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));\n\t\t\t} else {\n\t\t\t\tcreateDebug.names.push(new RegExp('^' + namespaces + '$'));\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0; i < createDebug.instances.length; i++) {\n\t\t\tconst instance = createDebug.instances[i];\n\t\t\tinstance.enabled = createDebug.enabled(instance.namespace);\n\t\t}\n\t}\n\n\t/**\n\t* Disable debug output.\n\t*\n\t* @api public\n\t*/\n\tfunction disable() {\n\t\tcreateDebug.enable('');\n\t}\n\n\t/**\n\t* Returns true if the given mode name is enabled, false otherwise.\n\t*\n\t* @param {String} name\n\t* @return {Boolean}\n\t* @api public\n\t*/\n\tfunction enabled(name) {\n\t\tif (name[name.length - 1] === '*') {\n\t\t\treturn true;\n\t\t}\n\n\t\tlet i;\n\t\tlet len;\n\n\t\tfor (i = 0, len = createDebug.skips.length; i < len; i++) {\n\t\t\tif (createDebug.skips[i].test(name)) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0, len = createDebug.names.length; i < len; i++) {\n\t\t\tif (createDebug.names[i].test(name)) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\t/**\n\t* Coerce `val`.\n\t*\n\t* @param {Mixed} val\n\t* @return {Mixed}\n\t* @api private\n\t*/\n\tfunction coerce(val) {\n\t\tif (val instanceof Error) {\n\t\t\treturn val.stack || val.message;\n\t\t}\n\t\treturn val;\n\t}\n\n\tcreateDebug.enable(createDebug.load());\n\n\treturn createDebug;\n}\n\nmodule.exports = setup;\n\n\n//# sourceURL=webpack:///../node_modules/debug/src/common.js?");

/***/ }),

/***/ "../node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!***************************************************************************!*\
  !*** ../node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */\n;(function(root) {\n\n\t/** Detect free variables */\n\tvar freeExports = typeof exports == 'object' && exports &&\n\t\t!exports.nodeType && exports;\n\tvar freeModule = typeof module == 'object' && module &&\n\t\t!module.nodeType && module;\n\tvar freeGlobal = typeof global == 'object' && global;\n\tif (\n\t\tfreeGlobal.global === freeGlobal ||\n\t\tfreeGlobal.window === freeGlobal ||\n\t\tfreeGlobal.self === freeGlobal\n\t) {\n\t\troot = freeGlobal;\n\t}\n\n\t/**\n\t * The `punycode` object.\n\t * @name punycode\n\t * @type Object\n\t */\n\tvar punycode,\n\n\t/** Highest positive signed 32-bit float value */\n\tmaxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1\n\n\t/** Bootstring parameters */\n\tbase = 36,\n\ttMin = 1,\n\ttMax = 26,\n\tskew = 38,\n\tdamp = 700,\n\tinitialBias = 72,\n\tinitialN = 128, // 0x80\n\tdelimiter = '-', // '\\x2D'\n\n\t/** Regular expressions */\n\tregexPunycode = /^xn--/,\n\tregexNonASCII = /[^\\x20-\\x7E]/, // unprintable ASCII chars + non-ASCII chars\n\tregexSeparators = /[\\x2E\\u3002\\uFF0E\\uFF61]/g, // RFC 3490 separators\n\n\t/** Error messages */\n\terrors = {\n\t\t'overflow': 'Overflow: input needs wider integers to process',\n\t\t'not-basic': 'Illegal input >= 0x80 (not a basic code point)',\n\t\t'invalid-input': 'Invalid input'\n\t},\n\n\t/** Convenience shortcuts */\n\tbaseMinusTMin = base - tMin,\n\tfloor = Math.floor,\n\tstringFromCharCode = String.fromCharCode,\n\n\t/** Temporary variable */\n\tkey;\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/**\n\t * A generic error utility function.\n\t * @private\n\t * @param {String} type The error type.\n\t * @returns {Error} Throws a `RangeError` with the applicable error message.\n\t */\n\tfunction error(type) {\n\t\tthrow new RangeError(errors[type]);\n\t}\n\n\t/**\n\t * A generic `Array#map` utility function.\n\t * @private\n\t * @param {Array} array The array to iterate over.\n\t * @param {Function} callback The function that gets called for every array\n\t * item.\n\t * @returns {Array} A new array of values returned by the callback function.\n\t */\n\tfunction map(array, fn) {\n\t\tvar length = array.length;\n\t\tvar result = [];\n\t\twhile (length--) {\n\t\t\tresult[length] = fn(array[length]);\n\t\t}\n\t\treturn result;\n\t}\n\n\t/**\n\t * A simple `Array#map`-like wrapper to work with domain name strings or email\n\t * addresses.\n\t * @private\n\t * @param {String} domain The domain name or email address.\n\t * @param {Function} callback The function that gets called for every\n\t * character.\n\t * @returns {Array} A new string of characters returned by the callback\n\t * function.\n\t */\n\tfunction mapDomain(string, fn) {\n\t\tvar parts = string.split('@');\n\t\tvar result = '';\n\t\tif (parts.length > 1) {\n\t\t\t// In email addresses, only the domain name should be punycoded. Leave\n\t\t\t// the local part (i.e. everything up to `@`) intact.\n\t\t\tresult = parts[0] + '@';\n\t\t\tstring = parts[1];\n\t\t}\n\t\t// Avoid `split(regex)` for IE8 compatibility. See #17.\n\t\tstring = string.replace(regexSeparators, '\\x2E');\n\t\tvar labels = string.split('.');\n\t\tvar encoded = map(labels, fn).join('.');\n\t\treturn result + encoded;\n\t}\n\n\t/**\n\t * Creates an array containing the numeric code points of each Unicode\n\t * character in the string. While JavaScript uses UCS-2 internally,\n\t * this function will convert a pair of surrogate halves (each of which\n\t * UCS-2 exposes as separate characters) into a single code point,\n\t * matching UTF-16.\n\t * @see `punycode.ucs2.encode`\n\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t * @memberOf punycode.ucs2\n\t * @name decode\n\t * @param {String} string The Unicode input string (UCS-2).\n\t * @returns {Array} The new array of code points.\n\t */\n\tfunction ucs2decode(string) {\n\t\tvar output = [],\n\t\t    counter = 0,\n\t\t    length = string.length,\n\t\t    value,\n\t\t    extra;\n\t\twhile (counter < length) {\n\t\t\tvalue = string.charCodeAt(counter++);\n\t\t\tif (value >= 0xD800 && value <= 0xDBFF && counter < length) {\n\t\t\t\t// high surrogate, and there is a next character\n\t\t\t\textra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) { // low surrogate\n\t\t\t\t\toutput.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);\n\t\t\t\t} else {\n\t\t\t\t\t// unmatched surrogate; only append this code unit, in case the next\n\t\t\t\t\t// code unit is the high surrogate of a surrogate pair\n\t\t\t\t\toutput.push(value);\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\toutput.push(value);\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t}\n\n\t/**\n\t * Creates a string based on an array of numeric code points.\n\t * @see `punycode.ucs2.decode`\n\t * @memberOf punycode.ucs2\n\t * @name encode\n\t * @param {Array} codePoints The array of numeric code points.\n\t * @returns {String} The new Unicode string (UCS-2).\n\t */\n\tfunction ucs2encode(array) {\n\t\treturn map(array, function(value) {\n\t\t\tvar output = '';\n\t\t\tif (value > 0xFFFF) {\n\t\t\t\tvalue -= 0x10000;\n\t\t\t\toutput += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);\n\t\t\t\tvalue = 0xDC00 | value & 0x3FF;\n\t\t\t}\n\t\t\toutput += stringFromCharCode(value);\n\t\t\treturn output;\n\t\t}).join('');\n\t}\n\n\t/**\n\t * Converts a basic code point into a digit/integer.\n\t * @see `digitToBasic()`\n\t * @private\n\t * @param {Number} codePoint The basic numeric code point value.\n\t * @returns {Number} The numeric value of a basic code point (for use in\n\t * representing integers) in the range `0` to `base - 1`, or `base` if\n\t * the code point does not represent a value.\n\t */\n\tfunction basicToDigit(codePoint) {\n\t\tif (codePoint - 48 < 10) {\n\t\t\treturn codePoint - 22;\n\t\t}\n\t\tif (codePoint - 65 < 26) {\n\t\t\treturn codePoint - 65;\n\t\t}\n\t\tif (codePoint - 97 < 26) {\n\t\t\treturn codePoint - 97;\n\t\t}\n\t\treturn base;\n\t}\n\n\t/**\n\t * Converts a digit/integer into a basic code point.\n\t * @see `basicToDigit()`\n\t * @private\n\t * @param {Number} digit The numeric value of a basic code point.\n\t * @returns {Number} The basic code point whose value (when used for\n\t * representing integers) is `digit`, which needs to be in the range\n\t * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is\n\t * used; else, the lowercase form is used. The behavior is undefined\n\t * if `flag` is non-zero and `digit` has no uppercase form.\n\t */\n\tfunction digitToBasic(digit, flag) {\n\t\t//  0..25 map to ASCII a..z or A..Z\n\t\t// 26..35 map to ASCII 0..9\n\t\treturn digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);\n\t}\n\n\t/**\n\t * Bias adaptation function as per section 3.4 of RFC 3492.\n\t * https://tools.ietf.org/html/rfc3492#section-3.4\n\t * @private\n\t */\n\tfunction adapt(delta, numPoints, firstTime) {\n\t\tvar k = 0;\n\t\tdelta = firstTime ? floor(delta / damp) : delta >> 1;\n\t\tdelta += floor(delta / numPoints);\n\t\tfor (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {\n\t\t\tdelta = floor(delta / baseMinusTMin);\n\t\t}\n\t\treturn floor(k + (baseMinusTMin + 1) * delta / (delta + skew));\n\t}\n\n\t/**\n\t * Converts a Punycode string of ASCII-only symbols to a string of Unicode\n\t * symbols.\n\t * @memberOf punycode\n\t * @param {String} input The Punycode string of ASCII-only symbols.\n\t * @returns {String} The resulting string of Unicode symbols.\n\t */\n\tfunction decode(input) {\n\t\t// Don't use UCS-2\n\t\tvar output = [],\n\t\t    inputLength = input.length,\n\t\t    out,\n\t\t    i = 0,\n\t\t    n = initialN,\n\t\t    bias = initialBias,\n\t\t    basic,\n\t\t    j,\n\t\t    index,\n\t\t    oldi,\n\t\t    w,\n\t\t    k,\n\t\t    digit,\n\t\t    t,\n\t\t    /** Cached calculation results */\n\t\t    baseMinusT;\n\n\t\t// Handle the basic code points: let `basic` be the number of input code\n\t\t// points before the last delimiter, or `0` if there is none, then copy\n\t\t// the first basic code points to the output.\n\n\t\tbasic = input.lastIndexOf(delimiter);\n\t\tif (basic < 0) {\n\t\t\tbasic = 0;\n\t\t}\n\n\t\tfor (j = 0; j < basic; ++j) {\n\t\t\t// if it's not a basic code point\n\t\t\tif (input.charCodeAt(j) >= 0x80) {\n\t\t\t\terror('not-basic');\n\t\t\t}\n\t\t\toutput.push(input.charCodeAt(j));\n\t\t}\n\n\t\t// Main decoding loop: start just after the last delimiter if any basic code\n\t\t// points were copied; start at the beginning otherwise.\n\n\t\tfor (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {\n\n\t\t\t// `index` is the index of the next character to be consumed.\n\t\t\t// Decode a generalized variable-length integer into `delta`,\n\t\t\t// which gets added to `i`. The overflow checking is easier\n\t\t\t// if we increase `i` as we go, then subtract off its starting\n\t\t\t// value at the end to obtain `delta`.\n\t\t\tfor (oldi = i, w = 1, k = base; /* no condition */; k += base) {\n\n\t\t\t\tif (index >= inputLength) {\n\t\t\t\t\terror('invalid-input');\n\t\t\t\t}\n\n\t\t\t\tdigit = basicToDigit(input.charCodeAt(index++));\n\n\t\t\t\tif (digit >= base || digit > floor((maxInt - i) / w)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\ti += digit * w;\n\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\n\t\t\t\tif (digit < t) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tbaseMinusT = base - t;\n\t\t\t\tif (w > floor(maxInt / baseMinusT)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tw *= baseMinusT;\n\n\t\t\t}\n\n\t\t\tout = output.length + 1;\n\t\t\tbias = adapt(i - oldi, out, oldi == 0);\n\n\t\t\t// `i` was supposed to wrap around from `out` to `0`,\n\t\t\t// incrementing `n` each time, so we'll fix that now:\n\t\t\tif (floor(i / out) > maxInt - n) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tn += floor(i / out);\n\t\t\ti %= out;\n\n\t\t\t// Insert `n` at position `i` of the output\n\t\t\toutput.splice(i++, 0, n);\n\n\t\t}\n\n\t\treturn ucs2encode(output);\n\t}\n\n\t/**\n\t * Converts a string of Unicode symbols (e.g. a domain name label) to a\n\t * Punycode string of ASCII-only symbols.\n\t * @memberOf punycode\n\t * @param {String} input The string of Unicode symbols.\n\t * @returns {String} The resulting Punycode string of ASCII-only symbols.\n\t */\n\tfunction encode(input) {\n\t\tvar n,\n\t\t    delta,\n\t\t    handledCPCount,\n\t\t    basicLength,\n\t\t    bias,\n\t\t    j,\n\t\t    m,\n\t\t    q,\n\t\t    k,\n\t\t    t,\n\t\t    currentValue,\n\t\t    output = [],\n\t\t    /** `inputLength` will hold the number of code points in `input`. */\n\t\t    inputLength,\n\t\t    /** Cached calculation results */\n\t\t    handledCPCountPlusOne,\n\t\t    baseMinusT,\n\t\t    qMinusT;\n\n\t\t// Convert the input in UCS-2 to Unicode\n\t\tinput = ucs2decode(input);\n\n\t\t// Cache the length\n\t\tinputLength = input.length;\n\n\t\t// Initialize the state\n\t\tn = initialN;\n\t\tdelta = 0;\n\t\tbias = initialBias;\n\n\t\t// Handle the basic code points\n\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\tcurrentValue = input[j];\n\t\t\tif (currentValue < 0x80) {\n\t\t\t\toutput.push(stringFromCharCode(currentValue));\n\t\t\t}\n\t\t}\n\n\t\thandledCPCount = basicLength = output.length;\n\n\t\t// `handledCPCount` is the number of code points that have been handled;\n\t\t// `basicLength` is the number of basic code points.\n\n\t\t// Finish the basic string - if it is not empty - with a delimiter\n\t\tif (basicLength) {\n\t\t\toutput.push(delimiter);\n\t\t}\n\n\t\t// Main encoding loop:\n\t\twhile (handledCPCount < inputLength) {\n\n\t\t\t// All non-basic code points < n have been handled already. Find the next\n\t\t\t// larger one:\n\t\t\tfor (m = maxInt, j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\t\t\t\tif (currentValue >= n && currentValue < m) {\n\t\t\t\t\tm = currentValue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,\n\t\t\t// but guard against overflow\n\t\t\thandledCPCountPlusOne = handledCPCount + 1;\n\t\t\tif (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tdelta += (m - n) * handledCPCountPlusOne;\n\t\t\tn = m;\n\n\t\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\n\t\t\t\tif (currentValue < n && ++delta > maxInt) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tif (currentValue == n) {\n\t\t\t\t\t// Represent delta as a generalized variable-length integer\n\t\t\t\t\tfor (q = delta, k = base; /* no condition */; k += base) {\n\t\t\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\t\t\t\t\t\tif (q < t) {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tqMinusT = q - t;\n\t\t\t\t\t\tbaseMinusT = base - t;\n\t\t\t\t\t\toutput.push(\n\t\t\t\t\t\t\tstringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))\n\t\t\t\t\t\t);\n\t\t\t\t\t\tq = floor(qMinusT / baseMinusT);\n\t\t\t\t\t}\n\n\t\t\t\t\toutput.push(stringFromCharCode(digitToBasic(q, 0)));\n\t\t\t\t\tbias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);\n\t\t\t\t\tdelta = 0;\n\t\t\t\t\t++handledCPCount;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t++delta;\n\t\t\t++n;\n\n\t\t}\n\t\treturn output.join('');\n\t}\n\n\t/**\n\t * Converts a Punycode string representing a domain name or an email address\n\t * to Unicode. Only the Punycoded parts of the input will be converted, i.e.\n\t * it doesn't matter if you call it on a string that has already been\n\t * converted to Unicode.\n\t * @memberOf punycode\n\t * @param {String} input The Punycoded domain name or email address to\n\t * convert to Unicode.\n\t * @returns {String} The Unicode representation of the given Punycode\n\t * string.\n\t */\n\tfunction toUnicode(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexPunycode.test(string)\n\t\t\t\t? decode(string.slice(4).toLowerCase())\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/**\n\t * Converts a Unicode string representing a domain name or an email address to\n\t * Punycode. Only the non-ASCII parts of the domain name will be converted,\n\t * i.e. it doesn't matter if you call it with a domain that's already in\n\t * ASCII.\n\t * @memberOf punycode\n\t * @param {String} input The domain name or email address to convert, as a\n\t * Unicode string.\n\t * @returns {String} The Punycode representation of the given domain name or\n\t * email address.\n\t */\n\tfunction toASCII(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexNonASCII.test(string)\n\t\t\t\t? 'xn--' + encode(string)\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/** Define the public API */\n\tpunycode = {\n\t\t/**\n\t\t * A string representing the current Punycode.js version number.\n\t\t * @memberOf punycode\n\t\t * @type String\n\t\t */\n\t\t'version': '1.4.1',\n\t\t/**\n\t\t * An object of methods to convert from JavaScript's internal character\n\t\t * representation (UCS-2) to Unicode code points, and back.\n\t\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t\t * @memberOf punycode\n\t\t * @type Object\n\t\t */\n\t\t'ucs2': {\n\t\t\t'decode': ucs2decode,\n\t\t\t'encode': ucs2encode\n\t\t},\n\t\t'decode': decode,\n\t\t'encode': encode,\n\t\t'toASCII': toASCII,\n\t\t'toUnicode': toUnicode\n\t};\n\n\t/** Expose `punycode` */\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\ttrue\n\t) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n\t\t\treturn punycode;\n\t\t}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n\n}(this));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ \"../node_modules/webpack/buildin/module.js\")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"../node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///../node_modules/node-libs-browser/node_modules/punycode/punycode.js?");

/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///../node_modules/process/browser.js?");

/***/ }),

/***/ "../node_modules/querystring-es3/decode.js":
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/decode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\n\n//# sourceURL=webpack:///../node_modules/querystring-es3/decode.js?");

/***/ }),

/***/ "../node_modules/querystring-es3/encode.js":
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/encode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return map(objectKeys(obj), function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (isArray(obj[k])) {\n        return map(obj[k], function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\nfunction map (xs, f) {\n  if (xs.map) return xs.map(f);\n  var res = [];\n  for (var i = 0; i < xs.length; i++) {\n    res.push(f(xs[i], i));\n  }\n  return res;\n}\n\nvar objectKeys = Object.keys || function (obj) {\n  var res = [];\n  for (var key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);\n  }\n  return res;\n};\n\n\n//# sourceURL=webpack:///../node_modules/querystring-es3/encode.js?");

/***/ }),

/***/ "../node_modules/querystring-es3/index.js":
/*!************************************************!*\
  !*** ../node_modules/querystring-es3/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"../node_modules/querystring-es3/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"../node_modules/querystring-es3/encode.js\");\n\n\n//# sourceURL=webpack:///../node_modules/querystring-es3/index.js?");

/***/ }),

/***/ "../node_modules/url/url.js":
/*!**********************************!*\
  !*** ../node_modules/url/url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar punycode = __webpack_require__(/*! punycode */ \"../node_modules/node-libs-browser/node_modules/punycode/punycode.js\");\nvar util = __webpack_require__(/*! ./util */ \"../node_modules/url/util.js\");\n\nexports.parse = urlParse;\nexports.resolve = urlResolve;\nexports.resolveObject = urlResolveObject;\nexports.format = urlFormat;\n\nexports.Url = Url;\n\nfunction Url() {\n  this.protocol = null;\n  this.slashes = null;\n  this.auth = null;\n  this.host = null;\n  this.port = null;\n  this.hostname = null;\n  this.hash = null;\n  this.search = null;\n  this.query = null;\n  this.pathname = null;\n  this.path = null;\n  this.href = null;\n}\n\n// Reference: RFC 3986, RFC 1808, RFC 2396\n\n// define these here so at least they only have to be\n// compiled once on the first module load.\nvar protocolPattern = /^([a-z0-9.+-]+:)/i,\n    portPattern = /:[0-9]*$/,\n\n    // Special case for a simple path URL\n    simplePathPattern = /^(\\/\\/?(?!\\/)[^\\?\\s]*)(\\?[^\\s]*)?$/,\n\n    // RFC 2396: characters reserved for delimiting URLs.\n    // We actually just auto-escape these.\n    delims = ['<', '>', '\"', '`', ' ', '\\r', '\\n', '\\t'],\n\n    // RFC 2396: characters not allowed for various reasons.\n    unwise = ['{', '}', '|', '\\\\', '^', '`'].concat(delims),\n\n    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.\n    autoEscape = ['\\''].concat(unwise),\n    // Characters that are never ever allowed in a hostname.\n    // Note that any invalid chars are also handled, but these\n    // are the ones that are *expected* to be seen, so we fast-path\n    // them.\n    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),\n    hostEndingChars = ['/', '?', '#'],\n    hostnameMaxLen = 255,\n    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,\n    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,\n    // protocols that can allow \"unsafe\" and \"unwise\" chars.\n    unsafeProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that never have a hostname.\n    hostlessProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that always contain a // bit.\n    slashedProtocol = {\n      'http': true,\n      'https': true,\n      'ftp': true,\n      'gopher': true,\n      'file': true,\n      'http:': true,\n      'https:': true,\n      'ftp:': true,\n      'gopher:': true,\n      'file:': true\n    },\n    querystring = __webpack_require__(/*! querystring */ \"../node_modules/querystring-es3/index.js\");\n\nfunction urlParse(url, parseQueryString, slashesDenoteHost) {\n  if (url && util.isObject(url) && url instanceof Url) return url;\n\n  var u = new Url;\n  u.parse(url, parseQueryString, slashesDenoteHost);\n  return u;\n}\n\nUrl.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {\n  if (!util.isString(url)) {\n    throw new TypeError(\"Parameter 'url' must be a string, not \" + typeof url);\n  }\n\n  // Copy chrome, IE, opera backslash-handling behavior.\n  // Back slashes before the query string get converted to forward slashes\n  // See: https://code.google.com/p/chromium/issues/detail?id=25916\n  var queryIndex = url.indexOf('?'),\n      splitter =\n          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',\n      uSplit = url.split(splitter),\n      slashRegex = /\\\\/g;\n  uSplit[0] = uSplit[0].replace(slashRegex, '/');\n  url = uSplit.join(splitter);\n\n  var rest = url;\n\n  // trim before proceeding.\n  // This is to support parse stuff like \"  http://foo.com  \\n\"\n  rest = rest.trim();\n\n  if (!slashesDenoteHost && url.split('#').length === 1) {\n    // Try fast path regexp\n    var simplePath = simplePathPattern.exec(rest);\n    if (simplePath) {\n      this.path = rest;\n      this.href = rest;\n      this.pathname = simplePath[1];\n      if (simplePath[2]) {\n        this.search = simplePath[2];\n        if (parseQueryString) {\n          this.query = querystring.parse(this.search.substr(1));\n        } else {\n          this.query = this.search.substr(1);\n        }\n      } else if (parseQueryString) {\n        this.search = '';\n        this.query = {};\n      }\n      return this;\n    }\n  }\n\n  var proto = protocolPattern.exec(rest);\n  if (proto) {\n    proto = proto[0];\n    var lowerProto = proto.toLowerCase();\n    this.protocol = lowerProto;\n    rest = rest.substr(proto.length);\n  }\n\n  // figure out if it's got a host\n  // user@server is *always* interpreted as a hostname, and url\n  // resolution will treat //foo/bar as host=foo,path=bar because that's\n  // how the browser resolves relative URLs.\n  if (slashesDenoteHost || proto || rest.match(/^\\/\\/[^@\\/]+@[^@\\/]+/)) {\n    var slashes = rest.substr(0, 2) === '//';\n    if (slashes && !(proto && hostlessProtocol[proto])) {\n      rest = rest.substr(2);\n      this.slashes = true;\n    }\n  }\n\n  if (!hostlessProtocol[proto] &&\n      (slashes || (proto && !slashedProtocol[proto]))) {\n\n    // there's a hostname.\n    // the first instance of /, ?, ;, or # ends the host.\n    //\n    // If there is an @ in the hostname, then non-host chars *are* allowed\n    // to the left of the last @ sign, unless some host-ending character\n    // comes *before* the @-sign.\n    // URLs are obnoxious.\n    //\n    // ex:\n    // http://a@b@c/ => user:a@b host:c\n    // http://a@b?@c => user:a host:c path:/?@c\n\n    // v0.12 TODO(isaacs): This is not quite how Chrome does things.\n    // Review our test case against browsers more comprehensively.\n\n    // find the first instance of any hostEndingChars\n    var hostEnd = -1;\n    for (var i = 0; i < hostEndingChars.length; i++) {\n      var hec = rest.indexOf(hostEndingChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n\n    // at this point, either we have an explicit point where the\n    // auth portion cannot go past, or the last @ char is the decider.\n    var auth, atSign;\n    if (hostEnd === -1) {\n      // atSign can be anywhere.\n      atSign = rest.lastIndexOf('@');\n    } else {\n      // atSign must be in auth portion.\n      // http://a@b/c@d => host:b auth:a path:/c@d\n      atSign = rest.lastIndexOf('@', hostEnd);\n    }\n\n    // Now we have a portion which is definitely the auth.\n    // Pull that off.\n    if (atSign !== -1) {\n      auth = rest.slice(0, atSign);\n      rest = rest.slice(atSign + 1);\n      this.auth = decodeURIComponent(auth);\n    }\n\n    // the host is the remaining to the left of the first non-host char\n    hostEnd = -1;\n    for (var i = 0; i < nonHostChars.length; i++) {\n      var hec = rest.indexOf(nonHostChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n    // if we still have not hit it, then the entire thing is a host.\n    if (hostEnd === -1)\n      hostEnd = rest.length;\n\n    this.host = rest.slice(0, hostEnd);\n    rest = rest.slice(hostEnd);\n\n    // pull out port.\n    this.parseHost();\n\n    // we've indicated that there is a hostname,\n    // so even if it's empty, it has to be present.\n    this.hostname = this.hostname || '';\n\n    // if hostname begins with [ and ends with ]\n    // assume that it's an IPv6 address.\n    var ipv6Hostname = this.hostname[0] === '[' &&\n        this.hostname[this.hostname.length - 1] === ']';\n\n    // validate a little.\n    if (!ipv6Hostname) {\n      var hostparts = this.hostname.split(/\\./);\n      for (var i = 0, l = hostparts.length; i < l; i++) {\n        var part = hostparts[i];\n        if (!part) continue;\n        if (!part.match(hostnamePartPattern)) {\n          var newpart = '';\n          for (var j = 0, k = part.length; j < k; j++) {\n            if (part.charCodeAt(j) > 127) {\n              // we replace non-ASCII char with a temporary placeholder\n              // we need this to make sure size of hostname is not\n              // broken by replacing non-ASCII by nothing\n              newpart += 'x';\n            } else {\n              newpart += part[j];\n            }\n          }\n          // we test again with ASCII char only\n          if (!newpart.match(hostnamePartPattern)) {\n            var validParts = hostparts.slice(0, i);\n            var notHost = hostparts.slice(i + 1);\n            var bit = part.match(hostnamePartStart);\n            if (bit) {\n              validParts.push(bit[1]);\n              notHost.unshift(bit[2]);\n            }\n            if (notHost.length) {\n              rest = '/' + notHost.join('.') + rest;\n            }\n            this.hostname = validParts.join('.');\n            break;\n          }\n        }\n      }\n    }\n\n    if (this.hostname.length > hostnameMaxLen) {\n      this.hostname = '';\n    } else {\n      // hostnames are always lower case.\n      this.hostname = this.hostname.toLowerCase();\n    }\n\n    if (!ipv6Hostname) {\n      // IDNA Support: Returns a punycoded representation of \"domain\".\n      // It only converts parts of the domain name that\n      // have non-ASCII characters, i.e. it doesn't matter if\n      // you call it with a domain that already is ASCII-only.\n      this.hostname = punycode.toASCII(this.hostname);\n    }\n\n    var p = this.port ? ':' + this.port : '';\n    var h = this.hostname || '';\n    this.host = h + p;\n    this.href += this.host;\n\n    // strip [ and ] from the hostname\n    // the host field still retains them, though\n    if (ipv6Hostname) {\n      this.hostname = this.hostname.substr(1, this.hostname.length - 2);\n      if (rest[0] !== '/') {\n        rest = '/' + rest;\n      }\n    }\n  }\n\n  // now rest is set to the post-host stuff.\n  // chop off any delim chars.\n  if (!unsafeProtocol[lowerProto]) {\n\n    // First, make 100% sure that any \"autoEscape\" chars get\n    // escaped, even if encodeURIComponent doesn't think they\n    // need to be.\n    for (var i = 0, l = autoEscape.length; i < l; i++) {\n      var ae = autoEscape[i];\n      if (rest.indexOf(ae) === -1)\n        continue;\n      var esc = encodeURIComponent(ae);\n      if (esc === ae) {\n        esc = escape(ae);\n      }\n      rest = rest.split(ae).join(esc);\n    }\n  }\n\n\n  // chop off from the tail first.\n  var hash = rest.indexOf('#');\n  if (hash !== -1) {\n    // got a fragment string.\n    this.hash = rest.substr(hash);\n    rest = rest.slice(0, hash);\n  }\n  var qm = rest.indexOf('?');\n  if (qm !== -1) {\n    this.search = rest.substr(qm);\n    this.query = rest.substr(qm + 1);\n    if (parseQueryString) {\n      this.query = querystring.parse(this.query);\n    }\n    rest = rest.slice(0, qm);\n  } else if (parseQueryString) {\n    // no query string, but parseQueryString still requested\n    this.search = '';\n    this.query = {};\n  }\n  if (rest) this.pathname = rest;\n  if (slashedProtocol[lowerProto] &&\n      this.hostname && !this.pathname) {\n    this.pathname = '/';\n  }\n\n  //to support http.request\n  if (this.pathname || this.search) {\n    var p = this.pathname || '';\n    var s = this.search || '';\n    this.path = p + s;\n  }\n\n  // finally, reconstruct the href based on what has been validated.\n  this.href = this.format();\n  return this;\n};\n\n// format a parsed object into a url string\nfunction urlFormat(obj) {\n  // ensure it's an object, and not a string url.\n  // If it's an obj, this is a no-op.\n  // this way, you can call url_format() on strings\n  // to clean up potentially wonky urls.\n  if (util.isString(obj)) obj = urlParse(obj);\n  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);\n  return obj.format();\n}\n\nUrl.prototype.format = function() {\n  var auth = this.auth || '';\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, ':');\n    auth += '@';\n  }\n\n  var protocol = this.protocol || '',\n      pathname = this.pathname || '',\n      hash = this.hash || '',\n      host = false,\n      query = '';\n\n  if (this.host) {\n    host = auth + this.host;\n  } else if (this.hostname) {\n    host = auth + (this.hostname.indexOf(':') === -1 ?\n        this.hostname :\n        '[' + this.hostname + ']');\n    if (this.port) {\n      host += ':' + this.port;\n    }\n  }\n\n  if (this.query &&\n      util.isObject(this.query) &&\n      Object.keys(this.query).length) {\n    query = querystring.stringify(this.query);\n  }\n\n  var search = this.search || (query && ('?' + query)) || '';\n\n  if (protocol && protocol.substr(-1) !== ':') protocol += ':';\n\n  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.\n  // unless they had them to begin with.\n  if (this.slashes ||\n      (!protocol || slashedProtocol[protocol]) && host !== false) {\n    host = '//' + (host || '');\n    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;\n  } else if (!host) {\n    host = '';\n  }\n\n  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;\n  if (search && search.charAt(0) !== '?') search = '?' + search;\n\n  pathname = pathname.replace(/[?#]/g, function(match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace('#', '%23');\n\n  return protocol + host + pathname + search + hash;\n};\n\nfunction urlResolve(source, relative) {\n  return urlParse(source, false, true).resolve(relative);\n}\n\nUrl.prototype.resolve = function(relative) {\n  return this.resolveObject(urlParse(relative, false, true)).format();\n};\n\nfunction urlResolveObject(source, relative) {\n  if (!source) return relative;\n  return urlParse(source, false, true).resolveObject(relative);\n}\n\nUrl.prototype.resolveObject = function(relative) {\n  if (util.isString(relative)) {\n    var rel = new Url();\n    rel.parse(relative, false, true);\n    relative = rel;\n  }\n\n  var result = new Url();\n  var tkeys = Object.keys(this);\n  for (var tk = 0; tk < tkeys.length; tk++) {\n    var tkey = tkeys[tk];\n    result[tkey] = this[tkey];\n  }\n\n  // hash is always overridden, no matter what.\n  // even href=\"\" will remove it.\n  result.hash = relative.hash;\n\n  // if the relative url is empty, then there's nothing left to do here.\n  if (relative.href === '') {\n    result.href = result.format();\n    return result;\n  }\n\n  // hrefs like //foo/bar always cut to the protocol.\n  if (relative.slashes && !relative.protocol) {\n    // take everything except the protocol from relative\n    var rkeys = Object.keys(relative);\n    for (var rk = 0; rk < rkeys.length; rk++) {\n      var rkey = rkeys[rk];\n      if (rkey !== 'protocol')\n        result[rkey] = relative[rkey];\n    }\n\n    //urlParse appends trailing / to urls like http://www.example.com\n    if (slashedProtocol[result.protocol] &&\n        result.hostname && !result.pathname) {\n      result.path = result.pathname = '/';\n    }\n\n    result.href = result.format();\n    return result;\n  }\n\n  if (relative.protocol && relative.protocol !== result.protocol) {\n    // if it's a known url protocol, then changing\n    // the protocol does weird things\n    // first, if it's not file:, then we MUST have a host,\n    // and if there was a path\n    // to begin with, then we MUST have a path.\n    // if it is file:, then the host is dropped,\n    // because that's known to be hostless.\n    // anything else is assumed to be absolute.\n    if (!slashedProtocol[relative.protocol]) {\n      var keys = Object.keys(relative);\n      for (var v = 0; v < keys.length; v++) {\n        var k = keys[v];\n        result[k] = relative[k];\n      }\n      result.href = result.format();\n      return result;\n    }\n\n    result.protocol = relative.protocol;\n    if (!relative.host && !hostlessProtocol[relative.protocol]) {\n      var relPath = (relative.pathname || '').split('/');\n      while (relPath.length && !(relative.host = relPath.shift()));\n      if (!relative.host) relative.host = '';\n      if (!relative.hostname) relative.hostname = '';\n      if (relPath[0] !== '') relPath.unshift('');\n      if (relPath.length < 2) relPath.unshift('');\n      result.pathname = relPath.join('/');\n    } else {\n      result.pathname = relative.pathname;\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    result.host = relative.host || '';\n    result.auth = relative.auth;\n    result.hostname = relative.hostname || relative.host;\n    result.port = relative.port;\n    // to support http.request\n    if (result.pathname || result.search) {\n      var p = result.pathname || '';\n      var s = result.search || '';\n      result.path = p + s;\n    }\n    result.slashes = result.slashes || relative.slashes;\n    result.href = result.format();\n    return result;\n  }\n\n  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),\n      isRelAbs = (\n          relative.host ||\n          relative.pathname && relative.pathname.charAt(0) === '/'\n      ),\n      mustEndAbs = (isRelAbs || isSourceAbs ||\n                    (result.host && relative.pathname)),\n      removeAllDots = mustEndAbs,\n      srcPath = result.pathname && result.pathname.split('/') || [],\n      relPath = relative.pathname && relative.pathname.split('/') || [],\n      psychotic = result.protocol && !slashedProtocol[result.protocol];\n\n  // if the url is a non-slashed url, then relative\n  // links like ../.. should be able\n  // to crawl up to the hostname, as well.  This is strange.\n  // result.protocol has already been set by now.\n  // Later on, put the first path part into the host field.\n  if (psychotic) {\n    result.hostname = '';\n    result.port = null;\n    if (result.host) {\n      if (srcPath[0] === '') srcPath[0] = result.host;\n      else srcPath.unshift(result.host);\n    }\n    result.host = '';\n    if (relative.protocol) {\n      relative.hostname = null;\n      relative.port = null;\n      if (relative.host) {\n        if (relPath[0] === '') relPath[0] = relative.host;\n        else relPath.unshift(relative.host);\n      }\n      relative.host = null;\n    }\n    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');\n  }\n\n  if (isRelAbs) {\n    // it's absolute.\n    result.host = (relative.host || relative.host === '') ?\n                  relative.host : result.host;\n    result.hostname = (relative.hostname || relative.hostname === '') ?\n                      relative.hostname : result.hostname;\n    result.search = relative.search;\n    result.query = relative.query;\n    srcPath = relPath;\n    // fall through to the dot-handling below.\n  } else if (relPath.length) {\n    // it's relative\n    // throw away the existing file, and take the new path instead.\n    if (!srcPath) srcPath = [];\n    srcPath.pop();\n    srcPath = srcPath.concat(relPath);\n    result.search = relative.search;\n    result.query = relative.query;\n  } else if (!util.isNullOrUndefined(relative.search)) {\n    // just pull out the search.\n    // like href='?foo'.\n    // Put this after the other two cases because it simplifies the booleans\n    if (psychotic) {\n      result.hostname = result.host = srcPath.shift();\n      //occationaly the auth can get stuck only in host\n      //this especially happens in cases like\n      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n      var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                       result.host.split('@') : false;\n      if (authInHost) {\n        result.auth = authInHost.shift();\n        result.host = result.hostname = authInHost.shift();\n      }\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    //to support http.request\n    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n      result.path = (result.pathname ? result.pathname : '') +\n                    (result.search ? result.search : '');\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  if (!srcPath.length) {\n    // no path at all.  easy.\n    // we've already handled the other stuff above.\n    result.pathname = null;\n    //to support http.request\n    if (result.search) {\n      result.path = '/' + result.search;\n    } else {\n      result.path = null;\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  // if a url ENDs in . or .., then it must get a trailing slash.\n  // however, if it ends in anything else non-slashy,\n  // then it must NOT get a trailing slash.\n  var last = srcPath.slice(-1)[0];\n  var hasTrailingSlash = (\n      (result.host || relative.host || srcPath.length > 1) &&\n      (last === '.' || last === '..') || last === '');\n\n  // strip single dots, resolve double dots to parent dir\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = srcPath.length; i >= 0; i--) {\n    last = srcPath[i];\n    if (last === '.') {\n      srcPath.splice(i, 1);\n    } else if (last === '..') {\n      srcPath.splice(i, 1);\n      up++;\n    } else if (up) {\n      srcPath.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (!mustEndAbs && !removeAllDots) {\n    for (; up--; up) {\n      srcPath.unshift('..');\n    }\n  }\n\n  if (mustEndAbs && srcPath[0] !== '' &&\n      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {\n    srcPath.unshift('');\n  }\n\n  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {\n    srcPath.push('');\n  }\n\n  var isAbsolute = srcPath[0] === '' ||\n      (srcPath[0] && srcPath[0].charAt(0) === '/');\n\n  // put the host back\n  if (psychotic) {\n    result.hostname = result.host = isAbsolute ? '' :\n                                    srcPath.length ? srcPath.shift() : '';\n    //occationaly the auth can get stuck only in host\n    //this especially happens in cases like\n    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n    var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                     result.host.split('@') : false;\n    if (authInHost) {\n      result.auth = authInHost.shift();\n      result.host = result.hostname = authInHost.shift();\n    }\n  }\n\n  mustEndAbs = mustEndAbs || (result.host && srcPath.length);\n\n  if (mustEndAbs && !isAbsolute) {\n    srcPath.unshift('');\n  }\n\n  if (!srcPath.length) {\n    result.pathname = null;\n    result.path = null;\n  } else {\n    result.pathname = srcPath.join('/');\n  }\n\n  //to support request.http\n  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n    result.path = (result.pathname ? result.pathname : '') +\n                  (result.search ? result.search : '');\n  }\n  result.auth = relative.auth || result.auth;\n  result.slashes = result.slashes || relative.slashes;\n  result.href = result.format();\n  return result;\n};\n\nUrl.prototype.parseHost = function() {\n  var host = this.host;\n  var port = portPattern.exec(host);\n  if (port) {\n    port = port[0];\n    if (port !== ':') {\n      this.port = port.substr(1);\n    }\n    host = host.substr(0, host.length - port.length);\n  }\n  if (host) this.hostname = host;\n};\n\n\n//# sourceURL=webpack:///../node_modules/url/url.js?");

/***/ }),

/***/ "../node_modules/url/util.js":
/*!***********************************!*\
  !*** ../node_modules/url/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  isString: function(arg) {\n    return typeof(arg) === 'string';\n  },\n  isObject: function(arg) {\n    return typeof(arg) === 'object' && arg !== null;\n  },\n  isNull: function(arg) {\n    return arg === null;\n  },\n  isNullOrUndefined: function(arg) {\n    return arg == null;\n  }\n};\n\n\n//# sourceURL=webpack:///../node_modules/url/util.js?");

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///../node_modules/webpack/buildin/global.js?");

/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif (!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif (!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n\n\n//# sourceURL=webpack:///../node_modules/webpack/buildin/module.js?");

/***/ }),

/***/ "./xin.js":
/*!****************!*\
  !*** ./xin.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("if ('xin' in window) {\n  throw new Error('Xin already declared!');\n}\n\nconst xin = window.xin = __webpack_require__(/*! ../ */ \"../index.js\");\n\nxin.getInstance(); // force creating new instance of repository for the first time\n\nxin.components = __webpack_require__(/*! ../components */ \"../components/index.js\");\nxin.middlewares = __webpack_require__(/*! ../middlewares */ \"../middlewares/index.js\");\n\n__webpack_require__(/*! ./xin.scss */ \"./xin.scss\");\n\n\n//# sourceURL=webpack:///./xin.js?");

/***/ }),

/***/ "./xin.scss":
/*!******************!*\
  !*** ./xin.scss ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./xin.scss?");

/***/ })

/******/ });