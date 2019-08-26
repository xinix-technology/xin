import { TextAccessor } from '@xinix/xin/component/accessor/text';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('component:accessor:text TextAccessor', () => {
  describe('.test()', () => {
    it('detect element with attribute name starts with text.', async () => {
      const fixture = await Fixture.create(`
        <div id="here">foo</div>
      `);
      try {
        await fixture.waitConnected();

        assert.strictEqual(TextAccessor.test(fixture.$.here, 'text'), true);
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#set()', () => {
    it('set value of text', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new TextAccessor(fixture.$.here, 'text');
        accessor.set('foo');
        assert.strictEqual(fixture.$.here.innerHTML, 'foo');
        accessor.set('');
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.set(0);
        assert.strictEqual(fixture.$.here.innerHTML, '0');
        accessor.set(null);
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.set(undefined);
        assert.strictEqual(fixture.$.here.innerHTML, '');
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#get()', () => {
    it('get value of text throw error', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new TextAccessor(fixture.$.here, 'text');
        assert.throws(() => {
          accessor.get();
        }, /TextAccessor is write-only/);
      } finally {
        fixture.dispose();
      }
    });
  });
});
