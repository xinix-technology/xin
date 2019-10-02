/**
 * @typedef {import('./expr').Expr} Expr
 */

export class Annotation {
  /**
   *
   * @param {Expr} expr
   * @param {*} accessor
   */
  constructor (expr, accessor) {
    this.expr = expr;
    this.accessor = accessor;
  }

  effect ({ model }) {
    const value = this.expr.eval(model);

    if (this.accessor) {
      this.accessor.write(value);
    }
  }
}
