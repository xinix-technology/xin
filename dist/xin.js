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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Accessor\", function() { return Accessor; });\n/* harmony import */ var _accessors_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessors/base */ \"../component/accessors/base.js\");\n/* harmony import */ var _accessors_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accessors/attribute */ \"../component/accessors/attribute.js\");\n/* harmony import */ var _accessors_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accessors/text */ \"../component/accessors/text.js\");\n/* harmony import */ var _accessors_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accessors/html */ \"../component/accessors/html.js\");\n/* harmony import */ var _accessors_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accessors/value */ \"../component/accessors/value.js\");\n/* harmony import */ var _accessors_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accessors/class */ \"../component/accessors/class.js\");\n/* harmony import */ var _accessors_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./accessors/style */ \"../component/accessors/style.js\");\n/* harmony import */ var _accessors_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./accessors/property */ \"../component/accessors/property.js\");\n\n\n\n\n\n\n\n\n\nconst Accessor = {\n  get (node, name) {\n    if (node && 'nodeType' in node) {\n      switch (node.nodeType) {\n        case window.Node.ELEMENT_NODE:\n          if (name.endsWith('$')) {\n            return new _accessors_attribute__WEBPACK_IMPORTED_MODULE_1__[\"AttributeAccessor\"](node, name);\n          } else if (name === 'text') {\n            return new _accessors_text__WEBPACK_IMPORTED_MODULE_2__[\"TextAccessor\"](node);\n          } else if (name === 'html') {\n            return new _accessors_html__WEBPACK_IMPORTED_MODULE_3__[\"HTMLAccessor\"](node, name);\n          } else if (name === 'value' && node.nodeName === 'INPUT') {\n            return new _accessors_value__WEBPACK_IMPORTED_MODULE_4__[\"ValueAccessor\"](node);\n          }\n\n          if (name.startsWith('class.')) {\n            return new _accessors_class__WEBPACK_IMPORTED_MODULE_5__[\"ClassAccessor\"](node, name.split('.').splice(1).join('.'));\n          } else if (name.startsWith('style.')) {\n            return new _accessors_style__WEBPACK_IMPORTED_MODULE_6__[\"StyleAccessor\"](node, name.split('.').splice(1).join('.'));\n          }\n\n          return new _accessors_property__WEBPACK_IMPORTED_MODULE_7__[\"PropertyAccessor\"](node, name);\n        case window.Node.TEXT_NODE:\n          if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {\n            return new _accessors_value__WEBPACK_IMPORTED_MODULE_4__[\"ValueAccessor\"](node.parentElement);\n          }\n\n          return new _accessors_text__WEBPACK_IMPORTED_MODULE_2__[\"TextAccessor\"](node);\n        default:\n          throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType}`);\n      }\n    } else {\n      return new _accessors_base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"](node, name);\n    }\n  },\n};\n\n\n//# sourceURL=webpack:///../component/accessor.js?");

/***/ }),

/***/ "../component/accessors/attribute.js":
/*!*******************************************!*\
  !*** ../component/accessors/attribute.js ***!
  \*******************************************/
/*! exports provided: AttributeAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AttributeAccessor\", function() { return AttributeAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass AttributeAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  constructor (node, name) {\n    super(node, name.slice(0, -1));\n  }\n\n  set (value) {\n    if (value) {\n      if (value !== this.node.getAttribute(this.name)) {\n        this.node.setAttribute(this.name, value);\n      }\n    } else {\n      this.node.removeAttribute(this.name);\n    }\n  }\n\n  get () {\n    return this.node.getAttribute(this.name);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/attribute.js?");

/***/ }),

/***/ "../component/accessors/base.js":
/*!**************************************!*\
  !*** ../component/accessors/base.js ***!
  \**************************************/
/*! exports provided: BaseAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseAccessor\", function() { return BaseAccessor; });\nclass BaseAccessor {\n  constructor (node, name) {\n    this.node = node;\n    this.name = name;\n  }\n\n  set (value) {\n    if (typeof this.node.set === 'function') {\n      this.node.set(this.name, value);\n    } else {\n      this.node[this.name] = value;\n    }\n  }\n\n  get () {\n    if (typeof this.node.get === 'function') {\n      return this.node.get(this.name);\n    } else {\n      return this.node[this.name];\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/base.js?");

/***/ }),

/***/ "../component/accessors/class.js":
/*!***************************************!*\
  !*** ../component/accessors/class.js ***!
  \***************************************/
/*! exports provided: ClassAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ClassAccessor\", function() { return ClassAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass ClassAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  set (value) {\n    if (value) {\n      this.node.classList.add(this.name);\n    } else {\n      this.node.classList.remove(this.name);\n    }\n  }\n\n  get () {\n    throw new Error('Unimplemented');\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/class.js?");

/***/ }),

/***/ "../component/accessors/html.js":
/*!**************************************!*\
  !*** ../component/accessors/html.js ***!
  \**************************************/
/*! exports provided: HTMLAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HTMLAccessor\", function() { return HTMLAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass HTMLAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  set (value = '') {\n    this.node.innerHTML = value;\n  }\n\n  get () {\n    return this.node.innerHTML;\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/html.js?");

/***/ }),

/***/ "../component/accessors/property.js":
/*!******************************************!*\
  !*** ../component/accessors/property.js ***!
  \******************************************/
/*! exports provided: PropertyAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PropertyAccessor\", function() { return PropertyAccessor; });\n/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../string */ \"../string/index.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\n\nclass PropertyAccessor extends _base__WEBPACK_IMPORTED_MODULE_1__[\"BaseAccessor\"] {\n  constructor (node, name) {\n    super();\n\n    this.node = node;\n    this.name = Object(_string__WEBPACK_IMPORTED_MODULE_0__[\"camelize\"])(name);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/property.js?");

/***/ }),

/***/ "../component/accessors/style.js":
/*!***************************************!*\
  !*** ../component/accessors/style.js ***!
  \***************************************/
/*! exports provided: StyleAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StyleAccessor\", function() { return StyleAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass StyleAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  set (value = '') {\n    this.node.style[this.name] = value;\n  }\n\n  get () {\n    throw new Error('Unimplemented');\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/style.js?");

/***/ }),

/***/ "../component/accessors/text.js":
/*!**************************************!*\
  !*** ../component/accessors/text.js ***!
  \**************************************/
/*! exports provided: TextAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TextAccessor\", function() { return TextAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass TextAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  constructor (node) {\n    super(node, 'textContent');\n  }\n\n  set (value = '') {\n    if (value !== this.node.textContent) {\n      this.node.textContent = value;\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/text.js?");

/***/ }),

/***/ "../component/accessors/value.js":
/*!***************************************!*\
  !*** ../component/accessors/value.js ***!
  \***************************************/
/*! exports provided: ValueAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ValueAccessor\", function() { return ValueAccessor; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"../component/accessors/base.js\");\n\n\nclass ValueAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__[\"BaseAccessor\"] {\n  constructor (node) {\n    super(node, 'value');\n  }\n\n  set (value = '') {\n    if (document.activeElement !== this.node) {\n      super.set(value);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///../component/accessors/value.js?");

/***/ }),

/***/ "../component/annotation/annotation.js":
/*!*********************************************!*\
  !*** ../component/annotation/annotation.js ***!
  \*********************************************/
