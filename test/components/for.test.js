import assert from 'assert';
import { Component, testing } from '../..';
import { html } from '../../component';

describe('components:for <xin-for>', () => {
  it('render list', async () => {
    const fixture = await testing.createFixture(html`
      <div id="here">
        <xin-for id="loop" items="{{rows}}" as="row">
          <template>
            <div class="child">[[row]]</div>
          </template>
        </xin-for>
      </div>
    `, {
      foo: 'bar',
      rows: ['foo', 'bar', 'baz'],
    });

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.querySelectorAll('.child').length, 3);

      fixture.set('rows', ['zap']);
      assert.strictEqual(fixture.$.loop.items[0], 'zap');
      assert.strictEqual(fixture.$.loop.__loopRows[0].row, 'zap');
      assert.strictEqual(fixture.querySelectorAll('.child').length, 1);
    } finally {
      fixture.dispose();
    }
  });

  it('render to nearest defined element from parent', async () => {
    const fixture = await testing.createFixture(html`
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

      assert.strictEqual(fixture.$.firstBody.children.length, 0);
      assert.strictEqual(fixture.$.secondBody.children.length, 3);
    } finally {
      fixture.dispose();
    }
  });

  it('get item, index, and model for element', async () => {
    const fixture = await testing.createFixture(html`
      <xin-for id="loop" items="[[rows]]" as="row">
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
      ];
      fixture.set('rows', rows);

      assert.deepStrictEqual(fixture.$.loop.itemForElement(fixture.$$('span')), { name: 'foo' });
      assert.strictEqual(fixture.$.loop.indexForElement(fixture.$$('span')), 0);
      assert.strictEqual(fixture.$.loop.rowForElement(fixture.$$('span')).get('index'), 0);
    } finally {
      fixture.dispose();
    }
  });

  it('bind item and index from row model', async () => {
    const compName = testing.define(class extends Component {
      get template () {
        return html`
          <div id="container">
            <xin-for id="loop" items="[[rows]]" as="row" index-as="idx">
              <template>
                <div index$="[[idx]]">
                  <span class="outer">[[outer.child]]</span>
                  <span class="idx">[[idx]]</span>
                  <span class="rowName">[[row.name]]</span> =>
                  <span class="processed">[[doSomethingWithName(row.name, "processed:")]]</span>
                </div>
              </template>
            </xin-for>
          </div>
        `;
      }

      attached () {
        super.attached();

        this.set('outer', {
          child: 'outer',
        });
        this.set('rows', [
          { name: 'foo' },
          { name: 'bar' },
        ]);
      }

      doSomethingWithName (name, prefix) {
        return `${prefix}${name}`;
      }
    });

    const fixture = await testing.createFixture(`
      <${compName} id="placeholder"></${compName}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$$('[index="0"] .outer').textContent, 'outer');
      assert.strictEqual(fixture.$$('[index="0"] .idx').textContent, '0');
      assert.strictEqual(fixture.$$('[index="0"] .rowName').textContent, 'foo');
      assert.strictEqual(fixture.$$('[index="0"] .processed').textContent, 'processed:foo');

      assert.strictEqual(fixture.$$('[index="1"] .outer').textContent, 'outer');
      assert.strictEqual(fixture.$$('[index="1"] .idx').textContent, '1');
      assert.strictEqual(fixture.$$('[index="1"] .rowName').textContent, 'bar');
      assert.strictEqual(fixture.$$('[index="1"] .processed').textContent, 'processed:bar');
    } finally {
      fixture.dispose();
    }
  });

  it('render list with data from parent', async () => {
    const fixture = await testing.createFixture(html`
      <div id="here">
        <xin-for id="loop" items="[[rows]]" as="row">
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

      assert.strictEqual(fixture.$.loop.__loopRows[0].foo, 'foo');
      assert.strictEqual(fixture.$.loop.foo, 'foo');

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
    const fixture = await testing.createFixture(html`
      <div id="here">
        <xin-for id="loop" items="[[rows]]" as="row">
          <template>
            <div class="child"><span>[[other]]</span> <span>[[row.name]]</span></div>
          </template>
        </xin-for>
      </div>
    `, {
      other: 'foo',
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

      fixture.pop('rows');

      assert.strictEqual(fixture.__templateModeler.binding.children.other.annotations.length, 1);

      fixture.$.loop.parentElement.removeChild(fixture.$.loop);

      assert.strictEqual(fixture.__templateModeler.binding.children.other.annotations.length, 0);
      assert.strictEqual(fixture.querySelectorAll('.child').length, 0);
    } finally {
      fixture.dispose();
    }
  });

  it('delegate event to template host', async () => {
    const hits = [];

    const fixture = await testing.createFixture(`
      <div id="here">
        <xin-for id="loop" items="[[items]]">
          <template>
            <a href="#" (click)="clickMe(evt, item)">[[item]]</a>
          </template>
        </xin-for>
      </div>
    `, {
      items: [
        'one',
        'two',
        'three',
      ],
      clickMe (evt, item) {
        evt.preventDefault();
        hits.push(item);
      },
    });

    try {
      await fixture.waitConnected();

      fixture.querySelectorAll('a').forEach(el => el.click());

      assert.deepStrictEqual(hits, ['one', 'two', 'three']);
    } finally {
      fixture.dispose();
    }
  });

  it('render nested for', async () => {
    const fixture = await testing.createFixture(html`
      <div id="here">
        <xin-for id="loop" items="[[rows]]" as="row">
          <template>
            <div id="rowLine">loop <span>[[outer]]</span></div>
            <xin-for id="loop2" items="[[row.children]]" as="child">
              <template>
                <div id="childLine">
                  <span>[[outer]]</span>
                  <span>[[child]]</span>
                </div>
              </template>
            </xin-for>
          </template>
        </xin-for>
      </div>
    `, {
      outer: 'outer',
      rows: [
        {
          name: 'foo',
          children: [
            'foo1',
          ],
        },
      ],
    });

    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.$.rowLine.textContent, 'loop outer');
      assert.strictEqual(fixture.$.childLine.textContent.trim().replace(/\s+/g, ' '), 'outer foo1');
    } finally {
      fixture.dispose();
    }
  });
});
