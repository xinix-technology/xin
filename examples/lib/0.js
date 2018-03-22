(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../../components/app/app.css":
/*!**************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/app/app.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./app.css */ \"../../node_modules/css-loader/index.js!../../components/app/app.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/app/app.css?");

/***/ }),

/***/ "../../components/app/app.js":
/*!*************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/app/app.js ***!
  \*************************************************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return App; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ \"../../component/index.js\");\n/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route */ \"../../components/app/route.js\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.css */ \"../../components/app/app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\nclass App extends _component__WEBPACK_IMPORTED_MODULE_1__[\"Component\"] {\n  get props () {\n    return {\n      title: {\n        type: String,\n        observer: '_titleChanged',\n      },\n\n      manual: {\n        type: Boolean,\n      },\n\n      mode: {\n        type: String,\n        value: 'hash',\n      },\n\n      rootUri: {\n        type: String,\n        value: '/',\n      },\n\n      hash: {\n        type: String,\n        value: '#!',\n      },\n\n      delay: {\n        type: Number,\n        value: 1, // working for safari (delay=1), chrome (delay=0)\n      },\n    };\n  }\n\n  get hashRegexp () {\n    if (!this._hashRegexp || this._hash !== this.hash) {\n      this._hashRegexp = new RegExp(`${this.hash}(.*)$`);\n      this._hash = this.hash;\n    }\n\n    return this._hashRegexp;\n  }\n\n  notFound (fragment) {\n    console.warn(`Route not found: ${fragment}`);\n  }\n\n  _titleChanged (title) {\n    if (title) {\n      document.title = title;\n    }\n  }\n\n  created () {\n    // removed putting app to core scope\n    // put('app', this);\n\n    this.__appSignature = true;\n    this.location = window.location;\n    this.history = window.history;\n\n    // default values\n    this.handlers = [];\n    this.middlewares = [];\n\n    this.__started = false;\n    this.__starting = false;\n\n    this.classList.add('xin-app');\n  }\n\n  attached () {\n    if (this.manual) {\n      return;\n    }\n\n    this.async(() => {\n      this.start();\n    }, this.delay);\n  }\n\n  route (route, callback) {\n    this.handlers.push(new _route__WEBPACK_IMPORTED_MODULE_2__[\"Route\"](route, callback));\n  }\n\n  async start () {\n    if (this.__started || this.__starting) {\n      return;\n    }\n\n    this.__middlewareChainRun = compose(this.middlewares);\n\n    this.__listenNavigation();\n\n    console.info(`Starting ${this.is}:${this.__id} ...`);\n\n    this.__starting = true;\n    let executed = await this.__execute();\n    this.__starting = false;\n\n    if (executed) {\n      console.info(`Started ${this.is}:${this.__id}`);\n\n      this.__started = true;\n\n      this.fire('started');\n    }\n  }\n\n  __listenNavigation () {\n    let callback = () => {\n      this.__execute();\n    };\n\n    if (this.mode === 'history') {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).on('popstate', callback);\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(document).on('click', evt => {\n        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {\n          evt.preventDefault();\n\n          let state = { url: evt.target.getAttribute('href') };\n          this.history.pushState(state, evt.target.innerHTML, evt.target.href);\n\n          callback();\n        }\n      });\n    } else {\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(window).on('hashchange', callback);\n    }\n  }\n\n  get started () {\n    return this.__started || false;\n  }\n\n  getFragmentExecutors (fragment) {\n    return this.handlers.reduce((executors, handler) => {\n      let executor = handler.getExecutorFor(fragment);\n      if (executor) executors.push(executor);\n      return executors;\n    }, []);\n  }\n\n  async __execute () {\n    let fragment = this.getFragment();\n    let context = { app: this, uri: fragment };\n\n    // run middleware chain then execute all executors\n    let willContinue = await this.__middlewareChainRun(context, () => {\n      let executors = this.getFragmentExecutors(context.uri);\n      if (executors.length === 0) {\n        this.notFound(fragment);\n        this.fire('route-not-found', fragment);\n        return;\n      }\n\n      executors.forEach(executor => {\n        executor.handler.callback(executor.args, context);\n      });\n    });\n\n    if (willContinue === false) {\n      return false;\n    }\n\n    this.fire('navigated', context);\n    return true;\n  }\n\n  navigate (path, options) {\n    path = path || '/';\n    options = options || {};\n\n    if (this.mode === 'history') {\n      let url = this.rootUri + path.toString().replace(/\\/$/, '').replace(/^\\//, '');\n      if (this.location.href.replace(this.location.origin, '') !== url) {\n        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);\n        this.__execute();\n      }\n    } else {\n      if (options.replace) {\n        this.location.replace(this.hash + path);\n      } else {\n        this.location.hash = this.hash + path;\n      }\n    }\n    return this;\n  }\n\n  use (middleware) {\n    this.middlewares.push(middleware);\n  }\n\n  getFragment () {\n    try {\n      let fragment;\n      if (this.mode === 'history') {\n        fragment = decodeURI(this.location.pathname + this.location.search);\n        fragment = fragment.replace(/\\?(.*)$/, '');\n        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');\n      } else {\n        let match = this.location.href.match(this.hashRegexp);\n        fragment = match ? match[1] : '';\n      }\n\n      return '/' + fragment.toString().replace(/\\/$/, '').replace(/^\\//, '');\n    } catch (err) {\n      console.error('Fragment is not match any pattern, fallback to /');\n      return '/';\n    }\n  }\n\n  // $back (evt) {\n  //   evt.preventDefault();\n  //   this.history.back();\n  // }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_1__[\"define\"])('xin-app', App);\n\nfunction compose (middlewares) {\n  for (let fn of middlewares) {\n    if (typeof fn !== 'function') {\n      throw new TypeError('Middleware must be composed of functions!');\n    }\n  }\n\n  return (context, next) => {\n    // last called middlewares #\n    let index = -1;\n\n    function dispatch (i) {\n      if (i <= index) {\n        throw new Error('next() called multiple times');\n      }\n\n      index = i;\n      let fn = middlewares[i];\n      if (i === middlewares.length) {\n        fn = next;\n      }\n      if (!fn) {\n        return;\n      }\n\n      return fn(context, () => dispatch(i + 1));\n    }\n\n    return dispatch(0);\n  };\n}\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/app/app.js?");

