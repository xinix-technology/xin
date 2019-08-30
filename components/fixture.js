import { Component, define } from '../component';
import { event, Async } from '../core';

export class Fixture extends Component {
  static create (template, data = {}) {
    const d = document.createElement('div');
    d.innerHTML = `<xin-fixture><template>${template}</template></xin-fixture>`;
    const fixture = window.fixture = d.firstElementChild;
    fixture.__fixtureInitialData = data;
    document.body.appendChild(fixture);

    // return as promised element because at v0 it wont be created yet!
    return new Promise(resolve => resolve(fixture));
  }

  attached () {
    super.attached();

    this.set(this.__fixtureInitialData);
    delete this.__fixtureInitialData;
    this.connected = true;

    // delay connected to make sure children is already connected
    Async.run(() => this.fire('connected'));
  }

  detached () {
    super.detached();

    this.connected = false;
    this.fire('disconnected');
  }

  dispose () {
    this.parentElement.removeChild(this);

    super.dispose();
  }

  async waitConnected (timeout) {
    if (!this.connected) {
      await event(this).waitFor('connected');
    }

    await Async.sleep(timeout);
  }
}

define('xin-fixture', Fixture);
