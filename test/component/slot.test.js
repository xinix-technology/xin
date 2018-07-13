import { define, Component } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('Template slot', () => {
  it('new component with full slot', async () => {
    define('test-component-slot-1', class extends Component {
      get template () {
        return 'foo <slot></slot> bar';
      }
    });

    let fixture = Fixture.create(`
      <test-component-slot-1 id="foo">baz</test-component-slot-1>
    `);

    await fixture.waitConnected();

    await new Promise(resolve => {
      setTimeout(resolve, 1);
    });

    assert.equal(window.foo.textContent, 'foo baz bar');

    fixture.dispose();
  });

  it('new component with name slot', async () => {
    define('test-component-slot-2', class extends Component {
      get template () {
        return '<slot name="first"></slot> <slot name="last"></slot>';
      }
    });

    let fixture = Fixture.create(`
      <test-component-slot-2 id="foo">
        <span slot="first">first</span>
        <span slot="last">last</span>
      </test-component-slot-2>
    `);

    await fixture.waitConnected();

    assert.equal(window.foo.textContent, 'first last');

    fixture.dispose();
  });
});
