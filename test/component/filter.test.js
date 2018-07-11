import Fixture from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('Filter', () => {
  it('format currency', async () => {
    let fixture = Fixture.create(`
      <span id="val">[[money|currency]]</span>
    `);

    await fixture.waitConnected();

    fixture.set('money', 12345);

    assert.equal(fixture.$.val.textContent, '12,345.00');

    fixture.dispose();
  });
});
