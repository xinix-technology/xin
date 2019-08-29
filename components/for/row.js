import { Template } from '../../component';
// import { Annotation } from '../../component/annotation';
import { Expr } from '../../component/expr';

export class Row extends Template {
  constructor (template, instance, item, index) { // eslint-disable-line max-params
    super();

    this.__loopInstance = instance;
    this.__loopAs = instance.as;
    this.__loopIndexAs = instance.indexAs;
    this.__loopAnnotations = [];

    // override Template constructor
    this.__templateInitialize(template);

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.__loopModel = this;
      }
    });

    this.update(item, index);
  }

  get is () {
    return '$for-row';
  }

  update (item, index) {
    this[this.__loopAs] = item;
    this[this.__loopIndexAs] = index;
    this.notify(this.__loopAs, item);
    this.notify(this.__loopIndexAs, index);
  }

  // set (path, value) {
  //   if (arguments.length === 1 && typeof path === 'object') {
  //     const data = path;
  //     for (const i in data) {
  //       if (Object.prototype.hasOwnProperty.call(data, i)) {
  //         this.set(i, data[i]);
  //       }
  //     }
  //     return;
  //   }

  //   path = this.__templateGetPathAsArray(path);

  //   if (path[0] === this.__loopAs || path[0] === this.__loopIndexAs) {
  //     return super.set(path, value);
  //   }

  //   // do not change parent data
  //   // parent data works stream down only
  //   // return this.__templateHost.set(path, value);
  // }

  // get (path) {
  //   path = this.__templateGetPathAsArray(path);

  //   if (path[0] === this.__loopAs || path[0] === this.__loopIndexAs) {
  //     const value = super.get(path);
  //     console.log('.', path, value)
  //     return value;
  //   }

  //   return this.__templateHost.get(path);
  // }

  __templateRender () {
    const templateFragment = document.createDocumentFragment();
    this.__templateChildNodes.forEach(node => templateFragment.appendChild(node));
    this.__templateMarker.parentElement.insertBefore(templateFragment, this.__templateMarker);
  }

  // __templateAnnotateRead (expr, accessor) {
  //   const model = this.__loopInstance.__templateModel;

  //   const annotation = new Annotation(expr, accessor);

  //   const path = this.__templateGetPathAsArray(expr.name);

  //   if (path[0] === this.__loopAs || path[0] === this.loopIndexAs) {
  //     if (expr.type === Expr.METHOD) {
  //       this.__templateGetBinding(expr.fn.name).annotate(annotation);
  //     }

  //     expr.varArgs.forEach(arg => {
  //       this.__templateGetBinding(arg.name).annotate(annotation);
  //     });

  //     return;
  //   }

  //   this.__loopAnnotations.push(annotation);

  //   if (expr.type === Expr.METHOD) {
  //     model.__templateGetBinding(expr.fn.name).annotate(annotation);
  //   }

  //   expr.varArgs.forEach(arg => {
  //     model.__templateGetBinding(arg.name).annotate(annotation);
  //   });

  //   accessor.set(expr.invoke(model));
  // }

  __templateAnnotateWrite (expr, accessor) {
    const path = this.__templateGetPathAsArray(expr.name);

    if (path[0] === this.__loopAs || path[0] === this.loopIndexAs) {
      return;
    }

    const model = this.__loopInstance.__templateModel;

    const { node } = accessor;
    const { nodeName } = node;

    const selector = node;
    const listener = evt => model.set(expr.name, accessor.get());

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

  __templateUninitialize () {
    super.__templateUninitialize();

    const model = this.__loopInstance.__templateModel;

    this.__loopAnnotations.forEach(annotation => {
      if (annotation.expr.type === Expr.METHOD) {
        model.__templateGetBinding(annotation.expr.fn.name).deannotate(annotation);
      }

      annotation.expr.varArgs.forEach(arg => {
        model.__templateGetBinding(arg.name).deannotate(annotation);
      });
    });
  }
}
