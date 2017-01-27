# Component

## Create new component

Let say we want to create new component named `foo-bar`.
The component will be used inside web page as follows:

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <foo-bar name="Ali"></foo-bar>
</body>
</html>
```

Which will produce page as follows:

```
Foobar: Hello Ali
```

Write lines below to new file named `foo-bar.js`.

```js
// import xin
import xin from xin;

// create new component class extend from xin.Component
class FooBar extends xin.Component {
  get template () {
    return `Foobar: Hello <span>{name}</span>`;
  }

  get props () {
    return Object.assign({}, super.props, {
      name: {
        type: String,
        value: 'Great Programmer',
      },
    });
  }
}

// define component class as foo-bar tag in html.
xin.define('foo-bar', FooBar);
```

## System Properties

Components can access several default system properties:

- __app
- __global
- __setup
