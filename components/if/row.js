import { Template } from '../../component';
import { createFragment } from '../../helpers';

export class Row extends Template {
  constructor (template, instance) {
    super(template);

    this.__ifInstance = instance;
    this.__ifAnnotations = [];
    this.__templateInvoker = instance.__templateParent;
    this.__templateParent = instance;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.__ifModel = this;
      }
    });
  }

  get is () {
    return '$if-row';
  }

  __templateRender () {
    const templateFragment = createFragment(this.__templateChildNodes);
    this.__templateMarker.parentElement.insertBefore(templateFragment, this.__templateMarker);
  }
}
