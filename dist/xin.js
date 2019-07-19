(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xin"] = factory();
	else
		root["xin"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./component/accessor/attribute.js":
/*!*****************************************!*\
  !*** ./component/accessor/attribute.js ***!
  \*****************************************/
/*! exports provided: AttributeAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AttributeAccessor\", function() { return AttributeAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\nclass AttributeAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return node.nodeType === window.Node.ELEMENT_NODE && name.endsWith('$');\n  }\n\n  constructor (node, name) {\n    super(node, name.slice(0, -1));\n  }\n\n  set (value) {\n    if (value) {\n      if (value !== this.node.getAttribute(this.name)) {\n        this.node.setAttribute(this.name, value);\n      }\n    } else {\n      this.node.removeAttribute(this.name);\n    }\n  }\n\n  get () {\n    return this.node.getAttribute(this.name);\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/attribute.js?");

/***/ }),

/***/ "./component/accessor/base.js":
/*!************************************!*\
  !*** ./component/accessor/base.js ***!
  \************************************/
/*! exports provided: BaseAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseAccessor\", function() { return BaseAccessor; });\nclass BaseAccessor {\n  constructor (node, name) {\n    this.node = node;\n    this.name = name;\n  }\n\n  set (value) {\n    if (typeof this.node.set === 'function') {\n      this.node.set(this.name, value);\n    } else {\n      this.node[this.name] = value;\n    }\n  }\n\n  get () {\n    if (typeof this.node.get === 'function') {\n      return this.node.get(this.name);\n    } else {\n      return this.node[this.name];\n    }\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/base.js?");

/***/ }),

/***/ "./component/accessor/class.js":
/*!*************************************!*\
  !*** ./component/accessor/class.js ***!
  \*************************************/
/*! exports provided: ClassAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ClassAccessor\", function() { return ClassAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\nclass ClassAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (_, name) {\n    return name && name.startsWith('class.');\n  }\n\n  constructor (node, name) {\n    super(node, name.split('.').splice(1).join('.'));\n  }\n\n  set (value) {\n    if (value) {\n      this.node.classList.add(this.name);\n    } else {\n      this.node.classList.remove(this.name);\n    }\n  }\n\n  get () {\n    throw new Error('ClassAccessor is write-only');\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/class.js?");

/***/ }),

/***/ "./component/accessor/factory.js":
/*!***************************************!*\
  !*** ./component/accessor/factory.js ***!
  \***************************************/
/*! exports provided: accessorFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"accessorFactory\", function() { return accessorFactory; });\n/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attribute */ \"./component/accessor/attribute.js\");\n/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ \"./component/accessor/text.js\");\n/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html */ \"./component/accessor/html.js\");\n/* harmony import */ var _value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./value */ \"./component/accessor/value.js\");\n/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./class */ \"./component/accessor/class.js\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style */ \"./component/accessor/style.js\");\n/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./property */ \"./component/accessor/property.js\");\n\n\n\n\n\n\n\n\nconst accessors = [\n  _value__WEBPACK_IMPORTED_MODULE_3__[\"ValueAccessor\"],\n  _text__WEBPACK_IMPORTED_MODULE_1__[\"TextAccessor\"],\n  _html__WEBPACK_IMPORTED_MODULE_2__[\"HTMLAccessor\"],\n  _class__WEBPACK_IMPORTED_MODULE_4__[\"ClassAccessor\"],\n  _style__WEBPACK_IMPORTED_MODULE_5__[\"StyleAccessor\"],\n  _attribute__WEBPACK_IMPORTED_MODULE_0__[\"AttributeAccessor\"],\n  _property__WEBPACK_IMPORTED_MODULE_6__[\"PropertyAccessor\"],\n];\n\nfunction accessorFactory (node, name) {\n  const Accessor = accessors.find(accessor => accessor.test(node, name));\n  if (Accessor) {\n    return new Accessor(node, name);\n  }\n\n  throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType} name: ${name}`);\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/factory.js?");

/***/ }),

/***/ "./component/accessor/html.js":
/*!************************************!*\
  !*** ./component/accessor/html.js ***!
  \************************************/
/*! exports provided: HTMLAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HTMLAccessor\", function() { return HTMLAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\nclass HTMLAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    return name === 'html' && node.nodeType === window.Node.ELEMENT_NODE;\n  }\n\n  set (value) {\n    this.node.innerHTML = value || '';\n  }\n\n  get () {\n    throw new Error('HTMLAccessor is write-only');\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/html.js?");

/***/ }),

/***/ "./component/accessor/index.js":
/*!*************************************!*\
  !*** ./component/accessor/index.js ***!
  \*************************************/
/*! exports provided: accessorFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ \"./component/accessor/factory.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"accessorFactory\", function() { return _factory__WEBPACK_IMPORTED_MODULE_0__[\"accessorFactory\"]; });\n\n\n\n\n//# sourceURL=webpack://xin/./component/accessor/index.js?");

/***/ }),

/***/ "./component/accessor/property.js":
/*!****************************************!*\
  !*** ./component/accessor/property.js ***!
  \****************************************/
/*! exports provided: PropertyAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PropertyAccessor\", function() { return PropertyAccessor; });\n/* harmony import */ var _core_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/string */ \"./core/string/index.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\n\nconst { ELEMENT_NODE } = window.Node;\n\nclass PropertyAccessor extends _base__WEBPACK_IMPORTED_MODULE_1__[\"BaseAccessor\"] {\n  static test (node, _) {\n    return node.nodeType === ELEMENT_NODE;\n  }\n\n  constructor (node, name) {\n    super(node, Object(_core_string__WEBPACK_IMPORTED_MODULE_0__[\"camelize\"])(name));\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/property.js?");

/***/ }),

/***/ "./component/accessor/style.js":
/*!*************************************!*\
  !*** ./component/accessor/style.js ***!
  \*************************************/
/*! exports provided: StyleAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StyleAccessor\", function() { return StyleAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\nclass StyleAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (_, name) {\n    return name && name.startsWith('style.');\n  }\n\n  constructor (node, name) {\n    super(node, name.split('.').splice(1).join('.'));\n  }\n\n  set (value) {\n    this.node.style[this.name] = value || '';\n  }\n\n  get () {\n    throw new Error('StyleAccessor is write-only');\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/style.js?");

/***/ }),

/***/ "./component/accessor/text.js":
/*!************************************!*\
  !*** ./component/accessor/text.js ***!
  \************************************/
/*! exports provided: TextAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TextAccessor\", function() { return TextAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\nconst { TEXT_NODE, ELEMENT_NODE } = window.Node;\n\nclass TextAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    if (node.nodeType === TEXT_NODE) {\n      return true;\n    }\n\n    return name === 'text' && node.nodeType === ELEMENT_NODE;\n  }\n\n  constructor (node) {\n    super(node, 'textContent');\n  }\n\n  set (value) {\n    value = value || '';\n    if (value !== this.node.textContent) {\n      this.node.textContent = value;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/text.js?");

/***/ }),

/***/ "./component/accessor/value.js":
/*!*************************************!*\
  !*** ./component/accessor/value.js ***!
  \*************************************/
/*! exports provided: ValueAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ValueAccessor\", function() { return ValueAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/accessor/base.js\");\n\n\nconst { TEXT_NODE, ELEMENT_NODE } = window.Node;\n\nclass ValueAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  static test (node, name) {\n    if (name === 'value' && node.nodeType === ELEMENT_NODE && node.nodeName === 'INPUT') {\n      return true;\n    }\n\n    if (node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {\n      return true;\n    }\n  }\n\n  constructor (node) {\n    super(node, 'value');\n\n    if (node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {\n      this.node = node.parentElement;\n    }\n  }\n\n  set (value) {\n    if (document.activeElement !== this.node) {\n      super.set(value);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/accessor/value.js?");

/***/ }),

/***/ "./component/annotation/annotation.js":
/*!********************************************!*\
  !*** ./component/annotation/annotation.js ***!
  \********************************************/
/*! exports provided: Annotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Annotation\", function() { return Annotation; });\nclass Annotation {\n  constructor (model, expr, accessor) {\n    this.model = model;\n    this.expr = expr;\n    this.accessor = accessor;\n  }\n\n  effect (type, value) {\n    if (this.accessor) {\n      this.accessor.set(this.expr.invoke(this.model));\n    } else {\n      this.expr.invoke(this.model);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/annotation/annotation.js?");

/***/ }),

/***/ "./component/annotation/index.js":
/*!***************************************!*\
  !*** ./component/annotation/index.js ***!
  \***************************************/
/*! exports provided: Annotation, NotifyAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotation */ \"./component/annotation/annotation.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Annotation\", function() { return _annotation__WEBPACK_IMPORTED_MODULE_0__[\"Annotation\"]; });\n\n/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notify */ \"./component/annotation/notify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NotifyAnnotation\", function() { return _notify__WEBPACK_IMPORTED_MODULE_1__[\"NotifyAnnotation\"]; });\n\n\n\n\n\n//# sourceURL=webpack://xin/./component/annotation/index.js?");

/***/ }),

/***/ "./component/annotation/notify.js":
/*!****************************************!*\
  !*** ./component/annotation/notify.js ***!
  \****************************************/
/*! exports provided: NotifyAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NotifyAnnotation\", function() { return NotifyAnnotation; });\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../expr */ \"./component/expr.js\");\n\n\nclass NotifyAnnotation {\n  constructor (model, name) {\n    const expr = _expr__WEBPACK_IMPORTED_MODULE_0__[\"Expr\"].get(model.getAttribute(name));\n    this.model = model;\n    this.name = expr.name;\n  }\n\n  effect (type, value) {\n    this.model.__templateModel.set(this.name, value);\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/annotation/notify.js?");

/***/ }),

/***/ "./component/base.js":
/*!***************************!*\
  !*** ./component/base.js ***!
  \***************************/
