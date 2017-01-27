import event from '../../event';
import Route from '../../components/lib/route';

class View {
  constructor (bag, element, loader) {
    this.name = element.nodeName.toLowerCase();
    this.uri = element.getAttribute('uri');
    this.element = element;
    this.loader = loader;
    this.loaded = element.classList.contains('xin-view');
    this.route = new Route(this.uri);
    this.bag = bag;
  }

  load () {
    return new Promise((resolve, reject) => {
      if (this.loaded) {
        return resolve();
      }

      // use global event helper because element does not created yet at this time
      event(this.element).once('routed', () => {
        this.loaded = true;
        resolve();
      });

      if (!this.loader) {
        throw new Error(`Cannot lazy load view: ${this.name}`);
      }

      this.loader.load(this);
    });
  }
}

export default View;
