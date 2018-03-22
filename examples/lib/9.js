(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./views/x-middleware.html":
/*!*********************************!*\
  !*** ./views/x-middleware.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"padding\\\">\\n  <h2>Middleware</h2>\\n\\n  <p>\\n    Middleware provide a convenient mechanism for filtering route requests entering your application.\\n    For example, you can includes a middleware that verifies the user of your application is authenticated.\\n    If the user is not authenticated, the middleware will redirect the user to the login screen.\\n    However, if the user is authenticated, the middleware will allow the request to proceed further into the application.\\n  </p>\\n\\n  <p>\\n    Your application must use xin-app to use middleware to enable routing.\\n  </p>\\n\\n  <p>\\n    Write implementation of middleware as 'components/foo-middleware.js'\\n  </p>\\n\\n  <code>\\n    <pre>\\nimport { Middleware } from '@xinix/xin/components';\\n\\nclass FooMiddleware extends Middleware {\\n  callback (options) {\\n    return async function (ctx, next) {\\n      // do something here\\n      await next();\\n      // or do something after routed here\\n    };\\n  }\\n}\\n\\ndefine('foo-middleware', FooMiddleware);</pre>\\n  </code>\\n\\n  <p>\\n    Use middleware in 'components/foo-app.js' like follows:\\n  </p>\\n\\n  <code>\\n    <pre>\\nimport './foo-middleware';\\n\\nclass FooApp extends App {\\n  get template () {\\n    return `\\n      &lt;foo-middleware&gt;&lt;/foo-middleware&gt;\\n\\n      ...\\n    `;\\n  }\\n}\\n\\ndefine('foo-app', FooApp)</pre>\\n  </code>\\n</div>\\n\";\n\n//# sourceURL=webpack:///./views/x-middleware.html?");

/***/ })

}]);