/*! exports provided: base */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return base; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./core/index.js\");\n/* harmony import */ var _core_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/string */ \"./core/string/index.js\");\n/* harmony import */ var _core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/helpers */ \"./core/helpers/index.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ \"./component/template/index.js\");\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expr */ \"./component/expr.js\");\n/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accessor */ \"./component/accessor/index.js\");\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./annotation */ \"./component/annotation/index.js\");\n/* harmony import */ var _core_fn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/fn */ \"./core/fn/index.js\");\n\n\n\n\n\n\n\n\n\nconst debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('xin::component');\nconst nextId = Object(_core_helpers__WEBPACK_IMPORTED_MODULE_2__[\"idGenerator\"])();\nconst baseComponents = {};\n\nconst tProto = _template__WEBPACK_IMPORTED_MODULE_3__[\"Template\"].prototype;\nconst tProtoProps = Object.getOwnPropertyNames(tProto);\n\nfunction base (base) {\n  const repository = _core__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"].singleton();\n\n  if (baseComponents[base]) {\n    return baseComponents[base];\n  }\n\n  let BaseElement;\n  if (repository.get('customElements.version') === 'v1') {\n    BaseElement = window[base];\n  } else {\n    BaseElement = function () {};\n    BaseElement.prototype = Object.create(window[base].prototype);\n  }\n\n  class Component extends BaseElement {\n    constructor () {\n      super();\n\n      this.is = this.nodeName.toLowerCase();\n\n      this.createdCallback();\n    }\n\n    get $ () {\n      return this.__templateHost.getElementsByTagName('*');\n    }\n\n    created () {}\n\n    ready () {}\n\n    attached () {}\n\n    detached () {}\n\n    createdCallback () {\n      if (debug.enabled) /* istanbul ignore next */ debug(`CREATED ${this.is}`);\n\n      this.__id = nextId();\n\n      this.created();\n\n      this.__componentInitData();\n    }\n\n    readyCallback () {\n      this.__componentReady = true;\n\n      this.fire('before-ready');\n\n      if (debug.enabled) /* istanbul ignore next */ debug(`READY ${this.is}`);\n\n      if (!this.hasAttribute('xin-id')) {\n        // deferred set attributes until connectedCallback\n        this.setAttribute('xin-id', this.__id);\n        repository.put(this.__id, this);\n      }\n\n      this.__componentInitListeners();\n\n      this.__componentInitTemplate();\n\n      this.__componentInitProps();\n\n      this.__componentInitPropValues();\n\n      this.__componentMountTemplate();\n\n      this.ready();\n\n      this.fire('ready');\n\n      if (this.__componentAttaching) {\n        this.attachedCallback();\n      }\n    }\n\n    // FIXME: note that connectedCallback can be called more than once, so any\n    // initialization work that is truly one-time will need a guard to prevent\n    // it from running twice.\n    attachedCallback () {\n      this.__componentAttaching = true;\n\n      if (!this.__componentReady) {\n        if (!this.__componentBeforeReady) {\n          this.__componentBeforeReady = true;\n          this.async(this.readyCallback);\n        }\n        return;\n      }\n\n      // notify default props\n      this.notify('$global');\n      this.notify('$repository');\n\n      if (debug.enabled) /* istanbul ignore next */ debug(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);\n\n      this.attached();\n\n      this.__componentAttaching = false;\n    }\n\n    detachedCallback () {\n      this.detached();\n    }\n\n    connectedCallback () {\n      return this.attachedCallback();\n    }\n\n    disconnectedCallback () {\n      return this.detachedCallback();\n    }\n\n    get $global () {\n      return window;\n    }\n\n    get $repository () {\n      return repository;\n    }\n\n    __componentInitData () {\n      this.__componentContent = [];\n      this.__componentDebouncers = {};\n      this.__componentNotifiers = {};\n      this.__componentReady = false;\n      this.__componentBeforeReady = false;\n      this.__componentAttaching = false;\n      this.__componentInitialPropValues = {};\n      this.__componentNotifiedProps = {};\n    }\n\n    __componentInitProps () {\n      const props = this.__componentGetProps();\n      for (const propName in props) {\n        const property = props[propName];\n        const attrName = Object(_core_string__WEBPACK_IMPORTED_MODULE_1__[\"dashify\"])(propName);\n\n        if ('computed' in property) {\n          const accessor = Object(_accessor__WEBPACK_IMPORTED_MODULE_5__[\"accessorFactory\"])(this, propName);\n          const expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].getFn(property.computed, [], true);\n          this.__templateAnnotate(expr, accessor);\n\n          this.__componentInitialPropValues[propName] = () => expr.invoke(this);\n        } else if (this.hasAttribute(attrName)) {\n          const attrVal = this.getAttribute(attrName);\n\n          // copy value from attribute to property\n          // fallback to property.value\n          const expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].get(attrVal);\n          if (expr.type === 's') {\n            this.__componentInitialPropValues[propName] = () => Object(_core_helpers__WEBPACK_IMPORTED_MODULE_2__[\"deserialize\"])(attrVal, property.type);\n          } else {\n            if ('notify' in property && expr.mode === '{') {\n              this.__componentNotifiedProps[propName] = true;\n              this.__templateGetBinding(propName).annotate(new _annotation__WEBPACK_IMPORTED_MODULE_6__[\"NotifyAnnotation\"](this, propName));\n            }\n            this.__componentInitialPropValues[propName] = () => expr.invoke(this.__templateModel);\n          }\n        }\n\n        if ('observer' in property) {\n          const expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].getFn(property.observer, [propName], true);\n          this.__templateAnnotate(expr);\n        }\n      }\n    }\n\n    __componentGetProps () {\n      if (!this._props) {\n        this._props = this.props;\n      }\n      return this._props;\n    }\n\n    __componentInitPropValues () {\n      const props = this.__componentGetProps();\n\n      for (const propName in props) {\n        const property = props[propName];\n\n        let propValue;\n\n        if (this.__componentInitialPropValues[propName]) {\n          propValue = this.__componentInitialPropValues[propName]();\n        } else {\n          propValue = this[propName];\n        }\n\n        if ('value' in property && isUndefinedPropValue(propName, propValue)) {\n          propValue = Object(_core_helpers__WEBPACK_IMPORTED_MODULE_2__[\"val\"])(property.value);\n        }\n\n        // when property is undefined, log error when property is required otherwise assign to default value\n        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {\n          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);\n        }\n\n        // set and force notify for the first time\n        this[propName] = propValue;\n\n        // only notify if propValue already defined otherwise undefined value will be propagated to model\n        if (propValue !== undefined) {\n          this.notify(propName, propValue);\n        }\n      }\n    }\n\n    __componentInitTemplate () {\n      let template = this.template;\n\n      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE') {\n        // when instance template exist detach from component content\n        template = this.firstElementChild;\n        this.removeChild(template);\n      }\n\n      this.__templateInitialize(template);\n    }\n\n    __componentMountTemplate () {\n      this.mount(this);\n    }\n\n    __componentInitListeners () {\n      if (!this.listeners) {\n        return;\n      }\n\n      Object.keys(this.listeners).forEach(key => {\n        const meta = parseListenerMetadata(key);\n        const expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].getFn(this.listeners[key], [], true);\n        if (meta.selector) {\n          this.on(meta.eventName, meta.selector, evt => {\n            expr.invoke(this, { evt });\n          });\n        } else {\n          this.on(meta.eventName, evt => {\n            expr.invoke(this, { evt });\n          });\n        }\n      });\n    }\n\n    __addNotifier (eventName) {\n      if (this.__componentNotifiers[eventName]) {\n        return;\n      }\n\n      this.__componentNotifiers[eventName] = (evt) => {\n        const element = evt.target;\n\n        if (element.__templateModel !== this) {\n          return;\n        }\n\n        // TODO: ini buat apa ya dulu?\n        // evt.stopImmediatePropagation();\n\n        if ('__componentNotifyKey' in element && '__componentNotifyAccessor' in element) {\n          element.__templateModel.set(element.__componentNotifyKey, element[element.__componentNotifyAccessor]);\n        }\n      };\n\n      this.on(eventName, this.__componentNotifiers[eventName]);\n    }\n\n    __removeNotifier (eventName) {\n      if (!this.__componentNotifiers[eventName]) {\n        return;\n      }\n\n      this.off(eventName, this.__componentNotifiers[eventName]);\n\n      delete this.__componentNotifiers[eventName];\n    }\n\n    fire (type, detail, options) {\n      return Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this).fire(type, detail, options);\n    }\n\n    async (callback, waitTime) {\n      return (new _core_fn__WEBPACK_IMPORTED_MODULE_7__[\"Async\"](this)).start(callback, waitTime);\n    }\n\n    debounce (job, callback, wait, immediate) {\n      let debouncer = this.__componentDebouncers[job];\n      if (debouncer && debouncer.running) {\n        debouncer.cancel();\n      } else {\n        debouncer = this.__componentDebouncers[job] = new _core_fn__WEBPACK_IMPORTED_MODULE_7__[\"Debounce\"](this, immediate);\n      }\n      debouncer.start(callback, wait);\n\n      return debouncer;\n    }\n\n    nextFrame (callback) {\n      return _core_fn__WEBPACK_IMPORTED_MODULE_7__[\"Async\"].nextFrame(callback.bind(this));\n    }\n\n    // Template overriden\n    // -------------------------------------------------------------------------\n    //\n\n    __templateAnnotate (expr, accessor) {\n      if (!_template__WEBPACK_IMPORTED_MODULE_3__[\"Template\"].prototype.__templateAnnotate.call(this, expr, accessor)) {\n        return false;\n      }\n\n      // register event notifier\n      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof window.HTMLElement) {\n        const node = accessor.node;\n        const nodeName = node.nodeName;\n\n        const startNotify = (name) => {\n          node.__componentNotifyKey = expr.name;\n          node.__componentNotifyAccessor = accessor.name;\n          this.__addNotifier(name);\n        };\n\n        if (nodeName === 'INPUT') {\n          const inputType = node.getAttribute('type');\n          if (inputType === 'radio' || inputType === 'checkbox') {\n            throw new Error('Unimplemented yet');\n          } else {\n            startNotify('input');\n          }\n        } else if (nodeName === 'TEXTAREA') {\n          startNotify('input');\n        } else if (nodeName === 'SELECT') {\n          startNotify('change');\n        }\n      }\n\n      return true;\n    }\n  }\n\n  tProtoProps.forEach(key => {\n    // exclude $ and __templateAnnotate because will be override\n    if (key === '$' || key === '__templateAnnotate') {\n      return;\n    }\n\n    Component.prototype[key] = tProto[key];\n  });\n\n  baseComponents[base] = Component;\n\n  return Component;\n}\n\nfunction parseListenerMetadata (key) {\n  key = key.trim();\n  const [eventName, ...selectorArr] = key.split(/\\s+/);\n  const selector = selectorArr.length ? selectorArr.join(' ') : null;\n  const metadata = { key, eventName, selector };\n  return metadata;\n}\n\nfunction isUndefinedPropValue (propName, propValue) {\n  return propValue === undefined || (propName === 'title' && !propValue);\n}\n\n\n//# sourceURL=webpack://xin/./component/base.js?");

/***/ }),

/***/ "./component/binding.js":
/*!******************************!*\
  !*** ./component/binding.js ***!
  \******************************/
/*! exports provided: Binding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Binding\", function() { return Binding; });\nclass Binding {\n  constructor (context, model) {\n    this.context = context;\n    this.model = model;\n    this.paths = {};\n    this.annotations = [];\n  }\n\n  annotate (annotation) {\n    this.annotations.push(annotation);\n  }\n\n  deannotate (model, expr, accessor) {\n    this.annotations = this.annotations.filter(annotation => {\n      return annotation.model !== model || annotation.expr !== expr || annotation.accessor !== accessor;\n    });\n  }\n\n  walkEffect (type, value) {\n    this.annotations.forEach(annotation => {\n      annotation.effect(type, value/* , this.model */);\n    });\n\n    Object.keys(this.paths).forEach(i => {\n      this.paths[i].walkEffect(type, value);\n    });\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/binding.js?");

/***/ }),

/***/ "./component/component.js":
/*!********************************!*\
  !*** ./component/component.js ***!
  \********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./component/base.js\");\n\n\nconst Component = Object(_base__WEBPACK_IMPORTED_MODULE_0__[\"base\"])('HTMLElement');\n\n\n//# sourceURL=webpack://xin/./component/component.js?");

/***/ }),

/***/ "./component/define.js":
/*!*****************************!*\
  !*** ./component/define.js ***!
  \*****************************/
/*! exports provided: define */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return define; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./core/index.js\");\n\n\nconst debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('xin::core:define');\n\nfunction define (name, Component, options) {\n  const repository = _core__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"].singleton();\n\n  let ElementClass = repository.get(name);\n\n  if (ElementClass) {\n    if (debug.enabled) /* istanbul ignore next */ debug(`Duplicate registering \"${name}\"`);\n    return ElementClass;\n  }\n\n  if (repository.get('customElements.version') === 'v1') {\n    // v1 the element class is the component itself\n    ElementClass = Component;\n    window.customElements.define(name, Component, options);\n  } else {\n    const prototype = Object.create(Component.prototype, { is: { value: name } });\n    const ElementPrototype = { prototype };\n\n    if (options && options.extends) {\n      ElementPrototype.extends = options.extends;\n    }\n\n    ElementClass = document.registerElement(name, ElementPrototype);\n  }\n\n  repository.put(name, ElementClass);\n\n  return ElementClass;\n}\n\n\n//# sourceURL=webpack://xin/./component/define.js?");

/***/ }),

/***/ "./component/expr.js":
/*!***************************!*\
  !*** ./component/expr.js ***!
  \***************************/
/*! exports provided: Expr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Expr\", function() { return Expr; });\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token */ \"./component/token.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ \"./component/filter/index.js\");\n\n\n\nconst CACHE = {\n  s: {\n    '[': {},\n    '{': {},\n  },\n  v: {\n    '[': {},\n    '{': {},\n  },\n};\n\nfunction _get (value, mode, type) {\n  const cache = CACHE[type][mode];\n  if (value in cache) {\n    return cache[value];\n  }\n\n  const expr = new Expr(value, mode, type);\n  if (type !== 's') {\n    cache[value] = expr;\n  }\n\n  return expr;\n}\n\nclass Expr {\n  static get CACHE () {\n    return CACHE;\n  }\n\n  static get (value, unwrapped) {\n    value = (value || '').trim();\n\n    if (unwrapped) {\n      return _get(value, '[', 'v');\n    }\n\n    const mode = value[0];\n    if ((mode === '[' || mode === '{') && value[1] === mode) {\n      value = value.slice(2, -2).trim();\n      return _get(value, mode, 'v');\n    }\n\n    return _get(value, '[', 's');\n  }\n\n  static getFn (value, args, unwrapped) {\n    return Expr.get(value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value, unwrapped);\n  }\n\n  static rawTokenize (str) {\n    let count = 0;\n    const tokens = [];\n\n    while (str && count++ < 10) {\n      const matches = str.match(/^\\s*(\"[^\"]*\"|[^,]+),?/);\n\n      str = str.substr(matches[0].length);\n      tokens.push(matches[1].trim());\n    }\n\n    return tokens;\n  }\n\n  static tokenize (str) {\n    return Expr.rawTokenize(str).map(token => _token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(token));\n  }\n\n  constructor (value, mode, type) {\n    // define base properties\n    this.mode = mode;\n    this.type = type;\n    this.name = '';\n    this.args = [];\n    this.filters = [];\n    this.value = value;\n\n    if (type === 's') {\n      return;\n    }\n\n    const tokens = value.split('|');\n    const token = tokens[0].trim();\n\n    this.filters = tokens.slice(1).map(word => {\n      return _filter__WEBPACK_IMPORTED_MODULE_1__[\"Filter\"].get(word.trim());\n    });\n\n    if (token.indexOf('(') < 0) {\n      this.type = 'p';\n      this.name = token;\n      this.args.push(_token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(token));\n    } else {\n      // force mode to '[' when type is !p\n      this.mode = '[';\n      this.type = 'm';\n\n      const matches = token.match(/([^(]+)\\(([^)]*)\\)/);\n\n      this.name = matches[1].trim();\n      this.fn = _token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(this.name);\n\n      this.args = Expr.tokenize(matches[2]);\n    }\n  }\n\n  get constant () {\n    return this.type !== 'm' && this.vpaths.length !== this.args.length;\n  }\n\n  get vpaths () {\n    if (!this._vpaths) {\n      const paths = [];\n      this.args.forEach(arg => {\n        if (arg.type === 'v' && paths.indexOf(arg.name) === -1) {\n          paths.push(arg);\n        }\n      });\n      this._vpaths = paths;\n    }\n\n    return this._vpaths;\n  }\n\n  invoke (context, otherArgs) {\n    if (this.type === 'p') {\n      const val = this.args[0].value(context, otherArgs);\n      return this.filters.reduce((val, filter) => filter.invoke(val), val);\n    }\n\n    const args = this.args.map(arg => {\n      return arg.value(context, otherArgs);\n    });\n\n    return this.fn.invoke(args, context, context.__templateHost);\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/expr.js?");

/***/ }),

/***/ "./component/filter/filter.js":
/*!************************************!*\
  !*** ./component/filter/filter.js ***!
  \************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return Filter; });\nconst registry = {};\n\nclass Filter {\n  constructor (name, callback, otherArgs) {\n    this.name = name;\n    this.callback = callback;\n    this.otherArgs = otherArgs;\n  }\n\n  invoke (val) {\n    const args = [val];\n    [].push.apply(args, this.otherArgs);\n    return this.callback.apply(null, args);\n  }\n\n  static put (name, callback) {\n    registry[name] = callback;\n  }\n\n  static get (name) {\n    const segments = name.split(':');\n    const args = segments.splice(1).join(':').split(',');\n    const key = segments.pop();\n\n    let callback = registry[key];\n    if (typeof callback !== 'function') {\n      try {\n        callback = __webpack_require__(\"./component/filter/filters sync recursive ^\\\\.\\\\/.*$\")(`./${key}`).default;\n      } catch (err) {\n        // noop\n      }\n    }\n\n    if (!callback) {\n      throw new Error(`Filter \"${name}\" not found.`);\n    }\n\n    return new Filter(key, callback, args);\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/filter/filter.js?");

/***/ }),

