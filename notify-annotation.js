import Expr from 'template-binding/expr';

class NotifyAnnotation {
  constructor (model, name) {
    let expr = Expr.get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect (value) {
    this.model.__templateModel.set(this.name, value);
  }
}

export default NotifyAnnotation;