/***/ }),

/***/ "../../components/app/index.js":
/*!***************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/app/index.js ***!
  \***************************************************************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"../../components/app/app.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return _app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/app/index.js?");

/***/ }),

/***/ "../../components/app/route.js":
/*!***************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/app/route.js ***!
  \***************************************************************/
/*! exports provided: Route */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Route\", function() { return Route; });\nclass Route {\n  static routeRegExp (str) {\n    let chunks = str.split('[');\n\n    if (chunks.length > 2) {\n      throw new Error('Invalid use of optional params');\n    }\n\n    let tokens = [];\n    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {\n      tokens.push(token);\n      return '([^/]+)';\n    }).replace(/\\//g, '\\\\/');\n\n    let optRe = '';\n\n    if (chunks[1]) {\n      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {\n        let [ realToken, re = '[^/]+' ] = token.split(':');\n        tokens.push(realToken);\n        return `(${re})`;\n      }).replace(/\\//g, '\\\\/') + ')?';\n    }\n\n    return [ new RegExp('^' + re + optRe + '$'), tokens ];\n  }\n\n  static isStatic (pattern) {\n    return !pattern.match(/[[{]/);\n  }\n\n  constructor (route, callback) {\n    this.route = route;\n    this.callback = callback;\n\n    if (Route.isStatic(route)) {\n      this.type = 's';\n      this.pattern = null;\n      this.args = [];\n    } else {\n      let result = Route.routeRegExp(route);\n      this.type = 'v';\n      this.pattern = result[0];\n      this.args = result[1];\n    }\n  }\n\n  getExecutorFor (fragment) {\n    if (this.type === 's') {\n      if (fragment === this.route) {\n        return { handler: this, args: {} };\n      }\n    } else if (this.type === 'v') {\n      let result = fragment.match(this.pattern);\n      if (result) {\n        return {\n          handler: this,\n          args: this.args.reduce((args, name, index) => {\n            args[name] = result[index + 1];\n            return args;\n          }, {}),\n        };\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/app/route.js?");

/***/ }),

/***/ "../../components/fixture.js":
/*!*************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/fixture.js ***!
  \*************************************************************/