/*! exports provided: Annotation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Annotation\", function() { return Annotation; });\nclass Annotation {\n  constructor (model, expr, accessor) {\n    this.model = model;\n    this.expr = expr;\n    this.accessor = accessor;\n  }\n\n  effect (type, value) {\n    if (this.accessor) {\n      this.accessor.set(this.expr.invoke(this.model));\n    } else {\n      this.expr.invoke(this.model);\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Annotation);\n\n\n//# sourceURL=webpack:///../component/annotation/annotation.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return base; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../string */ \"../string/index.js\");\n/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../object */ \"../object/index.js\");\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ \"../component/template.js\");\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expr */ \"../component/expr.js\");\n/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accessor */ \"../component/accessor.js\");\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./annotation */ \"../component/annotation/index.js\");\n/* harmony import */ var _core_fn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/fn */ \"../core/fn/index.js\");\n/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sprintf-js */ \"../node_modules/sprintf-js/src/sprintf.js\");\n/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n\nconst idGenerator = new _core__WEBPACK_IMPORTED_MODULE_0__[\"IdGenerator\"]('component');\nconst baseComponents = {};\n\nfunction base (base) {\n  const repository = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"])();\n\n  if (baseComponents[base]) {\n    return baseComponents[base];\n  }\n\n  let BaseElement;\n  if (repository.get('customElements.version') === 'v1') {\n    BaseElement = window[base];\n  } else {\n    BaseElement = function () {};\n    BaseElement.prototype = Object.create(window[base].prototype);\n  }\n\n  class Component extends BaseElement {\n    constructor () {\n      super();\n\n      this.is = this.nodeName.toLowerCase();\n\n      this.createdCallback();\n    }\n\n    get $ () {\n      return this.__templateHost.getElementsByTagName('*');\n    }\n\n    get props () {\n      return {\n        ref: {\n          type: Object,\n          readonly: true,\n          notify: true,\n        },\n      };\n    }\n\n    created () {}\n\n    ready () {}\n\n    attached () {}\n\n    detached () {}\n\n    createdCallback () {\n      if (this.__repository.get('env.debug')) console.info(`CREATED ${this.is}`);\n\n      this.__id = idGenerator.next();\n\n      this.created();\n\n      this.__initData();\n\n      // move to readyCallback\n      // this.__initProps();\n      //\n      // this.__initListeners();\n      // move to readyCallback\n\n      // move to attachedCallback\n      // this.async(this.readyCallback);\n      // move to attachedCallback\n    }\n\n    readyCallback () {\n      this.__componentReady = true;\n\n      if (this.__repository.get('env.debug')) console.info(`READY ${this.is}`);\n\n      // moved from attachedCallback\n      if (!this.hasAttribute('xin-id')) {\n        // deferred set attributes until connectedCallback\n        this.setAttribute('xin-id', this.__id);\n      }\n      // moved from attachedCallback\n\n      // moved from createdCallback\n      this.__initListeners();\n\n      this.__initTemplate();\n\n      this.__initProps();\n      // moved from createdCallback\n\n      this.__initPropValues();\n\n      let contentFragment;\n\n      if (this.__template) {\n        contentFragment = document.createDocumentFragment();\n        [].slice.call(this.childNodes).forEach(node => {\n          if (node === this.__templateMarker) return;\n          contentFragment.appendChild(node);\n        });\n      }\n\n      this.__templateRender(contentFragment);\n\n      this.ready();\n\n      if (this.__componentAttaching) {\n        this.attachedCallback();\n      }\n    }\n\n    attachedCallback () {\n      this.__repository.put(this.__id, this);\n\n      this.__componentAttaching = true;\n\n      // moved from createdCallback\n      if (!this.__componentReady) {\n        this.async(this.readyCallback);\n        return;\n      }\n      // moved from createdCallback\n\n      // notify default props\n      this.notify('__global');\n      this.notify('__repository');\n      this.notify('__app');\n\n      if (this.__repository.get('env.debug')) console.info(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);\n\n      this.set('ref', this);\n      this.attached();\n\n      this.__componentAttaching = false;\n    }\n\n    detachedCallback () {\n      this.__repository.remove(this.__id);\n\n      this.detached();\n      this.set('ref', null);\n    }\n\n    connectedCallback () {\n      return this.attachedCallback();\n    }\n\n    disconnectedCallback () {\n      return this.detachedCallback();\n    }\n\n    get __app () {\n      if (!this.__app$) {\n        if (this.__appSignature) {\n          this.__app$ = this;\n        } else {\n          let app = this.parentElement;\n          while (app && !app.__appSignature) {\n            app = app.parentElement;\n          }\n          this.__app$ = app;\n        }\n      }\n\n      return this.__app$;\n    }\n\n    get __global () {\n      return window;\n    }\n\n    get __repository () {\n      return repository;\n    }\n\n    __initData () {\n      this.__componentContent = [];\n      this.__componentDebouncers = {};\n      this.__componentNotifiers = {};\n      this.__componentReady = false;\n      this.__componentAttaching = false;\n      this.__componentInitialPropValues = {};\n      this.__componentNotifiedProps = {};\n    }\n\n    __initProps () {\n      let props = this.__getProps();\n      for (let propName in props) {\n        let property = props[propName];\n        let attrName = Object(_string__WEBPACK_IMPORTED_MODULE_1__[\"dashify\"])(propName);\n\n        if ('computed' in property) {\n          let accessor = _accessor__WEBPACK_IMPORTED_MODULE_5__[\"Accessor\"].get(this, propName);\n          let expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].getFn(property.computed, [], true);\n          this.__templateAnnotate(expr, accessor);\n\n          this.__componentInitialPropValues[propName] = () => expr.invoke(this);\n        } else if (this.hasAttribute(attrName)) {\n          let attrVal = this.getAttribute(attrName);\n\n          // copy value from attribute to property\n          // fallback to property.value\n          let expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].get(attrVal);\n          if (expr.type === 's') {\n            this.__componentInitialPropValues[propName] = () => Object(_object__WEBPACK_IMPORTED_MODULE_2__[\"deserialize\"])(attrVal, property.type);\n          } else {\n            if ('notify' in property && expr.mode === '{') {\n              this.__componentNotifiedProps[propName] = true;\n              this.__templateGetBinding(propName).annotate(new _annotation__WEBPACK_IMPORTED_MODULE_6__[\"NotifyAnnotation\"](this, propName));\n            }\n            this.__componentInitialPropValues[propName] = () => expr.invoke(this.__templateModel);\n          }\n        }\n\n        if ('observer' in property) {\n          let expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].getFn(property.observer, [ propName ], true);\n          this.__templateAnnotate(expr);\n        }\n      }\n    }\n\n    __getProps () {\n      if (!this._props) {\n        this._props = this.props;\n      }\n      return this._props;\n    }\n\n    __initPropValues () {\n      let props = this.__getProps();\n\n      for (let propName in props) {\n        let property = props[propName];\n\n        let propValue;\n\n        if (this.__componentInitialPropValues[propName]) {\n          propValue = this.__componentInitialPropValues[propName]();\n        } else {\n          propValue = this[propName];\n        }\n\n        if ('value' in property && isUndefinedPropValue(propName, propValue)) {\n          propValue = Object(_object__WEBPACK_IMPORTED_MODULE_2__[\"val\"])(property.value);\n        }\n\n        // when property is undefined, log error when property is required otherwise assign to default value\n        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {\n          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);\n        }\n\n        // set and force notify for the first time\n        this[propName] = propValue;\n\n        // only notify if propValue already defined otherwise undefined value will be propagated to model\n        if (propValue !== undefined) {\n          this.notify(propName, propValue);\n        }\n      }\n    }\n\n    __isNotified (name) {\n      return (name in this.__componentNotifiedProps);\n    }\n\n    __initTemplate () {\n      let template;\n\n      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE' && !this.firstElementChild.hasAttribute('is')) {\n        // when instance template exist detach from component content\n        template = this.firstElementChild;\n        this.removeChild(template);\n      } else if (this.template) {\n        // create new template based on template property\n        template = document.createElement('template');\n        template.innerHTML = this.template;\n      }\n\n      this.__templateInitialize(template, this);\n    }\n\n    __initListeners () {\n      if (!this.listeners) {\n        return;\n      }\n\n      Object.keys(this.listeners).forEach(key => {\n        let meta = parseListenerMetadata(key);\n        let expr = _expr__WEBPACK_IMPORTED_MODULE_4__[\"Expr\"].getFn(this.listeners[key], [], true);\n        if (meta.selector) {\n          this.on(meta.eventName, meta.selector, evt => {\n            expr.invoke(this, { evt });\n          });\n        } else {\n          this.on(meta.eventName, evt => {\n            expr.invoke(this, { evt });\n          });\n        }\n      });\n    }\n\n    __addNotifier (eventName) {\n      if (this.__componentNotifiers[eventName]) {\n        return;\n      }\n\n      this.__componentNotifiers[eventName] = (evt) => {\n        let element = evt.target;\n\n        if (element.__templateModel !== this) {\n          return;\n        }\n\n        evt.stopImmediatePropagation();\n\n        if ('__componentNotifyKey' in element && '__componentNotifyAccessor' in element) {\n          element.__templateModel.set(element.__componentNotifyKey, element[element.__componentNotifyAccessor]);\n        }\n      };\n\n      this.on(eventName, this.__componentNotifiers[eventName]);\n    }\n\n    __removeNotifier (eventName) {\n      if (!this.__componentNotifiers[eventName]) {\n        return;\n      }\n\n      this.off(eventName, this.__componentNotifiers[eventName]);\n      this.__componentNotifiers[eventName] = null;\n    }\n\n    fire (type, detail, options) {\n      return Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this).fire(type, detail, options);\n    }\n\n    async (callback, waitTime) {\n      return (new _core_fn__WEBPACK_IMPORTED_MODULE_7__[\"Async\"](this)).start(callback, waitTime);\n    }\n\n    debounce (job, callback, wait, immediate) {\n      let debouncer = this.__componentDebouncers[job];\n      if (debouncer && debouncer.running) {\n        debouncer.cancel();\n      } else {\n        debouncer = this.__componentDebouncers[job] = new _core_fn__WEBPACK_IMPORTED_MODULE_7__[\"Debounce\"](this, immediate);\n      }\n      debouncer.start(callback, wait);\n\n      return debouncer;\n    }\n\n    nextFrame (callback) {\n      return _core_fn__WEBPACK_IMPORTED_MODULE_7__[\"Async\"].nextFrame(callback.bind(this));\n    }\n\n    sprintf (...args) {\n      return Object(sprintf_js__WEBPACK_IMPORTED_MODULE_8__[\"sprintf\"])(...args);\n    }\n\n    // T overriden\n    // -------------------------------------------------------------------------\n    //\n\n    __templateAnnotate (expr, accessor) {\n      if (!_template__WEBPACK_IMPORTED_MODULE_3__[\"T\"].prototype.__templateAnnotate.call(this, expr, accessor)) {\n        return false;\n      }\n\n      // register event notifier\n      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof window.HTMLElement) {\n        const node = accessor.node;\n        const nodeName = node.nodeName;\n\n        const startNotify = (name) => {\n          node.__componentNotifyKey = expr.name;\n          node.__componentNotifyAccessor = accessor.name;\n          this.__addNotifier(name);\n        };\n\n        if (nodeName === 'INPUT') {\n          const inputType = node.getAttribute('type');\n          if (inputType === 'radio' || inputType === 'checkbox') {\n            throw new Error('Unimplemented yet');\n          } else {\n            startNotify('input');\n          }\n        } else if (nodeName === 'TEXTAREA') {\n          startNotify('input');\n        } else if (nodeName === 'SELECT') {\n          startNotify('change');\n        }\n      }\n\n      return true;\n    }\n  }\n\n  let tproto = _template__WEBPACK_IMPORTED_MODULE_3__[\"T\"].prototype;\n  for (let key in tproto) {\n    // exclude __templateAnnotate because will be override\n    if (!tproto.hasOwnProperty(key)) {\n      continue;\n    }\n\n    if (key === '$' || key === '__templateAnnotate') {\n      continue;\n    }\n\n    Component.prototype[key] = tproto[key];\n  }\n\n  baseComponents[base] = Component;\n\n  return Component;\n}\n\nfunction parseListenerMetadata (key) {\n  key = key.trim();\n\n  let splitted = key.split(' ');\n  let metadata = {\n    key: key,\n    eventName: splitted[0],\n    selector: splitted[1] ? splitted.slice(1).join(' ') : null,\n  };\n\n  return metadata;\n}\n\nfunction isUndefinedPropValue (propName, propValue) {\n  return propValue === undefined || (propName === 'title' && !propValue);\n}\n\n\n//# sourceURL=webpack:///../component/base.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return define; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n\n\nfunction define (name, Component, options) {\n  const repository = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"])();\n\n  let ElementClass = repository.get(name);\n\n  if (ElementClass) {\n    console.warn(`Duplicate registering ${name}`);\n    return ElementClass;\n  }\n\n  if (repository.get('customElements.version') === 'v1') {\n    // v1 the element class is the component itself\n    ElementClass = Component;\n    window.customElements.define(name, Component, options);\n  } else {\n    let prototype = Object.create(Component.prototype, { is: { value: name } });\n    let ElementPrototype = { prototype };\n\n    if (options && options.extends) {\n      ElementPrototype.extends = options.extends;\n    }\n\n    ElementClass = document.registerElement(name, ElementPrototype);\n  }\n\n  repository.put(name, ElementClass);\n\n  return ElementClass;\n}\n\n\n//# sourceURL=webpack:///../component/define.js?");

/***/ }),

/***/ "../component/expr.js":
/*!****************************!*\
  !*** ../component/expr.js ***!
  \****************************/
/*! exports provided: Expr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Expr\", function() { return Expr; });\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token */ \"../component/token.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ \"../component/filter.js\");\n\n\n\nconst CACHE = {\n  's': {\n    '[': {},\n    '{': {},\n  },\n  'v': {\n    '[': {},\n    '{': {},\n  },\n};\n\nfunction _get (value, mode, type) {\n  let cache = CACHE[type][mode];\n  if (value in cache) {\n    return cache[value];\n  }\n\n  let expr = new Expr(value, mode, type);\n  if (type !== 's') {\n    cache[value] = expr;\n  }\n\n  return expr;\n}\n\nclass Expr {\n  static get CACHE () {\n    return CACHE;\n  }\n\n  static get (value, unwrapped) {\n    value = (value || '').trim();\n\n    if (unwrapped) {\n      return _get(value, '[', 'v');\n    }\n\n    let mode = value[0];\n    if ((mode === '[' || mode === '{') && value[1] === mode) {\n      value = value.slice(2, -2).trim();\n      return _get(value, mode, 'v');\n    }\n\n    return _get(value, '[', 's');\n  }\n\n  static getFn (value, args, unwrapped) {\n    return Expr.get(value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value, unwrapped);\n  }\n\n  static rawTokenize (str) {\n    let count = 0;\n    let tokens = [];\n\n    while (str && count++ < 10) {\n      let matches = str.match(/^\\s*(\"[^\"]*\"|[^,]+),?/);\n\n      str = str.substr(matches[0].length);\n      tokens.push(matches[1].trim());\n    }\n\n    return tokens;\n  }\n\n  static tokenize (str) {\n    return Expr.rawTokenize(str).map(token => _token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(token));\n  }\n\n  constructor (value, mode, type) {\n    // define base properties\n    this.mode = mode;\n    this.type = type;\n    this.name = '';\n    this.args = [];\n    this.filters = [];\n    this.value = value;\n\n    if (type === 's') {\n      return;\n    }\n\n    let tokens = value.split('|');\n    let token = tokens[0].trim();\n\n    this.filters = tokens.slice(1).map(word => {\n      return _filter__WEBPACK_IMPORTED_MODULE_1__[\"Filter\"].get(word.trim());\n    });\n\n    if (token.indexOf('(') < 0) {\n      this.type = 'p';\n      this.name = token;\n      this.args.push(_token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(token));\n    } else {\n      // force mode to '[' when type is !p\n      this.mode = '[';\n      this.type = 'm';\n\n      let matches = token.match(/([^(]+)\\(([^)]*)\\)/);\n\n      this.name = matches[1].trim();\n      this.fn = _token__WEBPACK_IMPORTED_MODULE_0__[\"Token\"].get(this.name);\n\n      this.args = Expr.tokenize(matches[2]);\n    }\n  }\n\n  get constant () {\n    return this.type !== 'm' && this.vpaths.length !== this.args.length;\n  }\n\n  get vpaths () {\n    if (!this._vpaths) {\n      let paths = [];\n      this.args.forEach(arg => {\n        if (arg.type === 'v' && paths.indexOf(arg.name) === -1) {\n          paths.push(arg);\n        }\n      });\n      this._vpaths = paths;\n    }\n\n    return this._vpaths;\n  }\n\n  invoke (context, otherArgs) {\n    if (this.type === 'p') {\n      let val = this.args[0].value(context, otherArgs);\n      return this.filters.reduce((val, filter) => filter.invoke(val), val);\n    }\n\n    let args = this.args.map(arg => {\n      return arg.value(context, otherArgs);\n    });\n\n    return this.fn.invoke(args, context, context.__templateHost);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/expr.js?");

/***/ }),

/***/ "../component/filter.js":
/*!******************************!*\
  !*** ../component/filter.js ***!
  \******************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return Filter; });\nclass Filter {\n  constructor (name, callback, otherArgs) {\n    this.name = name;\n    this.callback = callback;\n    this.otherArgs = otherArgs;\n  }\n\n  invoke (val) {\n    let args = [val];\n    [].push.apply(args, this.otherArgs);\n    return this.callback.apply(null, args);\n  }\n\n  static put (name, callback) {\n    registry[name] = callback;\n  }\n\n  static get (name) {\n    let segments = name.split(':');\n    let args = segments.splice(1);\n    let key = segments.pop();\n\n    if (key in registry === false) {\n      throw new Error(`Filter \"${name}\" not found.`);\n    }\n\n    return new Filter(key, registry[key], args);\n  }\n}\n\nconst registry = {\n  required: val => {\n    if (val === undefined || val === null || val === '') {\n      throw new Error('Value is required');\n    }\n    return val;\n  },\n  string: val => String(val),\n  number: val => Number(val),\n  boolean: val => Boolean(val),\n  default: (val, defVal) => (val || defVal),\n  upper: val => String.prototype.toUpperCase.call(val || ''),\n  lower: val => String.prototype.toLowerCase.call(val || ''),\n  not: val => !val,\n  slice: (val, begin, end) => Array.prototype.slice.call(val || [], begin, end),\n  json: (val, indent) => JSON.stringify(val, null, Number(indent)),\n  consoleTrace: val => console.trace(val), // eslint-disable-line\n  consoleLog: val => console.log(val), // eslint-disable-line\n  consoleInfo: val => console.info(val),\n  consoleWarn: val => console.warn(val),\n  consoleError: val => console.error(val),\n  currency: val => (val || 0).toFixed(2).replace(/(\\d)(?=(\\d{3})+\\.)/g, '$1,'),\n};\n\n\n//# sourceURL=webpack:///../component/filter.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fix\", function() { return fix; });\nfunction fix (template) {\n  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {\n    window.HTMLTemplateElement.decorate(template);\n  }\n  return template;\n};\n\nfunction needFixImportNode () {\n  // console.log('needFixImportNode?');\n  if (document.__importNode) {\n    // already fixed\n    return false;\n  }\n  let template = document.createElement('template');\n  template.innerHTML = '<template>i</template>';\n  let imported = document.importNode(template.content, true);\n  return !imported.firstChild.content.firstChild || imported.firstChild.content.firstChild.textContent !== 'i';\n}\n\nif (needFixImportNode()) {\n  // console.log('fixed importNode');\n  document.__importNode = document.importNode;\n  document.importNode = function (node, deep) {\n    if (!deep) {\n      return document.__importNode(node, deep);\n    }\n\n    let sourceTpls = [].slice.call(node.querySelectorAll('template'));\n    let imported = document.__importNode(node, deep);\n    [].forEach.call(imported.querySelectorAll('template'), (child, i) => {\n      child.innerHTML = sourceTpls[i].innerHTML;\n    });\n\n    return imported;\n  };\n}\n\n\n\n\n//# sourceURL=webpack:///../component/helpers/template.js?");

/***/ }),

