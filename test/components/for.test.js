import assert from 'assert';
import { Fixture } from '@xinix/xin/components/fixture';
import { Async } from '@xinix/xin/core/fn/async';
import '@xinix/xin/components/for';

describe('<xin-for>', () => {
  it('render list', async () => {
    let fixture = await Fixture.create(`
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
      await Async.sleep(50);
      assert.equal(fixture.querySelectorAll('.child').length, rows.length);

      fixture.set('rows', [{ name: 'zap' }]);
      await Async.sleep(50);
      assert.equal(fixture.querySelectorAll('.child').length, 1);
    } finally {
      fixture.dispose();
    }
  });

  it('render to nearest defined element from parent', async () => {
    let fixture = await Fixture.create(`
      <div>
        <table>
          <tbody id="firstBody">
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <tbody id="secondBody">
          </tbody>
        </table>

        <xin-for items="[[rows]]" as="row" to="tbody">
          <template>
            <tr>
              <td>[[row.name]]</td>
            </tr>
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
      await Async.sleep(50);

      assert.equal(fixture.$.firstBody.children.length, 0);
      assert.equal(fixture.$.secondBody.children.length, 3);
    } finally {
      fixture.dispose();
    }
  });

  it('get item, index, and model for element', async () => {
    let fixture = await Fixture.create(`
      <xin-for items="[[rows]]" as="row">
        <template>
          <div>
            <span>[[row.name]]</span>
          </div>
        </template>
      </xin-for>
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
      await Async.sleep(50);

      assert.deepEqual(fixture.$$('xin-for').itemForElement(fixture.$$('span')), { name: 'foo' });
      assert.equal(fixture.$$('xin-for').indexForElement(fixture.$$('span')), 0);
      assert.equal(fixture.$$('xin-for').modelForElement(fixture.$$('span')).get('index'), 0);
    } finally {
      fixture.dispose();
    }
  });

  it.only('render list with data from parent', async () => {
    let fixture = await Fixture.create(`
      <div id="here">
        <xin-for items="[[rows]]" as="row">
          <template>
            <div class="child">
              <span>[[row.name]]</span>
              <span class="parent-data">[[foo]]</span>
            </div>
          </template>
        </xin-for>
      </div>
    `, { foo: 'foo' });
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
      await Async.sleep(50);

      fixture.querySelectorAll('.child').forEach(child => {
        assert.equal(child.querySelector('.parent-data').textContent, 'foo');
      });

      fixture.set('foo', 'bar');

      fixture.querySelectorAll('.child').forEach(child => {
        assert.equal(child.querySelector('.parent-data').textContent, 'bar');
      });
    } finally {
      fixture.dispose();
    }
  }).timeout(100000);
});