/***/ "./component/filter/filters sync recursive ^\\.\\/.*$":
/*!************************************************!*\
  !*** ./component/filter/filters sync ^\.\/.*$ ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./boolean\": \"./component/filter/filters/boolean.js\",\n\t\"./boolean.js\": \"./component/filter/filters/boolean.js\",\n\t\"./consoleError\": \"./component/filter/filters/consoleError.js\",\n\t\"./consoleError.js\": \"./component/filter/filters/consoleError.js\",\n\t\"./consoleInfo\": \"./component/filter/filters/consoleInfo.js\",\n\t\"./consoleInfo.js\": \"./component/filter/filters/consoleInfo.js\",\n\t\"./consoleLog\": \"./component/filter/filters/consoleLog.js\",\n\t\"./consoleLog.js\": \"./component/filter/filters/consoleLog.js\",\n\t\"./consoleTrace\": \"./component/filter/filters/consoleTrace.js\",\n\t\"./consoleTrace.js\": \"./component/filter/filters/consoleTrace.js\",\n\t\"./consoleWarn\": \"./component/filter/filters/consoleWarn.js\",\n\t\"./consoleWarn.js\": \"./component/filter/filters/consoleWarn.js\",\n\t\"./cssurl\": \"./component/filter/filters/cssurl.js\",\n\t\"./cssurl.js\": \"./component/filter/filters/cssurl.js\",\n\t\"./currency\": \"./component/filter/filters/currency.js\",\n\t\"./currency.js\": \"./component/filter/filters/currency.js\",\n\t\"./default\": \"./component/filter/filters/default.js\",\n\t\"./default.js\": \"./component/filter/filters/default.js\",\n\t\"./json\": \"./component/filter/filters/json.js\",\n\t\"./json.js\": \"./component/filter/filters/json.js\",\n\t\"./lower\": \"./component/filter/filters/lower.js\",\n\t\"./lower.js\": \"./component/filter/filters/lower.js\",\n\t\"./not\": \"./component/filter/filters/not.js\",\n\t\"./not.js\": \"./component/filter/filters/not.js\",\n\t\"./number\": \"./component/filter/filters/number.js\",\n\t\"./number.js\": \"./component/filter/filters/number.js\",\n\t\"./required\": \"./component/filter/filters/required.js\",\n\t\"./required.js\": \"./component/filter/filters/required.js\",\n\t\"./slice\": \"./component/filter/filters/slice.js\",\n\t\"./slice.js\": \"./component/filter/filters/slice.js\",\n\t\"./string\": \"./component/filter/filters/string.js\",\n\t\"./string.js\": \"./component/filter/filters/string.js\",\n\t\"./upper\": \"./component/filter/filters/upper.js\",\n\t\"./upper.js\": \"./component/filter/filters/upper.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./component/filter/filters sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack://xin/./component/filter/filters_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./component/filter/filters/boolean.js":
/*!*********************************************!*\
  !*** ./component/filter/filters/boolean.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return `${Boolean(val)}`;\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/boolean.js?");

/***/ }),

/***/ "./component/filter/filters/consoleError.js":
/*!**************************************************!*\
  !*** ./component/filter/filters/consoleError.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.error(val));\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/consoleError.js?");

/***/ }),

/***/ "./component/filter/filters/consoleInfo.js":
/*!*************************************************!*\
  !*** ./component/filter/filters/consoleInfo.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.info(val));\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/consoleInfo.js?");

/***/ }),

/***/ "./component/filter/filters/consoleLog.js":
/*!************************************************!*\
  !*** ./component/filter/filters/consoleLog.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.log(val)); // eslint-disable-line\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/consoleLog.js?");

/***/ }),

/***/ "./component/filter/filters/consoleTrace.js":
/*!**************************************************!*\
  !*** ./component/filter/filters/consoleTrace.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.trace(val)); // eslint-disable-line\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/consoleTrace.js?");

/***/ }),

/***/ "./component/filter/filters/consoleWarn.js":
/*!*************************************************!*\
  !*** ./component/filter/filters/consoleWarn.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (val => console.warn(val));\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/consoleWarn.js?");

/***/ }),

/***/ "./component/filter/filters/cssurl.js":
/*!********************************************!*\
  !*** ./component/filter/filters/cssurl.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (v) {\n  return `url(${v})`;\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/cssurl.js?");

/***/ }),

/***/ "./component/filter/filters/currency.js":
/*!**********************************************!*\
  !*** ./component/filter/filters/currency.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return (val || 0).toFixed(2).replace(/(\\d)(?=(\\d{3})+\\.)/g, '$1,');\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/currency.js?");

/***/ }),

/***/ "./component/filter/filters/default.js":
/*!*********************************************!*\
  !*** ./component/filter/filters/default.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val, defVal) {\n  return (val || defVal);\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/default.js?");

/***/ }),

/***/ "./component/filter/filters/json.js":
/*!******************************************!*\
  !*** ./component/filter/filters/json.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((val, indent) => JSON.stringify(val, null, Number(indent)));\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/json.js?");

/***/ }),

/***/ "./component/filter/filters/lower.js":
/*!*******************************************!*\
  !*** ./component/filter/filters/lower.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return String(val || '').toLowerCase();\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/lower.js?");

/***/ }),

/***/ "./component/filter/filters/not.js":
/*!*****************************************!*\
  !*** ./component/filter/filters/not.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return Boolean(!val);\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/not.js?");

/***/ }),

/***/ "./component/filter/filters/number.js":
/*!********************************************!*\
  !*** ./component/filter/filters/number.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return Number(val || 0).toLocaleString();\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/number.js?");

/***/ }),

/***/ "./component/filter/filters/required.js":
/*!**********************************************!*\
  !*** ./component/filter/filters/required.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  if (val === undefined || val === null || val === '') {\n    throw new Error('Value is required');\n  }\n  return val;\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/required.js?");

/***/ }),

/***/ "./component/filter/filters/slice.js":
/*!*******************************************!*\
  !*** ./component/filter/filters/slice.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val, begin, end) {\n  return Array.prototype.slice.call(val || [], begin, end);\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/slice.js?");

/***/ }),

/***/ "./component/filter/filters/string.js":
/*!********************************************!*\
  !*** ./component/filter/filters/string.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  if (val === undefined || val === null) {\n    return '';\n  }\n  return String(val);\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/string.js?");

/***/ }),

/***/ "./component/filter/filters/upper.js":
/*!*******************************************!*\
  !*** ./component/filter/filters/upper.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (val) {\n  return String(val || '').toUpperCase();\n});\n\n\n//# sourceURL=webpack://xin/./component/filter/filters/upper.js?");

/***/ }),

/***/ "./component/filter/index.js":
/*!***********************************!*\
  !*** ./component/filter/index.js ***!
  \***********************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter */ \"./component/filter/filter.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _filter__WEBPACK_IMPORTED_MODULE_0__[\"Filter\"]; });\n\n\n\n\n//# sourceURL=webpack://xin/./component/filter/index.js?");

/***/ }),

/***/ "./component/index.js":
/*!****************************!*\
  !*** ./component/index.js ***!
  \****************************/
/*! exports provided: define, base, Component, Template, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ \"./component/define.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return _define__WEBPACK_IMPORTED_MODULE_0__[\"define\"]; });\n\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./component/base.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return _base__WEBPACK_IMPORTED_MODULE_1__[\"base\"]; });\n\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ \"./component/component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"Component\"]; });\n\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ \"./component/template/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Template\", function() { return _template__WEBPACK_IMPORTED_MODULE_3__[\"Template\"]; });\n\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ \"./component/filter/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _filter__WEBPACK_IMPORTED_MODULE_4__[\"Filter\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://xin/./component/index.js?");

/***/ }),

/***/ "./component/template/fix.js":
/*!***********************************!*\
  !*** ./component/template/fix.js ***!
  \***********************************/
/*! exports provided: fix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fix\", function() { return fix; });\n\nfunction fix (template) {\n  /* istanbul ignore if */\n  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {\n    window.HTMLTemplateElement.decorate(template);\n  }\n  return template;\n}\n\nfunction needFixImportNode () {\n  /* istanbul ignore if */\n  if (document.__importNode) {\n    // already fixed\n    return false;\n  }\n  const template = document.createElement('template');\n  template.innerHTML = '<template>i</template>';\n  const imported = document.importNode(template.content, true);\n  return !imported.firstChild.content.firstChild || imported.firstChild.content.firstChild.textContent !== 'i';\n}\n\n/* istanbul ignore if */\nif (needFixImportNode()) {\n  document.__importNode = document.importNode;\n  document.importNode = function (node, deep) {\n    if (!deep) {\n      return document.__importNode(node, deep);\n    }\n\n    const sourceTpls = [].slice.call(node.querySelectorAll('template'));\n    const imported = document.__importNode(node, deep);\n    imported.querySelectorAll('template').forEach((child, i) => {\n      child.innerHTML = sourceTpls[i].innerHTML;\n    });\n\n    return imported;\n  };\n}\n\n\n//# sourceURL=webpack://xin/./component/template/fix.js?");

/***/ }),

/***/ "./component/template/index.js":
/*!*************************************!*\
  !*** ./component/template/index.js ***!
  \*************************************/
/*! exports provided: Template */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template */ \"./component/template/template.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Template\", function() { return _template__WEBPACK_IMPORTED_MODULE_0__[\"Template\"]; });\n\n\n\n\n//# sourceURL=webpack://xin/./component/template/index.js?");

/***/ }),

/***/ "./component/template/slot.js":
/*!************************************!*\
  !*** ./component/template/slot.js ***!
  \************************************/
/*! exports provided: slotName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"slotName\", function() { return slotName; });\nconst SLOT_SUPPORTED = (() => {\n  if (typeof window === 'undefined') {\n    return false;\n  }\n\n  return (\n    'HTMLUnknownElement' in window &&\n    !(document.createElement('slot') instanceof window.HTMLUnknownElement)\n  );\n})();\n\nfunction slotName (element) {\n  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');\n}\n\n\n//# sourceURL=webpack://xin/./component/template/slot.js?");

/***/ }),

/***/ "./component/template/template.js":
/*!****************************************!*\
  !*** ./component/template/template.js ***!
  \****************************************/