/*! exports provided: Fixture, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return Fixture; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../../component/index.js\");\n\n\nclass Fixture extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  static create (template, data = {}) {\n    const t = `\n      <xin-fixture>\n        <template>\n          ${template}\n        </template>\n      </xin-fixture>\n    `;\n    const d = document.createElement('div');\n    d.innerHTML = t;\n    const fixture = d.querySelector('xin-fixture');\n\n    for (let i in data) {\n      fixture[i] = data[i];\n    }\n\n    document.body.appendChild(fixture);\n\n    return fixture;\n  }\n\n  attached () {\n    super.attached();\n    this.connected = true;\n\n    // delay connected to make sure children is already connected\n    this.async(() => {\n      this.fire('connected');\n    });\n  }\n\n  detached () {\n    super.detached();\n    this.connected = false;\n\n    this.fire('disconnected');\n  }\n\n  dispose () {\n    this.parentElement.removeChild(this);\n    this.connected = false;\n  }\n\n  async waitConnected (timeout) {\n    await new Promise(resolve => {\n      if (this.connected) {\n        resolve();\n      } else {\n        this.once('connected', resolve);\n      }\n    });\n\n    await this.wait(timeout);\n  }\n\n  wait (timeout = 0) {\n    return new Promise(resolve => {\n      this.async(resolve, timeout);\n    });\n  }\n\n  async waitDisconnected (timeout) {\n    await new Promise(resolve => {\n      if (this.connected) {\n        this.once('disconnected', resolve);\n      } else {\n        resolve();\n      }\n    });\n\n    await this.wait(timeout);\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-fixture', Fixture);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Fixture);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/fixture.js?");

/***/ }),

/***/ "../../components/for/for.css":
/*!**************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/for/for.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./for.css */ \"../../node_modules/css-loader/index.js!../../components/for/for.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/for/for.css?");

/***/ }),

/***/ "../../components/for/for.js":
/*!*************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/for/for.js ***!
  \*************************************************************/
/*! exports provided: For, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return For; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../../component/index.js\");\n/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./row */ \"../../components/for/row.js\");\n/* harmony import */ var _for_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./for.css */ \"../../components/for/for.css\");\n/* harmony import */ var _for_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_for_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nconst FILTER_ALL = () => true;\n\nclass For extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      items: {\n        type: Array,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      as: {\n        type: String,\n        value: 'item',\n      },\n\n      indexAs: {\n        type: String,\n        value: 'index',\n      },\n\n      filter: {\n        type: Function,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      to: {\n        type: String,\n        value: '',\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.rows = [];\n  }\n\n  __initTemplate () {\n    this.__templateFor = this.firstElementChild;\n    if (!this.__templateFor) {\n      throw new Error('Invalid xin-for definition, must be <xin-for items=\"[[items]]\"><template>...</template></xin-for>');\n    }\n    // this.__templateFor.__templateHost = this.__templateHost;\n    this.removeChild(this.__templateFor);\n\n    let marker = this;\n    let toAttr = this.getAttribute('to');\n    if (toAttr) {\n      let container = document.querySelector(toAttr);\n      if (!container) {\n        throw new Error(`xin-for render to unknown element ${toAttr}`);\n      }\n      marker = document.createComment(`marker-for`);\n      container.appendChild(marker);\n    }\n\n    _component__WEBPACK_IMPORTED_MODULE_0__[\"T\"].prototype.__templateInitialize.call(this, null, this, marker);\n  }\n\n  _itemsChanged (items, filter) {\n    this.debounce('_itemsChanged', () => {\n      let len = 0;\n\n      if (items && items.length) {\n        let filter = this.filter || FILTER_ALL;\n        items.filter(filter).forEach((item, index) => {\n          if (this.rows[index]) {\n            this.rows[index].update(item, index);\n          } else {\n            this.rows.push(new _row__WEBPACK_IMPORTED_MODULE_1__[\"Row\"](this.__templateFor, this, item, index));\n          }\n\n          len++;\n        });\n      }\n\n      // move to detach\n      this.rows.splice(len).forEach(row => {\n        row.__templateUninitialize();\n      });\n    });\n  }\n\n  itemForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.as);\n  }\n\n  indexForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.indexAs);\n  }\n\n  modelForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel;\n  }\n}\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-for', For);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (For);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/for/for.js?");

/***/ }),

/***/ "../../components/for/index.js":
/*!***************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/for/index.js ***!
  \***************************************************************/
/*! exports provided: For, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for */ \"../../components/for/for.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_0__[\"For\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_for__WEBPACK_IMPORTED_MODULE_0__[\"For\"]);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/for/index.js?");

/***/ }),

