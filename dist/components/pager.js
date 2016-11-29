webpackJsonp([1],{

/***/ 1:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
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


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "xin-pager {\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\n\nxin-pager .xin-view {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ },

/***/ 3:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fx__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_pager_css__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_pager_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_pager_css__);





class Pager extends __WEBPACK_IMPORTED_MODULE_0____["default"].Component {
  ready() {
    super.ready();

    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {
      if ('set' in el) {
        el.set('index', i);
      } else {
        el.setAttribute('index', i);
      }
    }
  }

  setFocus(element) {
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

  __transitionBackward(prevEl, nextEl) {
    Promise.all([nextEl.inFx.play(-1), prevEl.outFx.play(-1)]).then(() => {
      prevEl.setVisible(false);
      nextEl.setVisible(true);
      prevEl.setFocus(false);
      nextEl.setFocus(true);
      this.$focused = nextEl;

      nextEl.inFx.stop();
      prevEl.outFx.stop();
    });
  }

  __transitionForward(prevEl, nextEl) {
    if (prevEl) {
      Promise.all([nextEl.inFx.play(1), prevEl.outFx.play(1)]).then(() => {
        prevEl.setVisible(false);
        nextEl.setVisible(true);
        prevEl.setFocus(false);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        nextEl.inFx.stop();
        prevEl.outFx.stop();
      });
    } else {
      let transitionFx = new __WEBPACK_IMPORTED_MODULE_1__fx__["a" /* default */]({
        element: nextEl,
        transition: 'none'
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

__WEBPACK_IMPORTED_MODULE_0____["default"].define('xin-pager', Pager);
// xin.Pager = Pager;

/* harmony default export */ exports["default"] = Pager;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_function_helper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_transition_animate_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_transition_animate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_transition_animate_css__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class Fx {
  static add(name, transition) {
    adapters[name] = transition;
  }

  static get(name) {
    return adapters[name] || adapters.none;
  }

  constructor(options) {
    options = options || {};
    this.element = options.element;
    this.duration = options.duration || 0;
    this.transition = options.transition || 'none';
    this.method = options.method || '';

    this.adapter = options.adapter || Fx.get(this.transition);

    this.running = false;
    this.direction = 0;
  }

  play(direction) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.running = true;
      _this.direction = direction;

      yield _this.adapter.play(_this);
    })();
  }

  stop() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.adapter.stop(_this2);

      _this2.running = false;
      _this2.direction = 0;
    })();
  }
}

const adapters = {
  'none': {
    play() {
      return _asyncToGenerator(function* () {})();
    },
    stop() {
      return _asyncToGenerator(function* () {})();
    }
  },
  'slide': {
    play(fx) {
      return new Promise(resolve => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(fx.element).once('transitionend', () => {
          fx.element.classList.remove('trans-slide__animate');
          resolve();
        });
        fx.element.classList.add(`trans-slide__${ fx.method }-${ fx.direction > 0 ? 'left' : 'right' }`);

        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.add('trans-slide__animate');
          __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => fx.element.classList.add(`trans-slide__${ fx.method }`));
        });
      });
    },
    stop(fx) {
      return new Promise(resolve => {
        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.remove(`trans-slide__${ fx.method }-${ fx.direction > 0 ? 'left' : 'right' }`);
          fx.element.classList.remove(`trans-slide__${ fx.method }`);
          resolve();
        });
      });
    }
  },
  'fade': {
    play(fx) {
      return new Promise(resolve => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(fx.element).once('transitionend', () => {
          resolve();
        });

        fx.element.classList.add(`trans-fade__${ fx.method }`);

        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.add(`trans-fade__${ fx.method }-animate`);
        });
      });
    },
    stop(fx) {
      return new Promise(resolve => {
        fx.element.classList.remove(`trans-fade__${ fx.method }`);

        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.remove(`trans-fade__${ fx.method }-animate`);
          resolve();
        });
      });
    }
  }
};

/* harmony default export */ exports["a"] = Fx;

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".trans-slide__in-left {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n  display: block!important;\n}\n\n.trans-slide__in-right {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  display: block!important;\n}\n\n.trans-slide__out-left,\n.trans-slide__out-right {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  display: block!important;\n}\n\n.trans-slide__animate {\n  will-change: transform, -webkit-transform;\n  -webkit-transition: -webkit-transform ease-out .2s;\n  transition: transform ease-out .2s;\n  z-index: 999;\n}\n\n.trans-slide__out {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n.trans-slide__out.trans-slide__out-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n.trans-slide__in {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n.trans-fade__in,\n.trans-fade__out {\n  display: block!important;\n  opacity: 0;\n  will-change: opacity;\n  transition: opacity ease-in .2s;\n}\n\n.trans-fade__out {\n  opacity: 1;\n}\n\n.trans-fade__in-animate {\n  opacity: 1;\n}\n\n.trans-fade__out-animate {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./transition-animate.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./transition-animate.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }

},[38]);
//# sourceMappingURL=pager.js.map