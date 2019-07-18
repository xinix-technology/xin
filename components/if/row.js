import { Template } from '../../component';
import { Annotation } from '../../component/annotation';

export class Row extends Template {
  constructor (template, host) {
    super();

    this.__ifHost = host;
    this.__ifAnnotations = [];

    // override Template constructor
    this.__templateInitialize(template);

    this.is = '$if-row';
    this.__id = this.__templateId;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        node.__ifModel = this;
      }
    });
  }

  mount (host, marker) {
    this.__templateHost = host;
    this.__templateMarker = marker;

    this.__templateRender();
  }

  get (path) {
    path = this.__templateGetPathAsArray(path);

    return this.__templateHost.get(path);
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
    return this.__templateHost.set(path, value);
  }

  __templateAnnotate (expr, accessor) {
    if (expr.type === 's') {
      return false;
    }

    if (expr.constant) {
      accessor.set(expr.invoke(this.__ifHost.__templateModel));
      return false;
    }

    // annotate every paths
    this.__ifAnnotations.push({ expr, accessor });

    if (expr.type === 'm') {
      const annotation = new Annotation(this, expr, accessor);
      this.__ifHost.__templateModel.__templateGetBinding(expr.fn.name).annotate(annotation);
    }

    const annotation = new Annotation(this.__ifHost.__templateModel, expr, accessor);
    expr.vpaths.forEach(arg => {
      this.__ifHost.__templateModel.__templateGetBinding(arg.name).annotate(annotation);
    });

    accessor.set(expr.invoke(this.__ifHost.__templateModel));

    return true;
  }

  __templateUninitialize () {
    super.__templateUninitialize();

    this.__ifAnnotations.forEach(({ expr, accessor }) => {
      if (expr.type === 'm') {
        this.__ifHost.__templateModel.__templateGetBinding(expr.fn.name).deannotate(this, expr, accessor);
      }

      expr.vpaths.forEach(arg => {
        this.__ifHost.__templateModel.__templateGetBinding(arg.name).deannotate(this.__ifHost.__templateModel, expr, accessor);
      });
    });
  }
}