/***/ "../../components/for/row.js":
/*!*************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/for/row.js ***!
  \*************************************************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Row\", function() { return Row; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../../component/index.js\");\n\n\nclass Row extends _component__WEBPACK_IMPORTED_MODULE_0__[\"T\"] {\n  constructor (template, host, item, index) {\n    super();\n\n    // override T constructor\n    this.__templateInitialize(template, host.__templateModel, host.__templateMarker);\n\n    this.is = '$repeat-row';\n    this.__id = this.__templateId;\n\n    this.__repeat = host;\n    this.__repeatAs = host.as;\n    this.__repeatIndexAs = host.indexAs;\n\n    this.__templateChildNodes.forEach(node => {\n      if (node.nodeType === window.Node.ELEMENT_NODE) {\n        node.__repeatModel = this;\n      }\n    });\n\n    this.update(item, index);\n\n    this.__templateRender();\n  }\n\n  get __app () {\n    return this.__templateHost.__app;\n  }\n\n  update (item, index) {\n    this[this.__repeatAs] = item;\n    this[this.__repeatIndexAs] = index;\n    this.notify(this.__repeatAs, item);\n    this.notify(this.__repeatIndexAs, index);\n  }\n\n  set (path, value) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.set(path, value);\n    }\n\n    return this.__templateHost.set(path, value);\n  }\n\n  get (path) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.get(path);\n    }\n\n    return this.__templateHost.get(path);\n  }\n\n  notify (path, value) {\n    path = this.__templateGetPathAsArray(path);\n\n    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {\n      return super.notify(path, value);\n    }\n\n    return this.__templateHost.notify(path, value);\n  }\n}\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/for/row.js?");

/***/ }),

/***/ "../../components/index.js":
/*!***********************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/index.js ***!
  \***********************************************************/
/*! exports provided: App, Fixture, Middleware, Pager, For, Repeat, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"../../components/app/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"App\", function() { return _app__WEBPACK_IMPORTED_MODULE_0__[\"App\"]; });\n\n/* harmony import */ var _fixture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixture */ \"../../components/fixture.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Fixture\", function() { return _fixture__WEBPACK_IMPORTED_MODULE_1__[\"Fixture\"]; });\n\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ \"../../components/middleware.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Middleware\", function() { return _middleware__WEBPACK_IMPORTED_MODULE_2__[\"Middleware\"]; });\n\n/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pager */ \"../../components/pager/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return _pager__WEBPACK_IMPORTED_MODULE_3__[\"Pager\"]; });\n\n/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./for */ \"../../components/for/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"For\", function() { return _for__WEBPACK_IMPORTED_MODULE_4__[\"For\"]; });\n\n/* harmony import */ var _repeat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./repeat */ \"../../components/repeat.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Repeat\", function() { return _repeat__WEBPACK_IMPORTED_MODULE_5__[\"Repeat\"]; });\n\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view */ \"../../components/view/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return _view__WEBPACK_IMPORTED_MODULE_6__[\"View\"]; });\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/index.js?");

/***/ }),

/***/ "../../components/middleware.js":
/*!****************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/middleware.js ***!
  \****************************************************************/
/*! exports provided: Middleware, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Middleware\", function() { return Middleware; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../../component/index.js\");\n\n\nclass Middleware extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  attached () {\n    super.attached();\n\n    this.__app.use(this.callback());\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Middleware);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/middleware.js?");

/***/ }),

/***/ "../../components/pager/index.js":
/*!*****************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/pager/index.js ***!
  \*****************************************************************/
/*! exports provided: Pager, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pager */ \"../../components/pager/pager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return _pager__WEBPACK_IMPORTED_MODULE_0__[\"Pager\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_pager__WEBPACK_IMPORTED_MODULE_0__[\"Pager\"]);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/pager/index.js?");

/***/ }),

/***/ "../../components/pager/pager.css":
/*!******************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/pager/pager.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!./pager.css */ \"../../node_modules/css-loader/index.js!../../components/pager/pager.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"../../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/pager/pager.css?");

/***/ }),

/***/ "../../components/pager/pager.js":
/*!*****************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/pager/pager.js ***!
  \*****************************************************************/
