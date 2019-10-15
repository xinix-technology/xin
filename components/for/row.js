import { Template } from '../../component';

export class Row extends Template {
  constructor (template, instance) {
    super(template);

    this.is = '$loop-row';

    this.__templatePresenter.isReplacing = false;

    this.__templateModeler.invoker = instance.__loopHost;

    this.__loopInstance = instance;
    this.__loopAs = instance.as;
    this.__loopIndexAs = instance.indexAs;

    this.__templatePresenter.nodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.__loopRow = this;
      }
    });

    if (instance.__loopAnnotatedPaths) {
      instance.__loopBindAnnotations(this.__templateModeler);
    }
  }

  dispose () {
    this.__templatePresenter.nodes.forEach(node => (node.__loopRow = undefined));

    this.__loopInstance = undefined;
    this.__loopAs = undefined;
    this.__loopIndexAs = undefined;

    super.dispose();
  }

  update (item, index) {
    this[this.__loopAs] = item;
    this[this.__loopIndexAs] = index;
    this.notify(this.__loopAs);
    this.notify(this.__loopIndexAs);
  }
}