/***/ "../component/index.js":
/*!*****************************!*\
  !*** ../component/index.js ***!
  \*****************************/
/*! exports provided: define, base, Component, T, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ \"../component/define.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return _define__WEBPACK_IMPORTED_MODULE_0__[\"define\"]; });\n\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"../component/base.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return _base__WEBPACK_IMPORTED_MODULE_1__[\"base\"]; });\n\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ \"../component/component.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _component__WEBPACK_IMPORTED_MODULE_2__[\"Component\"]; });\n\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ \"../component/template.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return _template__WEBPACK_IMPORTED_MODULE_3__[\"T\"]; });\n\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ \"../component/filter.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _filter__WEBPACK_IMPORTED_MODULE_4__[\"Filter\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../component/index.js?");

/***/ }),

/***/ "../component/template.js":
/*!********************************!*\
  !*** ../component/template.js ***!
  \********************************/
/*! exports provided: T */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return T; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ \"../component/expr.js\");\n/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./binding */ \"../component/binding.js\");\n/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accessor */ \"../component/accessor.js\");\n/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotation */ \"../component/annotation/index.js\");\n/* harmony import */ var _helpers_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/template */ \"../component/helpers/template.js\");\n/* harmony import */ var _helpers_slot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/slot */ \"../component/helpers/slot.js\");\n\n\n\n\n\n\n\n\n\nconst idGenerator = new _core__WEBPACK_IMPORTED_MODULE_0__[\"IdGenerator\"]('template');\n\nfunction T (template, host, marker) {\n  this.__templateInitialize(template, host, marker);\n  this.__templateRender();\n}\n\nT.prototype = {\n  get $ () {\n    return this.__templateHost.getElementsByTagName('*');\n  },\n\n  $$ (selector) {\n    return this.querySelector(selector);\n  },\n\n  promised (eventName, selector) {\n    return new Promise(resolve => {\n      if (selector) {\n        this.once(eventName, selector, resolve);\n      } else {\n        this.once(eventName, resolve);\n      }\n    });\n  },\n\n  on () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).on(...arguments);\n  },\n\n  off () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).off(...arguments);\n  },\n\n  once () {\n    Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.__templateHost || this).once(...arguments);\n  },\n\n  all (obj) {\n    for (let i in obj) {\n      if (obj.hasOwnProperty(i)) {\n        this.set(i, obj[i]);\n      }\n    }\n  },\n\n  get (path) {\n    let object = this;\n\n    this.__templateGetPathAsArray(path).some(segment => {\n      if (object === undefined || object === null) {\n        object = undefined;\n        return true;\n      }\n\n      object = object[segment];\n      return false;\n    });\n\n    return object;\n  },\n\n  set (path, value) {\n    if (typeof path === 'object') {\n      let keys = Object.keys(path);\n      let values = Object.values(path);\n      keys.map((key, i) => {\n        this.set(key, values[i]);\n      });\n      return;\n    }\n\n    path = this.__templateGetPathAsArray(path);\n\n    let oldValue = this.get(path);\n\n    if (value === oldValue) {\n      return;\n    }\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    object[property] = value;\n\n    this.notify(path, value);\n  },\n\n  push (path, ...values) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    let result = object[property].push(...values);\n    this.notify(path, object[property]);\n\n    // let index = object[property].length;\n    // let removed = [];\n    // let addedCount = values.length;\n    // let result = object[property].push(...values);\n    //\n    // object = object[property];\n    //\n    // this.notifySplices(path, [\n    //   { index, removed, addedCount, object, type: 'splice' },\n    // ]);\n\n    return result;\n  },\n\n  pop (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    let result = object[property].pop();\n    this.notify(path, object[property]);\n\n    // let index = object[property].length;\n    // let addedCount = 0;\n    // let result = object[property].pop();\n    // let removed = [ result ];\n    //\n    // object = object[property];\n    //\n    // this.notifySplices(path, [\n    //   { index, removed, addedCount, object, type: 'splice' },\n    // ]);\n\n    return result;\n  },\n\n  splice (path, index, removeCount, ...values) {\n    path = this.__templateGetPathAsArray(path);\n\n    let object = this;\n\n    path.slice(0, -1).forEach(segment => {\n      if (!object) {\n        return;\n      }\n      if (object[segment] === undefined || object[segment] === null) {\n        object[segment] = {};\n      }\n\n      object = object[segment];\n    });\n\n    let property = path.slice(-1).pop();\n\n    if (!Array.isArray(object[property])) {\n      object[property] = [];\n    }\n\n    object[property] = object[property].slice();\n    let result = object[property].splice(index, removeCount, ...values);\n    this.notify(path, object[property]);\n\n    // let addedCount = values.length;\n    // let result = object[property].splice(...values);\n    // let removed = result;\n    //\n    // object = object[property];\n    //\n    // this.notifySplices(path, [\n    //   { index, removed, addedCount, object, type: 'splice' },\n    // ]);\n\n    return result;\n  },\n\n  notify (path, value) {\n    path = this.__templateGetPathAsString(path);\n\n    if (!this.__templateReady) {\n      this.__templateNotifyOnReady = this.__templateNotifyOnReady || [];\n      if (this.__templateNotifyOnReady.indexOf(path) === -1) {\n        this.__templateNotifyOnReady.push(path);\n      }\n      return;\n    }\n\n    let binding = this.__templateGetBinding(path);\n    if (binding) {\n      if (value === undefined) {\n        value = this.get(path);\n      }\n\n      binding.walkEffect('set', value);\n    }\n  },\n\n  // notifySplices (path, splices) {\n  //   path = this.__templateGetPathAsString(path);\n  //\n  //   if (!this.__templateReady) {\n  //     if (this.__templateNotifyOnReady.indexOf(path) === -1) {\n  //       this.__templateNotifyOnReady.push(path);\n  //     }\n  //     return;\n  //   }\n  //\n  //   let binding = this.__templateGetBinding(path);\n  //   if (binding) {\n  //     binding.walkEffect('splice', splices);\n  //   }\n  // },\n\n  __templateInitialize (template, host, marker) {\n    this.__templateId = idGenerator.next();\n    this.__templateBindings = {};\n    this.__templateHost = host || (template ? template.parentElement : null);\n    this.__templateMarker = marker;\n\n    this.__templateReady = false;\n    this.__templateNotifyOnReady = [];\n\n    if (!template) {\n      return;\n    }\n\n    // do below only if template is exists\n    this.__template = Object(_helpers_template__WEBPACK_IMPORTED_MODULE_5__[\"fix\"])(template);\n    this.__templateChildNodes = [];\n\n    this.__templateFragment = document.importNode(this.__template.content, true);\n    this.__parseAnnotations();\n\n    if (marker) {\n      return;\n    }\n\n    if (this.__template.parentElement === this.__templateHost) {\n      // when template parent is template host, it means that template is specific template\n      // then use template as marker\n      this.__templateMarker = this.__template;\n    } else {\n      // when template is not child of host, put marker to host\n      this.__templateMarker = document.createComment(`marker-${this.__templateId}`);\n      this.__templateHost.appendChild(this.__templateMarker);\n    }\n  },\n\n  __templateRender (contentFragment) {\n    this.__templateReady = true;\n\n    this.__templateNotifyOnReady.forEach(key => {\n      this.notify(key, this.get(key));\n    });\n    this.__templateNotifyOnReady = [];\n\n    if (!this.__template) {\n      return;\n    }\n\n    let fragment = this.__templateFragment;\n    this.__templateFragment = null;\n\n    if (contentFragment && contentFragment instanceof window.DocumentFragment) {\n      // try {\n      [].forEach.call(fragment.querySelectorAll('slot'), slot => {\n        let name = Object(_helpers_slot__WEBPACK_IMPORTED_MODULE_6__[\"slotName\"])(slot);\n        let parent = slot.parentElement || fragment;\n        let marker = document.createComment(`slot ${name}`);\n\n        parent.insertBefore(marker, slot);\n        parent.removeChild(slot);\n\n        if (name) {\n          let node = contentFragment.querySelectorAll(`[slot=\"${name}\"]`);\n          [].forEach.call(node, (node) => {\n            parent.insertBefore(node, marker);\n          });\n        } else {\n          parent.insertBefore(contentFragment, marker);\n        }\n      });\n    }\n\n    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);\n  },\n\n  __templateUninitialize () {\n    this.__templateChildNodes.forEach(node => {\n      node.parentElement.removeChild(node);\n    });\n  },\n\n  __templateGetPathAsArray (path) {\n    // if (!path) {\n    //   throw new Error(`Unknown path ${path} to set to ${this.is}`);\n    // }\n\n    if (typeof path !== 'string') {\n      return path;\n    }\n\n    return path.split('.');\n  },\n\n  __templateGetPathAsString (path) {\n    if (typeof path === 'string') {\n      return path;\n    }\n\n    return path.join('.');\n  },\n\n  __parseAnnotations () {\n    this.__templateChildNodes = [ ...this.__templateFragment.childNodes ];\n\n    let len = this.__templateChildNodes.length;\n\n    for (let i = 0; i < len; i++) {\n      let node = this.__templateChildNodes[i];\n\n      switch (node.nodeType) {\n        case window.Node.ELEMENT_NODE:\n          this.__parseElementAnnotations(node);\n          break;\n        case window.Node.TEXT_NODE:\n          this.__parseTextAnnotations(node);\n          break;\n      }\n    }\n  },\n\n  __parseEventAnnotations (element, attrName) {\n    // bind event annotation\n    let attrValue = element.getAttribute(attrName);\n    let eventName = attrName.slice(1, -1);\n    // let eventName = attrName.substr(3);\n    if (eventName === 'tap') {\n      eventName = 'click';\n    }\n\n    let context = this;\n    let expr = _expr__WEBPACK_IMPORTED_MODULE_1__[\"Expr\"].getFn(attrValue, [], true);\n\n    this.on(eventName, element, evt => {\n      expr.invoke(context, { evt });\n    });\n  },\n\n  __parseAttributeAnnotations (element) {\n    // clone attributes to array first then foreach because we will remove\n    // attribute later if already processed\n    // this hack to make sure when attribute removed the attributes index doesnt shift.\n    let annotated = false;\n\n    let len = element.attributes.length;\n\n    for (let i = 0; i < len; i++) {\n      let attr = element.attributes[i];\n\n      let attrName = attr.name;\n\n      if (attrName === 'id' || attrName === 'class' || attrName === 'style') {\n        continue;\n      }\n\n      if (attrName.indexOf('(') === 0) {\n        this.__parseEventAnnotations(element, attrName);\n      } else {\n        // bind property annotation\n        annotated = this.__templateAnnotate(_expr__WEBPACK_IMPORTED_MODULE_1__[\"Expr\"].get(attr.value), _accessor__WEBPACK_IMPORTED_MODULE_3__[\"Accessor\"].get(element, attrName)) || annotated;\n      }\n    }\n\n    return annotated;\n  },\n\n  __parseElementAnnotations (element) {\n    let annotated = false;\n\n    // when element already has template model it means it already parsed, skip\n    // parsing that element\n    if (element.__templateModel) {\n      return annotated;\n    }\n\n    element.__templateModel = this;\n\n    if (element.attributes && element.attributes.length) {\n      annotated = this.__parseAttributeAnnotations(element) || annotated;\n    }\n\n    if (element.childNodes && element.childNodes.length) {\n      let childNodes = [].slice.call(element.childNodes);\n      let childNodesLength = childNodes.length;\n\n      for (let i = 0; i < childNodesLength; i++) {\n        annotated = this.__parseNodeAnnotations(childNodes[i]) || annotated;\n      }\n    }\n\n    [].forEach.call(element.getElementsByTagName('slot'), slot => {\n      [].forEach.call(slot.childNodes, node => {\n        annotated = this.__parseNodeAnnotations(node) || annotated;\n      });\n    });\n\n    return annotated;\n  },\n\n  __parseNodeAnnotations (node) {\n    switch (node.nodeType) {\n      case window.Node.TEXT_NODE:\n        return this.__parseTextAnnotations(node);\n      case window.Node.ELEMENT_NODE:\n        return this.__parseElementAnnotations(node);\n    }\n  },\n\n  __parseTextAnnotations (node) {\n    let expr = _expr__WEBPACK_IMPORTED_MODULE_1__[\"Expr\"].get(node.textContent);\n    let accessor = _accessor__WEBPACK_IMPORTED_MODULE_3__[\"Accessor\"].get(node);\n    return this.__templateAnnotate(expr, accessor);\n  },\n\n  __templateAnnotate (expr, accessor) {\n    if (expr.type === 's') {\n      return false;\n    }\n\n    if (expr.constant) {\n      let val = expr.invoke(this);\n      accessor.set(val);\n      return false;\n    }\n\n    // annotate every paths\n    let annotation = new _annotation__WEBPACK_IMPORTED_MODULE_4__[\"Annotation\"](this, expr, accessor);\n\n    // TODO when the annotation to specific model, expr and accessor already exist\n    // do not reannotate, see repeat@_itemsChanged\n    // if (expr && expr.name === '_itemsChanged') {\n    //   console.log(annotation);\n    // }\n\n    if (expr.type === 'm') {\n      this.__templateGetBinding(expr.fn.name).annotate(annotation);\n    }\n\n    expr.vpaths.forEach(arg => this.__templateGetBinding(arg.name).annotate(annotation));\n\n    return true;\n  },\n\n  __templateGetBinding (path) {\n    let segments = path.split('.');\n    let bindings;\n    let binding;\n\n    for (let i = 0; i < segments.length; i++) {\n      let segment = segments[i];\n\n      bindings = binding ? binding.paths : this.__templateBindings;\n\n      if (!bindings[segment]) {\n        bindings[segment] = new _binding__WEBPACK_IMPORTED_MODULE_2__[\"Binding\"](this, segment);\n      }\n\n      binding = bindings[segment];\n    }\n\n    return binding;\n  },\n};\n\n\n//# sourceURL=webpack:///../component/template.js?");