/*! exports provided: Pager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pager\", function() { return Pager; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component */ \"../../component/index.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ \"../../core/index.js\");\n/* harmony import */ var _pager_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pager.css */ \"../../components/pager/pager.css\");\n/* harmony import */ var _pager_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pager_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nclass Pager extends _component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n  ready () {\n    super.ready();\n\n    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {\n      if ('set' in el) {\n        el.set('index', i);\n      } else {\n        el.setAttribute('index', i);\n      }\n    }\n  }\n\n  setFocus (element) {\n    if (element) {\n      let index = element.index;\n      let oldIndex = this.focused$ ? this.focused$.index : -1;\n      if (oldIndex < index) {\n        this.__transitionForward(this.focused$, element);\n      } else if (oldIndex > index) {\n        this.__transitionBackward(this.focused$, element);\n      }\n    } else if (this.focused$) {\n      this.focused$.setFocus(false);\n    }\n\n    this.focused$ = element;\n  }\n\n  __transitionBackward (prevEl, nextEl) {\n    Promise.all([\n      nextEl.inFx.play(-1),\n      prevEl.outFx.play(-1),\n    ]).then(() => {\n      prevEl.setVisible(false);\n      nextEl.setVisible(true);\n      prevEl.setFocus(false);\n      nextEl.setFocus(true);\n      this.$focused = nextEl;\n\n      nextEl.inFx.stop();\n      prevEl.outFx.stop();\n    });\n  }\n\n  __transitionForward (prevEl, nextEl) {\n    if (prevEl) {\n      Promise.all([\n        nextEl.inFx.play(1),\n        prevEl.outFx.play(1),\n      ]).then(() => {\n        prevEl.setVisible(false);\n        nextEl.setVisible(true);\n        prevEl.setFocus(false);\n        nextEl.setFocus(true);\n        this.$focused = nextEl;\n\n        nextEl.inFx.stop();\n        prevEl.outFx.stop();\n      });\n    } else {\n      let transitionFx = new _core__WEBPACK_IMPORTED_MODULE_1__[\"Fx\"]({\n        element: nextEl,\n        transition: 'none',\n      });\n\n      transitionFx.play('in', 1).then(() => {\n        nextEl.setVisible(true);\n        nextEl.setFocus(true);\n        this.$focused = nextEl;\n\n        transitionFx.stop();\n      });\n    }\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-pager', Pager);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/pager/pager.js?");

/***/ }),

/***/ "../../components/repeat.js":
/*!************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/components/repeat.js ***!
  \************************************************************/
/*! exports provided: Repeat, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Repeat\", function() { return Repeat; });\n/* harmony import */ var _for_row__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./for/row */ \"../../components/for/row.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core */ \"../../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component */ \"../../component/index.js\");\n\n\n\n\nconst FILTER_ALL = () => true;\n\nclass Repeat extends Object(_component__WEBPACK_IMPORTED_MODULE_2__[\"base\"])('HTMLTemplateElement') {\n  get props () {\n    return Object.assign({}, super.props, {\n      items: {\n        type: Array,\n        observer: '_itemsChanged(items, filter)',\n      },\n\n      as: {\n        type: String,\n        value: 'item',\n      },\n\n      indexAs: {\n        type: String,\n        value: 'index',\n      },\n\n      filter: {\n        type: Function,\n        observer: '_itemsChanged(items, filter)',\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"deprecated\"])('components/repeat', 'Please use xin-for instead');\n\n    this.rows = [];\n  }\n\n  __initTemplate () {\n    _component__WEBPACK_IMPORTED_MODULE_2__[\"T\"].prototype.__templateInitialize.call(this, null, this);\n  }\n\n  _itemsChanged (items, filter) {\n    this.debounce('_itemsChanged', () => {\n      let len = 0;\n\n      if (items && items.length) {\n        let filter = this.filter || FILTER_ALL;\n        items.filter(filter).forEach((item, index) => {\n          if (this.rows[index]) {\n            this.rows[index].update(item, index);\n          } else {\n            this.rows.push(new _for_row__WEBPACK_IMPORTED_MODULE_0__[\"Row\"](this, this, item, index));\n          }\n\n          len++;\n        });\n      }\n\n      // move to detach\n      this.rows.splice(len).forEach(row => {\n        row.__templateUninitialize();\n      });\n    });\n  }\n\n  itemForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.as);\n  }\n\n  indexForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel.get(this.indexAs);\n  }\n\n  modelForElement (element) {\n    while (element && !element.__repeatModel) {\n      element = element.parentElement;\n    }\n    return element.__repeatModel;\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_2__[\"define\"])('xin-repeat', Repeat, { extends: 'template' });\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Repeat);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/repeat.js?");

/***/ }),

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

