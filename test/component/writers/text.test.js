import { textWriter } from '../../../component/writers/text';
import assert from 'assert';
import { testing } from '../../..';

describe('component:writers:text', () => {
  describe('textWriter()', () => {
    it('write value of text', async () => {
      const fixture = await testing.createFixture(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const write = textWriter(fixture.$.here, 'text');
        write('foo');
        assert.strictEqual(fixture.$.here.innerHTML, 'foo');
        write('');
        assert.strictEqual(fixture.$.here.innerHTML, '');
        write(0);
        assert.strictEqual(fixture.$.here.innerHTML, '0');
        write(null);
        assert.strictEqual(fixture.$.here.innerHTML, '');
        write(undefined);
        assert.strictEqual(fixture.$.here.innerHTML, '');
      } finally {
        fixture.dispose();
      }
    });
  });
});
