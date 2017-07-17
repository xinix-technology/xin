import { Component, define } from '../component';

export class Fixture extends Component {
  static create (template, data = {}) {
    const t = `
      <xin-fixture>
        <template>
          ${template}
        </template>
      </xin-fixture>
    `;
    const d = document.createElement('div');
    d.innerHTML = t;
    const fixture = d.querySelector('xin-fixture');

    for (let i in data) {
      fixture[i] = data[i];
    }

    document.body.appendChild(fixture);

    return fixture;
  }

  attached () {
    super.attached();
    this.connected = true;

    // delay connected to make sure children is already connected
    this.async(() => {
      this.fire('connected');
    });
  }

  detached () {
    super.detached();
    this.connected = false;

    this.fire('disconnected');
  }

  dispose () {
    this.parentElement.removeChild(this);
    this.connected = false;
  }

  async waitConnected (timeout) {
    await new Promise(resolve => {
      if (this.connected) {
        resolve();
      } else {
        this.once('connected', resolve);
      }
    });

    await this.wait(timeout);
  }

  wait (timeout = 0) {
    return new Promise(resolve => {
      this.async(resolve, timeout);
    });
  }

  async waitDisconnected (timeout) {
    await new Promise(resolve => {
      if (this.connected) {
        this.once('disconnected', resolve);
      } else {
        resolve();
      }
    });

    await this.wait(timeout);
  }
}

define('xin-fixture', Fixture);

export default Fixture;
