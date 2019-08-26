export class Annotation {
  constructor (expr, accessor) {
    this.expr = expr;
    this.accessor = accessor;
  }

  effect ({ model }) {
    const value = this.expr.invoke(model);
    if (this.accessor) {
      this.accessor.set(value);
    }
  }
}
