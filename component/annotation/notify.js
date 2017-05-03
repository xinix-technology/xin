import { Expr } from '../expr';

export class NotifyAnnotation {
  constructor (model, name) {
    let expr = Expr.get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect (type, value) {
    this.model.__templateModel.set(this.name, value);
  }
}
