import { Template } from '../../component';

export class Row extends Template {
  constructor (template, instance) {
    super(template);

    this.is = '$if-row';

    this.__templatePresenter.isReplacing = false;

    this.__templateModeler.invoker = instance.__ifHost;
  }
}