/***/ }),

/***/ "../component/token.js":
/*!*****************************!*\
  !*** ../component/token.js ***!
  \*****************************/
/*! exports provided: Token */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Token\", function() { return Token; });\nconst CACHE = {};\n\nclass Token {\n  static get CACHE () {\n    return CACHE;\n  }\n\n  static get (name) {\n    if (name in CACHE) {\n      return CACHE[name];\n    }\n\n    let token = new Token(name);\n    CACHE[name] = token;\n    return token;\n  }\n\n  constructor (name) {\n    this.name = name;\n    this.contextName = '';\n    this.baseName = '';\n    this._value = null;\n    this.type = 'v';\n\n    if (!this.name.match(/^[a-zA-Z_]/)) {\n      try {\n        this._value = JSON.parse(this.name);\n        this.type = 's';\n        return;\n      } catch (err) {\n      }\n    }\n\n    if (this.type === 'v') {\n      let nameSegments = this.name.split('.');\n      this.baseName = nameSegments.pop();\n      this.contextName = nameSegments.join('.');\n    }\n  }\n\n  value (...contexts) {\n    if (this.type === 's') {\n      return this._value;\n    }\n\n    for (let context of contexts) {\n      if (!context) {\n        continue;\n      }\n\n      let val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];\n      if (val !== undefined) {\n        return val;\n      }\n    }\n  }\n\n  invoke (args, ...contexts) {\n    if (contexts.length === 0) {\n      throw new Error(`Cannot invoke method ${this.name} of undefined context`);\n    }\n\n    if (this.type === 's') {\n      let [ context ] = contexts;\n      throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);\n    }\n\n    for (let context of contexts) {\n      if (!context) {\n        continue;\n      }\n\n      if (typeof context.get === 'function') {\n        let ctx = this.contextName ? context.get(this.contextName) : context;\n        if (typeof ctx[this.baseName] === 'function') {\n          return ctx[this.baseName](...args);\n        }\n      } else if (typeof context[this.name] === 'function') {\n        return context[this.name].apply(context, args);\n      }\n    }\n\n    let [ context ] = contexts;\n    throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);\n  }\n}\n\n\n//# sourceURL=webpack:///../component/token.js?");

/***/ }),

/***/ "../components/app/app.css":
/*!*********************************!*\
  !*** ../components/app/app.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./app.css */ \"../node_modules/css-loader/index.js!../components/app/app.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../components/app/app.css?");

/***/ }),

/***/ "../components/app/app.js":
/*!********************************!*\
  !*** ../components/app/app.js ***!
  \********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route */ \"../components/app/route.js\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.css */ \"../components/app/app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\nclass App extends _component__WEBPACK_IMPORTED_MODULE_1__[\"Component\"] {\n  get props () {\n    return {\n      title: {\n        type: String,\n        observer: '_titleChanged',\n      },\n\n      manual: {\n        type: Boolean,\n      },\n\n      mode: {\n        type: String,\n        value: 'hash',\n      },\n\n      rootUri: {\n        type: String,\n        value: '/',\n      },\n\n      hash: {\n        type: String,\n        value: '#!',\n      },\n\n      delay: {\n        type: Number,\n        value: 1, // working for safari (delay=1), chrome (delay=0)\n      },\n    };\n  }\n\n  get hashRegexp () {\n    if (!this._hashRegexp || this._hash !== this.hash) {\n      this._hashRegexp = new RegExp(`${this.hash}(.*)$`);\n      this._hash = this.hash;\n    }\n\n    return this._hashRegexp;\n  }\n\n  notFound (fragment) {\n    console.warn(`Route not found: ${fragment}`);\n  }\n\n  _titleChanged (title) {\n    if (title) {\n      document.title = title;\n    }\n  }\n\n  created () {\n    // removed putting app to core scope\n    // put('app', this);\n\n    this.__appSignature = true;\n    this.location = window.location;\n    this.history = window.history;\n\n    // default values\n    this.handlers = [];\n    this.middlewares = [];\n\n    this.__started = false;\n    this.__starting = false;\n\n    this.classList.add('xin-app');\n  }\n\n  attached () {\n    if (this.manual) {\n      return;\n    }\n\n    this.async(() => {\n      this.start();\n    }, this.delay);\n  }\n\n  route (route, callback) {\n    this.handlers.push(new _route__WEBPACK_IMPORTED_MODULE_2__[\"Route\"](route, callback));\n  }\n\n  async start () {\n    if (this.__started || this.__starting) {\n      return;\n    }\n\n    this.__middlewareChainRun = compose(this.middlewares);\n\n    this.__listenNavigation();\n\n    console.info(`Starting ${this.is}:${this.__id} ...`);\n\n    this.__starting = true;\n    let executed = await this.__execute();\n    this.__starting = false;\n\n    if (executed) {\n      console.info(`Started ${this.is}:${this.__id}`);\n\n      this.__started = true;\n\n      this.fire('started');\n    }\n  }\n\n  __listenNavigation () {\n    let callback = () => {\n      this.__execute();\n    };\n\n    if (this.mode === 'history') {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).on('popstate', callback);\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(document).on('click', evt => {\n        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {\n          evt.preventDefault();\n\n          let state = { url: evt.target.getAttribute('href') };\n          this.history.pushState(state, evt.target.innerHTML, evt.target.href);\n\n          callback();\n        }\n      });\n    } else {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).on('hashchange', callback);\n    }\n  }\n\n  get started () {\n    return this.__started || false;\n  }\n\n  getFragmentExecutors (fragment) {\n    return this.handlers.reduce((executors, handler) => {\n      let executor = handler.getExecutorFor(fragment);\n      if (executor) executors.push(executor);\n      return executors;\n    }, []);\n  }\n\n  async __execute () {\n    let fragment = this.getFragment();\n    let context = { app: this, uri: fragment };\n\n    // run middleware chain then execute all executors\n    let willContinue = await this.__middlewareChainRun(context, () => {\n      let executors = this.getFragmentExecutors(context.uri);\n      if (executors.length === 0) {\n        this.notFound(fragment);\n        this.fire('route-not-found', fragment);\n        return;\n      }\n\n      executors.forEach(executor => {\n        executor.handler.callback(executor.args, context);\n      });\n    });\n\n    if (willContinue === false) {\n      return false;\n    }\n\n    this.fire('navigated', context);\n    return true;\n  }\n\n  navigate (path, options) {\n    path = path || '/';\n    options = options || {};\n\n    if (this.mode === 'history') {\n      let url = this.rootUri + path.toString().replace(/\\/$/, '').replace(/^\\//, '');\n      if (this.location.href.replace(this.location.origin, '') !== url) {\n        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);\n        this.__execute();\n      }\n    } else {\n      if (options.replace) {\n        this.location.replace(this.hash + path);\n      } else {\n        this.location.hash = this.hash + path;\n      }\n    }\n    return this;\n  }\n\n  use (middleware) {\n    this.middlewares.push(middleware);\n  }\n\n  getFragment () {\n    try {\n      let fragment;\n      if (this.mode === 'history') {\n        fragment = decodeURI(this.location.pathname + this.location.search);\n        fragment = fragment.replace(/\\?(.*)$/, '');\n        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');\n      } else {\n        let match = this.location.href.match(this.hashRegexp);\n        fragment = match ? match[1] : '';\n      }\n\n      return '/' + fragment.toString().replace(/\\/$/, '').replace(/^\\//, '');\n    } catch (err) {\n      console.error('Fragment is not match any pattern, fallback to /');\n      return '/';\n    }\n  }\n\n  // $back (evt) {\n  //   evt.preventDefault();\n  //   this.history.back();\n  // }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_1__[\"define\"])('xin-app', App);\n\nfunction compose (middlewares) {\n  for (let fn of middlewares) {\n    if (typeof fn !== 'function') {\n      throw new TypeError('Middleware must be composed of functions!');\n    }\n  }\n\n  return (context, next) => {\n    // last called middlewares #\n    let index = -1;\n\n    function dispatch (i) {\n      if (i <= index) {\n        throw new Error('next() called multiple times');\n      }\n\n      index = i;\n      let fn = middlewares[i];\n      if (i === middlewares.length) {\n        fn = next;\n      }\n      if (!fn) {\n        return;\n      }\n\n      return fn(context, () => dispatch(i + 1));\n    }\n\n    return dispatch(0);\n  };\n}\n\n\n//# sourceURL=webpack:///../components/app/app.js?");

/***/ }),

/***/ "../components/app/index.js":
/*!**********************************!*\
  !*** ../components/app/index.js ***!
  \**********************************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"../components/app/app.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return _app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]);\n\n\n//# sourceURL=webpack:///../components/app/index.js?");

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
/*! exports provided: Fixture, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return Fixture; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n\n\nclass Fixture extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  static create (template, data = {}) {\n    const t = `\n      <xin-fixture>\n        <template>\n          ${template}\n        </template>\n      </xin-fixture>\n    `;\n    const d = document.createElement('div');\n    d.innerHTML = t;\n    const fixture = d.querySelector('xin-fixture');\n\n    for (let i in data) {\n      fixture[i] = data[i];\n    }\n\n    document.body.appendChild(fixture);\n\n    return fixture;\n  }\n\n  attached () {\n    super.attached();\n    this.connected = true;\n\n    // delay connected to make sure children is already connected\n    this.async(() => {\n      this.fire('connected');\n    });\n  }\n\n  detached () {\n    super.detached();\n    this.connected = false;\n\n    this.fire('disconnected');\n  }\n\n  dispose () {\n    this.parentElement.removeChild(this);\n    this.connected = false;\n  }\n\n  async waitConnected (timeout) {\n    await new Promise(resolve => {\n      if (this.connected) {\n        resolve();\n      } else {\n        this.once('connected', resolve);\n      }\n    });\n\n    await this.wait(timeout);\n  }\n\n  wait (timeout = 0) {\n    return new Promise(resolve => {\n      this.async(resolve, timeout);\n    });\n  }\n\n  async waitDisconnected (timeout) {\n    await new Promise(resolve => {\n      if (this.connected) {\n        this.once('disconnected', resolve);\n      } else {\n        resolve();\n      }\n    });\n\n    await this.wait(timeout);\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-fixture', Fixture);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Fixture);\n\n\n//# sourceURL=webpack:///../components/fixture.js?");

/***/ }),

/***/ "../components/for/for.css":
/*!*********************************!*\
  !*** ../components/for/for.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./for.css */ \"../node_modules/css-loader/index.js!../components/for/for.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../components/for/for.css?");

/***/ }),

/***/ "../components/for/for.js":
/*!********************************!*\
  !*** ../components/for/for.js ***!
  \********************************/
/*! exports provided: For, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return For; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row */ \"../components/for/row.js\");\n/* harmony import */ var _for_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./for.css */ \"../components/for/for.css\");\n/* harmony import */ var _for_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_for_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nconst FILTER_ALL = () => true;\n\nclass For extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      items: {\n        type: Array,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      as: {\n        type: String,\n        value: 'item',\n      },\n\n      indexAs: {\n        type: String,\n        value: 'index',\n      },\n\n      filter: {\n        type: Function,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      to: {\n        type: String,\n        value: '',\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.rows = [];\n  }\n\n  __initTemplate () {\n    this.__templateFor = this.firstElementChild;\n    if (!this.__templateFor) {\n      throw new Error('Invalid xin-for definition, must be <xin-for items=\"[[items]]\"><template>...</template></xin-for>');\n    }\n    // this.__templateFor.__templateHost = this.__templateHost;\n    this.removeChild(this.__templateFor);\n\n    let marker = this;\n    let toAttr = this.getAttribute('to');\n    if (toAttr) {\n      let container = document.querySelector(toAttr);\n      if (!container) {\n        throw new Error(`xin-for render to unknown element ${toAttr}`);\n      }\n      marker = document.createComment(`marker-for`);\n      container.appendChild(marker);\n    }\n\n    _component__WEBPACK_IMPORTED_MODULE_0__[\"T\"].prototype.__templateInitialize.call(this, null, this, marker);\n  }\n\n  _itemsChanged (items, filter) {\n    this.debounce('_itemsChanged', () => {\n      let len = 0;\n\n      if (items && items.length) {\n        let filter = this.filter || FILTER_ALL;\n        items.filter(filter).forEach((item, index) => {\n          if (this.rows[index]) {\n            this.rows[index].update(item, index);\n          } else {\n            this.rows.push(new _row__WEBPACK_IMPORTED_MODULE_1__[\"Row\"](this.__templateFor, this, item, index));\n          }\n\n          len++;\n        });\n      }\n\n      // move to detach\n      this.rows.splice(len).forEach(row => {\n        row.__templateUninitialize();\n      });\n    });\n  }\n\n  itemForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.as);\n  }\n\n  indexForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.indexAs);\n  }\n\n  modelForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel;\n  }\n}\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-for', For);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (For);\n\n\n//# sourceURL=webpack:///../components/for/for.js?");

