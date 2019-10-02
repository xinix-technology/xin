/**
 * @typedef {import('./expr').Expr} Expr
 */

export class Annotation {
  /**
   *
   * @param {Expr} expr
   * @param {function} writer
   */
  constructor (expr, writer) {
    this.expr = expr;
    this.writer = writer;
  }

  effect ({ model }) {
    const value = this.expr.eval(model);

    if (this.writer) {
      const write = this.writer;
      write(value);
    }
  }
}
