import { repository, define, Component, testing } from '../..';
import assert from 'assert';

describe('core:define #define()', () => {
  let originalVersion;
  before(() => {
    originalVersion = repository.$config.ceVersion;
  });

  after(() => {
    repository.$config.ceVersion = originalVersion;
  });

  it('define new custom element v1', async () => {
    define('test-define-v1', class DefineV1 extends Component {
      get template () {
        return 'define v1';
      }
    });

    const fixture = await testing.createFixture('<test-define-v1 id="el"></test-define-v1>');
    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.$.el.textContent, 'define v1');
    } finally {
      fixture.dispose();
    }
  });

  it('define new custom element v0', async () => {
    repository.$config.ceVersion = 'v0';

    define('test-define-v0', class DefineV0 extends Component {
      get template () {
        return 'define v0';
      }
    });

    const fixture = await testing.createFixture('<test-define-v0 id="el"></test-define-v0>');
    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.$.el.textContent, 'define v0');
    } finally {
      fixture.dispose();
    }
  });
});
