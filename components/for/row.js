import { T } from '../../component';
import { Annotation } from '../../component/annotation';

export class Row extends T {
  constructor (template, host, item, index) {
    super();

    this.__repeat = host;
    this.__repeatAs = host.as;
    this.__repeatIndexAs = host.indexAs;

    // override T constructor
    this.__templateInitialize(template, host.__templateModel, host.__templateMarker);

    this.is = '$repeat-row';
    this.__id = this.__templateId;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        node.__repeatModel = this;
      }
    });

    this.update(item, index);

    this.__templateRender();
  }

  get __app () {
    return this.__templateHost.__app;
  }

  update (item, index) {
    this[this.__repeatAs] = item;
    this[this.__repeatIndexAs] = index;
    this.notify(this.__repeatAs, item);
    this.notify(this.__repeatIndexAs, index);
  }

  set (path, value) {
    if (arguments.length === 1 && typeof path === 'object') {
      let data = path;
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          this.set(i, data[i]);
        }
      }
      return;
    }

    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.set(path, value);
    }

    // do not change parent data
    // parent data works stream down only
    // return this.__templateHost.set(path, value);
  }

  get (path) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.get(path);
    }

    return this.__templateHost.get(path);
  }

  // notify (path, value) {
  //   path = this.__templateGetPathAsArray(path);

  //   if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
  //     return super.notify(path, value);
  //   }

  //   // do not notify parent data
  //   // parent data works stream down only
  //   // return this.__templateHost.notify(path, value);
  // }

  __templateAnnotate (expr, accessor) {
    if (!super.__templateAnnotate(expr, accessor)) {
      return false;
    }

    let path = this.__templateGetPathAsArray(expr.name);
    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return true;
    }

    for (let i in this.__templateBindings) {
      if (i === path[0]) {
        delete this.__templateBindings[i];
      }
    }

    // annotate every paths
    if (expr.type === 'm') {
      let annotation = new Annotation(this, expr, accessor);
      this.__templateHost.__templateGetBinding(expr.fn.name).annotate(annotation);
    }

    let annotation = new Annotation(this.__templateHost, expr, accessor);
    expr.vpaths.forEach(arg => {
      this.__templateHost.__templateGetBinding(arg.name).annotate(annotation);
    });

    // manually set by accessor to render
    accessor.set(expr.invoke(this.__templateHost));

    return true;
  }

  __templateUninitialize () {
    super.__templateUninitialize();

    // FIXME: remove annotation from templateHost or memory leak
  }
}