/***/ }),

/***/ "../components/for/index.js":
/*!**********************************!*\
  !*** ../components/for/index.js ***!
  \**********************************/
/*! exports provided: For, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for */ \"../components/for/for.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_0__[\"For\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_for__WEBPACK_IMPORTED_MODULE_0__[\"For\"]);\n\n\n//# sourceURL=webpack:///../components/for/index.js?");

/***/ }),

/***/ "../components/for/row.js":
/*!********************************!*\
  !*** ../components/for/row.js ***!
  \********************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Row\", function() { return Row; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n\n\nclass Row extends _component__WEBPACK_IMPORTED_MODULE_0__[\"T\"] {\n  constructor (template, host, item, index) {\n    super();\n\n    // override T constructor\n    this.__templateInitialize(template, host.__templateModel, host.__templateMarker);\n\n    this.is = '$repeat-row';\n    this.__id = this.__templateId;\n\n    this.__repeat = host;\n    this.__repeatAs = host.as;\n    this.__repeatIndexAs = host.indexAs;\n\n    this.__templateChildNodes.forEach(node => {\n      if (node.nodeType === window.Node.ELEMENT_NODE) {\n        node.__repeatModel = this;\n      }\n    });\n\n    this.update(item, index);\n\n    this.__templateRender();\n  }\n\n  get __app () {\n    return this.__templateHost.__app;\n  }\n\n  update (item, index) {\n    this[this.__repeatAs] = item;\n    this[this.__repeatIndexAs] = index;\n    this.notify(this.__repeatAs, item);\n    this.notify(this.__repeatIndexAs, index);\n  }\n\n  set (path, value) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.set(path, value);\n    }\n\n    return this.__templateHost.set(path, value);\n  }\n\n  get (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.get(path);\n    }\n\n    return this.__templateHost.get(path);\n  }\n\n  notify (path, value) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.notify(path, value);\n    }\n\n    return this.__templateHost.notify(path, value);\n  }\n}\n\n\n//# sourceURL=webpack:///../components/for/row.js?");

/***/ }),

/***/ "../components/index.js":
/*!******************************!*\
  !*** ../components/index.js ***!
  \******************************/
/*! exports provided: App, Fixture, Middleware, Pager, For, Repeat, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"../components/app/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return _app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]; });\n\n/* harmony import */ var _fixture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixture */ \"../components/fixture.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return _fixture__WEBPACK_IMPORTED_MODULE_1__[\"Fixture\"]; });\n\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ \"../components/middleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Middleware\", function() { return _middleware__WEBPACK_IMPORTED_MODULE_2__[\"Middleware\"]; });\n\n/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pager */ \"../components/pager/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return _pager__WEBPACK_IMPORTED_MODULE_3__[\"Pager\"]; });\n\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./for */ \"../components/for/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_4__[\"For\"]; });\n\n/* harmony import */ var _repeat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./repeat */ \"../components/repeat.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repeat\", function() { return _repeat__WEBPACK_IMPORTED_MODULE_5__[\"Repeat\"]; });\n\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view */ \"../components/view/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return _view__WEBPACK_IMPORTED_MODULE_6__[\"View\"]; });\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../components/index.js?");

/***/ }),

/***/ "../components/middleware.js":
/*!***********************************!*\
  !*** ../components/middleware.js ***!
  \***********************************/
/*! exports provided: Middleware, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Middleware\", function() { return Middleware; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n\n\nclass Middleware extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  attached () {\n    super.attached();\n\n    this.__app.use(this.callback());\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Middleware);\n\n\n//# sourceURL=webpack:///../components/middleware.js?");

/***/ }),

/***/ "../components/pager/index.js":
/*!************************************!*\
  !*** ../components/pager/index.js ***!
  \************************************/
/*! exports provided: Pager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pager */ \"../components/pager/pager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return _pager__WEBPACK_IMPORTED_MODULE_0__[\"Pager\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_pager__WEBPACK_IMPORTED_MODULE_0__[\"Pager\"]);\n\n\n//# sourceURL=webpack:///../components/pager/index.js?");

/***/ }),

/***/ "../components/pager/pager.css":
/*!*************************************!*\
  !*** ../components/pager/pager.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./pager.css */ \"../node_modules/css-loader/index.js!../components/pager/pager.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../components/pager/pager.css?");

/***/ }),

/***/ "../components/pager/pager.js":
/*!************************************!*\
  !*** ../components/pager/pager.js ***!
  \************************************/
/*! exports provided: Pager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return Pager; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _pager_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pager.css */ \"../components/pager/pager.css\");\n/* harmony import */ var _pager_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pager_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nclass Pager extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  ready () {\n    super.ready();\n\n    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {\n      if ('set' in el) {\n        el.set('index', i);\n      } else {\n        el.setAttribute('index', i);\n      }\n    }\n  }\n\n  setFocus (element) {\n    if (element) {\n      let index = element.index;\n      let oldIndex = this.focused$ ? this.focused$.index : -1;\n      if (oldIndex < index) {\n        this.__transitionForward(this.focused$, element);\n      } else if (oldIndex > index) {\n        this.__transitionBackward(this.focused$, element);\n      }\n    } else if (this.focused$) {\n      this.focused$.setFocus(false);\n    }\n\n    this.focused$ = element;\n  }\n\n  __transitionBackward (prevEl, nextEl) {\n    Promise.all([\n      nextEl.inFx.play(-1),\n      prevEl.outFx.play(-1),\n    ]).then(() => {\n      prevEl.setVisible(false);\n      nextEl.setVisible(true);\n      prevEl.setFocus(false);\n      nextEl.setFocus(true);\n      this.$focused = nextEl;\n\n      nextEl.inFx.stop();\n      prevEl.outFx.stop();\n    });\n  }\n\n  __transitionForward (prevEl, nextEl) {\n    if (prevEl) {\n      Promise.all([\n        nextEl.inFx.play(1),\n        prevEl.outFx.play(1),\n      ]).then(() => {\n        prevEl.setVisible(false);\n        nextEl.setVisible(true);\n        prevEl.setFocus(false);\n        nextEl.setFocus(true);\n        this.$focused = nextEl;\n\n        nextEl.inFx.stop();\n        prevEl.outFx.stop();\n      });\n    } else {\n      let transitionFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n        element: nextEl,\n        transition: 'none',\n      });\n\n      transitionFx.play('in', 1).then(() => {\n        nextEl.setVisible(true);\n        nextEl.setFocus(true);\n        this.$focused = nextEl;\n\n        transitionFx.stop();\n      });\n    }\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-pager', Pager);\n\n\n//# sourceURL=webpack:///../components/pager/pager.js?");

/***/ }),

/***/ "../components/repeat.js":
/*!*******************************!*\
  !*** ../components/repeat.js ***!
  \*******************************/
/*! exports provided: Repeat, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Repeat\", function() { return Repeat; });\n/* harmony import */ var _for_row__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for/row */ \"../components/for/row.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core */ \"../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n\n\n\n\nconst FILTER_ALL = () => true;\n\nclass Repeat extends Object(_component__WEBPACK_IMPORTED_MODULE_2__[\"base\"])('HTMLTemplateElement') {\n  get props () {\n    return Object.assign({}, super.props, {\n      items: {\n        type: Array,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      as: {\n        type: String,\n        value: 'item',\n      },\n\n      indexAs: {\n        type: String,\n        value: 'index',\n      },\n\n      filter: {\n        type: Function,\n        observer: '_itemsChanged(items, filter)',\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"deprecated\"])('components/repeat', 'Please use xin-for instead');\n\n    this.rows = [];\n  }\n\n  __initTemplate () {\n    _component__WEBPACK_IMPORTED_MODULE_2__[\"T\"].prototype.__templateInitialize.call(this, null, this);\n  }\n\n  _itemsChanged (items, filter) {\n    this.debounce('_itemsChanged', () => {\n      let len = 0;\n\n      if (items && items.length) {\n        let filter = this.filter || FILTER_ALL;\n        items.filter(filter).forEach((item, index) => {\n          if (this.rows[index]) {\n            this.rows[index].update(item, index);\n          } else {\n            this.rows.push(new _for_row__WEBPACK_IMPORTED_MODULE_0__[\"Row\"](this, this, item, index));\n          }\n\n          len++;\n        });\n      }\n\n      // move to detach\n      this.rows.splice(len).forEach(row => {\n        row.__templateUninitialize();\n      });\n    });\n  }\n\n  itemForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.as);\n  }\n\n  indexForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.indexAs);\n  }\n\n  modelForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel;\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_2__[\"define\"])('xin-repeat', Repeat, { extends: 'template' });\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Repeat);\n\n\n//# sourceURL=webpack:///../components/repeat.js?");

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

/***/ "../components/view/view.css":
/*!***********************************!*\
  !*** ../components/view/view.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./view.css */ \"../node_modules/css-loader/index.js!../components/view/view.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../components/view/view.css?");

/***/ }),

/***/ "../components/view/view.js":
/*!**********************************!*\
  !*** ../components/view/view.js ***!
  \**********************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _view_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.css */ \"../components/view/view.css\");\n/* harmony import */ var _view_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_view_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nclass View extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    const TRANSITION_IN = this.__repository.get('view.transitionIn') || this.__repository.get('view.transition') || 'slide';\n    const TRANSITION_OUT = this.__repository.get('view.transitionOut') || this.__repository.get('view.transition') || 'fade';\n\n    return Object.assign({}, super.props, {\n      uri: {\n        type: String,\n        required: true,\n      },\n      transitionIn: {\n        type: String,\n        value: TRANSITION_IN,\n      },\n      transitionOut: {\n        type: String,\n        value: TRANSITION_OUT,\n      },\n      index: {\n        type: Number,\n        value: 0,\n      },\n    });\n  }\n\n  focusing () {}\n\n  focused () {}\n\n  blurred () {}\n\n  created () {\n    super.created();\n\n    this.classList.add('xin-view');\n  }\n\n  ready () {\n    super.ready();\n\n    this.inFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n      element: this,\n      transition: this.transitionIn,\n      method: 'in',\n    });\n\n    this.outFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n      element: this,\n      transition: this.transitionOut,\n      method: 'out',\n    });\n  }\n\n  attached () {\n    super.attached();\n\n    this.classList.remove('xin-view--focus');\n    this.classList.remove('xin-view--visible');\n\n    if (!this.__app) {\n      console.warn('Cannot route view to undefined app');\n      return;\n    }\n\n    this.__app.route(this.uri, parameters => {\n      this.focus(parameters);\n    });\n\n    this.fire('routed');\n  }\n\n  async focus (parameters = {}) {\n    this.set('parameters', parameters);\n\n    await this.focusing(parameters);\n    this.fire('focusing', parameters);\n\n    this.async(() => {\n      if ('setFocus' in this.parentElement) {\n        this.parentElement.setFocus(this);\n      } else {\n        this.setVisible(true);\n        this.setFocus(true);\n      }\n    });\n  }\n\n  setVisible (visible) {\n    if (visible) {\n      this.classList.add('xin-view--visible');\n      this.fire('show', { view: this });\n      return;\n    }\n\n    this.classList.remove('xin-view--visible');\n    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));\n\n    this.fire('hide');\n  }\n\n  async setFocus (focus) {\n    if (focus) {\n      this.classList.add('xin-view--focus');\n      await this.focused();\n      this.fire('focus');\n      return;\n    }\n\n    this.classList.remove('xin-view--focus');\n    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--focus'), el => {\n      if ('setFocus' in el.parentElement) {\n        el.parentElement.setFocus(null);\n      } else {\n        el.setFocus(focus);\n      }\n    });\n\n    await this.blurred();\n    this.fire('blur');\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-view', View);\n\n\n//# sourceURL=webpack:///../components/view/view.js?");

/***/ }),

/***/ "../core/deprecated.js":
/*!*****************************!*\
  !*** ../core/deprecated.js ***!
  \*****************************/
/*! exports provided: deprecated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deprecated\", function() { return deprecated; });\nfunction deprecated (module, message) {\n  let longName = module ? `@xinix/xin/${module}` : '@xinix/xin';\n  console.warn(`DEPRECATED: ${longName}, ${message}`);\n}\n\n\n//# sourceURL=webpack:///../core/deprecated.js?");

/***/ }),

/***/ "../core/event.js":
/*!************************!*\
  !*** ../core/event.js ***!
  \************************/
