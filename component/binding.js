import { Expr } from './expr';
import { Annotation } from './annotation';
import { accessorFactory } from './accessor';
import { pathArray, pathString, pathHead } from '../helpers';

class LeafBinding {
  constructor (name = '') {
    this.name = name;
    this.children = {};
    this.annotations = [];
  }

  /**
   * Traverse binding to found specified descendant binding
   * @param {string} path
   * @param {boolean} creating
   * @returns {Binding}
   */
  traverse (path, creating = false) {
    if (!path) {
      return this;
    }

    const [name, ...segments] = pathArray(path);

    if (!this.children[name]) {
      if (!creating) {
        return undefined;
      }

      this.children[name] = new LeafBinding(name);
    }

    if (segments.length === 0) {
      return this.children[name];
    }

    return this.children[name].traverse(segments, creating);
  }

  addAnnotation (annotation) {
    this.annotations.push(annotation);
  }

  removeAnnotation (annotation) {
    const index = this.annotations.indexOf(annotation);
    if (index !== -1) {
      this.annotations.splice(index, 1);
    }
  }

  dispatchEffect ({ model }) {
    this.annotations.forEach(annotation => {
      annotation.effect({ model });
    });

    for (const i in this.children) {
      this.children[i].dispatchEffect({ model });
    }
  }

  dispose () {
    for (const i in this.children) {
      this.children[i].dispose();
    }
    this.children = {};

    this.annotations.forEach(annotation => {
      this.removeAnnotation(annotation);
    });
    this.annotations = [];
  }

  getAnnotatedPaths ({ includeProperties = true, includeMethods = true } = {}, contextPath = []) {
    if (!includeProperties && !includeMethods) {
      return [];
    }

    const paths = [];

    for (const key in this.children) {
      const child = this.children[key];
      const childContextPath = [...contextPath, key];
      child.getAnnotatedPaths({ includeProperties, includeMethods }, childContextPath).forEach(path => {
        paths.push(this.name ? pathString([this.name, ...pathArray(path)]) : path);
      });
    }

    const annotations = findAnnotations({
      annotations: this.annotations,
      contextPath: pathString(contextPath),
      includeMethods,
      includeProperties,
    });

    if (annotations.length) {
      paths.push(this.name);
    }

    return paths;
  }
}

export class Binding extends LeafBinding {
  constructor (name) {
    super(name);

    this.model = undefined;
    this.running = false;
    this.deferredNotifications = [];
  }

  bindFunction (path, fn) {
    const annotation = new Annotation(Expr.create(path, true), accessorFactory(fn));
    this.traverse(path, true).addAnnotation(annotation);
    return annotation;
  }

  bindAnnotation (annotation) {
    if (annotation.expr.type === Expr.METHOD) {
      this.annotate(annotation.expr.fn.name, annotation);
    }

    annotation.expr.varArgs.forEach(arg => this.annotate(arg.name, annotation));
  }

  annotate (path, annotation) {
    this.notify(pathHead(path));
    this.traverse(path, true).addAnnotation(annotation);
  }

  deannotate (path, annotation) {
    this.traverse(path).removeAnnotation(annotation);
  }

  notify (path) {
    if (!this.running) {
      return this.addDeferredNotification(path);
    }

    const binding = this.traverse(path);
    if (binding) {
      binding.dispatchEffect({ model: this.model });
    }
  }

  dispose () {
    if (this.running) {
      this.stop();
    }

    super.dispose();
  }

  start (model) {
    this.running = true;
    this.model = model;
    this.deferredNotifications.forEach(path => this.notify(path));
    this.deferredNotifications = [];
  }

  stop () {
    this.running = false;
    this.model = undefined;
    this.deferredNotifications = [];
  }

  addDeferredNotification (path) {
    const pathStr = pathString(path);
    if (this.deferredNotifications.indexOf(pathStr) === -1) {
      this.deferredNotifications.push(pathStr);
    }
  }
}

function findAnnotations ({ annotations, contextPath, includeMethods, includeProperties }) {
  return includeProperties && includeMethods
    ? [...annotations]
    : annotations.filter(({ expr }) => {
      if (includeMethods) {
        return expr.fn && contextPath === expr.fn.name;
      }

      return !expr.fn || contextPath !== expr.fn.name;
    });
}
