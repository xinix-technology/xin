# Intro

 Xin is Single Page Application framework using javascript. Xin powered by beloved opensource projects and specs,

* New spec of Javascript (ES6+)
* NPM / Yarn
* Webpack

## Getting started

For quick start you can use template provided by community. Just download or clone web example that already use xin from `https://github.com/reekoheek/xin-example`.

```sh
wget https://github.com/reekoheek/xin-example/archive/master.zip
unzip master.zip
cd xin-example-master
npm i
npm run dev
```

Any help to compose `yo` generator accepted. ;)
Selectors

You can select element by id inside component context using component.$

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

You can select element by css selector inside component context using component.$$()

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