/*! exports provided: event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return event; });\n/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id-generator */ \"../core/id-generator.js\");\n\n\nconst idGenerator = new _id_generator__WEBPACK_IMPORTED_MODULE_0__[\"IdGenerator\"]('event');\n\nlet _matcher;\nlet _level = 0;\nlet _id = 0;\nlet _handlers = {};\nlet _delegatorInstances = {};\n\nfunction _addEvent (delegator, type, callback) {\n  if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {\n    delegator.element.addEventListener(type, callback, { passive: true });\n    return;\n  }\n  // blur and focus do not bubble up but if you use event capturing\n  // then you will get them\n  let useCapture = type === 'blur' || type === 'focus';\n  delegator.element.addEventListener(type, callback, useCapture);\n}\n\nfunction _cancel (evt) {\n  evt.preventDefault();\n  evt.stopPropagation();\n}\n\n/**\n * returns function to use for determining if an element\n * matches a query selector\n *\n * @returns {Function}\n */\nfunction _getMatcher (element) {\n  if (_matcher) {\n    return _matcher;\n  }\n\n  if (element.matches) {\n    _matcher = element.matches;\n    return _matcher;\n  }\n\n  if (element.webkitMatchesSelector) {\n    _matcher = element.webkitMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.mozMatchesSelector) {\n    _matcher = element.mozMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.msMatchesSelector) {\n    _matcher = element.msMatchesSelector;\n    return _matcher;\n  }\n\n  if (element.oMatchesSelector) {\n    _matcher = element.oMatchesSelector;\n    return _matcher;\n  }\n\n  // if it doesn't match a native browser method\n  // fall back to the delegator function\n  _matcher = Delegator.matchesSelector;\n  return _matcher;\n}\n\n/**\n * determines if the specified element matches a given selector\n *\n * @param {Node} element - the element to compare against the selector\n * @param {string} selector\n * @param {Node} boundElement - the element the listener was attached to\n * @returns {void|Node}\n */\nfunction _matchesSelector (element, selector, boundElement) {\n  // no selector means this event was bound directly to this element\n  if (selector === '_root') {\n    return boundElement;\n  }\n\n  // if we have moved up to the element you bound the event to\n  // then we have come too far\n  if (element === boundElement) {\n    return;\n  }\n\n  if (_getMatcher(element).call(element, selector)) {\n    return element;\n  }\n\n  // if this element did not match but has a parent we should try\n  // going up the tree to see if any of the parent elements match\n  // for example if you are looking for a click on an <a> tag but there\n  // is a <span> inside of the a tag that it is the target,\n  // it should still work\n  if (element.parentNode) {\n    _level++;\n    return _matchesSelector(element.parentNode, selector, boundElement);\n  }\n}\n\nfunction _addHandler (delegator, event, selector, callback) {\n  if (!_handlers[delegator.id]) {\n    _handlers[delegator.id] = {};\n  }\n\n  if (!_handlers[delegator.id][event]) {\n    _handlers[delegator.id][event] = {};\n  }\n\n  if (!_handlers[delegator.id][event][selector]) {\n    _handlers[delegator.id][event][selector] = [];\n  }\n\n  _handlers[delegator.id][event][selector].push(callback);\n}\n\nfunction _removeHandler (delegator, event, selector, callback) {\n  // if there are no events tied to this element at all\n  // then don't do anything\n  if (!_handlers[delegator.id]) {\n    return;\n  }\n\n  // if there is no event type specified then remove all events\n  // example: Delegator(element).off()\n  if (!event) {\n    for (let type in _handlers[delegator.id]) {\n      if (_handlers[delegator.id].hasOwnProperty(type)) {\n        _handlers[delegator.id][type] = {};\n      }\n    }\n    return;\n  }\n\n  // if no callback or selector is specified remove all events of this type\n  // example: Delegator(element).off('click')\n  if (!callback && !selector) {\n    _handlers[delegator.id][event] = {};\n    return;\n  }\n\n  // if a selector is specified but no callback remove all events\n  // for this selector\n  // example: Delegator(element).off('click', '.sub-element')\n  if (!callback) {\n    delete _handlers[delegator.id][event][selector];\n    return;\n  }\n\n  // if we have specified an event type, selector, and callback then we\n  // need to make sure there are callbacks tied to this selector to\n  // begin with.  if there aren't then we can stop here\n  if (!_handlers[delegator.id][event][selector]) {\n    return;\n  }\n\n  // if there are then loop through all the callbacks and if we find\n  // one that matches remove it from the array\n  for (let i = 0; i < _handlers[delegator.id][event][selector].length; i++) {\n    if (_handlers[delegator.id][event][selector][i] === callback) {\n      _handlers[delegator.id][event][selector].splice(i, 1);\n      break;\n    }\n  }\n}\n\nfunction _handleEvent (id, e, type) {\n  if (!_handlers[id][type]) {\n    return;\n  }\n\n  let target = e.target || e.srcElement;\n  let selector;\n  let match;\n  let matches = {};\n  let i = 0;\n  let j = 0;\n\n  // find all events that match\n  _level = 0;\n  for (selector in _handlers[id][type]) {\n    if (_handlers[id][type].hasOwnProperty(selector)) {\n      match = _matchesSelector(target, selector, _delegatorInstances[id].element);\n\n      if (match && Delegator.matchesEvent(type, _delegatorInstances[id].element, match, selector === '_root', e)) {\n        _level++;\n        _handlers[id][type][selector].match = match;\n        matches[_level] = _handlers[id][type][selector];\n      }\n    }\n  }\n\n  // stopPropagation() fails to set cancelBubble to true in Webkit\n  // @see http://code.google.com/p/chromium/issues/detail?id=162270\n  e.stopPropagation = function () {\n    e.cancelBubble = true;\n  };\n\n  for (i = 0; i <= _level; i++) {\n    if (matches[i]) {\n      for (j = 0; j < matches[i].length; j++) {\n        if (matches[i][j].call(matches[i].match, e) === false) {\n          Delegator.cancel(e);\n          return;\n        }\n\n        if (e.cancelBubble) {\n          return;\n        }\n      }\n    }\n  }\n}\n\nconst aliases = {};\nconst aliasesDefaultTranslator = name => ([ name ]);\nconst aliasesTranslators = {\n  transitionend (name) {\n    let el = document.createElement('fakeelement');\n    let transitions = {\n      'OTransition': 'oTransitionEnd',\n      'MozTransition': 'transitionend',\n      'WebkitTransition': 'webkitTransitionEnd',\n      'transition': 'transitionend',\n    };\n\n    for (let t in transitions) {\n      if (el.style[t] !== undefined) {\n        return [transitions[t]];\n      }\n    }\n  },\n};\n\nfunction _aliases (name) {\n  let theAliases;\n  if (name in aliases) {\n    theAliases = aliases[name];\n  } else {\n    let translator = aliasesTranslators[name] || aliasesDefaultTranslator;\n    theAliases = translator(name);\n    aliases[name] = theAliases;\n  }\n\n  return theAliases;\n}\n\n/**\n * binds the specified events to the element\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @param {boolean=} remove\n * @returns {Object}\n */\nfunction _bind (events, selector, callback, remove) {\n  // fail silently if you pass null or undefined as an alement\n  // in the Delegator constructor\n  if (!this.element) {\n    return;\n  }\n\n  if (!(events instanceof Array)) {\n    events = [events];\n  }\n\n  if (!callback && typeof (selector) === 'function') {\n    callback = selector;\n    selector = '_root';\n  }\n\n  if (selector instanceof window.Element) {\n    let id;\n    if (selector.hasAttribute('bind-event-id')) {\n      id = selector.getAttribute('bind-event-id');\n    } else {\n      id = idGenerator.next();\n      selector.setAttribute('bind-event-id', id);\n    }\n    selector = `[bind-event-id=\"${id}\"]`;\n  }\n\n  let id = this.id;\n  let i;\n\n  function _getGlobalCallback (type) {\n    return function (e) {\n      _handleEvent(id, e, type);\n    };\n  }\n\n  for (i = 0; i < events.length; i++) {\n    _aliases(events[i]).forEach(alias => {\n      // console.info('> ' + events[i] + ':' + alias);\n      if (remove) {\n        _removeHandler(this, alias, selector, callback);\n        return;\n      }\n\n      if (!_handlers[id] || !_handlers[id][alias]) {\n        Delegator.addEvent(this, alias, _getGlobalCallback(alias));\n      }\n\n      _addHandler(this, alias, selector, callback);\n    });\n  }\n\n  return this;\n}\n\n/**\n * Delegator object constructor\n *\n * @param {Node} element\n */\nfunction Delegator (element, id) {\n  this.element = element;\n  this.id = id;\n}\n\n/**\n * adds an event\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @returns {Object}\n */\nDelegator.prototype.on = function (events, selector, callback) {\n  return _bind.call(this, events, selector, callback);\n};\n\n/**\n * removes an event\n *\n * @param {string|Array} events\n * @param {string} selector\n * @param {Function} callback\n * @returns {Object}\n */\nDelegator.prototype.off = function (events, selector, callback) {\n  return _bind.call(this, events, selector, callback, true);\n};\n\nDelegator.prototype.once = function (events, selector, callback) {\n  if (!callback && typeof (selector) === 'function') {\n    callback = selector;\n    selector = '_root';\n  }\n\n  const proxyCallback = (...args) => {\n    this.off(events, selector, proxyCallback);\n    return callback(...args); // eslint-disable-line standard/no-callback-literal\n  };\n\n  return this.on(events, selector, proxyCallback);\n};\n\nDelegator.prototype.fire = function (type, detail, options) {\n  options = options || {};\n  detail = detail || {};\n\n  let evt;\n  let bubbles = options.bubbles === undefined ? true : options.bubbles;\n  let cancelable = Boolean(options.cancelable);\n\n  switch (type) {\n    case 'click':\n      evt = new window.Event(type, {\n        bubbles: bubbles,\n        cancelable: cancelable,\n        // XXX is it ok to have detail here?\n        detail: detail,\n      });\n\n      // XXX check if without this works on every browsers\n      // evt = document.createEvent('HTMLEvents');\n      // evt.initEvent(type, true, false);\n      break;\n    default:\n      evt = new window.CustomEvent(type, {\n        bubbles: Boolean(bubbles),\n        cancelable: cancelable,\n        detail: detail,\n      });\n      break;\n  }\n\n  this.element.dispatchEvent(evt);\n\n  return evt;\n};\n\nDelegator.matchesSelector = function () {};\nDelegator.cancel = _cancel;\nDelegator.addEvent = _addEvent;\nDelegator.aliases = _aliases;\nDelegator.matchesEvent = function () {\n  return true;\n};\n\nfunction event (element) {\n  // only keep one Delegator instance per node to make sure that\n  // we don't create a ton of new objects if you want to delegate\n  // multiple events from the same node\n  //\n  // for example: event(document).on(...\n  for (let key in _delegatorInstances) {\n    if (_delegatorInstances[key].element === element) {\n      return _delegatorInstances[key];\n    }\n  }\n\n  _id++;\n  _delegatorInstances[_id] = new Delegator(element, _id);\n\n  return _delegatorInstances[_id];\n}\n\n\n//# sourceURL=webpack:///../core/event.js?");

/***/ }),

/***/ "../core/fn/async.js":
/*!***************************!*\
  !*** ../core/fn/async.js ***!
  \***************************/
/*! exports provided: Async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Async\", function() { return Async; });\n/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../id-generator */ \"../core/id-generator.js\");\n\n\nconst idGenerator = new _id_generator__WEBPACK_IMPORTED_MODULE_0__[\"IdGenerator\"]('async');\n\nconst requestAnimationFrame = (\n  window.requestAnimationFrame ||\n  window.webkitRequestAnimationFrame ||\n  window.mozRequestAnimationFrame ||\n  window.oRequestAnimationFrame ||\n  window.msRequestAnimationFrame\n);\n\nconst cancelAnimationFrame = (\n  window.cancelAnimationFrame ||\n  window.webkitCancelRequestAnimationFrame ||\n  window.webkitCancelAnimationFrame ||\n  window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||\n  window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||\n  window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame\n);\n\nclass Async {\n  static nextFrame (callback) {\n    return requestAnimationFrame(callback);\n  }\n\n  static sleep (wait) {\n    return new Promise(resolve => setTimeout(resolve, wait));\n  }\n\n  static run (callback, wait) {\n    return (new Async()).start(callback, wait);\n  }\n\n  constructor (context) {\n    this.id = idGenerator.next();\n    this.context = context || null;\n    this.handle = null;\n    this.frameHandle = null;\n    this.cleared = true;\n  }\n\n  start (callback, wait) {\n    if (typeof callback !== 'function') {\n      throw new Error('Async should specify function');\n    }\n\n    if (!this.cleared) {\n      throw new Error('Async already run');\n    }\n\n    this.cleared = false;\n\n    wait = wait || 0;\n\n    let self = this;\n    let context = this.context;\n    let boundCallback = function () {\n      self.frameHandle = requestAnimationFrame(() => {\n        self.__clear();\n        callback.call(context);\n      });\n    };\n\n    if (wait) {\n      this.handle = setTimeout(boundCallback, wait);\n    } else {\n      boundCallback();\n    }\n  }\n\n  __clear () {\n    this.cleared = true;\n\n    cancelAnimationFrame(~~this.frameHandle);\n    clearTimeout(~~this.handle);\n    this.handle = this.frameHandle = null;\n  }\n\n  cancel () {\n    this.__clear();\n  }\n};\n\n\n//# sourceURL=webpack:///../core/fn/async.js?");

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

/***/ "../core/fx/fx.css":
/*!*************************!*\
  !*** ../core/fx/fx.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./fx.css */ \"../node_modules/css-loader/index.js!../core/fx/fx.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../core/fx/fx.css?");

/***/ }),

/***/ "../core/fx/fx.js":
/*!************************!*\
  !*** ../core/fx/fx.js ***!
  \************************/