/***/ "../../middlewares/index.js":
/*!************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/middlewares/index.js ***!
  \************************************************************/
/*! exports provided: Title, LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lazy_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-view */ \"../../middlewares/lazy-view/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return _lazy_view__WEBPACK_IMPORTED_MODULE_0__[\"LazyView\"]; });\n\n/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./title */ \"../../middlewares/title.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Title\", function() { return _title__WEBPACK_IMPORTED_MODULE_1__[\"Title\"]; });\n\n\n\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/middlewares/index.js?");

/***/ }),

/***/ "../../middlewares/lazy-view/index.js":
/*!**********************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/middlewares/lazy-view/index.js ***!
  \**********************************************************************/
/*! exports provided: LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lazy_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-view */ \"../../middlewares/lazy-view/lazy-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return _lazy_view__WEBPACK_IMPORTED_MODULE_0__[\"LazyView\"]; });\n\n\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/middlewares/lazy-view/index.js?");

/***/ }),

/***/ "../../middlewares/lazy-view/lazy-view.js":
/*!**************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/middlewares/lazy-view/lazy-view.js ***!
  \**************************************************************************/
/*! exports provided: LazyView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LazyView\", function() { return LazyView; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../../core/index.js\");\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component */ \"../../component/index.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components */ \"../../components/index.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view */ \"../../middlewares/lazy-view/view.js\");\n\n\n\n\n\nclass LazyView extends _components__WEBPACK_IMPORTED_MODULE_2__[\"Middleware\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      loaders: {\n        type: Array,\n        value: () => {\n          if (this.__repository.get('view.loaders')) {\n            return this.__repository.get('view.loaders');\n          }\n\n          if (this.__repository.get('viewLoaders')) {\n            Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"deprecated\"])('', 'Do not use configuration \"viewLoaders\". Please use \"view.loaders\" instead.');\n            return this.__repository.get('viewLoaders');\n          }\n\n          return [];\n        },\n      },\n    });\n  }\n\n  created () {\n    super.created();\n\n    this.views = [];\n  }\n\n  attached () {\n    super.attached();\n\n    this.loaders.push({\n      test: /^xin-/,\n      load (view) {\n        if (view.name === 'xin-view') {\n          return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../components/view */ \"../../components/view/index.js\"));\n        }\n\n        // TODO: Official view will be only xin-view so there will be no need to have other type views\n        // let name = view.name.match(/^xin-(.+)-view$/)[1];\n        // return import(`../../${name}`);\n      },\n    });\n  }\n\n  get (uri) {\n    let view = this.views.find(view => view.uri === uri);\n    if (view) {\n      return view;\n    }\n\n    return this.views.find(view => {\n      if (view.isStaticRoute && view.uri === uri) {\n        return true;\n      }\n\n      return view.route.getExecutorFor(uri);\n    });\n  }\n\n  put (view) {\n    this.views.push(view);\n  }\n\n  ensure (app, uri) {\n    if (this.views.length === 0) {\n      [].forEach.call(app.querySelectorAll('[lazy-view]'), el => {\n        let loader = this.loaders.find(loader => {\n          return el.nodeName.toLowerCase().match(loader.test);\n        });\n\n        let view = new _view__WEBPACK_IMPORTED_MODULE_3__[\"View\"](this, el, loader);\n        this.put(view);\n      });\n    }\n\n    let view = this.get(uri);\n    if (!view) {\n      throw new Error('Unknown view for ' + uri);\n    }\n\n    return view.load();\n  }\n\n  callback (options) {\n    const self = this;\n    return async function (ctx, next) {\n      await self.ensure(ctx.app, ctx.uri);\n\n      await next();\n    };\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_1__[\"define\"])('xin-lazy-view-middleware', LazyView);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/middlewares/lazy-view/lazy-view.js?");

/***/ }),

