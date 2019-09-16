import { Template } from '../../component';

export class Row extends Template {
  constructor (template, instance) {
    super(template);

    this.__loopInstance = instance;
    this.__loopAs = instance.as;
    this.__loopIndexAs = instance.indexAs;

    this.__templateInvoker = instance.__templateParent;

    this.__templateParent = instance;

    this.__templateBinding.bindFunction(this.__loopAs, value => {
      instance.items[this[this.__loopIndexAs]] = value;
      // instance.set('items', [...instance.items]);
    });

    this.__templateChildNodes.forEach(node => {
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

  __templateRender () {
    // override how to render to ignore host data
    const templateFragment = document.createDocumentFragment();
    this.__templateChildNodes.forEach(node => templateFragment.appendChild(node));
    this.__templateMarker.parentElement.insertBefore(templateFragment, this.__templateMarker);
  }

  dispose () {
    this.__templateParent = undefined;
    this.__loopInstance = undefined;
    this.__loopAs = undefined;
    this.__loopIndexAs = undefined;

    super.dispose();
  }
}
