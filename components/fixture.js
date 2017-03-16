import xin from '../';

class Fixture extends xin.Component {
  static create (template) {
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

    document.body.appendChild(fixture);

    return fixture;
  }

  attached () {
    super.attached();
    this.connected = true;

    this.fire('connected');
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

  waitConnected () {
    return new Promise(resolve => {
      if (this.connected) {
        resolve();
      } else {
        this.once('connected', resolve);
      }
    });
  }

  waitDisconnected () {
    return new Promise(resolve => {
      if (this.connected) {
        this.once('disconnected', resolve);
      } else {
        resolve();
      }
    });
  }
}

xin.define('xin-fixture', Fixture);

export default Fixture;
