export class Annotation {
  constructor (expr, accessor) {
    this.expr = expr;
    this.accessor = accessor;
  }

  effect ({ model }) {
    const value = this.expr.invoke(model);
    // console.warn('read %o=%o', this.expr.value, value);
    // console.log('==> expr', this.expr);
    // console.log('==> from', model);
    // console.log('==> to', this.accessor);
    if (this.accessor) {
      this.accessor.set(value);
    }
  }
}