/*! exports provided: Template */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Template\", function() { return Template; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"./core/index.js\");\n/* harmony import */ var _core_helpers_id_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/helpers/id-generator */ \"./core/helpers/id-generator.js\");\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../expr */ \"./component/expr.js\");\n/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../binding */ \"./component/binding.js\");\n/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../accessor */ \"./component/accessor/index.js\");\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../annotation */ \"./component/annotation/index.js\");\n/* harmony import */ var _fix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fix */ \"./component/template/fix.js\");\n/* harmony import */ var _slot__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./slot */ \"./component/template/slot.js\");\n\n\n\n\n\n\n\n\n\n\nconst nextId = Object(_core_helpers_id_generator__WEBPACK_IMPORTED_MODULE_1__[\"idGenerator\"])();\n\nclass Template {\n  constructor (template) {\n    this.__templateInitialize(template);\n  }\n\n  get $ () {\n    return this.__templateHost.getElementsByTagName('*');\n  }\n\n  $$ (selector) {\n    return this.querySelector(selector);\n  }\n\n  on () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).on(...arguments);\n  }\n\n  off () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).off(...arguments);\n  }\n\n  once () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).once(...arguments);\n  }\n\n  waitFor () {\n    return Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).waitFor(...arguments);\n  }\n\n  all (obj) {\n    for (const i in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, i)) {\n        this.set(i, obj[i]);\n      }\n    }\n  }\n\n  get (path) {\n    let object = this;\n\n    this.__templateGetPathAsArray(path).some(segment => {\n      if (object === undefined || object === null) {\n        object = undefined;\n        return true;\n      }\n\n      object = object[segment];\n      return false;\n    });\n\n    return object;\n  }\n\n  set (path, value) {\n    if (arguments.length === 1 && typeof path === 'object') {\n      const data = path;\n      for (const i in data) {\n        if (Object.prototype.hasOwnProperty.call(data, i)) {\n          this.set(i, data[i]);\n        }\n      }\n      return;\n    }\n\n    path = this.__templateGetPathAsArray(path);\n\n    const oldValue = this.get(path);\n\n    if (value === oldValue) {\n      return;\n    }\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    const property = path.slice(-1).pop();\n\n    object[property] = value;\n\n    this.notify(path, value);\n  }\n\n  push (path, ...values) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    const property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    const result = object[property].push(...values);\n    this.notify(path, object[property]);\n\n    return result;\n  }\n\n  pop (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    const property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    const result = object[property].pop();\n    this.notify(path, object[property]);\n\n    return result;\n  }\n\n  splice (path, index, removeCount, ...values) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    const property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    const result = object[property].splice(index, removeCount, ...values);\n    this.notify(path, object[property]);\n\n    return result;\n  }\n\n  notify (path, value) {\n    path = this.__templateGetPathAsString(path);\n\n    if (!this.__templateReady) {\n      this.__templateNotifyOnReady = this.__templateNotifyOnReady || [];\n      if (this.__templateNotifyOnReady.indexOf(path) === -1) {\n        this.__templateNotifyOnReady.push(path);\n      }\n      return;\n    }\n\n    const binding = this.__templateGetBinding(path);\n    if (binding) {\n      if (value === undefined) {\n        value = this.get(path);\n      }\n\n      binding.walkEffect('set', value);\n    }\n  }\n\n  __templateInitialize (template) {\n    this.__templateId = nextId();\n    this.__templateBindings = {};\n\n    this.__templateReady = false;\n    this.__templateNotifyOnReady = [];\n\n    if (!template) {\n      return;\n    }\n\n    if (typeof template === 'string') {\n      const t = template;\n      // create new template based on template property\n      template = document.createElement('template');\n      template.innerHTML = t;\n    }\n\n    // do below only if template is exists\n    this.__template = Object(_fix__WEBPACK_IMPORTED_MODULE_6__[\"fix\"])(template);\n    this.__templateChildNodes = [];\n\n    this.__templateFragment = document.importNode(this.__template.content, true);\n    this.__templateParseAnnotations();\n  }\n\n  mount (host, marker) {\n    this.__templateHost = host;\n    this.__templateMarker = marker;\n\n    if (!this.__template) {\n      return this.__templateRender();\n    }\n\n    if (!marker) {\n      if (this.__template && this.__template.parentElement === this.__templateHost) {\n        // when template parent is template host, it means that template is specific template\n        // then use template as marker\n        this.__templateMarker = this.__template;\n      } else {\n        // when template is not child of host, put marker to host\n        this.__templateMarker = document.createComment(`marker-${this.__templateId}`);\n        this.__templateHost.appendChild(this.__templateMarker);\n      }\n    }\n\n    let contentFragment;\n\n    if (this.__template) {\n      contentFragment = document.createDocumentFragment();\n      [].slice.call(host.childNodes).forEach(node => {\n        if (node === this.__templateMarker) return;\n        contentFragment.appendChild(node);\n      });\n    }\n\n    this.__templateRender(contentFragment);\n  }\n\n  dismount () {\n    this.__templateUninitialize();\n  }\n\n  __templateRender (contentFragment) {\n    this.__templateReady = true;\n\n    this.__templateNotifyOnReady.forEach(key => {\n      this.notify(key, this.get(key));\n    });\n    this.__templateNotifyOnReady = [];\n\n    if (!this.__template) {\n      return;\n    }\n\n    const fragment = this.__templateFragment;\n    this.__templateFragment = null;\n\n    if (contentFragment && contentFragment instanceof window.DocumentFragment) {\n      fragment.querySelectorAll('slot').forEach(slot => {\n        const name = Object(_slot__WEBPACK_IMPORTED_MODULE_7__[\"slotName\"])(slot);\n        const parent = slot.parentElement || fragment;\n        const marker = document.createComment(`slot ${name}`);\n\n        parent.insertBefore(marker, slot);\n        parent.removeChild(slot);\n\n        if (name) {\n          contentFragment.querySelectorAll(`[slot=\"${name}\"]`).forEach(node => {\n            parent.insertBefore(node, marker);\n          });\n        } else {\n          parent.insertBefore(contentFragment, marker);\n        }\n      });\n    }\n\n    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);\n  }\n\n  __templateUninitialize () {\n    this.__templateChildNodes.forEach(node => {\n      if (node.parentElement) {\n        node.parentElement.removeChild(node);\n      }\n    });\n  }\n\n  __templateGetPathAsArray (path) {\n    if (typeof path !== 'string') {\n      return path;\n    }\n\n    return path.split('.');\n  }\n\n  __templateGetPathAsString (path) {\n    if (typeof path === 'string') {\n      return path;\n    }\n\n    return path.join('.');\n  }\n\n  __templateParseAnnotations () {\n    this.__templateChildNodes = [...this.__templateFragment.childNodes];\n\n    const len = this.__templateChildNodes.length;\n\n    for (let i = 0; i < len; i++) {\n      const node = this.__templateChildNodes[i];\n\n      switch (node.nodeType) {\n        case window.Node.ELEMENT_NODE:\n          this.__templateParseElementAnnotations(node);\n          break;\n        case window.Node.TEXT_NODE:\n          this.__templateParseTextAnnotations(node);\n          break;\n      }\n    }\n  }\n\n  __templateParseEventAnnotations (element, attrName) {\n    // bind event annotation\n    const attrValue = element.getAttribute(attrName);\n    let eventName = attrName.slice(1, -1);\n\n    if (eventName === 'tap') {\n      eventName = 'click';\n    }\n\n    const context = this;\n    const expr = _expr__WEBPACK_IMPORTED_MODULE_2__[\"Expr\"].getFn(attrValue, [], true);\n\n    this.on(eventName, element, evt => {\n      expr.invoke(context, { evt });\n    });\n  }\n\n  __templateParseAttributeAnnotations (element) {\n    // clone attributes to array first then foreach because we will remove\n    // attribute later if already processed\n    // this hack to make sure when attribute removed the attributes index doesnt shift.\n    let annotated = false;\n\n    const len = element.attributes.length;\n\n    for (let i = 0; i < len; i++) {\n      const attr = element.attributes[i];\n\n      const attrName = attr.name;\n\n      if (attrName === 'id' || attrName === 'class' || attrName === 'style') {\n        continue;\n      }\n\n      if (attrName.indexOf('(') === 0) {\n        this.__templateParseEventAnnotations(element, attrName);\n      } else {\n        // bind property annotation\n        annotated = this.__templateAnnotate(_expr__WEBPACK_IMPORTED_MODULE_2__[\"Expr\"].get(attr.value), Object(_accessor__WEBPACK_IMPORTED_MODULE_4__[\"accessorFactory\"])(element, attrName)) || annotated;\n      }\n    }\n\n    return annotated;\n  }\n\n  __templateParseElementAnnotations (element) {\n    let annotated = false;\n\n    // when element already has template model it means it already parsed, skip\n    // parsing that element\n    if (element.__templateModel) {\n      return annotated;\n    }\n\n    element.__templateModel = this;\n\n    if (element.attributes && element.attributes.length) {\n      annotated = this.__templateParseAttributeAnnotations(element) || annotated;\n    }\n\n    if (element.childNodes && element.childNodes.length) {\n      const childNodes = [].slice.call(element.childNodes);\n      const childNodesLength = childNodes.length;\n\n      for (let i = 0; i < childNodesLength; i++) {\n        annotated = this.__templateParseNodeAnnotations(childNodes[i]) || annotated;\n      }\n    }\n\n    element.querySelectorAll('slot').forEach(slot => {\n      slot.childNodes.forEach(node => {\n        annotated = this.__templateParseNodeAnnotations(node) || annotated;\n      });\n    });\n\n    return annotated;\n  }\n\n  __templateParseNodeAnnotations (node) {\n    switch (node.nodeType) {\n      case window.Node.TEXT_NODE:\n        return this.__templateParseTextAnnotations(node);\n      case window.Node.ELEMENT_NODE:\n        return this.__templateParseElementAnnotations(node);\n    }\n  }\n\n  __templateParseTextAnnotations (node) {\n    const expr = _expr__WEBPACK_IMPORTED_MODULE_2__[\"Expr\"].get(node.textContent);\n    const accessor = Object(_accessor__WEBPACK_IMPORTED_MODULE_4__[\"accessorFactory\"])(node);\n    return this.__templateAnnotate(expr, accessor);\n  }\n\n  __templateAnnotate (expr, accessor) {\n    if (expr.type === 's') {\n      return false;\n    }\n\n    if (expr.constant) {\n      accessor.set(expr.invoke(this));\n      return false;\n    }\n\n    // annotate every paths\n    const annotation = new _annotation__WEBPACK_IMPORTED_MODULE_5__[\"Annotation\"](this, expr, accessor);\n\n    if (expr.type === 'm') {\n      this.__templateGetBinding(expr.fn.name).annotate(annotation);\n    }\n\n    expr.vpaths.forEach(arg => {\n      this.__templateGetBinding(arg.name).annotate(annotation);\n    });\n\n    return true;\n  }\n\n  __templateGetBinding (path) {\n    const segments = path.split('.');\n    let bindings;\n    let binding;\n\n    for (let i = 0; i < segments.length; i++) {\n      const segment = segments[i];\n\n      bindings = binding ? binding.paths : this.__templateBindings;\n\n      if (!bindings[segment]) {\n        bindings[segment] = new _binding__WEBPACK_IMPORTED_MODULE_3__[\"Binding\"](this, segment);\n      }\n\n      binding = bindings[segment];\n    }\n\n    return binding;\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/template/template.js?");

/***/ }),

/***/ "./component/token.js":
/*!****************************!*\
  !*** ./component/token.js ***!
  \****************************/
/*! exports provided: Token */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Token\", function() { return Token; });\nconst CACHE = {};\n\nclass Token {\n  static get CACHE () {\n    return CACHE;\n  }\n\n  static get (name) {\n    if (name in CACHE) {\n      return CACHE[name];\n    }\n\n    const token = new Token(name);\n    CACHE[name] = token;\n    return token;\n  }\n\n  constructor (name) {\n    this.name = name;\n    this.contextName = '';\n    this.baseName = '';\n    this._value = null;\n    this.type = 'v';\n\n    if (!this.name.match(/^[a-zA-Z_]/)) {\n      try {\n        this._value = JSON.parse(this.name);\n        this.type = 's';\n        return;\n      } catch (err) {\n        // noop\n      }\n    }\n\n    if (this.type === 'v') {\n      const nameSegments = this.name.split('.');\n      this.baseName = nameSegments.pop();\n      this.contextName = nameSegments.join('.');\n    }\n  }\n\n  value (...contexts) {\n    if (this.type === 's') {\n      return this._value;\n    }\n\n    for (const context of contexts) {\n      if (!context) {\n        continue;\n      }\n\n      const val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];\n      if (val !== undefined) {\n        return val;\n      }\n    }\n  }\n\n  invoke (args, ...contexts) {\n    if (contexts.length === 0) {\n      throw new Error(`Cannot invoke method ${this.name} of undefined context`);\n    }\n\n    if (this.type === 's') {\n      const [context] = contexts;\n      throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);\n    }\n\n    for (const context of contexts) {\n      if (!context) {\n        continue;\n      }\n\n      if (typeof context.get === 'function') {\n        const ctx = this.contextName ? context.get(this.contextName) : context;\n        if (typeof ctx[this.baseName] === 'function') {\n          return ctx[this.baseName](...args);\n        }\n      } else if (typeof context[this.name] === 'function') {\n        return context[this.name].apply(context, args);\n      }\n    }\n\n    const [context] = contexts;\n    throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);\n  }\n}\n\n\n//# sourceURL=webpack://xin/./component/token.js?");

/***/ }),

/***/ "./components/fixture.js":
/*!*******************************!*\
  !*** ./components/fixture.js ***!
  \*******************************/
/*! exports provided: Fixture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return Fixture; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./component/index.js\");\n/* harmony import */ var _core_fn_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/fn/async */ \"./core/fn/async.js\");\n\n\n\nclass Fixture extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  static create (template, data = {}) {\n    const d = document.createElement('div');\n    d.innerHTML = `<xin-fixture><template>${template}</template></xin-fixture>`;\n    const fixture = d.firstElementChild;\n    fixture.__fixtureInitialData = data;\n    document.body.appendChild(fixture);\n\n    // return as promised element because at v0 it wont be created yet!\n    return new Promise(resolve => resolve(fixture));\n  }\n\n  attached () {\n    super.attached();\n\n    this.set(this.__fixtureInitialData);\n    delete this.__fixtureInitialData;\n    this.connected = true;\n\n    // delay connected to make sure children is already connected\n    this.async(() => this.fire('connected'));\n  }\n\n  detached () {\n    super.detached();\n\n    this.connected = false;\n    this.fire('disconnected');\n  }\n\n  dispose () {\n    this.parentElement.removeChild(this);\n  }\n\n  async waitConnected (timeout) {\n    if (!this.connected) {\n      await this.waitFor('connected');\n    }\n\n    await _core_fn_async__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].sleep(timeout);\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-fixture', Fixture);\n\n\n//# sourceURL=webpack://xin/./components/fixture.js?");

/***/ }),

/***/ "./components/for/for.js":
/*!*******************************!*\
  !*** ./components/for/for.js ***!
  \*******************************/
/*! exports provided: For */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return For; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./component/index.js\");\n/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row */ \"./components/for/row.js\");\n\n\n\nconst FILTER_ALL = () => true;\n\nclass For extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      items: {\n        type: Array,\n        observer: '__loopItemsChanged(items, filter)',\n      },\n\n      as: {\n        type: String,\n        value: 'item',\n      },\n\n      indexAs: {\n        type: String,\n        value: 'index',\n      },\n\n      filter: {\n        type: Function,\n        observer: '__loopItemsChanged(items, filter)',\n      },\n\n      to: {\n        type: String,\n        value: '',\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.rows = [];\n  }\n\n  attached () {\n    super.attached();\n\n    this.__loopItemsChanged(this.items, this.filter);\n  }\n\n  detached () {\n    super.detached();\n\n    // on detached will remove rows\n    this.rows.forEach(row => {\n      row.dismount();\n    });\n    this.rows = [];\n  }\n\n  __componentInitTemplate () {\n    this.__loopTemplate = this.firstElementChild;\n    if (!this.__loopTemplate) {\n      throw new Error('Invalid xin-for definition, must be <xin-for items=\"[[items]]\"><template>...</template></xin-for>');\n    }\n\n    this.removeChild(this.__loopTemplate);\n\n    _component__WEBPACK_IMPORTED_MODULE_0__[\"Template\"].prototype.__templateInitialize.call(this);\n  }\n\n  __componentMountTemplate () {\n    let marker = this;\n    const toAttr = this.getAttribute('to');\n    if (toAttr) {\n      const container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);\n      if (!container) {\n        throw new Error(`xin-for render to unknown element ${toAttr}`);\n      }\n      marker = document.createComment(`marker-for`);\n      container.appendChild(marker);\n    }\n\n    this.mount(this, marker);\n  }\n\n  __loopItemsChanged (items, _) {\n    this.debounce('__loopItemsChanged', () => {\n      let len = 0;\n\n      if (items && items.length) {\n        const filter = this.filter || FILTER_ALL;\n        items.filter(filter).forEach((item, index) => {\n          if (this.rows[index]) {\n            this.rows[index].update(item, index);\n          } else {\n            const row = new _row__WEBPACK_IMPORTED_MODULE_1__[\"Row\"](this.__loopTemplate, this, item, index);\n            row.mount(this.__templateModel, this.__templateMarker);\n            this.rows.push(row);\n          }\n\n          len++;\n        });\n      }\n\n      this.rows.splice(len).forEach(row => {\n        row.dismount();\n      });\n    });\n  }\n\n  itemForElement (element) {\n    return this.modelForElement(element).get(this.as);\n  }\n\n  indexForElement (element) {\n    return this.modelForElement(element).get(this.indexAs);\n  }\n\n  modelForElement (element) {\n    while (element && !element.__loopModel) {\n      element = element.parentElement;\n    }\n    return element.__loopModel;\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-for', For);\n\n\n//# sourceURL=webpack://xin/./components/for/for.js?");

/***/ }),

/***/ "./components/for/index.js":
/*!*********************************!*\
  !*** ./components/for/index.js ***!
  \*********************************/
/*! exports provided: For */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for */ \"./components/for/for.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_0__[\"For\"]; });\n\n\n\n\n//# sourceURL=webpack://xin/./components/for/index.js?");

/***/ }),

