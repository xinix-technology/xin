import { event, Async } from '../../core';
import { Component } from '../component';
import { define } from '../define';

export class Fixture extends Component {
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
