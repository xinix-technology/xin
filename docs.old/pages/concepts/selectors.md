# Selectors

## Select by Id `component.$`

```html
<my-component id="myComponent">
<template>
  <input type="text" id="foo">
  <input type="text" id="bar">
</template>
</my-component>
```

```js
let compFoo = myComponent.$.foo;

assert(compFoo === document.getElementById('foo'));
```

## Select by css selector `component.$$()`

```html
<my-component id="myComponent">
<template>
  <input type="text">
  <input type="button">
</template>
</my-component>
```

```js
let textInput = myComponent.$$('input[type=text]');
let button = myComponent.$$('input[type=button]');
```
