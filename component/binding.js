import { Expr } from './expr';
import { Annotation } from './annotation';
import { accessorFactory } from './accessor';
import { pathArray, pathString, pathHead } from '../helpers';

export class Binding {
  constructor (name) {
    this.name = name;
    this.children = {};
    this.annotations = [];
    this.model = undefined;
    this.deferredNotifications = [];
    this.running = false;
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

      this.children[name] = new Binding(name);
    }

    if (segments.length === 0) {
      return this.children[name];
    }

    return this.children[name].traverse(segments, creating);
  }

  // FIXME: revisit this later
  getAnnotatedPaths ({ excludeMethods = false } = {}) {
    const paths = [];

    for (const key in this.children) {
      const child = this.children[key];
      child.getAnnotatedPaths({ excludeMethods }).forEach(path => {
        paths.push(this.name ? `${this.name}.${path}` : path);
      });
    }

    const annotations = !excludeMethods ? this.annotations : this.annotations.filter(({ expr }) => {
      // FIXME: revisit this later expr.name will full path, this.name is basename only
      return expr.name === this.name && expr.type !== Expr.METHOD;
    });

    if (annotations.length) {
      paths.push(this.name);
    }

    return paths;
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

  addAnnotation (annotation) {
    this.annotations.push(annotation);
  }

  removeAnnotation (annotation) {
    const index = this.annotations.indexOf(annotation);
    if (index !== -1) {
      this.annotations.splice(index, 1);
    }
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

  dispatchEffect ({ model }) {
    this.annotations.forEach(annotation => {
      annotation.effect({ model });
    });

    Object.keys(this.children).forEach(i => {
      this.children[i].dispatchEffect({ model });
    });
  }

  dispose () {
    if (this.running) {
      this.stop();
    }

    Object.keys(this.children).forEach(i => {
      this.children[i].dispose();
    });
    this.children = {};

    this.annotations.forEach(annotation => {
      this.removeAnnotation(annotation);
    });
    this.annotations = [];
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
