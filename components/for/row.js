import { Template } from '../../component';
import { Annotation } from '../../component/annotation';

export class Row extends Template {
  constructor (template, host, item, index) {
    super();

    this.__loopHost = host;
    this.__loopAs = host.as;
    this.__loopIndexAs = host.indexAs;
    this.__loopAnnotations = [];

    // override Template constructor
    this.__templateInitialize(template);

    this.is = '$for-row';
    this.__id = this.__templateId;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        node.__loopModel = this;
      }
    });

    this.update(item, index);
  }

  update (item, index) {
    this[this.__loopAs] = item;
    this[this.__loopIndexAs] = index;
    this.notify(this.__loopAs, item);
    this.notify(this.__loopIndexAs, index);
  }

  set (path, value) {
    if (arguments.length === 1 && typeof path === 'object') {
      const data = path;
      for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
          this.set(i, data[i]);
        }
      }
      return;
    }

    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__loopAs || path[0] === this.__loopIndexAs) {
      return super.set(path, value);
    }

    // do not change parent data
    // parent data works stream down only
    // return this.__templateHost.set(path, value);
  }

  get (path) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__loopAs || path[0] === this.__loopIndexAs) {
      return super.get(path);
    }

    return this.__templateHost.get(path);
  }

  mount (host, marker) {
    this.__templateHost = host;
    this.__templateMarker = marker;

    this.__templateRender();
  }

  __templateAnnotate (expr, accessor) {
    if (expr.type === 's') {
      return false;
    }

    if (expr.constant) {
      accessor.set(expr.invoke(this.__loopHost.__templateModel));
      return false;
    }

    const path = this.__templateGetPathAsArray(expr.name);
    if (path[0] === this.__loopAs || path[0] === this.loopIndexAs) {
      const annotation = new Annotation(this, expr, accessor);

      if (expr.type === 'm') {
        this.__templateGetBinding(expr.fn.name).annotate(annotation);
      }

      expr.vpaths.forEach(arg => {
        this.__templateGetBinding(arg.name).annotate(annotation);
      });

      return true;
    }

    // annotate every paths
    this.__loopAnnotations.push({ expr, accessor });

    if (expr.type === 'm') {
      const annotation = new Annotation(this, expr, accessor);
      this.__loopHost.__templateModel.__templateGetBinding(expr.fn.name).annotate(annotation);
    }

    const annotation = new Annotation(this.__loopHost.__templateModel, expr, accessor);
    expr.vpaths.forEach(arg => {
      this.__loopHost.__templateModel.__templateGetBinding(arg.name).annotate(annotation);
    });

    accessor.set(expr.invoke(this.__loopHost.__templateModel));

    return true;
  }

  __templateUninitialize () {
    super.__templateUninitialize();

    this.__loopAnnotations.forEach(({ expr, accessor }) => {
      if (expr.type === 'm') {
        this.__loopHost.__templateModel.__templateGetBinding(expr.fn.name).deannotate(this, expr, accessor);
      }

      expr.vpaths.forEach(arg => {
        this.__loopHost.__templateModel.__templateGetBinding(arg.name).deannotate(this.__loopHost.__templateModel, expr, accessor);
      });
    });
  }
}
