import assert from 'assert';
import { Fixture } from '@xinix/xin/components/fixture';
import { Async } from '@xinix/xin';
import '@xinix/xin/components/for';

describe('components/for <xin-for>', () => {
  it('render list', async () => {
    const fixture = await Fixture.create(`
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
      const rows = [
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
      assert.strictEqual(fixture.querySelectorAll('.child').length, rows.length);

      fixture.set('rows', [{ name: 'zap' }]);
      await Async.sleep(50);
      assert.strictEqual(fixture.querySelectorAll('.child').length, 1);
    } finally {
      fixture.dispose();
    }
  });

  it('render to nearest defined element from parent', async () => {
    const fixture = await Fixture.create(`
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
      const rows = [
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

      assert.strictEqual(fixture.$.firstBody.children.length, 0);
      assert.strictEqual(fixture.$.secondBody.children.length, 3);
    } finally {
      fixture.dispose();
    }
  });

  it('get item, index, and model for element', async () => {
    const fixture = await Fixture.create(`
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
      const rows = [
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

      assert.deepStrictEqual(fixture.$$('xin-for').itemForElement(fixture.$$('span')), { name: 'foo' });
      assert.strictEqual(fixture.$$('xin-for').indexForElement(fixture.$$('span')), 0);
      assert.strictEqual(fixture.$$('xin-for').modelForElement(fixture.$$('span')).get('index'), 0);
    } finally {
      fixture.dispose();
    }
  });

  it('render list with data from parent', async () => {
    const fixture = await Fixture.create(`
      <div id="here">
        <xin-for items="[[rows]]" as="row">
          <template>
            <div class="child">
              <span>[[row.name]]</span>
              <span class="parent-data">[[foo]]</span>
              <span class="parent-data-with-fn">[[fnBar(baz)]]</span>
            </div>
          </template>
        </xin-for>
      </div>
    `, {
      foo: 'foo',
      fnBar (baz) {
        return `${baz}-modified`;
      },
      baz: 'baz',
    });

    try {
      await fixture.waitConnected();
      const rows = [
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
        assert.strictEqual(child.querySelector('.parent-data').textContent, 'foo');
      });

      fixture.set('foo', 'bar');

      fixture.querySelectorAll('.child').forEach(child => {
        assert.strictEqual(child.querySelector('.parent-data').textContent, 'bar');
      });

      fixture.set('rows', [{ name: 'other' }]);
    } finally {
      fixture.dispose();
    }
  });

  it('uninitialize rows when disconnected (prevent leak)', async () => {
    const fixture = await Fixture.create(`
      <div id="here">
        <xin-for id="theFor" items="[[rows]]" as="row">
          <template>
            <div class="child">[[row.name]]</div>
          </template>
        </xin-for>
      </div>
    `, {
      rows: [
        {
          name: 'foo',
        },
        {
          name: 'bar',
        },
        {
          name: 'baz',
        },
      ],
    });

    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.querySelectorAll('.child').length, 3);

      fixture.$.theFor.parentElement.removeChild(fixture.$.theFor);

      assert.strictEqual(fixture.querySelectorAll('.child').length, 0);
    } finally {
      fixture.dispose();
    }
  });
});
