import assert from 'assert';
import Fixture from '@xinix/xin/components/fixture';
import '@xinix/xin/components/for';

describe('For', () => {
  it('render list', async () => {
    let fixture = Fixture.create(`
      <div id="here">
        <xin-for items="[[rows]]" as="row">
          <template>
            <div class="child">[[row.name]]</div>
          </template>
        </xin-for>
      </div>
    `);
    try {
      await fixture.waitConnected();
      let rows = [
        {
          name: 'foo',
        },
        {
          name: 'bar',
        },
        {
          name: 'baz',
        },
      ];
      fixture.set('rows', rows);
      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(fixture.querySelectorAll('.child').length, rows.length);
    } finally {
      fixture.dispose();
    }
  });
});
