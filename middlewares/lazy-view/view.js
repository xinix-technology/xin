import { event } from '../../core';
import { Route } from '../../components/app/route';
import { Async } from '../../core/fn/async';

export class View {
  constructor (bag, element, loader) {
    this.name = element.nodeName.toLowerCase();
    this.uri = element.getAttribute('uri');
    this.element = element;
    this.loader = loader;
    this.route = new Route(this.uri);
    this.isStaticRoute = Route.isStatic(this.uri);
    this.bag = bag;
  }

  get loaded () {
    if (this._loaded) {
      return true;
    }

    const loaded = this.element.classList.contains('xin-view');
    if (loaded) {
      this._loaded = true;
      return true;
    }
  }

  async load () {
    if (this.loaded) {
      return;
    }

    if (!this.loader) {
      throw new Error(`Cannot lazy load view: ${this.name}`);
    }

    this.loader.load(this);
    await event(this.element).waitFor('routed');

    this._loaded = true;

    // FIXME: hack to wait for sub views to be ready before routed
    if (this.element.querySelector('.xin-view')) {
      await Async.sleep(300);
    }
  }
}