/***/ "./components/for/row.js":
/*!*******************************!*\
  !*** ./components/for/row.js ***!
  \*******************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Row\", function() { return Row; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./component/index.js\");\n/* harmony import */ var _component_annotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/annotation */ \"./component/annotation/index.js\");\n\n\n\nclass Row extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Template\"] {\n  constructor (template, host, item, index) {\n    super();\n\n    this.__loopHost = host;\n    this.__loopAs = host.as;\n    this.__loopIndexAs = host.indexAs;\n    this.__loopAnnotations = [];\n\n    // override Template constructor\n    this.__templateInitialize(template);\n\n    this.is = '$for-row';\n    this.__id = this.__templateId;\n\n    this.__templateChildNodes.forEach(node => {\n      if (node.nodeType === window.Node.ELEMENT_NODE) {\n        node.__loopModel = this;\n      }\n    });\n\n    this.update(item, index);\n  }\n\n  update (item, index) {\n    this[this.__loopAs] = item;\n    this[this.__loopIndexAs] = index;\n    this.notify(this.__loopAs, item);\n    this.notify(this.__loopIndexAs, index);\n  }\n\n  set (path, value) {\n    if (arguments.length === 1 && typeof path === 'object') {\n      const data = path;\n      for (const i in data) {\n        if (Object.prototype.hasOwnProperty.call(data, i)) {\n          this.set(i, data[i]);\n        }\n      }\n      return;\n    }\n\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__loopAs || path[0] === this.__loopIndexAs) {\n      return super.set(path, value);\n    }\n\n    // do not change parent data\n    // parent data works stream down only\n    // return this.__templateHost.set(path, value);\n  }\n\n  get (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__loopAs || path[0] === this.__loopIndexAs) {\n      return super.get(path);\n    }\n\n    return this.__templateHost.get(path);\n  }\n\n  mount (host, marker) {\n    this.__templateHost = host;\n    this.__templateMarker = marker;\n\n    this.__templateRender();\n  }\n\n  __templateAnnotate (expr, accessor) {\n    if (expr.type === 's') {\n      return false;\n    }\n\n    if (expr.constant) {\n      accessor.set(expr.invoke(this.__loopHost.__templateModel));\n      return false;\n    }\n\n    const path = this.__templateGetPathAsArray(expr.name);\n    if (path[0] === this.__loopAs || path[0] === this.loopIndexAs) {\n      const annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this, expr, accessor);\n\n      if (expr.type === 'm') {\n        this.__templateGetBinding(expr.fn.name).annotate(annotation);\n      }\n\n      expr.vpaths.forEach(arg => {\n        this.__templateGetBinding(arg.name).annotate(annotation);\n      });\n\n      return true;\n    }\n\n    // annotate every paths\n    this.__loopAnnotations.push({ expr, accessor });\n\n    if (expr.type === 'm') {\n      const annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this, expr, accessor);\n      this.__loopHost.__templateModel.__templateGetBinding(expr.fn.name).annotate(annotation);\n    }\n\n    const annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this.__loopHost.__templateModel, expr, accessor);\n    expr.vpaths.forEach(arg => {\n      this.__loopHost.__templateModel.__templateGetBinding(arg.name).annotate(annotation);\n    });\n\n    accessor.set(expr.invoke(this.__loopHost.__templateModel));\n\n    return true;\n  }\n\n  __templateUninitialize () {\n    super.__templateUninitialize();\n\n    this.__loopAnnotations.forEach(({ expr, accessor }) => {\n      if (expr.type === 'm') {\n        this.__loopHost.__templateModel.__templateGetBinding(expr.fn.name).deannotate(this, expr, accessor);\n      }\n\n      expr.vpaths.forEach(arg => {\n        this.__loopHost.__templateModel.__templateGetBinding(arg.name).deannotate(this.__loopHost.__templateModel, expr, accessor);\n      });\n    });\n  }\n}\n\n\n//# sourceURL=webpack://xin/./components/for/row.js?");

/***/ }),

/***/ "./components/if/if.js":
/*!*****************************!*\
  !*** ./components/if/if.js ***!
  \*****************************/
/*! exports provided: If */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"If\", function() { return If; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./component/index.js\");\n/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row */ \"./components/if/row.js\");\n\n\n// import { Async } from '../core/fn/async';\n\nclass If extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    return {\n      ...super.props,\n      condition: {\n        type: Boolean,\n        observer: 'observeCondition(condition)',\n      },\n    };\n  }\n\n  __componentInitTemplate () {\n    const children = this.children;\n\n    if (children.length < 1 || children.length > 2 || children[0].nodeName !== 'TEMPLATE') {\n      throw new Error('Invalid xin-if definition, must be <xin-if items=\"[[items]]\"><template>...</template></xin-if>');\n    }\n\n    this.__ifThenTemplate = children[0];\n    this.removeChild(this.__ifThenTemplate);\n\n    if (children.length === 1) {\n      if (children[0].nodeName !== 'TEMPLATE') {\n        throw new Error('Invalid xin-if definition, must be <xin-if items=\"[[items]]\"><template>...</template><template else>...</template></xin-if>');\n      }\n\n      this.__ifElseTemplate = children[0];\n      this.removeChild(this.__ifElseTemplate);\n    }\n\n    _component__WEBPACK_IMPORTED_MODULE_0__[\"Template\"].prototype.__templateInitialize.call(this);\n  }\n\n  observeCondition (condition) {\n    if (condition) {\n      this.__ifThenRow = new _row__WEBPACK_IMPORTED_MODULE_1__[\"Row\"](this.__ifThenTemplate, this);\n      this.__ifThenRow.mount(this.__templateModel, this);\n\n      if (this.__ifElseRow) {\n        this.__ifElseRow.dismount();\n        this.__ifElseRow = null;\n      }\n    } else {\n      if (this.__ifThenRow) {\n        this.__ifThenRow.dismount();\n        this.__ifThenRow = null;\n      }\n\n      if (this.__ifElseTemplate) {\n        this.__ifElseRow = new _row__WEBPACK_IMPORTED_MODULE_1__[\"Row\"](this.__ifElseTemplate, this);\n        this.__ifElseRow.mount(this.__templateModel, this);\n      }\n    }\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-if', If);\n\n\n//# sourceURL=webpack://xin/./components/if/if.js?");

/***/ }),

/***/ "./components/if/index.js":
/*!********************************!*\
  !*** ./components/if/index.js ***!
  \********************************/
/*! exports provided: If */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _if__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if */ \"./components/if/if.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"If\", function() { return _if__WEBPACK_IMPORTED_MODULE_0__[\"If\"]; });\n\n\n\n\n//# sourceURL=webpack://xin/./components/if/index.js?");

/***/ }),

/***/ "./components/if/row.js":
/*!******************************!*\
  !*** ./components/if/row.js ***!
  \******************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Row\", function() { return Row; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"./component/index.js\");\n/* harmony import */ var _component_annotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/annotation */ \"./component/annotation/index.js\");\n\n\n\nclass Row extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Template\"] {\n  constructor (template, host) {\n    super();\n\n    this.__ifHost = host;\n    this.__ifAnnotations = [];\n\n    // override Template constructor\n    this.__templateInitialize(template);\n\n    this.is = '$if-row';\n    this.__id = this.__templateId;\n\n    this.__templateChildNodes.forEach(node => {\n      if (node.nodeType === window.Node.ELEMENT_NODE) {\n        node.__ifModel = this;\n      }\n    });\n  }\n\n  mount (host, marker) {\n    this.__templateHost = host;\n    this.__templateMarker = marker;\n\n    this.__templateRender();\n  }\n\n  get (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    return this.__templateHost.get(path);\n  }\n\n  set (path, value) {\n    if (arguments.length === 1 && typeof path === 'object') {\n      const data = path;\n      for (const i in data) {\n        if (Object.prototype.hasOwnProperty.call(data, i)) {\n          this.set(i, data[i]);\n        }\n      }\n      return;\n    }\n\n    path = this.__templateGetPathAsArray(path);\n    return this.__templateHost.set(path, value);\n  }\n\n  __templateAnnotate (expr, accessor) {\n    if (expr.type === 's') {\n      return false;\n    }\n\n    if (expr.constant) {\n      accessor.set(expr.invoke(this.__ifHost.__templateModel));\n      return false;\n    }\n\n    // annotate every paths\n    this.__ifAnnotations.push({ expr, accessor });\n\n    if (expr.type === 'm') {\n      const annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this, expr, accessor);\n      this.__ifHost.__templateModel.__templateGetBinding(expr.fn.name).annotate(annotation);\n    }\n\n    const annotation = new _component_annotation__WEBPACK_IMPORTED_MODULE_1__[\"Annotation\"](this.__ifHost.__templateModel, expr, accessor);\n    expr.vpaths.forEach(arg => {\n      this.__ifHost.__templateModel.__templateGetBinding(arg.name).annotate(annotation);\n    });\n\n    accessor.set(expr.invoke(this.__ifHost.__templateModel));\n\n    return true;\n  }\n\n  __templateUninitialize () {\n    super.__templateUninitialize();\n\n    this.__ifAnnotations.forEach(({ expr, accessor }) => {\n      if (expr.type === 'm') {\n        this.__ifHost.__templateModel.__templateGetBinding(expr.fn.name).deannotate(this, expr, accessor);\n      }\n\n      expr.vpaths.forEach(arg => {\n        this.__ifHost.__templateModel.__templateGetBinding(arg.name).deannotate(this.__ifHost.__templateModel, expr, accessor);\n      });\n    });\n  }\n}\n\n\n//# sourceURL=webpack://xin/./components/if/row.js?");

/***/ }),

/***/ "./components/index.js":
/*!*****************************!*\
  !*** ./components/index.js ***!
  \*****************************/
/*! exports provided: Fixture, For, Transition, If */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fixture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixture */ \"./components/fixture.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return _fixture__WEBPACK_IMPORTED_MODULE_0__[\"Fixture\"]; });\n\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./for */ \"./components/for/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_1__[\"For\"]; });\n\n/* harmony import */ var _if__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./if */ \"./components/if/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"If\", function() { return _if__WEBPACK_IMPORTED_MODULE_2__[\"If\"]; });\n\n/* harmony import */ var _transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transition */ \"./components/transition.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Transition\", function() { return _transition__WEBPACK_IMPORTED_MODULE_3__[\"Transition\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack://xin/./components/index.js?");

/***/ }),

/***/ "./components/transition.js":
/*!**********************************!*\
  !*** ./components/transition.js ***!
  \**********************************/
/*! exports provided: Transition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Transition\", function() { return Transition; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"./component/index.js\");\n/* harmony import */ var _core_fn_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/fn/async */ \"./core/fn/async.js\");\n\n\n\nconst TRANSITION = 'transition';\nconst ANIMATION = 'animation';\n\nclass Transition extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    return {\n      ...super.props,\n\n      name: {\n        type: String,\n        required: true,\n      },\n\n      type: {\n        type: String,\n        value: TRANSITION,\n      },\n    };\n  }\n\n  ready () {\n    super.ready();\n\n    this.enterClass = `${this.name}-enter`;\n    this.enterActiveClass = `${this.name}-enter-active`;\n    this.enterToClass = `${this.name}-enter-to`;\n\n    this.leaveClass = `${this.name}-leave`;\n    this.leaveActiveClass = `${this.name}-leave-active`;\n    this.leaveToClass = `${this.name}-leave-to`;\n  }\n\n  async insertBefore (node, marker) {\n    const elements = node instanceof DocumentFragment ? [...node.children] : [node];\n    addClass(elements, this.enterClass);\n\n    super.insertBefore(node, marker);\n\n    await new Promise(resolve => {\n      _core_fn_async__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n        addClass(elements, this.enterActiveClass, this.enterToClass);\n\n        _core_fn_async__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          removeClass(elements, this.enterClass);\n          whenTransitionEnds(elements, this.type, resolve);\n        });\n      });\n    });\n\n    removeClass(elements, this.enterActiveClass, this.enterToClass);\n  }\n\n  async removeChild (node) {\n    if (node.nodeType !== 1) {\n      return;\n    }\n\n    const elements = [node];\n\n    addClass(elements, this.leaveClass);\n\n    await new Promise(resolve => {\n      _core_fn_async__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n        addClass(elements, this.leaveActiveClass, this.leaveToClass);\n        whenTransitionEnds(elements, this.type, resolve);\n      });\n    });\n\n    super.removeChild(node);\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-transition', Transition);\n\nconst transformRE = /\\b(transform|all)(,|$)/;\nconst transitionProp = 'transition';\nconst transitionEndEvent = 'transitionend';\nconst animationProp = 'animation';\nconst animationEndEvent = 'animationend';\n\nfunction addClass (elements, ...classes) {\n  elements.forEach(el => {\n    el.classList.add(...classes);\n  });\n}\n\nfunction removeClass (elements, ...classes) {\n  elements.forEach(el => {\n    el.classList.remove(...classes);\n  });\n}\n\nfunction whenTransitionEnds (elements, expectedType, cb) {\n  let endCount = 0;\n  function elementEnd () {\n    endCount++;\n    if (endCount >= elements.length) {\n      cb();\n    }\n  }\n\n  elements.forEach(el => {\n    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);\n\n    if (!type) { return elementEnd(); }\n    const event = type === TRANSITION ? transitionEndEvent : animationEndEvent;\n    let ended = 0;\n    const end = function () {\n      el.removeEventListener(event, onEnd);\n      elementEnd();\n    };\n    const onEnd = function (e) {\n      if (e.target === el) {\n        if (++ended >= propCount) {\n          end();\n        }\n      }\n    };\n    setTimeout(function () {\n      if (ended < propCount) {\n        end();\n      }\n    }, timeout + 1);\n    el.addEventListener(event, onEnd);\n  });\n}\n\nfunction getTransitionInfo (el, expectedType) {\n  const styles = window.getComputedStyle(el);\n  // JSDOM may return undefined for transition properties\n  const transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');\n  const transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');\n  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);\n  const animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');\n  const animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');\n  const animationTimeout = getTimeout(animationDelays, animationDurations);\n\n  let type;\n  let timeout = 0;\n  let propCount = 0;\n  /* istanbul ignore if */\n  if (expectedType === TRANSITION) {\n    if (transitionTimeout > 0) {\n      type = TRANSITION;\n      timeout = transitionTimeout;\n      propCount = transitionDurations.length;\n    }\n  } else if (expectedType === ANIMATION) {\n    if (animationTimeout > 0) {\n      type = ANIMATION;\n      timeout = animationTimeout;\n      propCount = animationDurations.length;\n    }\n  } else {\n    timeout = Math.max(transitionTimeout, animationTimeout);\n    type = timeout > 0\n      ? transitionTimeout > animationTimeout\n        ? TRANSITION\n        : ANIMATION\n      : null;\n    propCount = type\n      ? type === TRANSITION\n        ? transitionDurations.length\n        : animationDurations.length\n      : 0;\n  }\n  const hasTransform =\n    type === TRANSITION &&\n    transformRE.test(styles[transitionProp + 'Property']);\n  return {\n    type: type,\n    timeout: timeout,\n    propCount: propCount,\n    hasTransform: hasTransform,\n  };\n}\n\nfunction getTimeout (delays, durations) {\n  /* istanbul ignore next */\n  while (delays.length < durations.length) {\n    delays = delays.concat(delays);\n  }\n\n  return Math.max.apply(null, durations.map(function (d, i) {\n    return toMs(d) + toMs(delays[i]);\n  }));\n}\n\n// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers\n// in a locale-dependent way, using a comma instead of a dot.\n// If comma is not replaced with a dot, the input will be rounded down (i.e. acting\n// as a floor function) causing unexpected behaviors\nfunction toMs (s) {\n  return Number(s.slice(0, -1).replace(',', '.')) * 1000;\n}\n\n\n//# sourceURL=webpack://xin/./components/transition.js?");

