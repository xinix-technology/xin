import { Expr } from './expr';

export class Binding {
  constructor (name) {
    this.name = name;
    this.children = {};
    this.annotations = [];
  }

  getChild (name) {
    if (!this.children[name]) {
      this.children[name] = new Binding(name);
    }

    return this.children[name];
  }

  getAnnotatedPaths ({ excludeMethods = false } = {}) {
    const paths = [];

    for (const key in this.children) {
      const child = this.children[key];
      child.getAnnotatedPaths({ excludeMethods }).forEach(path => {
        paths.push(this.name ? `${this.name}.${path}` : path);
      });
    }

    if (this.annotations.length && (!excludeMethods || !this.hasMethodAnnotation())) {
      paths.push(this.name);
    }

    return paths;
  }

  hasMethodAnnotation () {
    return Boolean(this.annotations.find(({ expr }) => expr.type === Expr.METHOD && expr.name === this.name));
  }

  annotate (annotation) {
    this.annotations.push(annotation);
  }

  deannotate (annotation) {
    const index = this.annotations.indexOf(annotation);
    if (index !== -1) {
      this.annotations.splice(index, 1);
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
    Object.keys(this.children).forEach(i => {
      this.children[i].dispose();
    });
    this.children = {};

    this.annotations.forEach(annotation => {
      this.deannotate(annotation);
    });
    this.annotations = [];
  }
}
