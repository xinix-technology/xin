import xin from '../';

class Fixture extends xin.Component {
  static create (template) {
    const t = `
      <test-fixture>
        <template>
          ${template}
        </template>
      </test-fixture>
    `;
    const d = document.createElement('div');
    d.innerHTML = t;
    const fixture = d.querySelector('test-fixture');
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

xin.define('test-fixture', Fixture);

export default Fixture;
