import { bootstrap, define, Component } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('#define()', () => {
  after(() => {
    bootstrap({ 'customElements.version': 'v1' });
  });

  it('define new custom element v1', async () => {
    bootstrap({ 'customElements.version': 'v1' });

    define('test-define-v1', class DefineV1 extends Component {
      get template () {
        return `define v1`;
      }
    });

    let fixture = Fixture.create(`<test-define-v1 id="el"></test-define-v1>`);
    try {
      await fixture.waitConnected();
      assert.equal(fixture.$.el.textContent, 'define v1');
    } finally {
      fixture.dispose();
    }
  });

  it('define new custom element v0', async () => {
    bootstrap({ 'customElements.version': 'v0' });

    define('test-define-v0', class DefineV0 extends Component {
      get template () {
        return `define v0`;
      }
    });

    let fixture = Fixture.create(`<test-define-v0 id="el"></test-define-v0>`);
    try {
      await fixture.waitConnected();
      assert.equal(fixture.$.el.textContent, 'define v0');
    } finally {
      fixture.dispose();
    }
  });
});
