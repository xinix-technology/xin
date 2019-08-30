import { Template } from '../../component';
// import { Annotation } from '../../component/annotation';
// import { Expr } from '../../component/expr';

export class Row extends Template {
  constructor (template, instance) {
    super();

    this.__ifInstance = instance;
    this.__ifAnnotations = [];

    this.__templateInitialize(template);
    this.__templateDelegator = instance.__templateModel;

    // hardcode model as loop instance
    this.__templateModel = instance;

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

  // __templateAnnotateRead (expr, accessor) {
  //   const model = this.__ifInstance.__templateModel;

  //   // annotate every paths
  //   const annotation = new Annotation(expr, accessor);

  //   this.__ifAnnotations.push(annotation);

  //   if (expr.type === Expr.METHOD) {
  //     model.__templateGetBinding(expr.fn.name).annotate(annotation);
  //   }

  //   expr.varArgs.forEach(arg => {
  //     model.__templateGetBinding(arg.name).annotate(annotation);
  //   });

  //   accessor.set(expr.invoke(model));
  // }

  __templateAnnotateWrite (expr, accessor) {
    super.__templateAnnotateWrite(expr, accessor);

    const { node } = accessor;
    const { nodeName } = node;

    const selector = node;
    const listener = evt => this.__templateModel.__templateModel.set(expr.name, accessor.get());

    if (nodeName === 'INPUT') {
      const inputType = node.getAttribute('type');
      if (inputType === 'radio' || inputType === 'checkbox') {
        throw new Error('Unimplemented yet');
      } else {
        this.__templateAddEventListener({ name: 'input', selector, listener });
      }
    } else if (nodeName === 'TEXTAREA') {
      this.__templateAddEventListener({ name: 'input', selector, listener });
    } else if (nodeName === 'SELECT') {
      this.__templateAddEventListener({ name: 'change', selector, listener });
    }
  }

  // __templateStartEventListeners () {
  //   const model = this.__ifInstance.__templateModel;
  //   this.__templateEventListeners.forEach(({ name, selector, listener }) => model.on(name, selector, listener));
  // }

  // __templateStopEventListeners () {
  //   const model = this.__ifInstance.__templateModel;
  //   this.__templateEventListeners.forEach(({ name, selector, listener }) => model.off(name, selector, listener));
  // }

  // __templateUninitialize () {
  //   super.__templateUninitialize();

  //   const model = this.__ifInstance.__templateModel;

  //   this.__ifAnnotations.forEach(annotation => {
  //     if (annotation.expr.type === Expr.METHOD) {
  //       model.__templateGetBinding(annotation.expr.fn.name).deannotate(annotation);
  //     }

  //     annotation.expr.varArgs.forEach(arg => {
  //       model.__templateGetBinding(arg.name).deannotate(annotation);
  //     });
  //   });
  // }
}