/*! exports provided: Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return Fx; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn */ \"../core/fn/index.js\");\n/* harmony import */ var _fx_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fx.css */ \"../core/fx/fx.css\");\n/* harmony import */ var _fx_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fx_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nclass Fx {\n  static add (name, transition) {\n    adapters[name] = transition;\n  }\n\n  static get (name) {\n    return adapters[name] || adapters.none;\n  }\n\n  constructor (options) {\n    options = options || {};\n    this.element = options.element;\n    this.duration = options.duration || 0;\n    this.transition = options.transition || 'none';\n    this.method = options.method || '';\n\n    this.adapter = options.adapter || Fx.get(this.transition);\n\n    this.running = false;\n    this.direction = 0;\n  }\n\n  async play (direction) {\n    this.running = true;\n    this.direction = direction;\n\n    await this.adapter.play(this);\n  }\n\n  async stop () {\n    await this.adapter.stop(this);\n\n    this.running = false;\n    this.direction = 0;\n  }\n}\n\n// TODO: refactor adapters to each own file\nconst adapters = {\n  'none': {\n    async play () {},\n\n    async stop () {},\n  },\n\n  'slide': {\n    play (fx) {\n      return new Promise(resolve => {\n        Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(fx.element).once('transitionend', () => {\n          fx.element.classList.remove('trans-slide__animate');\n          resolve();\n        });\n        fx.element.classList.add(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.add('trans-slide__animate');\n          _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => fx.element.classList.add(`trans-slide__${fx.method}`));\n        });\n      });\n    },\n\n    stop (fx) {\n      return new Promise(resolve => {\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.remove(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);\n          fx.element.classList.remove(`trans-slide__${fx.method}`);\n          resolve();\n        });\n      });\n    },\n  },\n\n  'fade': {\n    play (fx) {\n      return new Promise(resolve => {\n        Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(fx.element).once('transitionend', () => {\n          resolve();\n        });\n\n        fx.element.classList.add(`trans-fade__${fx.method}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.add(`trans-fade__${fx.method}-animate`);\n        });\n      });\n    },\n\n    stop (fx) {\n      return new Promise(resolve => {\n        fx.element.classList.remove(`trans-fade__${fx.method}`);\n\n        _fn__WEBPACK_IMPORTED_MODULE_1__[\"Async\"].nextFrame(() => {\n          fx.element.classList.remove(`trans-fade__${fx.method}-animate`);\n          resolve();\n        });\n      });\n    },\n  },\n};\n\n\n//# sourceURL=webpack:///../core/fx/fx.js?");

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
/*! exports provided: IdGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IdGenerator\", function() { return IdGenerator; });\nclass IdGenerator {\n  constructor (key = '') {\n    this.key = key;\n    this.value = 0;\n  }\n\n  next () {\n    return this.value++;\n  }\n}\n\n\n//# sourceURL=webpack:///../core/id-generator.js?");

/***/ }),

/***/ "../core/index.js":
/*!************************!*\
  !*** ../core/index.js ***!
  \************************/
/*! exports provided: deprecated, IdGenerator, event, bootstrap, getInstance, Repository, Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"../core/repository/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"]; });\n\n/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deprecated */ \"../core/deprecated.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deprecated\", function() { return _deprecated__WEBPACK_IMPORTED_MODULE_1__[\"deprecated\"]; });\n\n/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id-generator */ \"../core/id-generator.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"IdGenerator\", function() { return _id_generator__WEBPACK_IMPORTED_MODULE_2__[\"IdGenerator\"]; });\n\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ \"../core/event.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _event__WEBPACK_IMPORTED_MODULE_3__[\"event\"]; });\n\n/* harmony import */ var _fx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fx */ \"../core/fx/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _fx__WEBPACK_IMPORTED_MODULE_4__[\"Fx\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../core/index.js?");

/***/ }),

/***/ "../core/repository/bootstrap.js":
/*!***************************************!*\
  !*** ../core/repository/bootstrap.js ***!
  \***************************************/
/*! exports provided: bootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return bootstrap; });\n/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ \"../core/repository/repository.js\");\n\n\nfunction bootstrap (data, fallbackScope) {\n  let repository = window.xin;\n  if (repository) {\n    repository.rebootstrap(data, fallbackScope);\n  } else {\n    window.xin = repository = new _repository__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"](data, fallbackScope);\n  }\n  return repository;\n}\n\n\n//# sourceURL=webpack:///../core/repository/bootstrap.js?");

/***/ }),

/***/ "../core/repository/get-instance.js":
/*!******************************************!*\
  !*** ../core/repository/get-instance.js ***!
  \******************************************/
/*! exports provided: getInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return getInstance; });\n/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ \"../core/repository/bootstrap.js\");\n/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../deprecated */ \"../core/deprecated.js\");\n\n\n\nfunction getInstance () {\n  let { xin } = window;\n\n  if (!xin) {\n    xin = Object(_bootstrap__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"])(undefined, window);\n  } else if ('get' in xin === false) {\n    Object(_deprecated__WEBPACK_IMPORTED_MODULE_1__[\"deprecated\"])('', 'Do not use window.xin to set configuration. Please use bootstrap(config) instead.');\n    xin = Object(_bootstrap__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"])(xin, window);\n  }\n\n  return xin;\n}\n\n\n//# sourceURL=webpack:///../core/repository/get-instance.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return Repository; });\nclass Repository {\n  constructor (data = {}, fallbackScope = window) {\n    this.data = Object.assign({\n      'env.debug': false,\n      'customElements.version': 'v1',\n    }, data);\n    this.fallbackScope = fallbackScope;\n  }\n\n  rebootstrap (data = {}, fallbackScope = this.fallbackScope) {\n    console.info('Repository rebootstrapping ...');\n    this.data = Object.assign(this.data, data);\n    this.fallbackScope = fallbackScope;\n  }\n\n  get (id) {\n    if (!isNaN(id)) {\n      return this.data[id];\n    }\n\n    if (id in this.data) {\n      return this.data[id];\n    }\n\n    let idSplitted = id.split('.');\n    let scope = this.fallbackScope;\n    idSplitted.find(function (token) {\n      scope = scope[token];\n      return !scope;\n    });\n\n    return scope;\n  }\n\n  put (id, value) {\n    if (value === undefined) {\n      return this.remove(id);\n    }\n    this.data[id] = value;\n  }\n\n  remove (id) {\n    delete this.data[id];\n  }\n}\n\n\n//# sourceURL=webpack:///../core/repository/repository.js?");

/***/ }),

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! exports provided: deprecated, IdGenerator, event, define, base, Component, T, Filter, bootstrap, getInstance, Repository, Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"../core/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deprecated\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"deprecated\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"IdGenerator\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"IdGenerator\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"event\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bootstrap\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"bootstrap\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getInstance\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"getInstance\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repository\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"Repository\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fx\", function() { return _core__WEBPACK_IMPORTED_MODULE_0__[\"Fx\"]; });\n\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ \"../component/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"define\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"define\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"base\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"base\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"Component\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"T\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Filter\", function() { return _component__WEBPACK_IMPORTED_MODULE_1__[\"Filter\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return LazyView; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ \"../component/index.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components */ \"../components/index.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view */ \"../middlewares/lazy-view/view.js\");\n\n\n\n\n\nclass LazyView extends _components__WEBPACK_IMPORTED_MODULE_2__[\"Middleware\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      loaders: {\n        type: Array,\n        value: () => {\n          if (this.__repository.get('view.loaders')) {\n            return this.__repository.get('view.loaders');\n          }\n\n          if (this.__repository.get('viewLoaders')) {\n            Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"deprecated\"])('', 'Do not use configuration \"viewLoaders\". Please use \"view.loaders\" instead.');\n            return this.__repository.get('viewLoaders');\n          }\n\n          return [];\n        },\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.views = [];\n  }\n\n  attached () {\n    super.attached();\n\n    this.loaders.push({\n      test: /^xin-/,\n      load (view) {\n        if (view.name === 'xin-view') {\n          return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../components/view */ \"../components/view/index.js\"));\n        }\n\n        // TODO: Official view will be only xin-view so there will be no need to have other type views\n        // let name = view.name.match(/^xin-(.+)-view$/)[1];\n        // return import(`../../${name}`);\n      },\n    });\n  }\n\n  get (uri) {\n    let view = this.views.find(view => view.uri === uri);\n    if (view) {\n      return view;\n    }\n\n    return this.views.find(view => {\n      if (view.isStaticRoute && view.uri === uri) {\n        return true;\n      }\n\n      return view.route.getExecutorFor(uri);\n    });\n  }\n\n  put (view) {\n    this.views.push(view);\n  }\n\n  ensure (app, uri) {\n    if (this.views.length === 0) {\n      [].forEach.call(app.querySelectorAll('[lazy-view]'), el => {\n        let loader = this.loaders.find(loader => {\n          return el.nodeName.toLowerCase().match(loader.test);\n        });\n\n        let view = new _view__WEBPACK_IMPORTED_MODULE_3__[\"View\"](this, el, loader);\n        this.put(view);\n      });\n    }\n\n    let view = this.get(uri);\n    if (!view) {\n      throw new Error('Unknown view for ' + uri);\n    }\n\n    return view.load();\n  }\n\n  callback (options) {\n    const self = this;\n    return async function (ctx, next) {\n      await self.ensure(ctx.app, ctx.uri);\n\n      await next();\n    };\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_1__[\"define\"])('xin-lazy-view-middleware', LazyView);\n\n\n//# sourceURL=webpack:///../middlewares/lazy-view/lazy-view.js?");

/***/ }),

/***/ "../middlewares/lazy-view/view.js":
/*!****************************************!*\
  !*** ../middlewares/lazy-view/view.js ***!
  \****************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../core/index.js\");\n/* harmony import */ var _components_app_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/app/route */ \"../components/app/route.js\");\n\n\n\nclass View {\n  constructor (bag, element, loader) {\n    this.name = element.nodeName.toLowerCase();\n    this.uri = element.getAttribute('uri');\n    this.element = element;\n    this.loader = loader;\n    this.route = new _components_app_route__WEBPACK_IMPORTED_MODULE_1__[\"Route\"](this.uri);\n    this.isStaticRoute = _components_app_route__WEBPACK_IMPORTED_MODULE_1__[\"Route\"].isStatic(this.uri);\n    this.bag = bag;\n  }\n\n  get loaded () {\n    if (this._loaded) {\n      return true;\n    }\n\n    const loaded = this.element.classList.contains('xin-view');\n    if (loaded) {\n      this._loaded = true;\n      return true;\n    }\n  }\n\n  load () {\n    return new Promise((resolve, reject) => {\n      if (this.loaded) {\n        return resolve();\n      }\n\n      if (!this.loader) {\n        return reject(new Error(`Cannot lazy load view: ${this.name}`));\n      }\n\n      // use global event helper because element does not created yet at this time\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.element).once('routed', () => {\n        this._loaded = true;\n\n        // FIXME: hack to wait for sub views to be ready before routed\n        if (this.element.querySelector('.xin-view')) {\n          setTimeout(() => resolve(), 300);\n        } else {\n          resolve();\n        }\n      });\n\n      this.loader.load(this);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///../middlewares/lazy-view/view.js?");

/***/ }),

/***/ "../middlewares/title.js":
/*!*******************************!*\
  !*** ../middlewares/title.js ***!
  \*******************************/
/*! exports provided: Title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Title\", function() { return Title; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../component/index.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components */ \"../components/index.js\");\n\n\n\nclass Title extends _components__WEBPACK_IMPORTED_MODULE_1__[\"Middleware\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      defaultTitle: {\n        type: String,\n        value: 'Unknown',\n      },\n    });\n  }\n\n  callback (options) {\n    const self = this;\n    return async function (ctx, next) {\n      ctx.app.once('focus', (evt) => {\n        document.title = evt.target.title || self.defaultTitle;\n      });\n\n      await next();\n    };\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-title-middleware', Title);\n\n\n//# sourceURL=webpack:///../middlewares/title.js?");

/***/ }),

/***/ "../node_modules/css-loader/index.js!../components/app/app.css":
/*!************************************************************!*\
  !*** ../node_modules/css-loader!../components/app/app.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".xin-app {\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///../components/app/app.css?../node_modules/css-loader");

/***/ }),

/***/ "../node_modules/css-loader/index.js!../components/for/for.css":
/*!************************************************************!*\
  !*** ../node_modules/css-loader!../components/for/for.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"xin-for {\\n  display: none;\\n  visibility: hidden;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///../components/for/for.css?../node_modules/css-loader");

/***/ }),

/***/ "../node_modules/css-loader/index.js!../components/pager/pager.css":
/*!****************************************************************!*\
  !*** ../node_modules/css-loader!../components/pager/pager.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"xin-pager {\\n  box-sizing: border-box;\\n  display: block;\\n  position: relative;\\n  overflow: hidden;\\n  height: 100%;\\n}\\n\\nxin-pager .xin-view {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///../components/pager/pager.css?../node_modules/css-loader");

/***/ }),

/***/ "../node_modules/css-loader/index.js!../components/view/view.css":
/*!**************************************************************!*\
  !*** ../node_modules/css-loader!../components/view/view.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".xin-view {\\n  box-sizing: border-box;\\n  display: none;\\n}\\n\\n.xin-view.xin-view--visible {\\n  display: block;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///../components/view/view.css?../node_modules/css-loader");

/***/ }),

