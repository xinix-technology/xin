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

    this.fire('connected');
  }

  dispose () {
    this.parentElement.removeChild(this);
  }
}

xin.define('xin-fixture', Fixture);

export default Fixture;
