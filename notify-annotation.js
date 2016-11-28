import Expr from 'template-binding/expr';

class NotifyAnnotation {
  constructor (model, name) {
    let expr = Expr.get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect (value) {
    this.model.fire('-notify', {
      name: this.name,
      value: value,
    });
  }
}

export default NotifyAnnotation;
