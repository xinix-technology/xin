/* globals describe, it */

import assert from 'assert';
import xin from '../';
import Fixture from '../components/fixture';

describe('xin', () => {
  it('define in window', () => {
    assert('xin' in window);
  });

  describe('new component', () => {
    it('new component with full slot', async () => {
      xin.define('foo-1', class extends xin.Component {
        get template () {
          return 'foo <slot></slot> bar';
        }
      });

      let fixture = Fixture.create(`
        <foo-1 id="foo">baz</foo-1>
      `);

      await fixture.waitConnected();

      assert.equal(window.foo.textContent, 'foo baz bar');

      fixture.dispose();
    });

    it('new component with name slot', async () => {
      xin.define('foo-2', class extends xin.Component {
        get template () {
          return '<slot name="first"></slot> <slot name="last"></slot>';
        }
      });

      let fixture = Fixture.create(`
        <foo-2 id="foo">
          <span slot="first">first</span>
          <span slot="last">last</span>
        </foo-2>
      `);

      await fixture.waitConnected();

      assert.equal(window.foo.textContent, 'first last');

      fixture.dispose();
    });
  });
});
