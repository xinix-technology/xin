import { attributeWriter } from '../../../component/writers/attribute';
import { Fixture } from '../../../components/fixture';
import assert from 'assert';

describe('component:writers:attribute', () => {
  describe('attributeWriter()', () => {
    it('write value of attribute', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const write = attributeWriter(fixture.$.here, 'foo');

        write('23');
        assert.strictEqual(fixture.$.here.getAttribute('foo'), '23');
        write(undefined);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        write(null);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        write('');
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        write(0);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), '0');
        write(true);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), 'true');
        write(false);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), 'false');
      } finally {
        fixture.dispose();
      }
    });
  });
});
