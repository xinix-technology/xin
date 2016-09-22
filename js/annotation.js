(function(root) {
  'use strict';

  var xin = root.xin;

  // var XIN_DEBUG = xin.setup('debug') || false;

  // var EXPR_RW = '{{';
  // var EXPR_RO = '[[';
  var MODE_RW = '{';
  // var MODE_RO = '[';

  function __expr(expression) {
    if (!Expr.cache[expression]) {
      Expr.cache[expression] = new Expr(expression);
    }
    return Expr.cache[expression];
  }

  function Expr(expression) {
    expression = (expression || '').trim();

    if (!(this instanceof Expr)) {
      return __expr(expression);
    }

    this.expression = expression;
    // this.mode = undefined;
    // this.type = undefined;
    // this.token = undefined;
  }

  Expr.prototype = {
    isValid: function() {
      return this.getMode() !== '';
    },

    getMode: function() {
      if (undefined === this.mode) {
        if (this.expression.startsWith('[[') || this.expression.startsWith('{{')) {
          this.mode = this.expression[0];
        } else {
          this.mode = '';
        }
      }
      return this.mode;
    },

    writable: function() {
      return this.getMode() === '{';
    },

    getToken: function() {
      if (undefined === this.token) {
        this.token = this.expression.slice(2, -2).trim();
      }
      return this.token;
    },

    isPropertyExpression: function() {
      if (undefined === this.type) {
        this.type = this.getToken().indexOf('(') === -1 ? 'p' : 'm';
      }

      return this.type === 'p';
    },

    getAnnotationsOf: function(context, subject, property) {
      var annotations = [];

      if (this.isPropertyExpression()) {
        if (subject.__properties && subject.__properties[property] && subject.__properties[property].readOnly) {
          return annotations;
        }

        var contextProperty = this.getToken();

        // fix for special element textarea
        if (Node.TEXT_NODE === subject.nodeType && subject.parentElement.nodeName === 'TEXTAREA') {
          subject = subject.parentElement;
          property = 'value';
        }

        annotations.push(new PropertyAnnotation(context, contextProperty, subject, property));

        // TODO change this implementation to bind event to context instead of subject
        // TODO this implementation has potential memory leak with xin-repeat
        // when mode is rw make it happens
        if (MODE_RW === this.getMode() && subject.nodeType === Node.ELEMENT_NODE) {
          switch (subject.nodeName) {
            case 'INPUT':
              if (subject.type === 'checkbox') {
                subject.addEventListener('change', function() {
                  context.set(contextProperty, subject.checked);
                });
                break;
              }
              // fallsthrough
            case 'TEXTAREA':
              // TODO kalau unbind harus distate waktu apa?
              subject.addEventListener('input', function() {
                context.set(contextProperty, subject.value);
              });
              break;
            case 'SELECT':
              subject.addEventListener('change', function() {
                context.set(contextProperty, subject.value);
              });
              break;
            default:
              // noop
          }
        }
      } else {
        // console.log(this, context, subject, property);
        ComputedAnnotation.all(context, subject, property, this.getToken()).forEach(function(annotation) {
          annotations.push(annotation);
        });
        // (context, contextProperty, subjectProperty, method)
        // annotations.push(new ComputedAnnotation(context, arg.name, property, method));
        // throw new Error('Unimplemented method annotation for expr');
      }

      return annotations;
    },
  };

  Expr.cache = {};

  var Binding = xin.Binding = function(model) {
    this.model = model;
    this.paths = {};
    this.annotations = [];
  };

  Binding.prototype = {
    annotate: function(annotation) {
      if (!annotation.kind) {
        throw new Error('Cannot annotate unknown annotation: ' + annotation.constructor.name);
      }

      this.annotations.push(annotation);
    },
  };

  var BoundVariable = xin.BoundVariable = function(name) {
    this.name = name;
  };

  var BoundConstant = xin.BoundConstant = function(value) {
    this.value = value;
  };

  var BoundMethod = xin.BoundMethod = function(context, token) {
    this.context = context;

    // when annotation value must be computed by method, computed annotation must have arguments
    var matches = token.match(/^(\w+)\(([^)]+)\)$/);
    if (matches) {
      this.name = matches[1];

      var args = this.args = [];

      matches[2].split(/\s*,\s*/).forEach(function(arg) {
        try {
          var parsed = JSON.parse(arg);
          args.push(new BoundConstant(parsed));
        } catch (err) {
          args.push(new BoundVariable(arg));
        }
      });
      // throw new Error('Invalid computed annotation: ' + expression + ' for component: ' + target.__parent.is);
    } else {
      this.name = token;
      this.args = [];
    }
  };

  BoundMethod.prototype = {
    invoke: function() {
      if (!this.isEligible()) {
        throw new Error('Method not eligible');
      }

      return this.context.__host[this.name].apply(this.context, arguments);
    },

    invokeWithArgs: function() {
      var args = this.getArgValues();
      return this.invoke.apply(this, args);
    },

    getArgValues: function() {
      return this.args.map(function(arg) {
        if (arg instanceof BoundVariable) {
          return this.context[arg.name];
        }

        return arg.value;
      }.bind(this));
    },

    isEligible: function() {
      return typeof this.context.__host[this.name] === 'function';
    },

    inspect: function() {
      return this.context.__getId() + '#' + this.name + '()';
    },
  };

  var BoundProperty = xin.BoundProperty = function(context, name) {
    this.context = context;
    this.name = name;

    if (this.name && this.name.endsWith('$')) {
      this.attributeName = this.name.substr(0, this.name.length - 1);
    }
  };

  BoundProperty.prototype = {
    set: function(value) {
      if (this.attributeName) {
        this.context.setAttribute(this.attributeName, value);
      } else if (this.context.set) {
        this.context.set(this.name, value);
      } else if (this.name === 'html') {
        this.context.innerHTML = value;
      } else {
        var selectable = document.activeElement === this.context &&
          this.context.nodeName === 'INPUT' && (
              this.context.type !== 'range' &&
              this.context.type !== 'checkbox'
              );

        var selStart;
        var selEnd;
        if (selectable) {
          selStart = this.context.selectionStart;
          selEnd = this.context.selectionEnd;
        }

        this.context[this.name || 'textContent'] = value;

        if (selectable) {
          this.context.setSelectionRange(selStart, selEnd);

          // does not work well with below
          // this.context.selectionStart = selStart;
          // this.context.selectionEnd = selStart;
        }
      }
    },

    inspect: function() {
      if (this.context.is) {
        return this.context.__getId() + '#' + this.name;
      }

      return this.context.nodeName.toLowerCase() + '#' + this.name;
    },
  };

  function PropertyAnnotation(context, contextProperty, subject, subjectProperty) {
    this.property = new BoundProperty(context, contextProperty);
    this.subject = new BoundProperty(subject, subjectProperty);
  }

  PropertyAnnotation.prototype = {
    kind: 'property',

    effect: function(value/* , oldValue */) {
      this.subject.set(value);
    },

    inspect: function() {
      return '#' + this.kind + ' ' +
        this.property.inspect() + ' ' +
        this.subject.inspect();
    },
  };

  function ComputedAnnotation(context, contextProperty, subject, subjectProperty, method) {
    this.property = new BoundProperty(context, contextProperty);
    this.subject = new BoundProperty(subject, subjectProperty);
    this.method = method;
  }

  ComputedAnnotation.prototype = {
    kind: 'computed',

    inspect: function() {
      return '#' + this.kind + ' ' +
        this.property.inspect() + ' ' +
        this.method.inspect();
    },

    effect: function() {
      this.subject.set(this.method.invokeWithArgs());
    },
  };

  ComputedAnnotation.all = function(context, subject, property, token) {
    var annotations = [];

    var method = new BoundMethod(context, token);

    var len = method.args.length;
    for (var i = 0; i < len; i++) {
      var arg = method.args[i];
      if (arg instanceof BoundVariable) {
        annotations.push(new ComputedAnnotation(context, arg.name, subject, property, method));
      }
    }

    return annotations;
  };

  var ObserverAnnotation = xin.ObserverAnnotation = function(context, property, observer) {
    this.property = new BoundProperty(context, property);
    this.method = new BoundMethod(context, observer);
  };

  ObserverAnnotation.prototype = {
    kind: 'observer',

    effect: function(value, oldValue) {
      try {
        return this.method.invoke(value, oldValue);
      } catch (err) {
        if (err.message === 'Method not eligible') {
          return root.console.warn('Cannot observe property of ' + this.method.context.__getId() + ', method ' + this.method.name + ' not found!');
        }
        throw err;
      }
    },
  };

  var NotifyAnnotation = xin.NotifyAnnotation = function(context, property, token) {
    this.property = new BoundProperty(context, property);
    this.subject = undefined;
    this.context = context;
    this.token = token;
  };

  NotifyAnnotation.prototype = {
    kind: 'notify',

    getSubject: function() {
      if (undefined === this.subject) {
        if (undefined === this.context.__parent) {
          return;
        }

        this.subject = new BoundProperty(this.context.__parent, this.token);
      }

      return this.subject;
    },

    effect: function(value/* , oldValue */) {
      var subject = this.getSubject();
      if (subject) {
        this.getSubject().set(value);
      }
    },
  };

  xin.expr = __expr;
  xin.Expr = Expr;
  xin.ComputedAnnotation = ComputedAnnotation;
  xin.PropertyAnnotation = PropertyAnnotation;
})(this);