/***/ }),

/***/ "./core/event.js":
/*!***********************!*\
  !*** ./core/event.js ***!
  \***********************/
/*! exports provided: event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return event; });\n/* harmony import */ var _helpers_id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/id-generator */ \"./core/helpers/id-generator.js\");\n\n\nconst nextEventId = Object(_helpers_id_generator__WEBPACK_IMPORTED_MODULE_0__[\"idGenerator\"])();\n\nlet _matcher;\nlet _level = 0;\nlet _id = 0;\nconst _handlers = {};\nconst _delegatorInstances = {};\n\nfunction _addEvent (delegator, type, callback) {\n  if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {\n    delegator.element.addEventListener(type, callback, { passive: true });\n    return;\n  }\n  // blur and focus do not bubble up but if you use event capturing\n  // then you will get them\n  const useCapture = type === 'blur' || type === 'focus';\n  delegator.element.addEventListener(type, callback, useCapture);\n}\n\nfunction _cancel (evt) {\n  evt.preventDefault();\n  evt.stopPropagation();\n}\n\n/**\n * returns function to use for determining if an element\n * matches a query selector\n *\n * @returns {Function}\n */\nfunction _getMatcher (element) {\n  if (_matcher) {\n    return _matcher;\n  }\n\n  if (element.matches) {\n    _matcher = element.matches;\n    return _matcher;\n  }\n\n  if (element.webkitMatchesSelector) {\n    _matcher = element.webkitMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.mozMatchesSelector) {\n    _matcher = element.mozMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.msMatchesSelector) {\n    _matcher = element.msMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.oMatchesSelector) {\n    _matcher = element.oMatchesSelector;\n    return _matcher;\n  }\n\n  // if it doesn't match a native browser method\n  // fall back to the delegator function\n  _matcher = Delegator.matchesSelector;\n  return _matcher;\n}\n\n/**\n * determines if the specified element matches a given selector\n *\n * @param {Node} element - the element to compare against the selector\n * @param {string} selector\n * @param {Node} boundElement - the element the listener was attached to\n * @returns {void|Node}\n */\nfunction _matchesSelector (element, selector, boundElement) {\n  // no selector means this event was bound directly to this element\n  if (selector === '_root') {\n    return boundElement;\n  }\n\n  // if we have moved up to the element you bound the event to\n  // then we have come too far\n  if (element === boundElement) {\n    return;\n  }\n\n  if (_getMatcher(element).call(element, selector)) {\n    return element;\n  }\n\n  // if this element did not match but has a parent we should try\n  // going up the tree to see if any of the parent elements match\n  // for example if you are looking for a click on an <a> tag but there\n  // is a <span> inside of the a tag that it is the target,\n  // it should still work\n  if (element.parentNode) {\n    _level++;\n    return _matchesSelector(element.parentNode, selector, boundElement);\n  }\n}\n\nfunction _addHandler (delegator, event, selector, callback) {\n  if (!_handlers[delegator.id]) {\n    _handlers[delegator.id] = {};\n  }\n\n  if (!_handlers[delegator.id][event]) {\n    _handlers[delegator.id][event] = {};\n  }\n\n  if (!_handlers[delegator.id][event][selector]) {\n    _handlers[delegator.id][event][selector] = [];\n  }\n\n  _handlers[delegator.id][event][selector].push(callback);\n}\n\nfunction _removeHandler (delegator, event, selector, callback) {\n  // if there are no events tied to this element at all\n  // then don't do anything\n  if (!_handlers[delegator.id]) {\n    return;\n  }\n\n  // if there is no event type specified then remove all events\n  // example: Delegator(element).off()\n  if (!event) {\n    for (const type in _handlers[delegator.id]) {\n      if (Object.prototype.hasOwnProperty.call(_handlers[delegator.id], type)) {\n        _handlers[delegator.id][type] = {};\n      }\n    }\n    return;\n  }\n\n  // if no callback or selector is specified remove all events of this type\n  // example: Delegator(element).off('click')\n  if (!callback && !selector) {\n    _handlers[delegator.id][event] = {};\n    return;\n  }\n\n  // if a selector is specified but no callback remove all events\n  // for this selector\n  // example: Delegator(element).off('click', '.sub-element')\n  if (!callback) {\n    delete _handlers[delegator.id][event][selector];\n    return;\n  }\n\n  // if we have specified an event type, selector, and callback then we\n  // need to make sure there are callbacks tied to this selector to\n  // begin with.  if there aren't then we can stop here\n  if (!_handlers[delegator.id][event][selector]) {\n    return;\n  }\n\n  // if there are then loop through all the callbacks and if we find\n  // one that matches remove it from the array\n  for (let i = 0; i < _handlers[delegator.id][event][selector].length; i++) {\n    if (_handlers[delegator.id][event][selector][i] === callback) {\n      _handlers[delegator.id][event][selector].splice(i, 1);\n      break;\n    }\n  }\n}\n\nfunction _handleEvent (id, e, type) {\n  if (!_handlers[id][type]) {\n    return;\n  }\n\n  const target = e.target || e.srcElement;\n  let selector;\n  let match;\n  const matches = {};\n  let i = 0;\n  let j = 0;\n\n  // find all events that match\n  _level = 0;\n  for (selector in _handlers[id][type]) {\n    if (Object.prototype.hasOwnProperty.call(_handlers[id][type], selector)) {\n      match = _matchesSelector(target, selector, _delegatorInstances[id].element);\n\n      if (match && Delegator.matchesEvent(type, _delegatorInstances[id].element, match, selector === '_root', e)) {\n        _level++;\n        _handlers[id][type][selector].match = match;\n        matches[_level] = _handlers[id][type][selector];\n      }\n    }\n  }\n\n  // stopPropagation() fails to set cancelBubble to true in Webkit\n  // @see http://code.google.com/p/chromium/issues/detail?id=162270\n  e.stopPropagation = function () {\n    e.cancelBubble = true;\n  };\n\n  for (i = 0; i <= _level; i++) {\n    if (matches[i]) {\n      for (j = 0; j < matches[i].length; j++) {\n        if (matches[i][j].call(matches[i].match, e) === false) {\n          Delegator.cancel(e);\n          return;\n        }\n\n        if (e.cancelBubble) {\n          return;\n        }\n      }\n    }\n  }\n}\n\nconst aliases = {};\nconst aliasesDefaultTranslator = name => ([name]);\nconst aliasesTranslators = {\n  transitionend (name) {\n    const el = document.createElement('fakeelement');\n    const transitions = {\n      OTransition: 'oTransitionEnd',\n      MozTransition: 'transitionend',\n      WebkitTransition: 'webkitTransitionEnd',\n      transition: 'transitionend',\n    };\n\n    for (const t in transitions) {\n      if (el.style[t] !== undefined) {\n        return [transitions[t]];\n      }\n    }\n  },\n};\n\nfunction _aliases (name) {\n  let theAliases;\n  if (name in aliases) {\n    theAliases = aliases[name];\n  } else {\n    const translator = aliasesTranslators[name] || aliasesDefaultTranslator;\n    theAliases = translator(name);\n    aliases[name] = theAliases;\n  }\n\n  return theAliases;\n}\n\n/**\n * binds the specified events to the element\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @param {boolean=} remove\n * @returns {Object}\n */\nfunction _bind (events, selector, callback, remove) {\n  // fail silently if you pass null or undefined as an alement\n  // in the Delegator constructor\n  if (!this.element) {\n    return;\n  }\n\n  if (!(events instanceof Array)) {\n    events = [events];\n  }\n\n  if (!callback && typeof (selector) === 'function') {\n    callback = selector;\n    selector = '_root';\n  }\n\n  if (selector instanceof window.Element) {\n    let id;\n    if (selector.hasAttribute('bind-event-id')) {\n      id = selector.getAttribute('bind-event-id');\n    } else {\n      id = nextEventId();\n      selector.setAttribute('bind-event-id', id);\n    }\n    selector = `[bind-event-id=\"${id}\"]`;\n  }\n\n  const id = this.id;\n  let i;\n\n  function _getGlobalCallback (type) {\n    return function (e) {\n      _handleEvent(id, e, type);\n    };\n  }\n\n  for (i = 0; i < events.length; i++) {\n    _aliases(events[i]).forEach(alias => {\n      if (remove) {\n        _removeHandler(this, alias, selector, callback);\n        return;\n      }\n\n      if (!_handlers[id] || !_handlers[id][alias]) {\n        Delegator.addEvent(this, alias, _getGlobalCallback(alias));\n      }\n\n      _addHandler(this, alias, selector, callback);\n    });\n  }\n\n  return this;\n}\n\n/**\n * Delegator object constructor\n *\n * @param {Node} element\n */\nfunction Delegator (element, id) {\n  this.element = element;\n  this.id = id;\n}\n\n/**\n * adds an event\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @returns {Object}\n */\nDelegator.prototype.on = function (events, selector, callback) {\n  return _bind.call(this, events, selector, callback);\n};\n\n/**\n * removes an event\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @returns {Object}\n */\nDelegator.prototype.off = function (events, selector, callback) {\n  return _bind.call(this, events, selector, callback, true);\n};\n\nDelegator.prototype.once = function (events, selector, callback) {\n  if (!callback && typeof (selector) === 'function') {\n    callback = selector;\n    selector = '_root';\n  }\n\n  const proxyCallback = (...args) => {\n    this.off(events, selector, proxyCallback);\n    return callback(...args); // eslint-disable-line standard/no-callback-literal\n  };\n\n  return this.on(events, selector, proxyCallback);\n};\n\nDelegator.prototype.waitFor = function (events, timeout = 3000) {\n  return new Promise((resolve, reject) => {\n    const onResolve = evt => {\n      clearTimeout(t);\n      resolve(evt);\n    };\n    let t;\n    if (timeout > 0) {\n      t = setTimeout(() => {\n        this.off(events, onResolve);\n        reject(new Error('Event#waitFor got timeout'));\n      }, timeout);\n    }\n    this.once(events, onResolve);\n  });\n};\n\nDelegator.prototype.fire = function (type, detail, options) {\n  options = options || {};\n  detail = detail || {};\n\n  let evt;\n  const bubbles = options.bubbles === undefined ? true : options.bubbles;\n  const cancelable = Boolean(options.cancelable);\n\n  switch (type) {\n    case 'click':\n      evt = new window.Event(type, {\n        bubbles: bubbles,\n        cancelable: cancelable,\n        // XXX is it ok to have detail here?\n        detail: detail,\n      });\n\n      // XXX check if without this works on every browsers\n      // evt = document.createEvent('HTMLEvents');\n      // evt.initEvent(type, true, false);\n      break;\n    default:\n      evt = new window.CustomEvent(type, {\n        bubbles: Boolean(bubbles),\n        cancelable: cancelable,\n        detail: detail,\n      });\n      break;\n  }\n\n  this.element.dispatchEvent(evt);\n\n  return evt;\n};\n\nDelegator.matchesSelector = function () {};\nDelegator.cancel = _cancel;\nDelegator.addEvent = _addEvent;\nDelegator.aliases = _aliases;\nDelegator.matchesEvent = function () {\n  return true;\n};\n\nfunction event (element) {\n  // only keep one Delegator instance per node to make sure that\n  // we don't create a ton of new objects if you want to delegate\n  // multiple events from the same node\n  //\n  // for example: event(document).on(...\n  for (const key in _delegatorInstances) {\n    if (_delegatorInstances[key].element === element) {\n      return _delegatorInstances[key];\n    }\n  }\n\n  _id++;\n  _delegatorInstances[_id] = new Delegator(element, _id);\n\n  return _delegatorInstances[_id];\n}\n\n\n//# sourceURL=webpack://xin/./core/event.js?");

/***/ }),

/***/ "./core/fn/async.js":
/*!**************************!*\
  !*** ./core/fn/async.js ***!
  \**************************/
