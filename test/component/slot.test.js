import { define, Component } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('<slot>', () => {
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

      assert.strictEqual(window.foo.textContent, 'foo baz bar');
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

      assert.strictEqual(window.foo.textContent, 'first last');
    } finally {
      fixture.dispose();
    }
  });
});