/***/ "../../middlewares/lazy-view/view.js":
/*!*********************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/middlewares/lazy-view/view.js ***!
  \*********************************************************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"../../core/index.js\");\n/* harmony import */ var _components_app_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/app/route */ \"../../components/app/route.js\");\n\n\n\nclass View {\n  constructor (bag, element, loader) {\n    this.name = element.nodeName.toLowerCase();\n    this.uri = element.getAttribute('uri');\n    this.element = element;\n    this.loader = loader;\n    this.route = new _components_app_route__WEBPACK_IMPORTED_MODULE_1__[\"Route\"](this.uri);\n    this.isStaticRoute = _components_app_route__WEBPACK_IMPORTED_MODULE_1__[\"Route\"].isStatic(this.uri);\n    this.bag = bag;\n  }\n\n  get loaded () {\n    if (this._loaded) {\n      return true;\n    }\n\n    const loaded = this.element.classList.contains('xin-view');\n    if (loaded) {\n      this._loaded = true;\n      return true;\n    }\n  }\n\n  load () {\n    return new Promise((resolve, reject) => {\n      if (this.loaded) {\n        return resolve();\n      }\n\n      if (!this.loader) {\n        return reject(new Error(`Cannot lazy load view: ${this.name}`));\n      }\n\n      // use global event helper because element does not created yet at this time\n      Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"event\"])(this.element).once('routed', () => {\n        this._loaded = true;\n\n        // FIXME: hack to wait for sub views to be ready before routed\n        if (this.element.querySelector('.xin-view')) {\n          setTimeout(() => resolve(), 300);\n        } else {\n          resolve();\n        }\n      });\n\n      this.loader.load(this);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/middlewares/lazy-view/view.js?");

/***/ }),

/***/ "../../middlewares/title.js":
/*!************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/middlewares/title.js ***!
  \************************************************************/
/*! exports provided: Title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Title\", function() { return Title; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ \"../../component/index.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components */ \"../../components/index.js\");\n\n\n\nclass Title extends _components__WEBPACK_IMPORTED_MODULE_1__[\"Middleware\"] {\n  get props () {\n    return Object.assign({}, super.props, {\n      defaultTitle: {\n        type: String,\n        value: 'Unknown',\n      },\n    });\n  }\n\n  callback (options) {\n    const self = this;\n    return async function (ctx, next) {\n      ctx.app.once('focus', (evt) => {\n        document.title = evt.target.title || self.defaultTitle;\n      });\n\n      await next();\n    };\n  }\n}\n\nObject(_component__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('xin-title-middleware', Title);\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/middlewares/title.js?");

/***/ }),

/***/ "../../node_modules/css-loader/index.js!../../components/app/app.css":
/*!**********************************************************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/node_modules/css-loader!/Users/jafar/Workspaces/web/xin/components/app/app.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".xin-app {\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/app/app.css?/Users/jafar/Workspaces/web/xin/node_modules/css-loader");

/***/ }),

/***/ "../../node_modules/css-loader/index.js!../../components/for/for.css":
/*!**********************************************************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/node_modules/css-loader!/Users/jafar/Workspaces/web/xin/components/for/for.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"xin-for {\\n  display: none;\\n  visibility: hidden;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/for/for.css?/Users/jafar/Workspaces/web/xin/node_modules/css-loader");

/***/ }),

/***/ "../../node_modules/css-loader/index.js!../../components/pager/pager.css":
/*!**************************************************************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/node_modules/css-loader!/Users/jafar/Workspaces/web/xin/components/pager/pager.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"xin-pager {\\n  box-sizing: border-box;\\n  display: block;\\n  position: relative;\\n  overflow: hidden;\\n  height: 100%;\\n}\\n\\nxin-pager .xin-view {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/pager/pager.css?/Users/jafar/Workspaces/web/xin/node_modules/css-loader");

/***/ }),

/***/ "../../node_modules/css-loader/index.js!../../components/view/view.css":
/*!************************************************************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/node_modules/css-loader!/Users/jafar/Workspaces/web/xin/components/view/view.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"../../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".xin-view {\\n  box-sizing: border-box;\\n  display: none;\\n}\\n\\n.xin-view.xin-view--visible {\\n  display: block;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:////Users/jafar/Workspaces/web/xin/components/view/view.css?/Users/jafar/Workspaces/web/xin/node_modules/css-loader");

/***/ }),

/***/ "../../node_modules/css-loader/index.js!./components/x-app.css":
/*!**************************************************************************************!*\
  !*** /Users/jafar/Workspaces/web/xin/node_modules/css-loader!./components/x-app.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"../../node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".aligner {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  height: 100%;\\n}\\n\\n.aligner-item {\\n  max-width: 50%;\\n  text-align: center;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./components/x-app.css?/Users/jafar/Workspaces/web/xin/node_modules/css-loader");

/***/ }),

/***/ "./components/x-app.css":
/*!******************************!*\
  !*** ./components/x-app.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./x-app.css */ \"../../node_modules/css-loader/index.js!./components/x-app.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"../../node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./components/x-app.css?");

