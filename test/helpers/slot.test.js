import { define, Component } from '../..';
import { Fixture } from '../../components/fixture';
import assert from 'assert';

describe('helpers:slot', () => {
  it('new component with full slot', async () => {
    define('test-component-slot-1', class extends Component {
      get template () {
        return 'foo <slot></slot> bar';
      }
    });

    const fixture = await Fixture.create(`
      <test-component-slot-1 id="foo">baz</test-component-slot-1>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.foo.textContent, 'foo baz bar');
    } finally {
      fixture.dispose();
    }
  });

  it('new component with name slot', async () => {
    define('test-component-slot-2', class extends Component {
      get template () {
        return '<slot name="first"></slot> <slot name="last"></slot>';
      }
    });

    const fixture = await Fixture.create(`
      <test-component-slot-2 id="foo">
        <span slot="first">first</span>
        <span slot="last">last</span>
      </test-component-slot-2>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.foo.textContent, 'first last');
    } finally {
      fixture.dispose();
    }
  });
});
