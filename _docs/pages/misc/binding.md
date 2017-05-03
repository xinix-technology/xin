# Binding

## Text

```html
<host id="host">
  <div>
    <span id="t1">{{text1}}</span>
    <span id="t2">[[text2]]</span>
  </div>
  <span id="t3">[[text3]]</span>
</host>
```

```yml
Accessor:
  node: #t1
  name: textContent
```

### downstream

- host#text1 <- foo
- Accessor@t1#value <- foo
- t1#textContent <- foo

### upstream

- t1#textContent <- bar
- Accessor@t1#value -> bar
- host#text1 <- bar
