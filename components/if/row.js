import { Template } from '../../component';
import { createFragment } from '../../helpers';

export class Row extends Template {
  constructor (template, instance) {
    super(template);

    this.__templateRenderer.setRenderCallback(renderer => {
      const templateFragment = createFragment(renderer.childNodes);
      renderer.marker.parentElement.insertBefore(templateFragment, renderer.marker);
    });

    this.__ifInstance = instance;

    this.__templateModeler.invoker = instance.__templateParent;

    this.__templateParent = instance;

    this.__templateRenderer.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.__ifModel = this;
      }
    });
  }

  get is () {
    return '$if-row';
  }
}
