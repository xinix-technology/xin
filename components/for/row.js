import { Template } from '../../component';
import { createFragment } from '../../helpers';

export class Row extends Template {
  constructor (template, instance) {
    super(template);

    this.__templateRenderer.setRenderCallback(renderer => {
      const templateFragment = createFragment(renderer.childNodes);
      renderer.marker.parentElement.insertBefore(templateFragment, renderer.marker);
    });

    this.__loopInstance = instance;
    this.__loopAs = instance.as;
    this.__loopIndexAs = instance.indexAs;

    this.__templateModeler.invoker = instance.__templateParent;

    this.__templateParent = instance;

    this.__templateBinding.bindFunction(this.__loopAs, value => {
      instance.items[this[this.__loopIndexAs]] = value;
      // instance.set('items', [...instance.items]);
    });

    this.__templateRenderer.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.__loopModel = this;
      }
    });

    instance.__loopExternalAnnotations.forEach(({ path }) => this.set(path, instance.get(path)));
  }

  get is () {
    return '$for-row';
  }

  update (item, index) {
    this[this.__loopAs] = item;
    this[this.__loopIndexAs] = index;
    this.notify(this.__loopAs);
    this.notify(this.__loopIndexAs);
  }

  dispose () {
    this.__templateParent = undefined;
    this.__loopInstance = undefined;
    this.__loopAs = undefined;
    this.__loopIndexAs = undefined;

    super.dispose();
  }
}
