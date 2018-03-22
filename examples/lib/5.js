(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./views/x-for.html":
/*!**************************!*\
  !*** ./views/x-for.html ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"\\n<div class=\\\"padding\\\">\\n  <h2>xin-for</h2>\\n\\n  <p>Click product to delete</p>\\n\\n  <ul>\\n    <xin-for items=\\\"[[products]]\\\" as=\\\"product\\\">\\n      <template>\\n        <li (click)=\\\"deleteProduct(index)\\\">\\n          <span>[[product.name]]</span>\\n          <span style=\\\"float: right\\\">[[formatPrice(product.price)]]</span>\\n        </li>\\n      </template>\\n    </xin-for>\\n  </ul>\\n\\n  <a href=\\\"#\\\" (click)=\\\"addNewProduct(evt)\\\">Add New Product</a>\\n</div>\\n\";\n\n//# sourceURL=webpack:///./views/x-for.html?");

/***/ })

}]);