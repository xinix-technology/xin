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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist-src/xin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./component/accessor.js":
/*!*******************************!*\
  !*** ./component/accessor.js ***!
  \*******************************/
/*! exports provided: Accessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Accessor", function() { return Accessor; });
/* harmony import */ var _accessors_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessors/base */ "./component/accessors/base.js");
/* harmony import */ var _accessors_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accessors/attribute */ "./component/accessors/attribute.js");
/* harmony import */ var _accessors_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accessors/text */ "./component/accessors/text.js");
/* harmony import */ var _accessors_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accessors/html */ "./component/accessors/html.js");
/* harmony import */ var _accessors_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accessors/value */ "./component/accessors/value.js");
/* harmony import */ var _accessors_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accessors/class */ "./component/accessors/class.js");
/* harmony import */ var _accessors_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./accessors/style */ "./component/accessors/style.js");
/* harmony import */ var _accessors_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./accessors/property */ "./component/accessors/property.js");









const Accessor = {
  get (node, name) {
    if (node && 'nodeType' in node) {
      switch (node.nodeType) {
        case window.Node.ELEMENT_NODE:
          if (name.endsWith('$')) {
            return new _accessors_attribute__WEBPACK_IMPORTED_MODULE_1__["AttributeAccessor"](node, name);
          } else if (name === 'text') {
            return new _accessors_text__WEBPACK_IMPORTED_MODULE_2__["TextAccessor"](node);
          } else if (name === 'html') {
            return new _accessors_html__WEBPACK_IMPORTED_MODULE_3__["HTMLAccessor"](node, name);
          } else if (name === 'value' && node.nodeName === 'INPUT') {
            return new _accessors_value__WEBPACK_IMPORTED_MODULE_4__["ValueAccessor"](node);
          }

          if (name.startsWith('class.')) {
            return new _accessors_class__WEBPACK_IMPORTED_MODULE_5__["ClassAccessor"](node, name.split('.').splice(1).join('.'));
          } else if (name.startsWith('style.')) {
            return new _accessors_style__WEBPACK_IMPORTED_MODULE_6__["StyleAccessor"](node, name.split('.').splice(1).join('.'));
          }

          return new _accessors_property__WEBPACK_IMPORTED_MODULE_7__["PropertyAccessor"](node, name);
        case window.Node.TEXT_NODE:
          if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
            return new _accessors_value__WEBPACK_IMPORTED_MODULE_4__["ValueAccessor"](node.parentElement);
          }

          return new _accessors_text__WEBPACK_IMPORTED_MODULE_2__["TextAccessor"](node);
        default:
          throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType}`);
      }
    } else {
      return new _accessors_base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"](node, name);
    }
  },
};


/***/ }),

/***/ "./component/accessors/attribute.js":
/*!******************************************!*\
  !*** ./component/accessors/attribute.js ***!
  \******************************************/
/*! exports provided: AttributeAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeAccessor", function() { return AttributeAccessor; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");


class AttributeAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
  constructor (node, name) {
    super(node, name.slice(0, -1));
  }

  set (value) {
    if (value) {
      if (value !== this.node.getAttribute(this.name)) {
        this.node.setAttribute(this.name, value);
      }
    } else {
      this.node.removeAttribute(this.name);
    }
  }

  get () {
    return this.node.getAttribute(this.name);
  }
}


/***/ }),

/***/ "./component/accessors/base.js":
/*!*************************************!*\
  !*** ./component/accessors/base.js ***!
  \*************************************/
/*! exports provided: BaseAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAccessor", function() { return BaseAccessor; });
class BaseAccessor {
  constructor (node, name) {
    this.node = node;
    this.name = name;
  }

  set (value) {
    if (typeof this.node.set === 'function') {
      this.node.set(this.name, value);
    } else {
      this.node[this.name] = value;
    }
  }

  get () {
    if (typeof this.node.get === 'function') {
      return this.node.get(this.name);
    } else {
      return this.node[this.name];
    }
  }
}


/***/ }),

/***/ "./component/accessors/class.js":
/*!**************************************!*\
  !*** ./component/accessors/class.js ***!
  \**************************************/
/*! exports provided: ClassAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassAccessor", function() { return ClassAccessor; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");


class ClassAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
  set (value) {
    if (value) {
      this.node.classList.add(this.name);
    } else {
      this.node.classList.remove(this.name);
    }
  }

  get () {
    throw new Error('Unimplemented');
  }
}


/***/ }),

/***/ "./component/accessors/html.js":
/*!*************************************!*\
  !*** ./component/accessors/html.js ***!
  \*************************************/
/*! exports provided: HTMLAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLAccessor", function() { return HTMLAccessor; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");


class HTMLAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
  set (value = '') {
    this.node.innerHTML = value;
  }

  get () {
    return this.node.innerHTML;
  }
}


/***/ }),

/***/ "./component/accessors/property.js":
/*!*****************************************!*\
  !*** ./component/accessors/property.js ***!
  \*****************************************/
/*! exports provided: PropertyAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyAccessor", function() { return PropertyAccessor; });
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../string */ "./string/index.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");



class PropertyAccessor extends _base__WEBPACK_IMPORTED_MODULE_1__["BaseAccessor"] {
  constructor (node, name) {
    super();

    this.node = node;
    this.name = Object(_string__WEBPACK_IMPORTED_MODULE_0__["camelize"])(name);
  }
}


/***/ }),

/***/ "./component/accessors/style.js":
/*!**************************************!*\
  !*** ./component/accessors/style.js ***!
  \**************************************/
/*! exports provided: StyleAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleAccessor", function() { return StyleAccessor; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");


class StyleAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
  set (value = '') {
    this.node.style[this.name] = value;
  }

  get () {
    throw new Error('Unimplemented');
  }
}


/***/ }),

/***/ "./component/accessors/text.js":
/*!*************************************!*\
  !*** ./component/accessors/text.js ***!
  \*************************************/
/*! exports provided: TextAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextAccessor", function() { return TextAccessor; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");


class TextAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
  constructor (node) {
    super(node, 'textContent');
  }

  set (value = '') {
    if (value !== this.node.textContent) {
      this.node.textContent = value;
    }
  }
}


/***/ }),

/***/ "./component/accessors/value.js":
/*!**************************************!*\
  !*** ./component/accessors/value.js ***!
  \**************************************/
/*! exports provided: ValueAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueAccessor", function() { return ValueAccessor; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/accessors/base.js");


class ValueAccessor extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
  constructor (node) {
    super(node, 'value');
  }

  set (value = '') {
    if (document.activeElement !== this.node) {
      super.set(value);
    }
  }
}


/***/ }),

/***/ "./component/annotation/annotation.js":
/*!********************************************!*\
  !*** ./component/annotation/annotation.js ***!
  \********************************************/
/*! exports provided: Annotation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Annotation", function() { return Annotation; });
class Annotation {
  constructor (model, expr, accessor) {
    this.model = model;
    this.expr = expr;
    this.accessor = accessor;
  }

  effect (type, value) {
    if (this.accessor) {
      this.accessor.set(this.expr.invoke(this.model));
    } else {
      this.expr.invoke(this.model);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Annotation);


/***/ }),

/***/ "./component/annotation/index.js":
/*!***************************************!*\
  !*** ./component/annotation/index.js ***!
  \***************************************/
/*! exports provided: Annotation, NotifyAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./annotation */ "./component/annotation/annotation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Annotation", function() { return _annotation__WEBPACK_IMPORTED_MODULE_0__["Annotation"]; });

/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notify */ "./component/annotation/notify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotifyAnnotation", function() { return _notify__WEBPACK_IMPORTED_MODULE_1__["NotifyAnnotation"]; });





/***/ }),

/***/ "./component/annotation/notify.js":
/*!****************************************!*\
  !*** ./component/annotation/notify.js ***!
  \****************************************/
/*! exports provided: NotifyAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifyAnnotation", function() { return NotifyAnnotation; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../expr */ "./component/expr.js");


class NotifyAnnotation {
  constructor (model, name) {
    let expr = _expr__WEBPACK_IMPORTED_MODULE_0__["Expr"].get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect (type, value) {
    this.model.__templateModel.set(this.name, value);
  }
}


/***/ }),

/***/ "./component/base.js":
/*!***************************!*\
  !*** ./component/base.js ***!
  \***************************/
/*! exports provided: base */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base", function() { return base; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./core/index.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../string */ "./string/index.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../object */ "./object/index.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ "./component/template.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expr */ "./component/expr.js");
/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accessor */ "./component/accessor.js");
/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./annotation */ "./component/annotation/index.js");
/* harmony import */ var _core_fn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/fn */ "./core/fn/index.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sprintf-js */ "./node_modules/sprintf-js/src/sprintf.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_8__);










const idGenerator = new _core__WEBPACK_IMPORTED_MODULE_0__["IdGenerator"]('component');
const baseComponents = {};

function base (base) {
  const repository = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getInstance"])();

  if (baseComponents[base]) {
    return baseComponents[base];
  }

  let BaseElement;
  if (repository.get('customElements.version') === 'v1') {
    BaseElement = window[base];
  } else {
    BaseElement = function () {};
    BaseElement.prototype = Object.create(window[base].prototype);
  }

  class Component extends BaseElement {
    constructor () {
      super();

      this.is = this.nodeName.toLowerCase();

      this.createdCallback();
    }

    get $ () {
      return this.__templateHost.getElementsByTagName('*');
    }

    get props () {
      return {
        ref: {
          type: Object,
          readonly: true,
          notify: true,
        },
      };
    }

    created () {}

    ready () {}

    attached () {}

    detached () {}

    createdCallback () {
      if (this.__repository.get('env.debug')) console.info(`CREATED ${this.is}`);

      this.__id = idGenerator.next();

      this.created();

      this.__initData();

      // move to readyCallback
      // this.__initProps();
      //
      // this.__initListeners();
      // move to readyCallback

      // move to attachedCallback
      // this.async(this.readyCallback);
      // move to attachedCallback
    }

    readyCallback () {
      this.__componentReady = true;

      if (this.__repository.get('env.debug')) console.info(`READY ${this.is}`);

      // moved from attachedCallback
      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until connectedCallback
        this.setAttribute('xin-id', this.__id);
      }
      // moved from attachedCallback

      // moved from createdCallback
      this.__initListeners();

      this.__initTemplate();

      this.__initProps();
      // moved from createdCallback

      this.__initPropValues();

      let contentFragment;

      if (this.__template) {
        contentFragment = document.createDocumentFragment();
        [].slice.call(this.childNodes).forEach(node => {
          if (node === this.__templateMarker) return;
          contentFragment.appendChild(node);
        });
      }

      this.__templateRender(contentFragment);

      this.ready();

      if (this.__componentAttaching) {
        this.attachedCallback();
      }
    }

    attachedCallback () {
      this.__repository.put(this.__id, this);

      this.__componentAttaching = true;

      // moved from createdCallback
      if (!this.__componentReady) {
        this.async(this.readyCallback);
        return;
      }
      // moved from createdCallback

      // notify default props
      this.notify('__global');
      this.notify('__repository');
      this.notify('__app');

      if (this.__repository.get('env.debug')) console.info(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

      this.set('ref', this);
      this.attached();

      this.__componentAttaching = false;
    }

    detachedCallback () {
      this.__repository.remove(this.__id);

      this.detached();
      this.set('ref', null);
    }

    connectedCallback () {
      return this.attachedCallback();
    }

    disconnectedCallback () {
      return this.detachedCallback();
    }

    get __app () {
      if (!this.__app$) {
        if (this.__appSignature) {
          this.__app$ = this;
        } else {
          let app = this.parentElement;
          while (app && !app.__appSignature) {
            app = app.parentElement;
          }
          this.__app$ = app;
        }
      }

      return this.__app$;
    }

    get __global () {
      return window;
    }

    get __repository () {
      return repository;
    }

    __initData () {
      this.__componentContent = [];
      this.__componentDebouncers = {};
      this.__componentNotifiers = {};
      this.__componentReady = false;
      this.__componentAttaching = false;
      this.__componentInitialPropValues = {};
      this.__componentNotifiedProps = {};
    }

    __initProps () {
      let props = this.__getProps();
      for (let propName in props) {
        let property = props[propName];
        let attrName = Object(_string__WEBPACK_IMPORTED_MODULE_1__["dashify"])(propName);

        if ('computed' in property) {
          let accessor = _accessor__WEBPACK_IMPORTED_MODULE_5__["Accessor"].get(this, propName);
          let expr = _expr__WEBPACK_IMPORTED_MODULE_4__["Expr"].getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          this.__componentInitialPropValues[propName] = () => expr.invoke(this);
        } else if (this.hasAttribute(attrName)) {
          let attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          let expr = _expr__WEBPACK_IMPORTED_MODULE_4__["Expr"].get(attrVal);
          if (expr.type === 's') {
            this.__componentInitialPropValues[propName] = () => Object(_object__WEBPACK_IMPORTED_MODULE_2__["deserialize"])(attrVal, property.type);
          } else {
            if ('notify' in property && expr.mode === '{') {
              this.__componentNotifiedProps[propName] = true;
              this.__templateGetBinding(propName).annotate(new _annotation__WEBPACK_IMPORTED_MODULE_6__["NotifyAnnotation"](this, propName));
            }
            this.__componentInitialPropValues[propName] = () => expr.invoke(this.__templateModel);
          }
        }

        if ('observer' in property) {
          let expr = _expr__WEBPACK_IMPORTED_MODULE_4__["Expr"].getFn(property.observer, [ propName ], true);
          this.__templateAnnotate(expr);
        }
      }
    }

    __getProps () {
      if (!this._props) {
        this._props = this.props;
      }
      return this._props;
    }

    __initPropValues () {
      let props = this.__getProps();

      for (let propName in props) {
        let property = props[propName];

        let propValue;

        if (this.__componentInitialPropValues[propName]) {
          propValue = this.__componentInitialPropValues[propName]();
        } else {
          propValue = this[propName];
        }

        if ('value' in property && isUndefinedPropValue(propName, propValue)) {
          propValue = Object(_object__WEBPACK_IMPORTED_MODULE_2__["val"])(property.value);
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);
        }

        // set and force notify for the first time
        this[propName] = propValue;

        // only notify if propValue already defined otherwise undefined value will be propagated to model
        if (propValue !== undefined) {
          this.notify(propName, propValue);
        }
      }
    }

    __isNotified (name) {
      return (name in this.__componentNotifiedProps);
    }

    __initTemplate () {
      let template;

      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE' && !this.firstElementChild.hasAttribute('is')) {
        // when instance template exist detach from component content
        template = this.firstElementChild;
        this.removeChild(template);
      } else if (this.template) {
        // create new template based on template property
        template = document.createElement('template');
        template.innerHTML = this.template;
      }

      this.__templateInitialize(template, this);
    }

    __initListeners () {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        let meta = parseListenerMetadata(key);
        let expr = _expr__WEBPACK_IMPORTED_MODULE_4__["Expr"].getFn(this.listeners[key], [], true);
        if (meta.selector) {
          this.on(meta.eventName, meta.selector, evt => {
            expr.invoke(this, { evt });
          });
        } else {
          this.on(meta.eventName, evt => {
            expr.invoke(this, { evt });
          });
        }
      });
    }

    __addNotifier (eventName) {
      if (this.__componentNotifiers[eventName]) {
        return;
      }

      this.__componentNotifiers[eventName] = (evt) => {
        let element = evt.target;

        if (element.__templateModel !== this) {
          return;
        }

        evt.stopImmediatePropagation();

        if ('__componentNotifyKey' in element && '__componentNotifyAccessor' in element) {
          element.__templateModel.set(element.__componentNotifyKey, element[element.__componentNotifyAccessor]);
        }
      };

      this.on(eventName, this.__componentNotifiers[eventName]);
    }

    __removeNotifier (eventName) {
      if (!this.__componentNotifiers[eventName]) {
        return;
      }

      this.off(eventName, this.__componentNotifiers[eventName]);
      this.__componentNotifiers[eventName] = null;
    }

    fire (type, detail, options) {
      return Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(this).fire(type, detail, options);
    }

    async (callback, waitTime) {
      return (new _core_fn__WEBPACK_IMPORTED_MODULE_7__["Async"](this)).start(callback, waitTime);
    }

    debounce (job, callback, wait, immediate) {
      let debouncer = this.__componentDebouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__componentDebouncers[job] = new _core_fn__WEBPACK_IMPORTED_MODULE_7__["Debounce"](this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    }

    nextFrame (callback) {
      return _core_fn__WEBPACK_IMPORTED_MODULE_7__["Async"].nextFrame(callback.bind(this));
    }

    sprintf (...args) {
      return Object(sprintf_js__WEBPACK_IMPORTED_MODULE_8__["sprintf"])(...args);
    }

    // T overriden
    // -------------------------------------------------------------------------
    //

    __templateAnnotate (expr, accessor) {
      if (!_template__WEBPACK_IMPORTED_MODULE_3__["T"].prototype.__templateAnnotate.call(this, expr, accessor)) {
        return false;
      }

      // register event notifier
      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof window.HTMLElement) {
        const node = accessor.node;
        const nodeName = node.nodeName;

        const startNotify = (name) => {
          node.__componentNotifyKey = expr.name;
          node.__componentNotifyAccessor = accessor.name;
          this.__addNotifier(name);
        };

        if (nodeName === 'INPUT') {
          const inputType = node.getAttribute('type');
          if (inputType === 'radio' || inputType === 'checkbox') {
            throw new Error('Unimplemented yet');
          } else {
            startNotify('input');
          }
        } else if (nodeName === 'TEXTAREA') {
          startNotify('input');
        } else if (nodeName === 'SELECT') {
          startNotify('change');
        }
      }

      return true;
    }
  }

  let tproto = _template__WEBPACK_IMPORTED_MODULE_3__["T"].prototype;
  for (let key in tproto) {
    // exclude __templateAnnotate because will be override
    if (!tproto.hasOwnProperty(key)) {
      continue;
    }

    if (key === '$' || key === '__templateAnnotate') {
      continue;
    }

    Component.prototype[key] = tproto[key];
  }

  baseComponents[base] = Component;

  return Component;
}

function parseListenerMetadata (key) {
  key = key.trim();

  let splitted = key.split(' ');
  let metadata = {
    key: key,
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null,
  };

  return metadata;
}

function isUndefinedPropValue (propName, propValue) {
  return propValue === undefined || (propName === 'title' && !propValue);
}


/***/ }),

/***/ "./component/binding.js":
/*!******************************!*\
  !*** ./component/binding.js ***!
  \******************************/
/*! exports provided: Binding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Binding", function() { return Binding; });
class Binding {
  constructor (context, model) {
    this.context = context;
    this.model = model;
    this.paths = {};
    this.annotations = [];
  }

  annotate (annotation) {
    this.annotations.push(annotation);
  }

  walkEffect (type, value) {
    this.annotations.forEach(annotation => {
      annotation.effect(type, value/* , this.model */);
    });

    Object.keys(this.paths).forEach(i => {
      this.paths[i].walkEffect(type, value);
    });
  }
}


/***/ }),

/***/ "./component/component.js":
/*!********************************!*\
  !*** ./component/component.js ***!
  \********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./component/base.js");


const Component = Object(_base__WEBPACK_IMPORTED_MODULE_0__["base"])('HTMLElement');


/***/ }),

/***/ "./component/define.js":
/*!*****************************!*\
  !*** ./component/define.js ***!
  \*****************************/
/*! exports provided: define */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "define", function() { return define; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./core/index.js");


function define (name, Component, options) {
  const repository = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getInstance"])();

  let ElementClass = repository.get(name);

  if (ElementClass) {
    console.warn(`Duplicate registering ${name}`);
    return ElementClass;
  }

  if (repository.get('customElements.version') === 'v1') {
    // v1 the element class is the component itself
    ElementClass = Component;
    window.customElements.define(name, Component, options);
  } else {
    let prototype = Object.create(Component.prototype, { is: { value: name } });
    let ElementPrototype = { prototype };

    if (options && options.extends) {
      ElementPrototype.extends = options.extends;
    }

    ElementClass = document.registerElement(name, ElementPrototype);
  }

  repository.put(name, ElementClass);

  return ElementClass;
}


/***/ }),

/***/ "./component/expr.js":
/*!***************************!*\
  !*** ./component/expr.js ***!
  \***************************/
/*! exports provided: Expr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expr", function() { return Expr; });
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token */ "./component/token.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./component/filter.js");



const CACHE = {
  's': {
    '[': {},
    '{': {},
  },
  'v': {
    '[': {},
    '{': {},
  },
};

function _get (value, mode, type) {
  let cache = CACHE[type][mode];
  if (value in cache) {
    return cache[value];
  }

  let expr = new Expr(value, mode, type);
  if (type !== 's') {
    cache[value] = expr;
  }

  return expr;
}

class Expr {
  static get CACHE () {
    return CACHE;
  }

  static get (value, unwrapped) {
    value = (value || '').trim();

    if (unwrapped) {
      return _get(value, '[', 'v');
    }

    let mode = value[0];
    if ((mode === '[' || mode === '{') && value[1] === mode) {
      value = value.slice(2, -2).trim();
      return _get(value, mode, 'v');
    }

    return _get(value, '[', 's');
  }

  static getFn (value, args, unwrapped) {
    return Expr.get(value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value, unwrapped);
  }

  static rawTokenize (str) {
    let count = 0;
    let tokens = [];

    while (str && count++ < 10) {
      let matches = str.match(/^\s*("[^"]*"|[^,]+),?/);

      str = str.substr(matches[0].length);
      tokens.push(matches[1].trim());
    }

    return tokens;
  }

  static tokenize (str) {
    return Expr.rawTokenize(str).map(token => _token__WEBPACK_IMPORTED_MODULE_0__["Token"].get(token));
  }

  constructor (value, mode, type) {
    // define base properties
    this.mode = mode;
    this.type = type;
    this.name = '';
    this.args = [];
    this.filters = [];
    this.value = value;

    if (type === 's') {
      return;
    }

    let tokens = value.split('|');
    let token = tokens[0].trim();

    this.filters = tokens.slice(1).map(word => {
      return _filter__WEBPACK_IMPORTED_MODULE_1__["Filter"].get(word.trim());
    });

    if (token.indexOf('(') < 0) {
      this.type = 'p';
      this.name = token;
      this.args.push(_token__WEBPACK_IMPORTED_MODULE_0__["Token"].get(token));
    } else {
      // force mode to '[' when type is !p
      this.mode = '[';
      this.type = 'm';

      let matches = token.match(/([^(]+)\(([^)]*)\)/);

      this.name = matches[1].trim();
      this.fn = _token__WEBPACK_IMPORTED_MODULE_0__["Token"].get(this.name);

      this.args = Expr.tokenize(matches[2]);
    }
  }

  get constant () {
    return this.type !== 'm' && this.vpaths.length !== this.args.length;
  }

  get vpaths () {
    if (!this._vpaths) {
      let paths = [];
      this.args.forEach(arg => {
        if (arg.type === 'v' && paths.indexOf(arg.name) === -1) {
          paths.push(arg);
        }
      });
      this._vpaths = paths;
    }

    return this._vpaths;
  }

  invoke (context, otherArgs) {
    if (this.type === 'p') {
      let val = this.args[0].value(context, otherArgs);
      return this.filters.reduce((val, filter) => filter.invoke(val), val);
    }

    let args = this.args.map(arg => {
      return arg.value(context, otherArgs);
    });

    return this.fn.invoke(args, context, context.__templateHost);
  }
}


/***/ }),

/***/ "./component/filter.js":
/*!*****************************!*\
  !*** ./component/filter.js ***!
  \*****************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
class Filter {
  constructor (name, callback, otherArgs) {
    this.name = name;
    this.callback = callback;
    this.otherArgs = otherArgs;
  }

  invoke (val) {
    let args = [val];
    [].push.apply(args, this.otherArgs);
    return this.callback.apply(null, args);
  }

  static put (name, callback) {
    registry[name] = callback;
  }

  static get (name) {
    let segments = name.split(':');
    let args = segments.splice(1);
    let key = segments.pop();

    if (key in registry === false) {
      throw new Error(`Filter "${name}" not found.`);
    }

    return new Filter(key, registry[key], args);
  }
}

const registry = {
  required: val => {
    if (val === undefined || val === null || val === '') {
      throw new Error('Value is required');
    }
    return val;
  },
  string: val => String(val),
  number: val => Number(val),
  boolean: val => Boolean(val),
  default: (val, defVal) => (val || defVal),
  upper: val => String.prototype.toUpperCase.call(val || ''),
  lower: val => String.prototype.toLowerCase.call(val || ''),
  not: val => !val,
  slice: (val, begin, end) => Array.prototype.slice.call(val || [], begin, end),
  json: (val, indent) => JSON.stringify(val, null, Number(indent)),
  consoleTrace: val => console.trace(val), // eslint-disable-line
  consoleLog: val => console.log(val), // eslint-disable-line
  consoleInfo: val => console.info(val),
  consoleWarn: val => console.warn(val),
  consoleError: val => console.error(val),
  currency: val => (val || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
};


/***/ }),

/***/ "./component/helpers/slot.js":
/*!***********************************!*\
  !*** ./component/helpers/slot.js ***!
  \***********************************/
/*! exports provided: slotName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slotName", function() { return slotName; });
const SLOT_SUPPORTED = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    'HTMLUnknownElement' in window &&
    !(document.createElement('slot') instanceof window.HTMLUnknownElement)
  );
})();

function slotName (element) {
  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
}




/***/ }),

/***/ "./component/helpers/template.js":
/*!***************************************!*\
  !*** ./component/helpers/template.js ***!
  \***************************************/
/*! exports provided: fix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix", function() { return fix; });
function fix (template) {
  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {
    window.HTMLTemplateElement.decorate(template);
  }
  return template;
};

function needFixImportNode () {
  // console.log('needFixImportNode?');
  if (document.__importNode) {
    // already fixed
    return false;
  }
  let template = document.createElement('template');
  template.innerHTML = '<template>i</template>';
  let imported = document.importNode(template.content, true);
  return !imported.firstChild.content.firstChild || imported.firstChild.content.firstChild.textContent !== 'i';
}

if (needFixImportNode()) {
  // console.log('fixed importNode');
  document.__importNode = document.importNode;
  document.importNode = function (node, deep) {
    if (!deep) {
      return document.__importNode(node, deep);
    }

    let sourceTpls = [].slice.call(node.querySelectorAll('template'));
    let imported = document.__importNode(node, deep);
    [].forEach.call(imported.querySelectorAll('template'), (child, i) => {
      child.innerHTML = sourceTpls[i].innerHTML;
    });

    return imported;
  };
}




/***/ }),

/***/ "./component/index.js":
/*!****************************!*\
  !*** ./component/index.js ***!
  \****************************/
/*! exports provided: define, base, Component, T, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ "./component/define.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _define__WEBPACK_IMPORTED_MODULE_0__["define"]; });

/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./component/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["base"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ "./component/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _component__WEBPACK_IMPORTED_MODULE_2__["Component"]; });

/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template */ "./component/template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "T", function() { return _template__WEBPACK_IMPORTED_MODULE_3__["T"]; });

/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ "./component/filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return _filter__WEBPACK_IMPORTED_MODULE_4__["Filter"]; });








/***/ }),

/***/ "./component/template.js":
/*!*******************************!*\
  !*** ./component/template.js ***!
  \*******************************/
/*! exports provided: T */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return T; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./core/index.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./component/expr.js");
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./binding */ "./component/binding.js");
/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accessor */ "./component/accessor.js");
/* harmony import */ var _annotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotation */ "./component/annotation/index.js");
/* harmony import */ var _helpers_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/template */ "./component/helpers/template.js");
/* harmony import */ var _helpers_slot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/slot */ "./component/helpers/slot.js");









const idGenerator = new _core__WEBPACK_IMPORTED_MODULE_0__["IdGenerator"]('template');

function T (template, host, marker) {
  this.__templateInitialize(template, host, marker);
  this.__templateRender();
}

T.prototype = {
  get $ () {
    return this.__templateHost.getElementsByTagName('*');
  },

  $$ (selector) {
    return this.querySelector(selector);
  },

  promised (eventName, selector) {
    return new Promise(resolve => {
      if (selector) {
        this.once(eventName, selector, resolve);
      } else {
        this.once(eventName, resolve);
      }
    });
  },

  on () {
    Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(this.__templateHost || this).on(...arguments);
  },

  off () {
    Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(this.__templateHost || this).off(...arguments);
  },

  once () {
    Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(this.__templateHost || this).once(...arguments);
  },

  all (obj) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        this.set(i, obj[i]);
      }
    }
  },

  get (path) {
    let object = this;

    this.__templateGetPathAsArray(path).some(segment => {
      if (object === undefined || object === null) {
        object = undefined;
        return true;
      }

      object = object[segment];
      return false;
    });

    return object;
  },

  set (path, value) {
    if (typeof path === 'object') {
      let keys = Object.keys(path);
      let values = Object.values(path);
      keys.map((key, i) => {
        this.set(key, values[i]);
      });
      return;
    }

    path = this.__templateGetPathAsArray(path);

    let oldValue = this.get(path);

    if (value === oldValue) {
      return;
    }

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    object[property] = value;

    this.notify(path, value);
  },

  push (path, ...values) {
    path = this.__templateGetPathAsArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    let result = object[property].push(...values);
    this.notify(path, object[property]);

    // let index = object[property].length;
    // let removed = [];
    // let addedCount = values.length;
    // let result = object[property].push(...values);
    //
    // object = object[property];
    //
    // this.notifySplices(path, [
    //   { index, removed, addedCount, object, type: 'splice' },
    // ]);

    return result;
  },

  pop (path) {
    path = this.__templateGetPathAsArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    let result = object[property].pop();
    this.notify(path, object[property]);

    // let index = object[property].length;
    // let addedCount = 0;
    // let result = object[property].pop();
    // let removed = [ result ];
    //
    // object = object[property];
    //
    // this.notifySplices(path, [
    //   { index, removed, addedCount, object, type: 'splice' },
    // ]);

    return result;
  },

  splice (path, index, removeCount, ...values) {
    path = this.__templateGetPathAsArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    let result = object[property].splice(index, removeCount, ...values);
    this.notify(path, object[property]);

    // let addedCount = values.length;
    // let result = object[property].splice(...values);
    // let removed = result;
    //
    // object = object[property];
    //
    // this.notifySplices(path, [
    //   { index, removed, addedCount, object, type: 'splice' },
    // ]);

    return result;
  },

  notify (path, value) {
    path = this.__templateGetPathAsString(path);

    if (!this.__templateReady) {
      this.__templateNotifyOnReady = this.__templateNotifyOnReady || [];
      if (this.__templateNotifyOnReady.indexOf(path) === -1) {
        this.__templateNotifyOnReady.push(path);
      }
      return;
    }

    let binding = this.__templateGetBinding(path);
    if (binding) {
      if (value === undefined) {
        value = this.get(path);
      }

      binding.walkEffect('set', value);
    }
  },

  // notifySplices (path, splices) {
  //   path = this.__templateGetPathAsString(path);
  //
  //   if (!this.__templateReady) {
  //     if (this.__templateNotifyOnReady.indexOf(path) === -1) {
  //       this.__templateNotifyOnReady.push(path);
  //     }
  //     return;
  //   }
  //
  //   let binding = this.__templateGetBinding(path);
  //   if (binding) {
  //     binding.walkEffect('splice', splices);
  //   }
  // },

  __templateInitialize (template, host, marker) {
    this.__templateId = idGenerator.next();
    this.__templateBindings = {};
    this.__templateHost = host || (template ? template.parentElement : null);
    this.__templateMarker = marker;

    this.__templateReady = false;
    this.__templateNotifyOnReady = [];

    if (!template) {
      return;
    }

    // do below only if template is exists
    this.__template = Object(_helpers_template__WEBPACK_IMPORTED_MODULE_5__["fix"])(template);
    this.__templateChildNodes = [];

    this.__templateFragment = document.importNode(this.__template.content, true);
    this.__parseAnnotations();

    if (marker) {
      return;
    }

    if (this.__template.parentElement === this.__templateHost) {
      // when template parent is template host, it means that template is specific template
      // then use template as marker
      this.__templateMarker = this.__template;
    } else {
      // when template is not child of host, put marker to host
      this.__templateMarker = document.createComment(`marker-${this.__templateId}`);
      this.__templateHost.appendChild(this.__templateMarker);
    }
  },

  __templateRender (contentFragment) {
    this.__templateReady = true;

    this.__templateNotifyOnReady.forEach(key => {
      this.notify(key, this.get(key));
    });
    this.__templateNotifyOnReady = [];

    if (!this.__template) {
      return;
    }

    let fragment = this.__templateFragment;
    this.__templateFragment = null;

    if (contentFragment && contentFragment instanceof window.DocumentFragment) {
      // try {
      [].forEach.call(fragment.querySelectorAll('slot'), slot => {
        let name = Object(_helpers_slot__WEBPACK_IMPORTED_MODULE_6__["slotName"])(slot);
        let parent = slot.parentElement || fragment;
        let marker = document.createComment(`slot ${name}`);

        parent.insertBefore(marker, slot);
        parent.removeChild(slot);

        if (name) {
          let node = contentFragment.querySelectorAll(`[slot="${name}"]`);
          [].forEach.call(node, (node) => {
            parent.insertBefore(node, marker);
          });
        } else {
          parent.insertBefore(contentFragment, marker);
        }
      });
    }

    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);
  },

  __templateUninitialize () {
    this.__templateChildNodes.forEach(node => {
      node.parentElement.removeChild(node);
    });
  },

  __templateGetPathAsArray (path) {
    // if (!path) {
    //   throw new Error(`Unknown path ${path} to set to ${this.is}`);
    // }

    if (typeof path !== 'string') {
      return path;
    }

    return path.split('.');
  },

  __templateGetPathAsString (path) {
    if (typeof path === 'string') {
      return path;
    }

    return path.join('.');
  },

  __parseAnnotations () {
    this.__templateChildNodes = [ ...this.__templateFragment.childNodes ];

    let len = this.__templateChildNodes.length;

    for (let i = 0; i < len; i++) {
      let node = this.__templateChildNodes[i];

      switch (node.nodeType) {
        case window.Node.ELEMENT_NODE:
          this.__parseElementAnnotations(node);
          break;
        case window.Node.TEXT_NODE:
          this.__parseTextAnnotations(node);
          break;
      }
    }
  },

  __parseEventAnnotations (element, attrName) {
    // bind event annotation
    let attrValue = element.getAttribute(attrName);
    let eventName = attrName.slice(1, -1);
    // let eventName = attrName.substr(3);
    if (eventName === 'tap') {
      eventName = 'click';
    }

    let context = this;
    let expr = _expr__WEBPACK_IMPORTED_MODULE_1__["Expr"].getFn(attrValue, [], true);

    this.on(eventName, element, evt => {
      expr.invoke(context, { evt });
    });
  },

  __parseAttributeAnnotations (element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    let annotated = false;

    let len = element.attributes.length;

    for (let i = 0; i < len; i++) {
      let attr = element.attributes[i];

      let attrName = attr.name;

      if (attrName === 'id' || attrName === 'class' || attrName === 'style') {
        continue;
      }

      if (attrName.indexOf('(') === 0) {
        this.__parseEventAnnotations(element, attrName);
      } else {
        // bind property annotation
        annotated = this.__templateAnnotate(_expr__WEBPACK_IMPORTED_MODULE_1__["Expr"].get(attr.value), _accessor__WEBPACK_IMPORTED_MODULE_3__["Accessor"].get(element, attrName)) || annotated;
      }
    }

    return annotated;
  },

  __parseElementAnnotations (element) {
    let annotated = false;

    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateModel) {
      return annotated;
    }

    element.__templateModel = this;

    if (element.attributes && element.attributes.length) {
      annotated = this.__parseAttributeAnnotations(element) || annotated;
    }

    if (element.childNodes && element.childNodes.length) {
      let childNodes = [].slice.call(element.childNodes);
      let childNodesLength = childNodes.length;

      for (let i = 0; i < childNodesLength; i++) {
        annotated = this.__parseNodeAnnotations(childNodes[i]) || annotated;
      }
    }

    [].forEach.call(element.getElementsByTagName('slot'), slot => {
      [].forEach.call(slot.childNodes, node => {
        annotated = this.__parseNodeAnnotations(node) || annotated;
      });
    });

    return annotated;
  },

  __parseNodeAnnotations (node) {
    switch (node.nodeType) {
      case window.Node.TEXT_NODE:
        return this.__parseTextAnnotations(node);
      case window.Node.ELEMENT_NODE:
        return this.__parseElementAnnotations(node);
    }
  },

  __parseTextAnnotations (node) {
    let expr = _expr__WEBPACK_IMPORTED_MODULE_1__["Expr"].get(node.textContent);
    let accessor = _accessor__WEBPACK_IMPORTED_MODULE_3__["Accessor"].get(node);
    return this.__templateAnnotate(expr, accessor);
  },

  __templateAnnotate (expr, accessor) {
    if (expr.type === 's') {
      return false;
    }

    if (expr.constant) {
      let val = expr.invoke(this);
      accessor.set(val);
      return false;
    }

    // annotate every paths
    let annotation = new _annotation__WEBPACK_IMPORTED_MODULE_4__["Annotation"](this, expr, accessor);

    // TODO when the annotation to specific model, expr and accessor already exist
    // do not reannotate, see repeat@_itemsChanged
    // if (expr && expr.name === '_itemsChanged') {
    //   console.log(annotation);
    // }

    if (expr.type === 'm') {
      this.__templateGetBinding(expr.fn.name).annotate(annotation);
    }

    expr.vpaths.forEach(arg => this.__templateGetBinding(arg.name).annotate(annotation));

    return true;
  },

  __templateGetBinding (path) {
    let segments = path.split('.');
    let bindings;
    let binding;

    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];

      bindings = binding ? binding.paths : this.__templateBindings;

      if (!bindings[segment]) {
        bindings[segment] = new _binding__WEBPACK_IMPORTED_MODULE_2__["Binding"](this, segment);
      }

      binding = bindings[segment];
    }

    return binding;
  },
};


/***/ }),

/***/ "./component/token.js":
/*!****************************!*\
  !*** ./component/token.js ***!
  \****************************/
/*! exports provided: Token */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return Token; });
const CACHE = {};

class Token {
  static get CACHE () {
    return CACHE;
  }

  static get (name) {
    if (name in CACHE) {
      return CACHE[name];
    }

    let token = new Token(name);
    CACHE[name] = token;
    return token;
  }

  constructor (name) {
    this.name = name;
    this.contextName = '';
    this.baseName = '';
    this._value = null;
    this.type = 'v';

    if (!this.name.match(/^[a-zA-Z_]/)) {
      try {
        this._value = JSON.parse(this.name);
        this.type = 's';
        return;
      } catch (err) {
      }
    }

    if (this.type === 'v') {
      let nameSegments = this.name.split('.');
      this.baseName = nameSegments.pop();
      this.contextName = nameSegments.join('.');
    }
  }

  value (...contexts) {
    if (this.type === 's') {
      return this._value;
    }

    for (let context of contexts) {
      if (!context) {
        continue;
      }

      let val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];
      if (val !== undefined) {
        return val;
      }
    }
  }

  invoke (args, ...contexts) {
    if (contexts.length === 0) {
      throw new Error(`Cannot invoke method ${this.name} of undefined context`);
    }

    if (this.type === 's') {
      let [ context ] = contexts;
      throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);
    }

    for (let context of contexts) {
      if (!context) {
        continue;
      }

      if (typeof context.get === 'function') {
        let ctx = this.contextName ? context.get(this.contextName) : context;
        if (typeof ctx[this.baseName] === 'function') {
          return ctx[this.baseName](...args);
        }
      } else if (typeof context[this.name] === 'function') {
        return context[this.name].apply(context, args);
      }
    }

    let [ context ] = contexts;
    throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);
  }
}


/***/ }),

/***/ "./components/app/app.css":
/*!********************************!*\
  !*** ./components/app/app.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./app.css */ "./node_modules/css-loader/index.js!./components/app/app.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./components/app/app.js":
/*!*******************************!*\
  !*** ./components/app/app.js ***!
  \*******************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "./core/index.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ "./component/index.js");
/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route */ "./components/app/route.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.css */ "./components/app/app.css");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_3__);






class App extends _component__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  get props () {
    return {
      title: {
        type: String,
        observer: '_titleChanged',
      },

      manual: {
        type: Boolean,
      },

      mode: {
        type: String,
        value: 'hash',
      },

      rootUri: {
        type: String,
        value: '/',
      },

      hash: {
        type: String,
        value: '#!',
      },

      delay: {
        type: Number,
        value: 1, // working for safari (delay=1), chrome (delay=0)
      },
    };
  }

  get hashRegexp () {
    if (!this._hashRegexp || this._hash !== this.hash) {
      this._hashRegexp = new RegExp(`${this.hash}(.*)$`);
      this._hash = this.hash;
    }

    return this._hashRegexp;
  }

  notFound (fragment) {
    console.warn(`Route not found: ${fragment}`);
  }

  _titleChanged (title) {
    if (title) {
      document.title = title;
    }
  }

  created () {
    // removed putting app to core scope
    // put('app', this);

    this.__appSignature = true;
    this.location = window.location;
    this.history = window.history;

    // default values
    this.handlers = [];
    this.middlewares = [];

    this.__started = false;
    this.__starting = false;

    this.classList.add('xin-app');
  }

  attached () {
    if (this.manual) {
      return;
    }

    this.async(() => {
      this.start();
    }, this.delay);
  }

  route (route, callback) {
    this.handlers.push(new _route__WEBPACK_IMPORTED_MODULE_2__["Route"](route, callback));
  }

  async start () {
    if (this.__started || this.__starting) {
      return;
    }

    this.__middlewareChainRun = compose(this.middlewares);

    this.__listenNavigation();

    console.info(`Starting ${this.is}:${this.__id} ...`);

    this.__starting = true;
    let executed = await this.__execute();
    this.__starting = false;

    if (executed) {
      console.info(`Started ${this.is}:${this.__id}`);

      this.__started = true;

      this.fire('started');
    }
  }

  __listenNavigation () {
    let callback = () => {
      this.__execute();
    };

    if (this.mode === 'history') {
      Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(window).on('popstate', callback);
      Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(document).on('click', evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          callback();
        }
      });
    } else {
      Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(window).on('hashchange', callback);
    }
  }

  get started () {
    return this.__started || false;
  }

  getFragmentExecutors (fragment) {
    return this.handlers.reduce((executors, handler) => {
      let executor = handler.getExecutorFor(fragment);
      if (executor) executors.push(executor);
      return executors;
    }, []);
  }

  async __execute () {
    let fragment = this.getFragment();
    let context = { app: this, uri: fragment };

    // run middleware chain then execute all executors
    let willContinue = await this.__middlewareChainRun(context, () => {
      let executors = this.getFragmentExecutors(context.uri);
      if (executors.length === 0) {
        this.notFound(fragment);
        this.fire('route-not-found', fragment);
        return;
      }

      executors.forEach(executor => {
        executor.handler.callback(executor.args, context);
      });
    });

    if (willContinue === false) {
      return false;
    }

    this.fire('navigated', context);
    return true;
  }

  navigate (path, options) {
    path = path || '/';
    options = options || {};

    if (this.mode === 'history') {
      let url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
      if (this.location.href.replace(this.location.origin, '') !== url) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
        this.__execute();
      }
    } else {
      if (options.replace) {
        this.location.replace(this.hash + path);
      } else {
        this.location.hash = this.hash + path;
      }
    }
    return this;
  }

  use (middleware) {
    this.middlewares.push(middleware);
  }

  getFragment () {
    try {
      let fragment;
      if (this.mode === 'history') {
        fragment = decodeURI(this.location.pathname + this.location.search);
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
      } else {
        let match = this.location.href.match(this.hashRegexp);
        fragment = match ? match[1] : '';
      }

      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    } catch (err) {
      console.error('Fragment is not match any pattern, fallback to /');
      return '/';
    }
  }

  // $back (evt) {
  //   evt.preventDefault();
  //   this.history.back();
  // }
}

Object(_component__WEBPACK_IMPORTED_MODULE_1__["define"])('xin-app', App);

function compose (middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return (context, next) => {
    // last called middlewares #
    let index = -1;

    function dispatch (i) {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }

      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) {
        fn = next;
      }
      if (!fn) {
        return;
      }

      return fn(context, () => dispatch(i + 1));
    }

    return dispatch(0);
  };
}


/***/ }),

/***/ "./components/app/index.js":
/*!*********************************!*\
  !*** ./components/app/index.js ***!
  \*********************************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./components/app/app.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "App", function() { return _app__WEBPACK_IMPORTED_MODULE_0__["App"]; });



/* harmony default export */ __webpack_exports__["default"] = (_app__WEBPACK_IMPORTED_MODULE_0__["App"]);


/***/ }),

/***/ "./components/app/route.js":
/*!*********************************!*\
  !*** ./components/app/route.js ***!
  \*********************************/
/*! exports provided: Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
class Route {
  static routeRegExp (str) {
    let chunks = str.split('[');

    if (chunks.length > 2) {
      throw new Error('Invalid use of optional params');
    }

    let tokens = [];
    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
      tokens.push(token);
      return '([^/]+)';
    }).replace(/\//g, '\\/');

    let optRe = '';

    if (chunks[1]) {
      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
        let [ realToken, re = '[^/]+' ] = token.split(':');
        tokens.push(realToken);
        return `(${re})`;
      }).replace(/\//g, '\\/') + ')?';
    }

    return [ new RegExp('^' + re + optRe + '$'), tokens ];
  }

  static isStatic (pattern) {
    return !pattern.match(/[[{]/);
  }

  constructor (route, callback) {
    this.route = route;
    this.callback = callback;

    if (Route.isStatic(route)) {
      this.type = 's';
      this.pattern = null;
      this.args = [];
    } else {
      let result = Route.routeRegExp(route);
      this.type = 'v';
      this.pattern = result[0];
      this.args = result[1];
    }
  }

  getExecutorFor (fragment) {
    if (this.type === 's') {
      if (fragment === this.route) {
        return { handler: this, args: {} };
      }
    } else if (this.type === 'v') {
      let result = fragment.match(this.pattern);
      if (result) {
        return {
          handler: this,
          args: this.args.reduce((args, name, index) => {
            args[name] = result[index + 1];
            return args;
          }, {}),
        };
      }
    }
  }
}


/***/ }),

/***/ "./components/fixture.js":
/*!*******************************!*\
  !*** ./components/fixture.js ***!
  \*******************************/
/*! exports provided: Fixture, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fixture", function() { return Fixture; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./component/index.js");


class Fixture extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  static create (template, data = {}) {
    const t = `
      <xin-fixture>
        <template>
          ${template}
        </template>
      </xin-fixture>
    `;
    const d = document.createElement('div');
    d.innerHTML = t;
    const fixture = d.querySelector('xin-fixture');

    for (let i in data) {
      fixture[i] = data[i];
    }

    document.body.appendChild(fixture);

    return fixture;
  }

  attached () {
    super.attached();
    this.connected = true;

    // delay connected to make sure children is already connected
    this.async(() => {
      this.fire('connected');
    });
  }

  detached () {
    super.detached();
    this.connected = false;

    this.fire('disconnected');
  }

  dispose () {
    this.parentElement.removeChild(this);
    this.connected = false;
  }

  async waitConnected (timeout) {
    await new Promise(resolve => {
      if (this.connected) {
        resolve();
      } else {
        this.once('connected', resolve);
      }
    });

    await this.wait(timeout);
  }

  wait (timeout = 0) {
    return new Promise(resolve => {
      this.async(resolve, timeout);
    });
  }

  async waitDisconnected (timeout) {
    await new Promise(resolve => {
      if (this.connected) {
        this.once('disconnected', resolve);
      } else {
        resolve();
      }
    });

    await this.wait(timeout);
  }
}

Object(_component__WEBPACK_IMPORTED_MODULE_0__["define"])('xin-fixture', Fixture);

/* harmony default export */ __webpack_exports__["default"] = (Fixture);


/***/ }),

/***/ "./components/for/for.css":
/*!********************************!*\
  !*** ./components/for/for.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./for.css */ "./node_modules/css-loader/index.js!./components/for/for.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./components/for/for.js":
/*!*******************************!*\
  !*** ./components/for/for.js ***!
  \*******************************/
/*! exports provided: For, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "For", function() { return For; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ "./component/index.js");
/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row */ "./components/for/row.js");
/* harmony import */ var _for_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./for.css */ "./components/for/for.css");
/* harmony import */ var _for_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_for_css__WEBPACK_IMPORTED_MODULE_2__);





const FILTER_ALL = () => true;

class For extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  get props () {
    return Object.assign({}, super.props, {
      items: {
        type: Array,
        observer: '_itemsChanged(items, filter)',
      },

      as: {
        type: String,
        value: 'item',
      },

      indexAs: {
        type: String,
        value: 'index',
      },

      filter: {
        type: Function,
        observer: '_itemsChanged(items, filter)',
      },

      to: {
        type: String,
        value: '',
      },
    });
  }

  created () {
    super.created();

    this.rows = [];
  }

  __initTemplate () {
    this.__templateFor = this.firstElementChild;
    if (!this.__templateFor) {
      throw new Error('Invalid xin-for definition, must be <xin-for items="[[items]]"><template>...</template></xin-for>');
    }
    // this.__templateFor.__templateHost = this.__templateHost;
    this.removeChild(this.__templateFor);

    let marker = this;
    let toAttr = this.getAttribute('to');
    if (toAttr) {
      let container = document.querySelector(toAttr);
      if (!container) {
        throw new Error(`xin-for render to unknown element ${toAttr}`);
      }
      marker = document.createComment(`marker-for`);
      container.appendChild(marker);
    }

    _component__WEBPACK_IMPORTED_MODULE_0__["T"].prototype.__templateInitialize.call(this, null, this, marker);
  }

  _itemsChanged (items, filter) {
    this.debounce('_itemsChanged', () => {
      let len = 0;

      if (items && items.length) {
        let filter = this.filter || FILTER_ALL;
        items.filter(filter).forEach((item, index) => {
          if (this.rows[index]) {
            this.rows[index].update(item, index);
          } else {
            this.rows.push(new _row__WEBPACK_IMPORTED_MODULE_1__["Row"](this.__templateFor, this, item, index));
          }

          len++;
        });
      }

      // move to detach
      this.rows.splice(len).forEach(row => {
        row.__templateUninitialize();
      });
    });
  }

  itemForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel.get(this.as);
  }

  indexForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel.get(this.indexAs);
  }

  modelForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel;
  }
}
Object(_component__WEBPACK_IMPORTED_MODULE_0__["define"])('xin-for', For);

/* harmony default export */ __webpack_exports__["default"] = (For);


/***/ }),

/***/ "./components/for/index.js":
/*!*********************************!*\
  !*** ./components/for/index.js ***!
  \*********************************/
/*! exports provided: For, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for */ "./components/for/for.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "For", function() { return _for__WEBPACK_IMPORTED_MODULE_0__["For"]; });



/* harmony default export */ __webpack_exports__["default"] = (_for__WEBPACK_IMPORTED_MODULE_0__["For"]);


/***/ }),

/***/ "./components/for/row.js":
/*!*******************************!*\
  !*** ./components/for/row.js ***!
  \*******************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return Row; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ "./component/index.js");


class Row extends _component__WEBPACK_IMPORTED_MODULE_0__["T"] {
  constructor (template, host, item, index) {
    super();

    // override T constructor
    this.__templateInitialize(template, host.__templateModel, host.__templateMarker);

    this.is = '$repeat-row';
    this.__id = this.__templateId;

    this.__repeat = host;
    this.__repeatAs = host.as;
    this.__repeatIndexAs = host.indexAs;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        node.__repeatModel = this;
      }
    });

    this.update(item, index);

    this.__templateRender();
  }

  get __app () {
    return this.__templateHost.__app;
  }

  update (item, index) {
    this[this.__repeatAs] = item;
    this[this.__repeatIndexAs] = index;
    this.notify(this.__repeatAs, item);
    this.notify(this.__repeatIndexAs, index);
  }

  set (path, value) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.set(path, value);
    }

    return this.__templateHost.set(path, value);
  }

  get (path) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.get(path);
    }

    return this.__templateHost.get(path);
  }

  notify (path, value) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.notify(path, value);
    }

    return this.__templateHost.notify(path, value);
  }
}


/***/ }),

/***/ "./components/index.js":
/*!*****************************!*\
  !*** ./components/index.js ***!
  \*****************************/
/*! exports provided: App, Fixture, Middleware, Pager, For, Repeat, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./components/app/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "App", function() { return _app__WEBPACK_IMPORTED_MODULE_0__["App"]; });

/* harmony import */ var _fixture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixture */ "./components/fixture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fixture", function() { return _fixture__WEBPACK_IMPORTED_MODULE_1__["Fixture"]; });

/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ "./components/middleware.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Middleware", function() { return _middleware__WEBPACK_IMPORTED_MODULE_2__["Middleware"]; });

/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pager */ "./components/pager/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pager", function() { return _pager__WEBPACK_IMPORTED_MODULE_3__["Pager"]; });

/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./for */ "./components/for/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "For", function() { return _for__WEBPACK_IMPORTED_MODULE_4__["For"]; });

/* harmony import */ var _repeat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./repeat */ "./components/repeat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Repeat", function() { return _repeat__WEBPACK_IMPORTED_MODULE_5__["Repeat"]; });

/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view */ "./components/view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _view__WEBPACK_IMPORTED_MODULE_6__["View"]; });










/***/ }),

/***/ "./components/middleware.js":
/*!**********************************!*\
  !*** ./components/middleware.js ***!
  \**********************************/
/*! exports provided: Middleware, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Middleware", function() { return Middleware; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./component/index.js");


class Middleware extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  attached () {
    super.attached();

    this.__app.use(this.callback());
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Middleware);


/***/ }),

/***/ "./components/pager/index.js":
/*!***********************************!*\
  !*** ./components/pager/index.js ***!
  \***********************************/
/*! exports provided: Pager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pager */ "./components/pager/pager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pager", function() { return _pager__WEBPACK_IMPORTED_MODULE_0__["Pager"]; });



/* harmony default export */ __webpack_exports__["default"] = (_pager__WEBPACK_IMPORTED_MODULE_0__["Pager"]);


/***/ }),

/***/ "./components/pager/pager.css":
/*!************************************!*\
  !*** ./components/pager/pager.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./pager.css */ "./node_modules/css-loader/index.js!./components/pager/pager.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./components/pager/pager.js":
/*!***********************************!*\
  !*** ./components/pager/pager.js ***!
  \***********************************/
/*! exports provided: Pager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pager", function() { return Pager; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ "./component/index.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ "./core/index.js");
/* harmony import */ var _pager_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pager.css */ "./components/pager/pager.css");
/* harmony import */ var _pager_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pager_css__WEBPACK_IMPORTED_MODULE_2__);





class Pager extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  ready () {
    super.ready();

    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {
      if ('set' in el) {
        el.set('index', i);
      } else {
        el.setAttribute('index', i);
      }
    }
  }

  setFocus (element) {
    if (element) {
      let index = element.index;
      let oldIndex = this.focused$ ? this.focused$.index : -1;
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

  __transitionBackward (prevEl, nextEl) {
    Promise.all([
      nextEl.inFx.play(-1),
      prevEl.outFx.play(-1),
    ]).then(() => {
      prevEl.setVisible(false);
      nextEl.setVisible(true);
      prevEl.setFocus(false);
      nextEl.setFocus(true);
      this.$focused = nextEl;

      nextEl.inFx.stop();
      prevEl.outFx.stop();
    });
  }

  __transitionForward (prevEl, nextEl) {
    if (prevEl) {
      Promise.all([
        nextEl.inFx.play(1),
        prevEl.outFx.play(1),
      ]).then(() => {
        prevEl.setVisible(false);
        nextEl.setVisible(true);
        prevEl.setFocus(false);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        nextEl.inFx.stop();
        prevEl.outFx.stop();
      });
    } else {
      let transitionFx = new _core__WEBPACK_IMPORTED_MODULE_1__["Fx"]({
        element: nextEl,
        transition: 'none',
      });

      transitionFx.play('in', 1).then(() => {
        nextEl.setVisible(true);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        transitionFx.stop();
      });
    }
  }
}

Object(_component__WEBPACK_IMPORTED_MODULE_0__["define"])('xin-pager', Pager);


/***/ }),

/***/ "./components/repeat.js":
/*!******************************!*\
  !*** ./components/repeat.js ***!
  \******************************/
/*! exports provided: Repeat, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Repeat", function() { return Repeat; });
/* harmony import */ var _for_row__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for/row */ "./components/for/row.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core */ "./core/index.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component */ "./component/index.js");




const FILTER_ALL = () => true;

class Repeat extends Object(_component__WEBPACK_IMPORTED_MODULE_2__["base"])('HTMLTemplateElement') {
  get props () {
    return Object.assign({}, super.props, {
      items: {
        type: Array,
        observer: '_itemsChanged(items, filter)',
      },

      as: {
        type: String,
        value: 'item',
      },

      indexAs: {
        type: String,
        value: 'index',
      },

      filter: {
        type: Function,
        observer: '_itemsChanged(items, filter)',
      },
    });
  }

  created () {
    super.created();

    Object(_core__WEBPACK_IMPORTED_MODULE_1__["deprecated"])('components/repeat', 'Please use xin-for instead');

    this.rows = [];
  }

  __initTemplate () {
    _component__WEBPACK_IMPORTED_MODULE_2__["T"].prototype.__templateInitialize.call(this, null, this);
  }

  _itemsChanged (items, filter) {
    this.debounce('_itemsChanged', () => {
      let len = 0;

      if (items && items.length) {
        let filter = this.filter || FILTER_ALL;
        items.filter(filter).forEach((item, index) => {
          if (this.rows[index]) {
            this.rows[index].update(item, index);
          } else {
            this.rows.push(new _for_row__WEBPACK_IMPORTED_MODULE_0__["Row"](this, this, item, index));
          }

          len++;
        });
      }

      // move to detach
      this.rows.splice(len).forEach(row => {
        row.__templateUninitialize();
      });
    });
  }

  itemForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel.get(this.as);
  }

  indexForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel.get(this.indexAs);
  }

  modelForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel;
  }
}

Object(_component__WEBPACK_IMPORTED_MODULE_2__["define"])('xin-repeat', Repeat, { extends: 'template' });

/* harmony default export */ __webpack_exports__["default"] = (Repeat);


/***/ }),

/***/ "./components/view/index.js":
/*!**********************************!*\
  !*** ./components/view/index.js ***!
  \**********************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./components/view/view.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _view__WEBPACK_IMPORTED_MODULE_0__["View"]; });




/***/ }),

/***/ "./components/view/view.css":
/*!**********************************!*\
  !*** ./components/view/view.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./view.css */ "./node_modules/css-loader/index.js!./components/view/view.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./components/view/view.js":
/*!*********************************!*\
  !*** ./components/view/view.js ***!
  \*********************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ "./component/index.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ "./core/index.js");
/* harmony import */ var _view_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.css */ "./components/view/view.css");
/* harmony import */ var _view_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_view_css__WEBPACK_IMPORTED_MODULE_2__);





class View extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  get props () {
    const TRANSITION_IN = this.__repository.get('view.transitionIn') || this.__repository.get('view.transition') || 'slide';
    const TRANSITION_OUT = this.__repository.get('view.transitionOut') || this.__repository.get('view.transition') || 'fade';

    return Object.assign({}, super.props, {
      uri: {
        type: String,
        required: true,
      },
      transitionIn: {
        type: String,
        value: TRANSITION_IN,
      },
      transitionOut: {
        type: String,
        value: TRANSITION_OUT,
      },
      index: {
        type: Number,
        value: 0,
      },
    });
  }

  focusing () {}

  focused () {}

  blurred () {}

  created () {
    super.created();

    this.classList.add('xin-view');
  }

  ready () {
    super.ready();

    this.inFx = new _core__WEBPACK_IMPORTED_MODULE_1__["Fx"]({
      element: this,
      transition: this.transitionIn,
      method: 'in',
    });

    this.outFx = new _core__WEBPACK_IMPORTED_MODULE_1__["Fx"]({
      element: this,
      transition: this.transitionOut,
      method: 'out',
    });
  }

  attached () {
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

  async focus (parameters = {}) {
    this.set('parameters', parameters);

    await this.focusing(parameters);
    this.fire('focusing', parameters);

    this.async(() => {
      if ('setFocus' in this.parentElement) {
        this.parentElement.setFocus(this);
      } else {
        this.setVisible(true);
        this.setFocus(true);
      }
    });
  }

  setVisible (visible) {
    if (visible) {
      this.classList.add('xin-view--visible');
      this.fire('show', { view: this });
      return;
    }

    this.classList.remove('xin-view--visible');
    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--visible'), el => el.setVisible(visible));

    this.fire('hide');
  }

  async setFocus (focus) {
    if (focus) {
      this.classList.add('xin-view--focus');
      await this.focused();
      this.fire('focus');
      return;
    }

    this.classList.remove('xin-view--focus');
    [].forEach.call(this.querySelectorAll('.xin-view.xin-view--focus'), el => {
      if ('setFocus' in el.parentElement) {
        el.parentElement.setFocus(null);
      } else {
        el.setFocus(focus);
      }
    });

    await this.blurred();
    this.fire('blur');
  }
}

Object(_component__WEBPACK_IMPORTED_MODULE_0__["define"])('xin-view', View);


/***/ }),

/***/ "./core/deprecated.js":
/*!****************************!*\
  !*** ./core/deprecated.js ***!
  \****************************/
/*! exports provided: deprecated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return deprecated; });
function deprecated (module, message) {
  let longName = module ? `@xinix/xin/${module}` : '@xinix/xin';
  console.warn(`DEPRECATED: ${longName}, ${message}`);
}


/***/ }),

/***/ "./core/event.js":
/*!***********************!*\
  !*** ./core/event.js ***!
  \***********************/
/*! exports provided: event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return event; });
/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id-generator */ "./core/id-generator.js");


const idGenerator = new _id_generator__WEBPACK_IMPORTED_MODULE_0__["IdGenerator"]('event');

let _matcher;
let _level = 0;
let _id = 0;
let _handlers = {};
let _delegatorInstances = {};

function _addEvent (delegator, type, callback) {
  if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {
    delegator.element.addEventListener(type, callback, { passive: true });
    return;
  }
  // blur and focus do not bubble up but if you use event capturing
  // then you will get them
  let useCapture = type === 'blur' || type === 'focus';
  delegator.element.addEventListener(type, callback, useCapture);
}

function _cancel (evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

/**
 * returns function to use for determining if an element
 * matches a query selector
 *
 * @returns {Function}
 */
function _getMatcher (element) {
  if (_matcher) {
    return _matcher;
  }

  if (element.matches) {
    _matcher = element.matches;
    return _matcher;
  }

  if (element.webkitMatchesSelector) {
    _matcher = element.webkitMatchesSelector;
    return _matcher;
  }

  if (element.mozMatchesSelector) {
    _matcher = element.mozMatchesSelector;
    return _matcher;
  }

  if (element.msMatchesSelector) {
    _matcher = element.msMatchesSelector;
    return _matcher;
  }

  if (element.oMatchesSelector) {
    _matcher = element.oMatchesSelector;
    return _matcher;
  }

  // if it doesn't match a native browser method
  // fall back to the delegator function
  _matcher = Delegator.matchesSelector;
  return _matcher;
}

/**
 * determines if the specified element matches a given selector
 *
 * @param {Node} element - the element to compare against the selector
 * @param {string} selector
 * @param {Node} boundElement - the element the listener was attached to
 * @returns {void|Node}
 */
function _matchesSelector (element, selector, boundElement) {
  // no selector means this event was bound directly to this element
  if (selector === '_root') {
    return boundElement;
  }

  // if we have moved up to the element you bound the event to
  // then we have come too far
  if (element === boundElement) {
    return;
  }

  if (_getMatcher(element).call(element, selector)) {
    return element;
  }

  // if this element did not match but has a parent we should try
  // going up the tree to see if any of the parent elements match
  // for example if you are looking for a click on an <a> tag but there
  // is a <span> inside of the a tag that it is the target,
  // it should still work
  if (element.parentNode) {
    _level++;
    return _matchesSelector(element.parentNode, selector, boundElement);
  }
}

function _addHandler (delegator, event, selector, callback) {
  if (!_handlers[delegator.id]) {
    _handlers[delegator.id] = {};
  }

  if (!_handlers[delegator.id][event]) {
    _handlers[delegator.id][event] = {};
  }

  if (!_handlers[delegator.id][event][selector]) {
    _handlers[delegator.id][event][selector] = [];
  }

  _handlers[delegator.id][event][selector].push(callback);
}

function _removeHandler (delegator, event, selector, callback) {
  // if there are no events tied to this element at all
  // then don't do anything
  if (!_handlers[delegator.id]) {
    return;
  }

  // if there is no event type specified then remove all events
  // example: Delegator(element).off()
  if (!event) {
    for (let type in _handlers[delegator.id]) {
      if (_handlers[delegator.id].hasOwnProperty(type)) {
        _handlers[delegator.id][type] = {};
      }
    }
    return;
  }

  // if no callback or selector is specified remove all events of this type
  // example: Delegator(element).off('click')
  if (!callback && !selector) {
    _handlers[delegator.id][event] = {};
    return;
  }

  // if a selector is specified but no callback remove all events
  // for this selector
  // example: Delegator(element).off('click', '.sub-element')
  if (!callback) {
    delete _handlers[delegator.id][event][selector];
    return;
  }

  // if we have specified an event type, selector, and callback then we
  // need to make sure there are callbacks tied to this selector to
  // begin with.  if there aren't then we can stop here
  if (!_handlers[delegator.id][event][selector]) {
    return;
  }

  // if there are then loop through all the callbacks and if we find
  // one that matches remove it from the array
  for (let i = 0; i < _handlers[delegator.id][event][selector].length; i++) {
    if (_handlers[delegator.id][event][selector][i] === callback) {
      _handlers[delegator.id][event][selector].splice(i, 1);
      break;
    }
  }
}

function _handleEvent (id, e, type) {
  if (!_handlers[id][type]) {
    return;
  }

  let target = e.target || e.srcElement;
  let selector;
  let match;
  let matches = {};
  let i = 0;
  let j = 0;

  // find all events that match
  _level = 0;
  for (selector in _handlers[id][type]) {
    if (_handlers[id][type].hasOwnProperty(selector)) {
      match = _matchesSelector(target, selector, _delegatorInstances[id].element);

      if (match && Delegator.matchesEvent(type, _delegatorInstances[id].element, match, selector === '_root', e)) {
        _level++;
        _handlers[id][type][selector].match = match;
        matches[_level] = _handlers[id][type][selector];
      }
    }
  }

  // stopPropagation() fails to set cancelBubble to true in Webkit
  // @see http://code.google.com/p/chromium/issues/detail?id=162270
  e.stopPropagation = function () {
    e.cancelBubble = true;
  };

  for (i = 0; i <= _level; i++) {
    if (matches[i]) {
      for (j = 0; j < matches[i].length; j++) {
        if (matches[i][j].call(matches[i].match, e) === false) {
          Delegator.cancel(e);
          return;
        }

        if (e.cancelBubble) {
          return;
        }
      }
    }
  }
}

const aliases = {};
const aliasesDefaultTranslator = name => ([ name ]);
const aliasesTranslators = {
  transitionend (name) {
    let el = document.createElement('fakeelement');
    let transitions = {
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'transition': 'transitionend',
    };

    for (let t in transitions) {
      if (el.style[t] !== undefined) {
        return [transitions[t]];
      }
    }
  },
};

function _aliases (name) {
  let theAliases;
  if (name in aliases) {
    theAliases = aliases[name];
  } else {
    let translator = aliasesTranslators[name] || aliasesDefaultTranslator;
    theAliases = translator(name);
    aliases[name] = theAliases;
  }

  return theAliases;
}

/**
 * binds the specified events to the element
 *
 * @param {string|Array} events
 * @param {string} selector
 * @param {Function} callback
 * @param {boolean=} remove
 * @returns {Object}
 */
function _bind (events, selector, callback, remove) {
  // fail silently if you pass null or undefined as an alement
  // in the Delegator constructor
  if (!this.element) {
    return;
  }

  if (!(events instanceof Array)) {
    events = [events];
  }

  if (!callback && typeof (selector) === 'function') {
    callback = selector;
    selector = '_root';
  }

  if (selector instanceof window.Element) {
    let id;
    if (selector.hasAttribute('bind-event-id')) {
      id = selector.getAttribute('bind-event-id');
    } else {
      id = idGenerator.next();
      selector.setAttribute('bind-event-id', id);
    }
    selector = `[bind-event-id="${id}"]`;
  }

  let id = this.id;
  let i;

  function _getGlobalCallback (type) {
    return function (e) {
      _handleEvent(id, e, type);
    };
  }

  for (i = 0; i < events.length; i++) {
    _aliases(events[i]).forEach(alias => {
      // console.info('> ' + events[i] + ':' + alias);
      if (remove) {
        _removeHandler(this, alias, selector, callback);
        return;
      }

      if (!_handlers[id] || !_handlers[id][alias]) {
        Delegator.addEvent(this, alias, _getGlobalCallback(alias));
      }

      _addHandler(this, alias, selector, callback);
    });
  }

  return this;
}

/**
 * Delegator object constructor
 *
 * @param {Node} element
 */
function Delegator (element, id) {
  this.element = element;
  this.id = id;
}

/**
 * adds an event
 *
 * @param {string|Array} events
 * @param {string} selector
 * @param {Function} callback
 * @returns {Object}
 */
Delegator.prototype.on = function (events, selector, callback) {
  return _bind.call(this, events, selector, callback);
};

/**
 * removes an event
 *
 * @param {string|Array} events
 * @param {string} selector
 * @param {Function} callback
 * @returns {Object}
 */
Delegator.prototype.off = function (events, selector, callback) {
  return _bind.call(this, events, selector, callback, true);
};

Delegator.prototype.once = function (events, selector, callback) {
  if (!callback && typeof (selector) === 'function') {
    callback = selector;
    selector = '_root';
  }

  const proxyCallback = (...args) => {
    this.off(events, selector, proxyCallback);
    return callback(...args); // eslint-disable-line standard/no-callback-literal
  };

  return this.on(events, selector, proxyCallback);
};

Delegator.prototype.fire = function (type, detail, options) {
  options = options || {};
  detail = detail || {};

  let evt;
  let bubbles = options.bubbles === undefined ? true : options.bubbles;
  let cancelable = Boolean(options.cancelable);

  switch (type) {
    case 'click':
      evt = new window.Event(type, {
        bubbles: bubbles,
        cancelable: cancelable,
        // XXX is it ok to have detail here?
        detail: detail,
      });

      // XXX check if without this works on every browsers
      // evt = document.createEvent('HTMLEvents');
      // evt.initEvent(type, true, false);
      break;
    default:
      evt = new window.CustomEvent(type, {
        bubbles: Boolean(bubbles),
        cancelable: cancelable,
        detail: detail,
      });
      break;
  }

  this.element.dispatchEvent(evt);

  return evt;
};

Delegator.matchesSelector = function () {};
Delegator.cancel = _cancel;
Delegator.addEvent = _addEvent;
Delegator.aliases = _aliases;
Delegator.matchesEvent = function () {
  return true;
};

function event (element) {
  // only keep one Delegator instance per node to make sure that
  // we don't create a ton of new objects if you want to delegate
  // multiple events from the same node
  //
  // for example: event(document).on(...
  for (let key in _delegatorInstances) {
    if (_delegatorInstances[key].element === element) {
      return _delegatorInstances[key];
    }
  }

  _id++;
  _delegatorInstances[_id] = new Delegator(element, _id);

  return _delegatorInstances[_id];
}


/***/ }),

/***/ "./core/fn/async.js":
/*!**************************!*\
  !*** ./core/fn/async.js ***!
  \**************************/
/*! exports provided: Async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../id-generator */ "./core/id-generator.js");


const idGenerator = new _id_generator__WEBPACK_IMPORTED_MODULE_0__["IdGenerator"]('async');

const requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame
);

const cancelAnimationFrame = (
  window.cancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame
);

class Async {
  static nextFrame (callback) {
    return requestAnimationFrame(callback);
  }

  static sleep (wait) {
    return new Promise(resolve => setTimeout(resolve, wait));
  }

  static run (callback, wait) {
    return (new Async()).start(callback, wait);
  }

  constructor (context) {
    this.id = idGenerator.next();
    this.context = context || null;
    this.handle = null;
    this.frameHandle = null;
    this.cleared = true;
  }

  start (callback, wait) {
    if (typeof callback !== 'function') {
      throw new Error('Async should specify function');
    }

    if (!this.cleared) {
      throw new Error('Async already run');
    }

    this.cleared = false;

    wait = wait || 0;

    let self = this;
    let context = this.context;
    let boundCallback = function () {
      self.frameHandle = requestAnimationFrame(() => {
        self.__clear();
        callback.call(context);
      });
    };

    if (wait) {
      this.handle = setTimeout(boundCallback, wait);
    } else {
      boundCallback();
    }
  }

  __clear () {
    this.cleared = true;

    cancelAnimationFrame(~~this.frameHandle);
    clearTimeout(~~this.handle);
    this.handle = this.frameHandle = null;
  }

  cancel () {
    this.__clear();
  }
};


/***/ }),

/***/ "./core/fn/debounce.js":
/*!*****************************!*\
  !*** ./core/fn/debounce.js ***!
  \*****************************/
/*! exports provided: Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Debounce", function() { return Debounce; });
/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async */ "./core/fn/async.js");


class Debounce {
  constructor (context, immediate) {
    this.context = context;
    this.immediate = Boolean(immediate);
    this.async = null;
    this.running = false;
  }

  start (callback, wait) {
    if (this.immediate) {
      throw new Error('Unimplemented yet!');
    }

    this.running = true;
    this.async = new _async__WEBPACK_IMPORTED_MODULE_0__["Async"](this.context);
    this.async.start(() => {
      callback.call(this.context);
      this.running = false;
      this.async = null;
    }, wait);
  }

  cancel () {
    this.running = false;
    this.async.cancel();
    this.async = null;
  }
}


/***/ }),

/***/ "./core/fn/index.js":
/*!**************************!*\
  !*** ./core/fn/index.js ***!
  \**************************/
/*! exports provided: Async, Debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async */ "./core/fn/async.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return _async__WEBPACK_IMPORTED_MODULE_0__["Async"]; });

/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce */ "./core/fn/debounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Debounce", function() { return _debounce__WEBPACK_IMPORTED_MODULE_1__["Debounce"]; });





/***/ }),

/***/ "./core/fx/fx.css":
/*!************************!*\
  !*** ./core/fx/fx.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./fx.css */ "./node_modules/css-loader/index.js!./core/fx/fx.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./core/fx/fx.js":
/*!***********************!*\
  !*** ./core/fx/fx.js ***!
  \***********************/
/*! exports provided: Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fx", function() { return Fx; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "./core/index.js");
/* harmony import */ var _fn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn */ "./core/fn/index.js");
/* harmony import */ var _fx_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fx.css */ "./core/fx/fx.css");
/* harmony import */ var _fx_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fx_css__WEBPACK_IMPORTED_MODULE_2__);





class Fx {
  static add (name, transition) {
    adapters[name] = transition;
  }

  static get (name) {
    return adapters[name] || adapters.none;
  }

  constructor (options) {
    options = options || {};
    this.element = options.element;
    this.duration = options.duration || 0;
    this.transition = options.transition || 'none';
    this.method = options.method || '';

    this.adapter = options.adapter || Fx.get(this.transition);

    this.running = false;
    this.direction = 0;
  }

  async play (direction) {
    this.running = true;
    this.direction = direction;

    await this.adapter.play(this);
  }

  async stop () {
    await this.adapter.stop(this);

    this.running = false;
    this.direction = 0;
  }
}

// TODO: refactor adapters to each own file
const adapters = {
  'none': {
    async play () {},

    async stop () {},
  },

  'slide': {
    play (fx) {
      return new Promise(resolve => {
        Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(fx.element).once('transitionend', () => {
          fx.element.classList.remove('trans-slide__animate');
          resolve();
        });
        fx.element.classList.add(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);

        _fn__WEBPACK_IMPORTED_MODULE_1__["Async"].nextFrame(() => {
          fx.element.classList.add('trans-slide__animate');
          _fn__WEBPACK_IMPORTED_MODULE_1__["Async"].nextFrame(() => fx.element.classList.add(`trans-slide__${fx.method}`));
        });
      });
    },

    stop (fx) {
      return new Promise(resolve => {
        _fn__WEBPACK_IMPORTED_MODULE_1__["Async"].nextFrame(() => {
          fx.element.classList.remove(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);
          fx.element.classList.remove(`trans-slide__${fx.method}`);
          resolve();
        });
      });
    },
  },

  'fade': {
    play (fx) {
      return new Promise(resolve => {
        Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(fx.element).once('transitionend', () => {
          resolve();
        });

        fx.element.classList.add(`trans-fade__${fx.method}`);

        _fn__WEBPACK_IMPORTED_MODULE_1__["Async"].nextFrame(() => {
          fx.element.classList.add(`trans-fade__${fx.method}-animate`);
        });
      });
    },

    stop (fx) {
      return new Promise(resolve => {
        fx.element.classList.remove(`trans-fade__${fx.method}`);

        _fn__WEBPACK_IMPORTED_MODULE_1__["Async"].nextFrame(() => {
          fx.element.classList.remove(`trans-fade__${fx.method}-animate`);
          resolve();
        });
      });
    },
  },
};


/***/ }),

/***/ "./core/fx/index.js":
/*!**************************!*\
  !*** ./core/fx/index.js ***!
  \**************************/
/*! exports provided: Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fx */ "./core/fx/fx.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fx", function() { return _fx__WEBPACK_IMPORTED_MODULE_0__["Fx"]; });




/***/ }),

/***/ "./core/id-generator.js":
/*!******************************!*\
  !*** ./core/id-generator.js ***!
  \******************************/
/*! exports provided: IdGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdGenerator", function() { return IdGenerator; });
class IdGenerator {
  constructor (key = '') {
    this.key = key;
    this.value = 0;
  }

  next () {
    return this.value++;
  }
}


/***/ }),

/***/ "./core/index.js":
/*!***********************!*\
  !*** ./core/index.js ***!
  \***********************/
/*! exports provided: deprecated, IdGenerator, event, bootstrap, getInstance, Repository, Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ "./core/repository/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bootstrap", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__["bootstrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInstance", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__["getInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Repository", function() { return _repository__WEBPACK_IMPORTED_MODULE_0__["Repository"]; });

/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deprecated */ "./core/deprecated.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return _deprecated__WEBPACK_IMPORTED_MODULE_1__["deprecated"]; });

/* harmony import */ var _id_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id-generator */ "./core/id-generator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdGenerator", function() { return _id_generator__WEBPACK_IMPORTED_MODULE_2__["IdGenerator"]; });

/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ "./core/event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "event", function() { return _event__WEBPACK_IMPORTED_MODULE_3__["event"]; });

/* harmony import */ var _fx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fx */ "./core/fx/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fx", function() { return _fx__WEBPACK_IMPORTED_MODULE_4__["Fx"]; });








/***/ }),

/***/ "./core/repository/bootstrap.js":
/*!**************************************!*\
  !*** ./core/repository/bootstrap.js ***!
  \**************************************/
/*! exports provided: bootstrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bootstrap", function() { return bootstrap; });
/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository */ "./core/repository/repository.js");


function bootstrap (data, fallbackScope) {
  let repository = window.xin;
  if (repository) {
    repository.rebootstrap(data, fallbackScope);
  } else {
    window.xin = repository = new _repository__WEBPACK_IMPORTED_MODULE_0__["Repository"](data, fallbackScope);
  }
  return repository;
}


/***/ }),

/***/ "./core/repository/get-instance.js":
/*!*****************************************!*\
  !*** ./core/repository/get-instance.js ***!
  \*****************************************/
/*! exports provided: getInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstance", function() { return getInstance; });
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ "./core/repository/bootstrap.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../deprecated */ "./core/deprecated.js");



function getInstance () {
  let { xin } = window;

  if (!xin) {
    xin = Object(_bootstrap__WEBPACK_IMPORTED_MODULE_0__["bootstrap"])(undefined, window);
  } else if ('get' in xin === false) {
    Object(_deprecated__WEBPACK_IMPORTED_MODULE_1__["deprecated"])('', 'Do not use window.xin to set configuration. Please use bootstrap(config) instead.');
    xin = Object(_bootstrap__WEBPACK_IMPORTED_MODULE_0__["bootstrap"])(xin, window);
  }

  return xin;
}


/***/ }),

/***/ "./core/repository/index.js":
/*!**********************************!*\
  !*** ./core/repository/index.js ***!
  \**********************************/
/*! exports provided: bootstrap, getInstance, Repository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootstrap */ "./core/repository/bootstrap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bootstrap", function() { return _bootstrap__WEBPACK_IMPORTED_MODULE_0__["bootstrap"]; });

/* harmony import */ var _get_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-instance */ "./core/repository/get-instance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInstance", function() { return _get_instance__WEBPACK_IMPORTED_MODULE_1__["getInstance"]; });

/* harmony import */ var _repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./repository */ "./core/repository/repository.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Repository", function() { return _repository__WEBPACK_IMPORTED_MODULE_2__["Repository"]; });






/***/ }),

/***/ "./core/repository/repository.js":
/*!***************************************!*\
  !*** ./core/repository/repository.js ***!
  \***************************************/
/*! exports provided: Repository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Repository", function() { return Repository; });
class Repository {
  constructor (data = {}, fallbackScope = window) {
    this.data = Object.assign({
      'env.debug': false,
      'customElements.version': 'v1',
    }, data);
    this.fallbackScope = fallbackScope;
  }

  rebootstrap (data = {}, fallbackScope = this.fallbackScope) {
    console.info('Repository rebootstrapping ...');
    this.data = Object.assign(this.data, data);
    this.fallbackScope = fallbackScope;
  }

  get (id) {
    if (!isNaN(id)) {
      return this.data[id];
    }

    if (id in this.data) {
      return this.data[id];
    }

    let idSplitted = id.split('.');
    let scope = this.fallbackScope;
    idSplitted.find(function (token) {
      scope = scope[token];
      return !scope;
    });

    return scope;
  }

  put (id, value) {
    if (value === undefined) {
      return this.remove(id);
    }
    this.data[id] = value;
  }

  remove (id) {
    delete this.data[id];
  }
}


/***/ }),

/***/ "./dist-src/xin.js":
/*!*************************!*\
  !*** ./dist-src/xin.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const lib = __webpack_require__(/*! ../ */ "./index.js");
const xin = lib.getInstance();
const proto = Object.getPrototypeOf(xin);
Object.setPrototypeOf(proto, lib);

xin.component = __webpack_require__(/*! ../components */ "./components/index.js");
xin.middleware = __webpack_require__(/*! ../middlewares */ "./middlewares/index.js");


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: deprecated, IdGenerator, event, define, base, Component, T, Filter, bootstrap, getInstance, Repository, Fx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./core/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["deprecated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdGenerator", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["IdGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "event", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["event"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bootstrap", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["bootstrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInstance", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["getInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Repository", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["Repository"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fx", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["Fx"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./component/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["define"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["base"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "T", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["T"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["Filter"]; });





/***/ }),

/***/ "./middlewares/index.js":
/*!******************************!*\
  !*** ./middlewares/index.js ***!
  \******************************/
/*! exports provided: Title, LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-view */ "./middlewares/lazy-view/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LazyView", function() { return _lazy_view__WEBPACK_IMPORTED_MODULE_0__["LazyView"]; });

/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./title */ "./middlewares/title.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return _title__WEBPACK_IMPORTED_MODULE_1__["Title"]; });





/***/ }),

/***/ "./middlewares/lazy-view/index.js":
/*!****************************************!*\
  !*** ./middlewares/lazy-view/index.js ***!
  \****************************************/
/*! exports provided: LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-view */ "./middlewares/lazy-view/lazy-view.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LazyView", function() { return _lazy_view__WEBPACK_IMPORTED_MODULE_0__["LazyView"]; });




/***/ }),

/***/ "./middlewares/lazy-view/lazy-view.js":
/*!********************************************!*\
  !*** ./middlewares/lazy-view/lazy-view.js ***!
  \********************************************/
/*! exports provided: LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyView", function() { return LazyView; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "./core/index.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ "./component/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components */ "./components/index.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view */ "./middlewares/lazy-view/view.js");





class LazyView extends _components__WEBPACK_IMPORTED_MODULE_2__["Middleware"] {
  get props () {
    return Object.assign({}, super.props, {
      loaders: {
        type: Array,
        value: () => {
          if (this.__repository.get('view.loaders')) {
            return this.__repository.get('view.loaders');
          }

          if (this.__repository.get('viewLoaders')) {
            Object(_core__WEBPACK_IMPORTED_MODULE_0__["deprecated"])('', 'Do not use configuration "viewLoaders". Please use "view.loaders" instead.');
            return this.__repository.get('viewLoaders');
          }

          return [];
        },
      },
    });
  }

  created () {
    super.created();

    this.views = [];
  }

  attached () {
    super.attached();

    this.loaders.push({
      test: /^xin-/,
      load (view) {
        if (view.name === 'xin-view') {
          return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../components/view */ "./components/view/index.js"));
        }

        // TODO: Official view will be only xin-view so there will be no need to have other type views
        // let name = view.name.match(/^xin-(.+)-view$/)[1];
        // return import(`../../${name}`);
      },
    });
  }

  get (uri) {
    let view = this.views.find(view => view.uri === uri);
    if (view) {
      return view;
    }

    return this.views.find(view => {
      if (view.isStaticRoute && view.uri === uri) {
        return true;
      }

      return view.route.getExecutorFor(uri);
    });
  }

  put (view) {
    this.views.push(view);
  }

  ensure (app, uri) {
    if (this.views.length === 0) {
      [].forEach.call(app.querySelectorAll('[lazy-view]'), el => {
        let loader = this.loaders.find(loader => {
          return el.nodeName.toLowerCase().match(loader.test);
        });

        let view = new _view__WEBPACK_IMPORTED_MODULE_3__["View"](this, el, loader);
        this.put(view);
      });
    }

    let view = this.get(uri);
    if (!view) {
      throw new Error('Unknown view for ' + uri);
    }

    return view.load();
  }

  callback (options) {
    const self = this;
    return async function (ctx, next) {
      await self.ensure(ctx.app, ctx.uri);

      await next();
    };
  }
}

Object(_component__WEBPACK_IMPORTED_MODULE_1__["define"])('xin-lazy-view-middleware', LazyView);


/***/ }),

/***/ "./middlewares/lazy-view/view.js":
/*!***************************************!*\
  !*** ./middlewares/lazy-view/view.js ***!
  \***************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "./core/index.js");
/* harmony import */ var _components_app_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/app/route */ "./components/app/route.js");



class View {
  constructor (bag, element, loader) {
    this.name = element.nodeName.toLowerCase();
    this.uri = element.getAttribute('uri');
    this.element = element;
    this.loader = loader;
    this.route = new _components_app_route__WEBPACK_IMPORTED_MODULE_1__["Route"](this.uri);
    this.isStaticRoute = _components_app_route__WEBPACK_IMPORTED_MODULE_1__["Route"].isStatic(this.uri);
    this.bag = bag;
  }

  get loaded () {
    if (this._loaded) {
      return true;
    }

    const loaded = this.element.classList.contains('xin-view');
    if (loaded) {
      this._loaded = true;
      return true;
    }
  }

  load () {
    return new Promise((resolve, reject) => {
      if (this.loaded) {
        return resolve();
      }

      // use global event helper because element does not created yet at this time
      Object(_core__WEBPACK_IMPORTED_MODULE_0__["event"])(this.element).once('routed', () => {
        this._loaded = true;
        resolve();
      });

      if (!this.loader) {
        throw new Error(`Cannot lazy load view: ${this.name}`);
      }

      this.loader.load(this);
    });
  }
}


/***/ }),

/***/ "./middlewares/title.js":
/*!******************************!*\
  !*** ./middlewares/title.js ***!
  \******************************/
/*! exports provided: Title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return Title; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./component/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components */ "./components/index.js");



class Title extends _components__WEBPACK_IMPORTED_MODULE_1__["Middleware"] {
  get props () {
    return Object.assign({}, super.props, {
      defaultTitle: {
        type: String,
        value: 'Unknown',
      },
    });
  }

  callback (options) {
    const self = this;
    return async function (ctx, next) {
      ctx.app.once('focus', (evt) => {
        document.title = evt.target.title || self.defaultTitle;
      });

      await next();
    };
  }
}

Object(_component__WEBPACK_IMPORTED_MODULE_0__["define"])('xin-title-middleware', Title);


/***/ }),

/***/ "./node_modules/css-loader/index.js!./components/app/app.css":
/*!**********************************************************!*\
  !*** ./node_modules/css-loader!./components/app/app.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".xin-app {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./components/for/for.css":
/*!**********************************************************!*\
  !*** ./node_modules/css-loader!./components/for/for.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "xin-for {\n  display: none;\n  visibility: hidden;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./components/pager/pager.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader!./components/pager/pager.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "xin-pager {\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n\nxin-pager .xin-view {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./components/view/view.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader!./components/view/view.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".xin-view {\n  box-sizing: border-box;\n  display: none;\n}\n\n.xin-view.xin-view--visible {\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./core/fx/fx.css":
/*!**************************************************!*\
  !*** ./node_modules/css-loader!./core/fx/fx.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".trans-slide__in-left {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n  display: block!important;\n}\n\n.trans-slide__in-right {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  display: block!important;\n}\n\n.trans-slide__out-left,\n.trans-slide__out-right {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  display: block!important;\n}\n\n.trans-slide__animate {\n  will-change: transform, -webkit-transform;\n  -webkit-transition: -webkit-transform ease-out 200ms;\n  transition: transform ease-out 200ms;\n  z-index: 999;\n}\n\n.trans-slide__out {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n.trans-slide__out.trans-slide__out-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n.trans-slide__in {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n.trans-fade__in,\n.trans-fade__out {\n  display: block!important;\n  opacity: 0;\n  will-change: opacity;\n  -webkit-transition: opacity ease-in 200ms;\n  transition: opacity ease-in 200ms;\n}\n\n.trans-fade__out {\n  opacity: 1;\n}\n\n.trans-fade__in-animate {\n  opacity: 1;\n}\n\n.trans-fade__out-animate {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/sprintf-js/src/sprintf.js":
/*!************************************************!*\
  !*** ./node_modules/sprintf-js/src/sprintf.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (Array.isArray(parse_tree[i])) {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                        break
                    case 'e':
                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                        break
                    case 'g':
                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(match[8])) {
                    output += arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }
                parse_tree.push(match)
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}()


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./object/deserialize.js":
/*!*******************************!*\
  !*** ./object/deserialize.js ***!
  \*******************************/
/*! exports provided: deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deserialize", function() { return deserialize; });
function deserialize (value, type) {
  switch (type) {
    case Number:
      value = Number(value);
      break;

    case Boolean:
      value = Boolean(value === '' || value === 'true' || value === '1' || value === 'on');
      break;

    case Object:
      try {
        value = JSON.parse(value);
      } catch (err) {
        // allow non-JSON literals like Strings and Numbers
        // console.warn('Failed decode json: "' + value + '" to Object');
      }
      break;

    case Array:
      try {
        value = JSON.parse(value);
      } catch (err) {
        // .console.warn('Failed decode json: "' + value + '" to Array');
        value = null;
      }
      break;

    case Date:
      value = new Date(value);
      break;

    case RegExp:
      value = new RegExp(value);
      break;

    case Function:
      value = new Function(value); // eslint-disable-line
      break;

    // behave like default for now
    // case String:
    default:
      break;
  }
  return value;
}


/***/ }),

/***/ "./object/index.js":
/*!*************************!*\
  !*** ./object/index.js ***!
  \*************************/
/*! exports provided: val, serialize, deserialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _val__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./val */ "./object/val.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "val", function() { return _val__WEBPACK_IMPORTED_MODULE_0__["val"]; });

/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serialize */ "./object/serialize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return _serialize__WEBPACK_IMPORTED_MODULE_1__["serialize"]; });

/* harmony import */ var _deserialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deserialize */ "./object/deserialize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deserialize", function() { return _deserialize__WEBPACK_IMPORTED_MODULE_2__["deserialize"]; });






/***/ }),

/***/ "./object/serialize.js":
/*!*****************************!*\
  !*** ./object/serialize.js ***!
  \*****************************/
/*! exports provided: serialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return serialize; });
function serialize (value) {
  switch (typeof value) {
    case 'boolean':
      return value ? '' : undefined;

    case 'object':
      if (value instanceof Date) {
        return value;
      } else if (value instanceof RegExp) {
        return value.toString().slice(1, -1);
      } else if (value) {
        try {
          return JSON.stringify(value);
        } catch (err) {
          return '';
        }
      }
      break;
    default:
      // noop
  }
  return value === null ? undefined : value;
}


/***/ }),

/***/ "./object/val.js":
/*!***********************!*\
  !*** ./object/val.js ***!
  \***********************/
/*! exports provided: val */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "val", function() { return val; });
function val (value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
};


/***/ }),

/***/ "./string/camelize.js":
/*!****************************!*\
  !*** ./string/camelize.js ***!
  \****************************/
/*! exports provided: camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelize", function() { return camelize; });
let camelized = {};

function camelize (dash) {
  let mapped = camelized[dash];
  if (mapped) {
    return mapped;
  }
  if (dash.indexOf('-') < 0) {
    camelized[dash] = dash;
  } else {
    camelized[dash] = dash.replace(/-([a-z])/g,
      function (m) {
        return m[1].toUpperCase();
      }
    );
  }

  return camelized[dash];
}


/***/ }),

/***/ "./string/dashify.js":
/*!***************************!*\
  !*** ./string/dashify.js ***!
  \***************************/
/*! exports provided: dashify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dashify", function() { return dashify; });
let dashified = {};

function dashify (camel) {
  let mapped = dashified[camel];
  if (mapped) {
    return mapped;
  }
  dashified[camel] = camel.replace(/([a-z][A-Z])/g,
    function (g) {
      return g[0] + '-' + g[1].toLowerCase();
    }
  );

  return dashified[camel];
}


/***/ }),

/***/ "./string/index.js":
/*!*************************!*\
  !*** ./string/index.js ***!
  \*************************/
/*! exports provided: dashify, camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashify */ "./string/dashify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dashify", function() { return _dashify__WEBPACK_IMPORTED_MODULE_0__["dashify"]; });

/* harmony import */ var _camelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camelize */ "./string/camelize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "camelize", function() { return _camelize__WEBPACK_IMPORTED_MODULE_1__["camelize"]; });





/***/ })

/******/ });
//# sourceMappingURL=xin.js.map