/*! exports provided: Async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return Async; });\n/* harmony import */ var _helpers_id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/id-generator */ \"./core/helpers/id-generator.js\");\n\n\nconst nextId = Object(_helpers_id_generator__WEBPACK_IMPORTED_MODULE_0__[\"idGenerator\"])();\n\nconst requestAnimationFrame = (\n  window.requestAnimationFrame || /* istanbul ignore next */\n  window.webkitRequestAnimationFrame || /* istanbul ignore next */\n  window.mozRequestAnimationFrame || /* istanbul ignore next */\n  window.oRequestAnimationFrame || /* istanbul ignore next */\n  window.msRequestAnimationFrame\n);\n\nconst cancelAnimationFrame = (\n  window.cancelAnimationFrame || /* istanbul ignore next */\n  window.webkitCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.webkitCancelAnimationFrame || /* istanbul ignore next */\n  window.mozCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.mozCancelAnimationFrame || /* istanbul ignore next */\n  window.oCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.oCancelAnimationFrame || /* istanbul ignore next */\n  window.msCancelRequestAnimationFrame || /* istanbul ignore next */\n  window.msCancelAnimationFrame\n);\n\nclass Async {\n  static nextFrame (callback) {\n    return requestAnimationFrame(callback);\n  }\n\n  static sleep (wait) {\n    return new Promise(resolve => {\n      setTimeout(() => this.nextFrame(resolve), wait);\n    });\n  }\n\n  static run (callback, wait) {\n    return (new Async()).start(callback, wait);\n  }\n\n  constructor (context) {\n    this.id = nextId();\n    this.context = context;\n    this.cleared = true;\n  }\n\n  start (callback, wait) {\n    if (typeof callback !== 'function') {\n      throw new Error('Async should specify function');\n    }\n\n    if (!this.cleared) {\n      throw new Error('Async already run');\n    }\n\n    this.cleared = false;\n\n    const self = this;\n    const context = this.context;\n    const boundCallback = function () {\n      self.frameHandle = requestAnimationFrame(() => {\n        self.__clear();\n        callback.call(context);\n      });\n    };\n\n    if (wait) {\n      this.handle = setTimeout(boundCallback, wait);\n    } else {\n      boundCallback();\n    }\n  }\n\n  __clear () {\n    this.cleared = true;\n\n    cancelAnimationFrame(~~this.frameHandle);\n    clearTimeout(~~this.handle);\n    this.handle = this.frameHandle = undefined;\n  }\n\n  cancel () {\n    this.__clear();\n  }\n}\n\n\n//# sourceURL=webpack://xin/./core/fn/async.js?");

/***/ }),

/***/ "./core/fn/debounce.js":
/*!*****************************!*\
  !*** ./core/fn/debounce.js ***!
  \*****************************/
/*! exports provided: Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return Debounce; });\n/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async */ \"./core/fn/async.js\");\n\n\nclass Debounce {\n  constructor (context, immediate) {\n    this.context = context;\n    this.immediate = Boolean(immediate);\n    this.async = null;\n    this.running = false;\n  }\n\n  start (callback, wait) {\n    if (this.immediate) {\n      throw new Error('Unimplemented yet!');\n    }\n\n    this.running = true;\n    this.async = new _async__WEBPACK_IMPORTED_MODULE_0__[\"Async\"](this.context);\n    this.async.start(() => {\n      callback.call(this.context);\n      this.running = false;\n      this.async = null;\n    }, wait);\n  }\n\n  cancel () {\n    this.running = false;\n    this.async.cancel();\n    this.async = null;\n  }\n}\n\n\n//# sourceURL=webpack://xin/./core/fn/debounce.js?");

/***/ }),

/***/ "./core/fn/index.js":
/*!**************************!*\
  !*** ./core/fn/index.js ***!
  \**************************/
/*! exports provided: Async, Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async */ \"./core/fn/async.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return _async__WEBPACK_IMPORTED_MODULE_0__[\"Async\"]; });\n\n/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce */ \"./core/fn/debounce.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return _debounce__WEBPACK_IMPORTED_MODULE_1__[\"Debounce\"]; });\n\n\n\n\n\n//# sourceURL=webpack://xin/./core/fn/index.js?");

/***/ }),

/***/ "./core/fx.js":
/*!********************!*\
  !*** ./core/fx.js ***!
  \********************/
/*! exports provided: Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return Fx; });\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event */ \"./core/event.js\");\n/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fn */ \"./core/fn/index.js\");\n\n\n\nclass Fx {\n  static add (name, transition) {\n    adapters[name] = transition;\n  }\n\n  static get (name) {\n    return adapters[name] || adapters.none;\n  }\n\n  constructor (options) {\n    options = options || {};\n    this.element = options.element;\n    this.duration = options.duration || 0;\n    this.transition = options.transition || 'none';\n    this.method = options.method || '';\n\n    this.adapter = options.adapter || Fx.get(this.transition);\n\n    this.running = false;\n    this.direction = 0;\n  }\n\n  async play (direction) {\n    this.running = true;\n    this.direction = direction;\n\n    await this.adapter.play(this);\n  }\n\n  async stop () {\n    await this.adapter.stop(this);\n\n    this.running = false;\n    this.direction = 0;\n  }\n}\n\n// TODO: refactor adapters to each own file\nconst adapters = {\n  none: {\n    async play () {},\n\n    async stop () {},\n  },\n\n  slide: {\n    play (fx) {\n      return new Promise(resolve => {\n        Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(fx.element).once('transitionend', () => {\n          fx.element.classList.remove('trans-slide__animate');\n          resolve();\n        });\n        fx.element.classList.add(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.add('trans-slide__animate');\n          _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => fx.element.classList.add(`trans-slide__${fx.method}`));\n        });\n      });\n    },\n\n    stop (fx) {\n      return new Promise(resolve => {\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.remove(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);\n          fx.element.classList.remove(`trans-slide__${fx.method}`);\n          resolve();\n        });\n      });\n    },\n  },\n\n  fade: {\n    play (fx) {\n      return new Promise(resolve => {\n        Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(fx.element).once('transitionend', () => {\n          resolve();\n        });\n\n        fx.element.classList.add(`trans-fade__${fx.method}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.add(`trans-fade__${fx.method}-animate`);\n        });\n      });\n    },\n\n    stop (fx) {\n      return new Promise(resolve => {\n        fx.element.classList.remove(`trans-fade__${fx.method}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.remove(`trans-fade__${fx.method}-animate`);\n          resolve();\n        });\n      });\n    },\n  },\n};\n\n\n//# sourceURL=webpack://xin/./core/fx.js?");

/***/ }),

/***/ "./core/helpers/deserialize.js":
/*!*************************************!*\
  !*** ./core/helpers/deserialize.js ***!
  \*************************************/
/*! exports provided: deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deserialize\", function() { return deserialize; });\nfunction deserialize (value, type) {\n  switch (type) {\n    case Number:\n      value = Number(value);\n      break;\n\n    case Boolean:\n      value = Boolean(value === '' || value === 'true' || value === '1' || value === 'on');\n      break;\n\n    case Object:\n      try {\n        value = JSON.parse(value);\n      } catch (err) {\n        // allow non-JSON literals like Strings and Numbers\n        console.warn(`Failed decode json: \"${value}\" to Object`);\n      }\n      break;\n\n    case Array:\n      try {\n        value = JSON.parse(value);\n      } catch (err) {\n        console.warn(`Failed decode json: \"${value}\" to Array`);\n        value = null;\n      }\n      break;\n\n    case Date:\n      value = new Date(value);\n      break;\n\n    case RegExp:\n      value = new RegExp(value);\n      break;\n\n    case Function:\n      value = new Function(value); // eslint-disable-line\n      break;\n\n    // behave like default for now\n    // case String:\n    default:\n      break;\n  }\n  return value;\n}\n\n\n//# sourceURL=webpack://xin/./core/helpers/deserialize.js?");

/***/ }),

/***/ "./core/helpers/id-generator.js":
/*!**************************************!*\
  !*** ./core/helpers/id-generator.js ***!
  \**************************************/
/*! exports provided: idGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"idGenerator\", function() { return idGenerator; });\nfunction idGenerator () {\n  let value = 0;\n  return function next () {\n    return value++;\n  };\n}\n\n\n//# sourceURL=webpack://xin/./core/helpers/id-generator.js?");

/***/ }),

/***/ "./core/helpers/index.js":
/*!*******************************!*\
  !*** ./core/helpers/index.js ***!
  \*******************************/
/*! exports provided: idGenerator, deserialize, val */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id-generator */ \"./core/helpers/id-generator.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"idGenerator\", function() { return _id_generator__WEBPACK_IMPORTED_MODULE_0__[\"idGenerator\"]; });\n\n/* harmony import */ var _deserialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deserialize */ \"./core/helpers/deserialize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deserialize\", function() { return _deserialize__WEBPACK_IMPORTED_MODULE_1__[\"deserialize\"]; });\n\n/* harmony import */ var _val__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./val */ \"./core/helpers/val.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"val\", function() { return _val__WEBPACK_IMPORTED_MODULE_2__[\"val\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack://xin/./core/helpers/index.js?");

/***/ }),

/***/ "./core/helpers/val.js":
/*!*****************************!*\
  !*** ./core/helpers/val.js ***!
  \*****************************/
/*! exports provided: val */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"val\", function() { return val; });\nfunction val (value, ...args) {\n  return typeof value === 'function' ? value(...args) : value;\n}\n\n\n//# sourceURL=webpack://xin/./core/helpers/val.js?");

/***/ }),

/***/ "./core/index.js":
/*!***********************!*\
  !*** ./core/index.js ***!
  \***********************/
/*! exports provided: event, Fx, bootstrap, Repository, Async, Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"./core/repository/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"]; });\n\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event */ \"./core/event.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _event__WEBPACK_IMPORTED_MODULE_1__[\"event\"]; });\n\n/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fn */ \"./core/fn/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return _fn__WEBPACK_IMPORTED_MODULE_2__[\"Async\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return _fn__WEBPACK_IMPORTED_MODULE_2__[\"Debounce\"]; });\n\n/* harmony import */ var _fx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fx */ \"./core/fx.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _fx__WEBPACK_IMPORTED_MODULE_3__[\"Fx\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack://xin/./core/index.js?");

/***/ }),

/***/ "./core/repository/bootstrap.js":
/*!**************************************!*\
  !*** ./core/repository/bootstrap.js ***!
  \**************************************/
/*! exports provided: bootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return bootstrap; });\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"./core/repository/repository.js\");\n\n\nfunction bootstrap (data) {\n  return _repository__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"].bootstrap(data);\n}\n\n\n//# sourceURL=webpack://xin/./core/repository/bootstrap.js?");

/***/ }),

/***/ "./core/repository/index.js":
/*!**********************************!*\
  !*** ./core/repository/index.js ***!
  \**********************************/
/*! exports provided: bootstrap, Repository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ \"./core/repository/bootstrap.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _bootstrap__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repository */ \"./core/repository/repository.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _repository__WEBPACK_IMPORTED_MODULE_1__[\"Repository\"]; });\n\n\n\n\n\n//# sourceURL=webpack://xin/./core/repository/index.js?");

/***/ }),

/***/ "./core/repository/repository.js":
/*!***************************************!*\
  !*** ./core/repository/repository.js ***!
  \***************************************/
/*! exports provided: Repository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return Repository; });\nconst debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('xin::core');\n\nclass Repository {\n  static bootstrap (data) {\n    if (window.xin$repository) {\n      window.xin$repository.update(data);\n    } else {\n      window.xin$repository = new Repository(data);\n    }\n\n    return window.xin$repository;\n  }\n\n  static singleton () {\n    if (!window.xin$repository) {\n      Repository.bootstrap();\n    }\n\n    if (typeof window.xin$repository.update !== 'function') {\n      throw new Error('Invalid global xin repository found!');\n    }\n\n    return window.xin$repository;\n  }\n\n  constructor (data = {}) {\n    if (debug.enabled) /* istanbul ignore next */ debug('Repository construct...');\n    this.data = Object.assign({\n      'customElements.version': 'v1',\n    }, data);\n  }\n\n  update (data = {}) {\n    if (debug.enabled) /* istanbul ignore next */ debug('Repository update data...');\n    this.data = Object.assign(this.data, data);\n  }\n\n  get (id) {\n    return this.data[id];\n  }\n\n  put (id, value) {\n    if (value === undefined) {\n      return this.remove(id);\n    }\n    this.data[id] = value;\n  }\n\n  remove (id) {\n    delete this.data[id];\n  }\n}\n\n\n//# sourceURL=webpack://xin/./core/repository/repository.js?");

/***/ }),

/***/ "./core/string/camelize.js":
/*!*********************************!*\
  !*** ./core/string/camelize.js ***!
  \*********************************/
/*! exports provided: camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return camelize; });\nconst camelized = {};\n\nfunction camelize (dash) {\n  const mapped = camelized[dash];\n  if (mapped) {\n    return mapped;\n  }\n  if (dash.indexOf('-') < 0) {\n    camelized[dash] = dash;\n  } else {\n    camelized[dash] = dash.replace(/-([a-z])/g,\n      function (m) {\n        return m[1].toUpperCase();\n      }\n    );\n  }\n\n  return camelized[dash];\n}\n\n\n//# sourceURL=webpack://xin/./core/string/camelize.js?");

/***/ }),

/***/ "./core/string/dashify.js":
/*!********************************!*\
  !*** ./core/string/dashify.js ***!
  \********************************/
/*! exports provided: dashify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dashify\", function() { return dashify; });\nconst dashified = {};\n\nfunction dashify (camel) {\n  const mapped = dashified[camel];\n  if (mapped) {\n    return mapped;\n  }\n  dashified[camel] = camel.replace(/([a-z][A-Z])/g,\n    function (g) {\n      return g[0] + '-' + g[1].toLowerCase();\n    }\n  );\n\n  return dashified[camel];\n}\n\n\n//# sourceURL=webpack://xin/./core/string/dashify.js?");

/***/ }),

/***/ "./core/string/index.js":
/*!******************************!*\
  !*** ./core/string/index.js ***!
  \******************************/
