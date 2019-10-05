import assert from 'assert';
import { classWriter } from '../../../component/writers/class';
import { testing } from '../../..';

describe('component:writers:class', () => {
  describe('classWriter()', () => {
    it('write value of class', async () => {
      const fixture = await testing.createFixture(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const write = classWriter(fixture.$.here, 'foo');
        assert.strictEqual(fixture.$.here.classList.contains('foo'), false);
        write(1);
        assert.strictEqual(fixture.$.here.classList.contains('foo'), true);
        write(0);
        assert.strictEqual(fixture.$.here.classList.contains('foo'), false);
      } finally {
        fixture.dispose();
      }
    });
  });
});