/***/ }),

/***/ "./components/x-app.html":
/*!*******************************!*\
  !*** ./components/x-app.html ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<x-redirect-middleware></x-redirect-middleware>\\n<xin-lazy-view-middleware></xin-lazy-view-middleware>\\n\\n<xin-pager>\\n  <xin-view lazy-view uri=\\\"/\\\">\\n    <template>\\n      <div class=\\\"padding\\\">\\n        <h1>xin</h1>\\n\\n        <p>A WebComponents based framework</p>\\n        <p>We love npm, webpack and ofcourse webcomponents specs.</p>\\n\\n        <div class=\\\"list\\\">\\n          <a href=\\\"#!/intro\\\">Intro</a>\\n          <a href=\\\"#!/binding\\\">Binding</a>\\n          <a href=\\\"#!/app-route\\\">App, views and routing</a>\\n          <a href=\\\"#!/middleware\\\">Middleware</a>\\n          <div class=\\\"list__separator\\\">Components</div>\\n          <a href=\\\"#!/fixture\\\">xin-fixture</a>\\n          <a href=\\\"#!/for\\\">xin-for</a>\\n          <a href=\\\"#!/pager\\\">xin-pager</a>\\n          <a href=\\\"#!/repeat\\\">xin-repeat</a>\\n        </div>\\n      </div>\\n    </template>\\n  </xin-view>\\n  <x-intro lazy-view uri=\\\"/intro\\\"></x-intro>\\n  <x-binding lazy-view uri=\\\"/binding\\\"></x-binding>\\n  <x-app-route lazy-view uri=\\\"/app-route\\\"></x-app-route>\\n  <x-middleware lazy-view uri=\\\"/middleware\\\"></x-middleware>\\n  <x-for lazy-view uri=\\\"/for\\\"></x-for>\\n  <xin-view lazy-view uri=\\\"/not-found\\\">\\n    <div class=\\\"aligner\\\">\\n      <div class=\\\"aligner-item\\\">\\n        <p>\\n          Oops, route not found. Sorry...\\n        </p>\\n        <a href=\\\"#!/\\\">Home</a>\\n      </div>\\n    </div>\\n  </xin-view>\\n</xin-pager>\\n\";\n\n//# sourceURL=webpack:///./components/x-app.html?");

/***/ }),

/***/ "./components/x-app.js":
/*!*****************************!*\
  !*** ./components/x-app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _xinix_xin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xinix/xin */ \"../../index.js\");\n/* harmony import */ var _xinix_xin_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xinix/xin/components */ \"../../components/index.js\");\n/* harmony import */ var _xinix_xin_middlewares__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @xinix/xin/middlewares */ \"../../middlewares/index.js\");\n/* harmony import */ var _x_app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./x-app.css */ \"./components/x-app.css\");\n/* harmony import */ var _x_app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_x_app_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _x_redirect_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./x-redirect-middleware */ \"./components/x-redirect-middleware.js\");\n\n\n\n\n\n\n\n\n\nclass XApp extends _xinix_xin_components__WEBPACK_IMPORTED_MODULE_1__[\"App\"] {\n  get template () {\n    return __webpack_require__(/*! ./x-app.html */ \"./components/x-app.html\");\n  }\n}\n\nObject(_xinix_xin__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('x-app', XApp);\n\n\n//# sourceURL=webpack:///./components/x-app.js?");

/***/ }),

/***/ "./components/x-redirect-middleware.js":
/*!*********************************************!*\
  !*** ./components/x-redirect-middleware.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _xinix_xin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xinix/xin */ \"../../index.js\");\n/* harmony import */ var _xinix_xin_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xinix/xin/components */ \"../../components/index.js\");\n\n\n\nclass XRedirectMiddleware extends _xinix_xin_components__WEBPACK_IMPORTED_MODULE_1__[\"Middleware\"] {\n  callback (options) {\n    return async function (ctx, next) {\n      let uris = [...document.querySelector('xin-pager').children].map(v => v.getAttribute('uri'));\n      if (uris.indexOf(ctx.uri) === -1) {\n        ctx.uri = '/not-found';\n      }\n\n      await next();\n    };\n  }\n}\n\nObject(_xinix_xin__WEBPACK_IMPORTED_MODULE_0__[\"define\"])('x-redirect-middleware', XRedirectMiddleware);\n\n\n//# sourceURL=webpack:///./components/x-redirect-middleware.js?");

/***/ })

}]);