/*! exports provided: dashify, camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dashify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashify */ \"./core/string/dashify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dashify\", function() { return _dashify__WEBPACK_IMPORTED_MODULE_0__[\"dashify\"]; });\n\n/* harmony import */ var _camelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camelize */ \"./core/string/camelize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return _camelize__WEBPACK_IMPORTED_MODULE_1__[\"camelize\"]; });\n\n\n\n\n\n//# sourceURL=webpack://xin/./core/string/index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: components, event, Fx, define, base, Component, bootstrap, Repository, Async, Debounce, Template, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components/index.js\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"components\", function() { return _components__WEBPACK_IMPORTED_MODULE_0__; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ \"./core/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _core__WEBPACK_IMPORTED_MODULE_1__[\"event\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _core__WEBPACK_IMPORTED_MODULE_1__[\"bootstrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _core__WEBPACK_IMPORTED_MODULE_1__[\"Repository\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return _core__WEBPACK_IMPORTED_MODULE_1__[\"Async\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Debounce\", function() { return _core__WEBPACK_IMPORTED_MODULE_1__[\"Debounce\"]; });\n\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ \"./component/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"define\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"base\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"Component\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Template\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"Template\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"Filter\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://xin/./index.js?");

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {/* eslint-env browser */\n\n/**\n * This is the web browser implementation of `debug()`.\n */\n\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = localstorage();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n\t'#0000CC',\n\t'#0000FF',\n\t'#0033CC',\n\t'#0033FF',\n\t'#0066CC',\n\t'#0066FF',\n\t'#0099CC',\n\t'#0099FF',\n\t'#00CC00',\n\t'#00CC33',\n\t'#00CC66',\n\t'#00CC99',\n\t'#00CCCC',\n\t'#00CCFF',\n\t'#3300CC',\n\t'#3300FF',\n\t'#3333CC',\n\t'#3333FF',\n\t'#3366CC',\n\t'#3366FF',\n\t'#3399CC',\n\t'#3399FF',\n\t'#33CC00',\n\t'#33CC33',\n\t'#33CC66',\n\t'#33CC99',\n\t'#33CCCC',\n\t'#33CCFF',\n\t'#6600CC',\n\t'#6600FF',\n\t'#6633CC',\n\t'#6633FF',\n\t'#66CC00',\n\t'#66CC33',\n\t'#9900CC',\n\t'#9900FF',\n\t'#9933CC',\n\t'#9933FF',\n\t'#99CC00',\n\t'#99CC33',\n\t'#CC0000',\n\t'#CC0033',\n\t'#CC0066',\n\t'#CC0099',\n\t'#CC00CC',\n\t'#CC00FF',\n\t'#CC3300',\n\t'#CC3333',\n\t'#CC3366',\n\t'#CC3399',\n\t'#CC33CC',\n\t'#CC33FF',\n\t'#CC6600',\n\t'#CC6633',\n\t'#CC9900',\n\t'#CC9933',\n\t'#CCCC00',\n\t'#CCCC33',\n\t'#FF0000',\n\t'#FF0033',\n\t'#FF0066',\n\t'#FF0099',\n\t'#FF00CC',\n\t'#FF00FF',\n\t'#FF3300',\n\t'#FF3333',\n\t'#FF3366',\n\t'#FF3399',\n\t'#FF33CC',\n\t'#FF33FF',\n\t'#FF6600',\n\t'#FF6633',\n\t'#FF9900',\n\t'#FF9933',\n\t'#FFCC00',\n\t'#FFCC33'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\n// eslint-disable-next-line complexity\nfunction useColors() {\n\t// NB: In an Electron preload script, document will be defined but not fully\n\t// initialized. Since we know we're in Chrome, we'll just detect this case\n\t// explicitly\n\tif (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {\n\t\treturn true;\n\t}\n\n\t// Internet Explorer and Edge do not support colors.\n\tif (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/)) {\n\t\treturn false;\n\t}\n\n\t// Is webkit? http://stackoverflow.com/a/16459606/376773\n\t// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n\treturn (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||\n\t\t// Is firebug? http://stackoverflow.com/a/398120/376773\n\t\t(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||\n\t\t// Is firefox >= v31?\n\t\t// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||\n\t\t// Double check webkit in userAgent just in case we are in a worker\n\t\t(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/));\n}\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n\targs[0] = (this.useColors ? '%c' : '') +\n\t\tthis.namespace +\n\t\t(this.useColors ? ' %c' : ' ') +\n\t\targs[0] +\n\t\t(this.useColors ? '%c ' : ' ') +\n\t\t'+' + module.exports.humanize(this.diff);\n\n\tif (!this.useColors) {\n\t\treturn;\n\t}\n\n\tconst c = 'color: ' + this.color;\n\targs.splice(1, 0, c, 'color: inherit');\n\n\t// The final \"%c\" is somewhat tricky, because there could be other\n\t// arguments passed either before or after the %c, so we need to\n\t// figure out the correct index to insert the CSS into\n\tlet index = 0;\n\tlet lastC = 0;\n\targs[0].replace(/%[a-zA-Z%]/g, match => {\n\t\tif (match === '%%') {\n\t\t\treturn;\n\t\t}\n\t\tindex++;\n\t\tif (match === '%c') {\n\t\t\t// We only are interested in the *last* %c\n\t\t\t// (the user may have provided their own)\n\t\t\tlastC = index;\n\t\t}\n\t});\n\n\targs.splice(lastC, 0, c);\n}\n\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a \"function\".\n *\n * @api public\n */\nfunction log(...args) {\n\t// This hackery is required for IE8/9, where\n\t// the `console.log` function doesn't have 'apply'\n\treturn typeof console === 'object' &&\n\t\tconsole.log &&\n\t\tconsole.log(...args);\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\nfunction save(namespaces) {\n\ttry {\n\t\tif (namespaces) {\n\t\t\texports.storage.setItem('debug', namespaces);\n\t\t} else {\n\t\t\texports.storage.removeItem('debug');\n\t\t}\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\nfunction load() {\n\tlet r;\n\ttry {\n\t\tr = exports.storage.getItem('debug');\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n\n\t// If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n\tif (!r && typeof process !== 'undefined' && 'env' in process) {\n\t\tr = process.env.DEBUG;\n\t}\n\n\treturn r;\n}\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage() {\n\ttry {\n\t\t// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context\n\t\t// The Browser also has localStorage in the global context.\n\t\treturn localStorage;\n\t} catch (error) {\n\t\t// Swallow\n\t\t// XXX (@Qix-) should we be logging these?\n\t}\n}\n\nmodule.exports = __webpack_require__(/*! ./common */ \"./node_modules/debug/src/common.js\")(exports);\n\nconst {formatters} = module.exports;\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nformatters.j = function (v) {\n\ttry {\n\t\treturn JSON.stringify(v);\n\t} catch (error) {\n\t\treturn '[UnexpectedJSONParseError]: ' + error.message;\n\t}\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://xin/./node_modules/debug/src/browser.js?");

/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n */\n\nfunction setup(env) {\n\tcreateDebug.debug = createDebug;\n\tcreateDebug.default = createDebug;\n\tcreateDebug.coerce = coerce;\n\tcreateDebug.disable = disable;\n\tcreateDebug.enable = enable;\n\tcreateDebug.enabled = enabled;\n\tcreateDebug.humanize = __webpack_require__(/*! ms */ \"./node_modules/ms/index.js\");\n\n\tObject.keys(env).forEach(key => {\n\t\tcreateDebug[key] = env[key];\n\t});\n\n\t/**\n\t* Active `debug` instances.\n\t*/\n\tcreateDebug.instances = [];\n\n\t/**\n\t* The currently active debug mode names, and names to skip.\n\t*/\n\n\tcreateDebug.names = [];\n\tcreateDebug.skips = [];\n\n\t/**\n\t* Map of special \"%n\" handling functions, for the debug \"format\" argument.\n\t*\n\t* Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n\t*/\n\tcreateDebug.formatters = {};\n\n\t/**\n\t* Selects a color for a debug namespace\n\t* @param {String} namespace The namespace string for the for the debug instance to be colored\n\t* @return {Number|String} An ANSI color code for the given namespace\n\t* @api private\n\t*/\n\tfunction selectColor(namespace) {\n\t\tlet hash = 0;\n\n\t\tfor (let i = 0; i < namespace.length; i++) {\n\t\t\thash = ((hash << 5) - hash) + namespace.charCodeAt(i);\n\t\t\thash |= 0; // Convert to 32bit integer\n\t\t}\n\n\t\treturn createDebug.colors[Math.abs(hash) % createDebug.colors.length];\n\t}\n\tcreateDebug.selectColor = selectColor;\n\n\t/**\n\t* Create a debugger with the given `namespace`.\n\t*\n\t* @param {String} namespace\n\t* @return {Function}\n\t* @api public\n\t*/\n\tfunction createDebug(namespace) {\n\t\tlet prevTime;\n\n\t\tfunction debug(...args) {\n\t\t\t// Disabled?\n\t\t\tif (!debug.enabled) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tconst self = debug;\n\n\t\t\t// Set `diff` timestamp\n\t\t\tconst curr = Number(new Date());\n\t\t\tconst ms = curr - (prevTime || curr);\n\t\t\tself.diff = ms;\n\t\t\tself.prev = prevTime;\n\t\t\tself.curr = curr;\n\t\t\tprevTime = curr;\n\n\t\t\targs[0] = createDebug.coerce(args[0]);\n\n\t\t\tif (typeof args[0] !== 'string') {\n\t\t\t\t// Anything else let's inspect with %O\n\t\t\t\targs.unshift('%O');\n\t\t\t}\n\n\t\t\t// Apply any `formatters` transformations\n\t\t\tlet index = 0;\n\t\t\targs[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {\n\t\t\t\t// If we encounter an escaped % then don't increase the array index\n\t\t\t\tif (match === '%%') {\n\t\t\t\t\treturn match;\n\t\t\t\t}\n\t\t\t\tindex++;\n\t\t\t\tconst formatter = createDebug.formatters[format];\n\t\t\t\tif (typeof formatter === 'function') {\n\t\t\t\t\tconst val = args[index];\n\t\t\t\t\tmatch = formatter.call(self, val);\n\n\t\t\t\t\t// Now we need to remove `args[index]` since it's inlined in the `format`\n\t\t\t\t\targs.splice(index, 1);\n\t\t\t\t\tindex--;\n\t\t\t\t}\n\t\t\t\treturn match;\n\t\t\t});\n\n\t\t\t// Apply env-specific formatting (colors, etc.)\n\t\t\tcreateDebug.formatArgs.call(self, args);\n\n\t\t\tconst logFn = self.log || createDebug.log;\n\t\t\tlogFn.apply(self, args);\n\t\t}\n\n\t\tdebug.namespace = namespace;\n\t\tdebug.enabled = createDebug.enabled(namespace);\n\t\tdebug.useColors = createDebug.useColors();\n\t\tdebug.color = selectColor(namespace);\n\t\tdebug.destroy = destroy;\n\t\tdebug.extend = extend;\n\t\t// Debug.formatArgs = formatArgs;\n\t\t// debug.rawLog = rawLog;\n\n\t\t// env-specific initialization logic for debug instances\n\t\tif (typeof createDebug.init === 'function') {\n\t\t\tcreateDebug.init(debug);\n\t\t}\n\n\t\tcreateDebug.instances.push(debug);\n\n\t\treturn debug;\n\t}\n\n\tfunction destroy() {\n\t\tconst index = createDebug.instances.indexOf(this);\n\t\tif (index !== -1) {\n\t\t\tcreateDebug.instances.splice(index, 1);\n\t\t\treturn true;\n\t\t}\n\t\treturn false;\n\t}\n\n\tfunction extend(namespace, delimiter) {\n\t\tconst newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);\n\t\tnewDebug.log = this.log;\n\t\treturn newDebug;\n\t}\n\n\t/**\n\t* Enables a debug mode by namespaces. This can include modes\n\t* separated by a colon and wildcards.\n\t*\n\t* @param {String} namespaces\n\t* @api public\n\t*/\n\tfunction enable(namespaces) {\n\t\tcreateDebug.save(namespaces);\n\n\t\tcreateDebug.names = [];\n\t\tcreateDebug.skips = [];\n\n\t\tlet i;\n\t\tconst split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n\t\tconst len = split.length;\n\n\t\tfor (i = 0; i < len; i++) {\n\t\t\tif (!split[i]) {\n\t\t\t\t// ignore empty strings\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tnamespaces = split[i].replace(/\\*/g, '.*?');\n\n\t\t\tif (namespaces[0] === '-') {\n\t\t\t\tcreateDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));\n\t\t\t} else {\n\t\t\t\tcreateDebug.names.push(new RegExp('^' + namespaces + '$'));\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0; i < createDebug.instances.length; i++) {\n\t\t\tconst instance = createDebug.instances[i];\n\t\t\tinstance.enabled = createDebug.enabled(instance.namespace);\n\t\t}\n\t}\n\n\t/**\n\t* Disable debug output.\n\t*\n\t* @return {String} namespaces\n\t* @api public\n\t*/\n\tfunction disable() {\n\t\tconst namespaces = [\n\t\t\t...createDebug.names.map(toNamespace),\n\t\t\t...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)\n\t\t].join(',');\n\t\tcreateDebug.enable('');\n\t\treturn namespaces;\n\t}\n\n\t/**\n\t* Returns true if the given mode name is enabled, false otherwise.\n\t*\n\t* @param {String} name\n\t* @return {Boolean}\n\t* @api public\n\t*/\n\tfunction enabled(name) {\n\t\tif (name[name.length - 1] === '*') {\n\t\t\treturn true;\n\t\t}\n\n\t\tlet i;\n\t\tlet len;\n\n\t\tfor (i = 0, len = createDebug.skips.length; i < len; i++) {\n\t\t\tif (createDebug.skips[i].test(name)) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\tfor (i = 0, len = createDebug.names.length; i < len; i++) {\n\t\t\tif (createDebug.names[i].test(name)) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n\n\t/**\n\t* Convert regexp to namespace\n\t*\n\t* @param {RegExp} regxep\n\t* @return {String} namespace\n\t* @api private\n\t*/\n\tfunction toNamespace(regexp) {\n\t\treturn regexp.toString()\n\t\t\t.substring(2, regexp.toString().length - 2)\n\t\t\t.replace(/\\.\\*\\?$/, '*');\n\t}\n\n\t/**\n\t* Coerce `val`.\n\t*\n\t* @param {Mixed} val\n\t* @return {Mixed}\n\t* @api private\n\t*/\n\tfunction coerce(val) {\n\t\tif (val instanceof Error) {\n\t\t\treturn val.stack || val.message;\n\t\t}\n\t\treturn val;\n\t}\n\n\tcreateDebug.enable(createDebug.load());\n\n\treturn createDebug;\n}\n\nmodule.exports = setup;\n\n\n//# sourceURL=webpack://xin/./node_modules/debug/src/common.js?");

/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isFinite(val)) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'weeks':\n    case 'week':\n    case 'w':\n      return n * w;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (msAbs >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (msAbs >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (msAbs >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return plural(ms, msAbs, d, 'day');\n  }\n  if (msAbs >= h) {\n    return plural(ms, msAbs, h, 'hour');\n  }\n  if (msAbs >= m) {\n    return plural(ms, msAbs, m, 'minute');\n  }\n  if (msAbs >= s) {\n    return plural(ms, msAbs, s, 'second');\n  }\n  return ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, msAbs, n, name) {\n  var isPlural = msAbs >= n * 1.5;\n  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');\n}\n\n\n//# sourceURL=webpack://xin/./node_modules/ms/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://xin/./node_modules/process/browser.js?");

/***/ })

/******/ });
});