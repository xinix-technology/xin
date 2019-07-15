# Binding

Data binding connects data from a web component to a property or attribute of an element.

Example,

```html
<div>Input</div>
<input type="text" id="input" value="{{foo}}">

<div>Readonly</div>
<input type="text" id="inputRo" value="[[foo]]">

<div id="result">[[foo]]</div>
```

It will bind #input value to foo property of parent and update data to #result

## Concept

* Binding to properties
* Get set methods
* Push splice methods
* Listeners
