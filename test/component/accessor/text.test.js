import { TextAccessor } from '../../../component/accessor/text';
import { Fixture } from '../../../components/fixture';
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

  describe('#write()', () => {
    it('write value of text', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new TextAccessor(fixture.$.here, 'text');
        accessor.write('foo');
        assert.strictEqual(fixture.$.here.innerHTML, 'foo');
        accessor.write('');
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.write(0);
        assert.strictEqual(fixture.$.here.innerHTML, '0');
        accessor.write(null);
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.write(undefined);
        assert.strictEqual(fixture.$.here.innerHTML, '');
      } finally {
        fixture.dispose();
      }
    });
  });
});
