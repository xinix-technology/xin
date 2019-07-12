import { Repository, define, Component } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('core/define #define()', () => {
  let defaultVersion;
  before(() => {
    defaultVersion = Repository.singleton().get('customElements.version');
  });

  after(() => {
    Repository.bootstrap({ 'customElements.version': defaultVersion });
  });

  it('define new custom element v1', async () => {
    Repository.bootstrap({ 'customElements.version': 'v1' });

    define('test-define-v1', class DefineV1 extends Component {
      get template () {
        return `define v1`;
      }
    });

    const fixture = await Fixture.create(`<test-define-v1 id="el"></test-define-v1>`);
    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.$.el.textContent, 'define v1');
    } finally {
      fixture.dispose();
    }
  });

  it('define new custom element v0', async () => {
    Repository.bootstrap({ 'customElements.version': 'v0' });

    define('test-define-v0', class DefineV0 extends Component {
      get template () {
        return `define v0`;
      }
    });

    const fixture = await Fixture.create(`<test-define-v0 id="el"></test-define-v0>`);
    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.$.el.textContent, 'define v0');
    } finally {
      fixture.dispose();
    }
  });
});
