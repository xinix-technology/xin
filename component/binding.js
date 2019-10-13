import { pathString, pathArray } from '../helpers';

export class Binding {
  constructor (name = '') {
    this.name = name;
    this.children = {};
    /**
     * @type {Annotation[]}
     */
    this.annotations = [];
  }

  notify (path, { model }) {
    const binding = this.traverse(path);
    if (binding) {
      binding.dispatchEffect({ model });
    }
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

function findAnnotations ({ annotations, contextPath, includeMethods, includeProperties }) {
  return includeProperties && includeMethods
    ? [...annotations]
    : annotations.filter(({ expr }) => {
      if (includeMethods) {
        return expr.fn && contextPath === expr.fn.string;
      }

      return !expr.fn || contextPath !== expr.fn.string;
    });
}
