import { styleWriter } from '../../../component/writers/style';
import { testing } from '../../..';
import assert from 'assert';

describe('component:writers:style', () => {
  describe('styleWriter()', () => {
    it('write value of style', async () => {
      const fixture = await testing.createFixture(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        {
          const write = styleWriter(fixture.$.here, 'backgroundColor');
          write('white');
          assert.strictEqual(fixture.$.here.style.backgroundColor, 'white');
        }

        {
          const write = styleWriter(fixture.$.here, 'background-color');
          write('black');
          assert.strictEqual(fixture.$.here.style.backgroundColor, 'black');
        }
      } finally {
        fixture.dispose();
      }
    });
  });
});
