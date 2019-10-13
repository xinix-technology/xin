import { Async, testing } from '../..';
import assert from 'assert';
import { html } from '../../component';

describe('components:if <xin-if>', () => {
  it('render template', async () => {
    const fixture = await testing.createFixture(html`
      <div class="button-groups">
        <button (click)="doToggle(evt)">Toggle</button>
      </div>
      <div class="if-placeholder">
        <xin-if id="selection" condition="[[show]]">
          <template>
            <h3>IF AREA</h3>
          </template>
          <template else>
            <h3>ELSE AREA</h3>
          </template>
        </xin-if>
      </div>
    `, {
      show: true,
      doToggle () {
        this.set('show', !this.show);
      },
    });

    try {
      await fixture.waitConnected();

      fixture.set('show', false);
      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'ELSE AREA');

      fixture.set('show', true);
      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'IF AREA');
    } finally {
      fixture.dispose();
    }
  });

  it('nest', async () => {
    const fixture = await testing.createFixture(html`
      <div class="buttons">
        <button (click)='toggle("foo")'>Toggle Foo</button>
        <button (click)='toggle("bar")'>Toggle Bar</button>
      </div>

      <div class="placeholder">
        <xin-if condition="[[shows.foo]]">
          <template>
            <h3>Foo If</h3>
            <div>
              <xin-if condition="[[shows.bar]]">
                <template>
                  <h4>Foo If Bar If</h4>
                </template>
                <template else>
                  <h4>Foo If Bar Else</h4>
                </template>
              </xin-if>
            </div>
          </template>
          <template>
            <h3>Foo Else</h3>
            <xin-if condition="[[shows.bar]]">
              <template>
                <h4>Foo Else Bar If</h4>
              </template>
              <template else>
                <h4>Foo Else Bar Else</h4>
              </template>
            </xin-if>
          </template>
        </xin-if>
      </div>
    `, {
      shows: {
        foo: true,
        bar: true,
      },
      toggle (key) {
        this.set(`shows.${key}`, !this.get(`shows.${key}`));
      },
    });
    try {
      await fixture.waitConnected();

      assert(fixture.innerHTML.includes('<h3>Foo If</h3>'));
      assert(!fixture.innerHTML.includes('<h3>Foo Else</h3>'));
      assert(fixture.innerHTML.includes('<h4>Foo If Bar If</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo If Bar Else</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo Else Bar If</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo Else Bar Else</h4>'));

      fixture.set('shows.foo', false);
      await Async.sleep();

      assert(!fixture.innerHTML.includes('<h3>Foo If</h3>'));
      assert(fixture.innerHTML.includes('<h3>Foo Else</h3>'));
      assert(!fixture.innerHTML.includes('<h4>Foo If Bar If</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo If Bar Else</h4>'));
      assert(fixture.innerHTML.includes('<h4>Foo Else Bar If</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo Else Bar Else</h4>'));

      fixture.set('shows.bar', false);
      await Async.sleep();

      assert(!fixture.innerHTML.includes('<h3>Foo If</h3>'));
      assert(fixture.innerHTML.includes('<h3>Foo Else</h3>'));
      assert(!fixture.innerHTML.includes('<h4>Foo If Bar If</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo If Bar Else</h4>'));
      assert(!fixture.innerHTML.includes('<h4>Foo Else Bar If</h4>'));
      assert(fixture.innerHTML.includes('<h4>Foo Else Bar Else</h4>'));
    } finally {
      fixture.dispose();
    }
  });

  it('propagate change to if parent, instance and row', async () => {
    const fixture = await testing.createFixture(html`
      <div style="background-color: blue">
        <div>
          <button (click)="doClick(evt)">Toggle</button>
        </div>
        <div>
          <input type="text" value="{{form.value}}">
          <span>[[formatValue(form.value)]]</span>
        </div>
      </div>
      <xin-if id="selection" condition="[[show]]">
        <template>
          <div style="background-color: green">
            <div>
              <input type="text" value="{{form.value}}">
              <span>[[formatValue(form.value)]]</span>
            </div>
          </div>
        </template>
        <template else>
          <div style="background-color: red">
            <div>
              <input type="text" value="{{form.value}}">
              <span>[[formatValue(form.value)]]</span>
            </div>
          </div>
        </template>
      </xin-if>
    `, {
      show: true,
      doClick () {
        this.set('show', !this.show);
      },
      formatValue (value) {
        return `formatted(${value})`;
      },
      form: {
        value: 'foo',
      },
    });

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.form.value, 'foo');
      assert.strictEqual(fixture.$.selection.form.value, 'foo');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'foo');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'foo');

      fixture.set('form.value', 'bar');
      assert.strictEqual(fixture.form.value, 'bar');
      assert.strictEqual(fixture.$.selection.form.value, 'bar');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'bar');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'bar');

      fixture.$.selection.__ifRows[0].set('form.value', 'baz');
      assert.strictEqual(fixture.form.value, 'baz');
      assert.strictEqual(fixture.$.selection.form.value, 'baz');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'baz');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'baz');

      fixture.set('show', false);

      fixture.$.selection.__ifRows[1].set('form.value', 'baz1');
      assert.strictEqual(fixture.form.value, 'baz1');
      assert.strictEqual(fixture.$.selection.form.value, 'baz1');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'baz1');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'baz1');
    } finally {
      fixture.dispose();
    }
  });
});
