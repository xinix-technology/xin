import { event, Async } from '../../core';
import { Component } from '../component';
import { define } from '../define';

export class Fixture extends Component {
  async attached () {
    super.attached();

    this.connected = true;

    // delay connected to make sure children is already connected
    await Async.waitNextFrame();

    this.fire('connected');
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

  async waitConnected (timeout = 0) {
    if (!this.connected) {
      await event(this).waitFor('connected');
    }

    await Async.sleep(timeout);
  }
}

define('xin-fixture', Fixture);
