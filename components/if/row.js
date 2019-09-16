import { Template } from '../../component';
// import { Annotation } from '../../component/annotation';
// import { Expr } from '../../component/expr';

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
    const templateFragment = document.createDocumentFragment();
    this.__templateChildNodes.forEach(node => templateFragment.appendChild(node));
    this.__templateMarker.parentElement.insertBefore(templateFragment, this.__templateMarker);
  }
}