/***/ "../node_modules/css-loader/index.js!../core/fx/fx.css":
/*!****************************************************!*\
  !*** ../node_modules/css-loader!../core/fx/fx.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".trans-slide__in-left {\\n  -webkit-transform: translateX(100%);\\n  transform: translateX(100%);\\n  display: block!important;\\n}\\n\\n.trans-slide__in-right {\\n  -webkit-transform: translateX(-100%);\\n  transform: translateX(-100%);\\n  display: block!important;\\n}\\n\\n.trans-slide__out-left,\\n.trans-slide__out-right {\\n  -webkit-transform: translateX(0);\\n  transform: translateX(0);\\n  display: block!important;\\n}\\n\\n.trans-slide__animate {\\n  will-change: transform, -webkit-transform;\\n  -webkit-transition: -webkit-transform ease-out 200ms;\\n  transition: transform ease-out 200ms;\\n  z-index: 999;\\n}\\n\\n.trans-slide__out {\\n  -webkit-transform: translateX(100%);\\n  transform: translateX(100%);\\n}\\n\\n.trans-slide__out.trans-slide__out-left {\\n  -webkit-transform: translateX(-100%);\\n  transform: translateX(-100%);\\n}\\n\\n.trans-slide__in {\\n  -webkit-transform: translateX(0);\\n  transform: translateX(0);\\n}\\n\\n.trans-fade__in,\\n.trans-fade__out {\\n  display: block!important;\\n  opacity: 0;\\n  will-change: opacity;\\n  -webkit-transition: opacity ease-in 200ms;\\n  transition: opacity ease-in 200ms;\\n}\\n\\n.trans-fade__out {\\n  opacity: 1;\\n}\\n\\n.trans-fade__in-animate {\\n  opacity: 1;\\n}\\n\\n.trans-fade__out-animate {\\n  opacity: 0;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///../core/fx/fx.css?../node_modules/css-loader");

/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///../node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "../node_modules/sprintf-js/src/sprintf.js":
/*!*************************************************!*\
  !*** ../node_modules/sprintf-js/src/sprintf.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */\n\n!function() {\n    'use strict'\n\n    var re = {\n        not_string: /[^s]/,\n        not_bool: /[^t]/,\n        not_type: /[^T]/,\n        not_primitive: /[^v]/,\n        number: /[diefg]/,\n        numeric_arg: /[bcdiefguxX]/,\n        json: /[j]/,\n        not_json: /[^j]/,\n        text: /^[^\\x25]+/,\n        modulo: /^\\x25{2}/,\n        placeholder: /^\\x25(?:([1-9]\\d*)\\$|\\(([^\\)]+)\\))?(\\+)?(0|'[^$])?(-)?(\\d+)?(?:\\.(\\d+))?([b-gijostTuvxX])/,\n        key: /^([a-z_][a-z_\\d]*)/i,\n        key_access: /^\\.([a-z_][a-z_\\d]*)/i,\n        index_access: /^\\[(\\d+)\\]/,\n        sign: /^[\\+\\-]/\n    }\n\n    function sprintf(key) {\n        // `arguments` is not an array, but should be fine for this call\n        return sprintf_format(sprintf_parse(key), arguments)\n    }\n\n    function vsprintf(fmt, argv) {\n        return sprintf.apply(null, [fmt].concat(argv || []))\n    }\n\n    function sprintf_format(parse_tree, argv) {\n        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign\n        for (i = 0; i < tree_length; i++) {\n            if (typeof parse_tree[i] === 'string') {\n                output += parse_tree[i]\n            }\n            else if (Array.isArray(parse_tree[i])) {\n                match = parse_tree[i] // convenience purposes only\n                if (match[2]) { // keyword argument\n                    arg = argv[cursor]\n                    for (k = 0; k < match[2].length; k++) {\n                        if (!arg.hasOwnProperty(match[2][k])) {\n                            throw new Error(sprintf('[sprintf] property \"%s\" does not exist', match[2][k]))\n                        }\n                        arg = arg[match[2][k]]\n                    }\n                }\n                else if (match[1]) { // positional argument (explicit)\n                    arg = argv[match[1]]\n                }\n                else { // positional argument (implicit)\n                    arg = argv[cursor++]\n                }\n\n                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {\n                    arg = arg()\n                }\n\n                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {\n                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))\n                }\n\n                if (re.number.test(match[8])) {\n                    is_positive = arg >= 0\n                }\n\n                switch (match[8]) {\n                    case 'b':\n                        arg = parseInt(arg, 10).toString(2)\n                        break\n                    case 'c':\n                        arg = String.fromCharCode(parseInt(arg, 10))\n                        break\n                    case 'd':\n                    case 'i':\n                        arg = parseInt(arg, 10)\n                        break\n                    case 'j':\n                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)\n                        break\n                    case 'e':\n                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()\n                        break\n                    case 'f':\n                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)\n                        break\n                    case 'g':\n                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)\n                        break\n                    case 'o':\n                        arg = (parseInt(arg, 10) >>> 0).toString(8)\n                        break\n                    case 's':\n                        arg = String(arg)\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 't':\n                        arg = String(!!arg)\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 'T':\n                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 'u':\n                        arg = parseInt(arg, 10) >>> 0\n                        break\n                    case 'v':\n                        arg = arg.valueOf()\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 'x':\n                        arg = (parseInt(arg, 10) >>> 0).toString(16)\n                        break\n                    case 'X':\n                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()\n                        break\n                }\n                if (re.json.test(match[8])) {\n                    output += arg\n                }\n                else {\n                    if (re.number.test(match[8]) && (!is_positive || match[3])) {\n                        sign = is_positive ? '+' : '-'\n                        arg = arg.toString().replace(re.sign, '')\n                    }\n                    else {\n                        sign = ''\n                    }\n                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '\n                    pad_length = match[6] - (sign + arg).length\n                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''\n                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)\n                }\n            }\n        }\n        return output\n    }\n\n    var sprintf_cache = Object.create(null)\n\n    function sprintf_parse(fmt) {\n        if (sprintf_cache[fmt]) {\n            return sprintf_cache[fmt]\n        }\n\n        var _fmt = fmt, match, parse_tree = [], arg_names = 0\n        while (_fmt) {\n            if ((match = re.text.exec(_fmt)) !== null) {\n                parse_tree.push(match[0])\n            }\n            else if ((match = re.modulo.exec(_fmt)) !== null) {\n                parse_tree.push('%')\n            }\n            else if ((match = re.placeholder.exec(_fmt)) !== null) {\n                if (match[2]) {\n                    arg_names |= 1\n                    var field_list = [], replacement_field = match[2], field_match = []\n                    if ((field_match = re.key.exec(replacement_field)) !== null) {\n                        field_list.push(field_match[1])\n                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {\n                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {\n                                field_list.push(field_match[1])\n                            }\n                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {\n                                field_list.push(field_match[1])\n                            }\n                            else {\n                                throw new SyntaxError('[sprintf] failed to parse named argument key')\n                            }\n                        }\n                    }\n                    else {\n                        throw new SyntaxError('[sprintf] failed to parse named argument key')\n                    }\n                    match[2] = field_list\n                }\n                else {\n                    arg_names |= 2\n                }\n                if (arg_names === 3) {\n                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')\n                }\n                parse_tree.push(match)\n            }\n            else {\n                throw new SyntaxError('[sprintf] unexpected placeholder')\n            }\n            _fmt = _fmt.substring(match[0].length)\n        }\n        return sprintf_cache[fmt] = parse_tree\n    }\n\n    /**\n     * export to either browser or node.js\n     */\n    /* eslint-disable quote-props */\n    if (true) {\n        exports['sprintf'] = sprintf\n        exports['vsprintf'] = vsprintf\n    }\n    if (typeof window !== 'undefined') {\n        window['sprintf'] = sprintf\n        window['vsprintf'] = vsprintf\n\n        if (true) {\n            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n                return {\n                    'sprintf': sprintf,\n                    'vsprintf': vsprintf\n                }\n            }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n        }\n    }\n    /* eslint-enable quote-props */\n}()\n\n\n//# sourceURL=webpack:///../node_modules/sprintf-js/src/sprintf.js?");

/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target) {\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"../node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertInto + \" \" + options.insertAt.before);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\toptions.attrs.type = \"text/css\";\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\toptions.attrs.type = \"text/css\";\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///../node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///../node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "../object/deserialize.js":
/*!********************************!*\
  !*** ../object/deserialize.js ***!
  \********************************/
/*! exports provided: deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deserialize\", function() { return deserialize; });\nfunction deserialize (value, type) {\n  switch (type) {\n    case Number:\n      value = Number(value);\n      break;\n\n    case Boolean:\n      value = Boolean(value === '' || value === 'true' || value === '1' || value === 'on');\n      break;\n\n    case Object:\n      try {\n        value = JSON.parse(value);\n      } catch (err) {\n        // allow non-JSON literals like Strings and Numbers\n        // console.warn('Failed decode json: \"' + value + '\" to Object');\n      }\n      break;\n\n    case Array:\n      try {\n        value = JSON.parse(value);\n      } catch (err) {\n        // .console.warn('Failed decode json: \"' + value + '\" to Array');\n        value = null;\n      }\n      break;\n\n    case Date:\n      value = new Date(value);\n      break;\n\n    case RegExp:\n      value = new RegExp(value);\n      break;\n\n    case Function:\n      value = new Function(value); // eslint-disable-line\n      break;\n\n    // behave like default for now\n    // case String:\n    default:\n      break;\n  }\n  return value;\n}\n\n\n//# sourceURL=webpack:///../object/deserialize.js?");

/***/ }),

/***/ "../object/index.js":
/*!**************************!*\
  !*** ../object/index.js ***!
  \**************************/
/*! exports provided: val, serialize, deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _val__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./val */ \"../object/val.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"val\", function() { return _val__WEBPACK_IMPORTED_MODULE_0__[\"val\"]; });\n\n/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serialize */ \"../object/serialize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"serialize\", function() { return _serialize__WEBPACK_IMPORTED_MODULE_1__[\"serialize\"]; });\n\n/* harmony import */ var _deserialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deserialize */ \"../object/deserialize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deserialize\", function() { return _deserialize__WEBPACK_IMPORTED_MODULE_2__[\"deserialize\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///../object/index.js?");

/***/ }),

/***/ "../object/serialize.js":
/*!******************************!*\
  !*** ../object/serialize.js ***!
  \******************************/
/*! exports provided: serialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serialize\", function() { return serialize; });\nfunction serialize (value) {\n  switch (typeof value) {\n    case 'boolean':\n      return value ? '' : undefined;\n\n    case 'object':\n      if (value instanceof Date) {\n        return value;\n      } else if (value instanceof RegExp) {\n        return value.toString().slice(1, -1);\n      } else if (value) {\n        try {\n          return JSON.stringify(value);\n        } catch (err) {\n          return '';\n        }\n      }\n      break;\n    default:\n      // noop\n  }\n  return value === null ? undefined : value;\n}\n\n\n//# sourceURL=webpack:///../object/serialize.js?");

/***/ }),

/***/ "../object/val.js":
/*!************************!*\
  !*** ../object/val.js ***!
  \************************/
/*! exports provided: val */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"val\", function() { return val; });\nfunction val (value, ...args) {\n  return typeof value === 'function' ? value(...args) : value;\n};\n\n\n//# sourceURL=webpack:///../object/val.js?");

/***/ }),

/***/ "../string/camelize.js":
/*!*****************************!*\
  !*** ../string/camelize.js ***!
  \*****************************/
/*! exports provided: camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return camelize; });\nlet camelized = {};\n\nfunction camelize (dash) {\n  let mapped = camelized[dash];\n  if (mapped) {\n    return mapped;\n  }\n  if (dash.indexOf('-') < 0) {\n    camelized[dash] = dash;\n  } else {\n    camelized[dash] = dash.replace(/-([a-z])/g,\n      function (m) {\n        return m[1].toUpperCase();\n      }\n    );\n  }\n\n  return camelized[dash];\n}\n\n\n//# sourceURL=webpack:///../string/camelize.js?");

/***/ }),

/***/ "../string/dashify.js":
/*!****************************!*\
  !*** ../string/dashify.js ***!
  \****************************/
/*! exports provided: dashify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dashify\", function() { return dashify; });\nlet dashified = {};\n\nfunction dashify (camel) {\n  let mapped = dashified[camel];\n  if (mapped) {\n    return mapped;\n  }\n  dashified[camel] = camel.replace(/([a-z][A-Z])/g,\n    function (g) {\n      return g[0] + '-' + g[1].toLowerCase();\n    }\n  );\n\n  return dashified[camel];\n}\n\n\n//# sourceURL=webpack:///../string/dashify.js?");

/***/ }),

/***/ "../string/index.js":
/*!**************************!*\
  !*** ../string/index.js ***!
  \**************************/
/*! exports provided: dashify, camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dashify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashify */ \"../string/dashify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dashify\", function() { return _dashify__WEBPACK_IMPORTED_MODULE_0__[\"dashify\"]; });\n\n/* harmony import */ var _camelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camelize */ \"../string/camelize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"camelize\", function() { return _camelize__WEBPACK_IMPORTED_MODULE_1__[\"camelize\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///../string/index.js?");

/***/ }),

/***/ "./xin.js":
/*!****************!*\
  !*** ./xin.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const lib = __webpack_require__(/*! ../ */ \"../index.js\");\nconst xin = lib.getInstance();\nconst proto = Object.getPrototypeOf(xin);\nObject.setPrototypeOf(proto, lib);\n\nxin.component = __webpack_require__(/*! ../components */ \"../components/index.js\");\nxin.middleware = __webpack_require__(/*! ../middlewares */ \"../middlewares/index.js\");\n\n\n//# sourceURL=webpack:///./xin.js?");

/***/ })

/******/ });