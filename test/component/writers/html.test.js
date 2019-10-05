import assert from 'assert';
import { htmlWriter } from '../../../component/writers/html';
import { testing } from '../../..';

describe('component:writers:html', () => {
  describe('htmlWriter()', () => {
    it('write value of html', async () => {
      const fixture = await testing.createFixture(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const write = htmlWriter(fixture.$.here, 'html');
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
