import assert from 'assert';
import { Component, event, repository, testing } from '../..';
import { html } from '../../component';

describe('cases:binding', () => {
  it('bind value from property', async () => {
    const fixture = await testing.createFixture(`
      <input id="el1" type="text" value="{{value}}">
      <div id="el2">[[value]]</div>
    `);

    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el1.value, 'foo');
      assert.strictEqual(fixture.$.el2.innerText, 'foo');

      fixture.$.el1.value = 'bar';
      event(fixture.$.el1).fire('input');

      assert.strictEqual(fixture.$.el1.value, 'bar');
      assert.strictEqual(fixture.$.el2.innerText, 'bar');
    } finally {
      fixture.dispose();
    }
  });

  it('bind value from text content', async () => {
    const fixture = await testing.createFixture('<textarea id="el">[[value]]</textarea>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.value, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind text from text content', async () => {
    const fixture = await testing.createFixture('<span id="el">[[value]]</span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.textContent, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind text from attribute', async () => {
    const fixture = await testing.createFixture('<span id="el" text="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.textContent, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind html from attribute', async () => {
    const fixture = await testing.createFixture('<span id="el" html="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', '<b>bold</b> <i>italic</i>');
      assert.strictEqual(fixture.$.el.textContent, 'bold italic');
      assert.strictEqual(fixture.$.el.innerHTML, '<b>bold</b> <i>italic</i>');
    } finally {
      fixture.dispose();
    }
  });

  it('bind style from attribute', async () => {
    const fixture = await testing.createFixture('<span id="el" style.border="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', '1px solid red');
      assert.strictEqual(fixture.$.el.style.border, '1px solid red');
    } finally {
      fixture.dispose();
    }
  });

  it('bind class from attribute', async () => {
    const fixture = await testing.createFixture('<span id="el" class.foo="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', true);
      assert(fixture.$.el.classList.contains('foo'));
    } finally {
      fixture.dispose();
    }
  });

  it('bind attribute', async () => {
    const fixture = await testing.createFixture('<span id="el" foo$="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'bar');
      assert.strictEqual(fixture.$.el.getAttribute('foo'), 'bar');
      assert.strictEqual(fixture.$.el.foo, undefined);
    } finally {
      fixture.dispose();
    }
  });

  it('bind property', async () => {
    const fixture = await testing.createFixture('<span id="el" foo="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'bar');
      assert.strictEqual(fixture.$.el.hasAttribute('foo'), false);
      assert.strictEqual(fixture.$.el.foo, 'bar');
    } finally {
      fixture.dispose();
    }
  });

  it('change value', async () => {
    const fixture = await testing.createFixture(html`
      <input id="input" type="text" value="{{value}}">
      <textarea id="textarea">{{value}}</textarea>
      <div id="result">[[value]]</div>
      <div id="textEl" text="[[otherValue]]"></div>
      <div id="htmlEl" html="[[otherValue]]"></div>
      <div id="propEl" prop-data$="[[propValue]]"></div>

      <div id="classEl" class.foo="[[foo]]"></div>
      <div id="styleEl" style.display="[[displayValue]]"></div>
    `, {
      value: 'original',
    });

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.value, 'original');
      assert.strictEqual(fixture.$.input.value, 'original');
      assert.strictEqual(fixture.$.textarea.value, 'original');
      assert.strictEqual(fixture.$.result.textContent.trim(), 'original');

      fixture.set('value', 'foo');

      assert.strictEqual(fixture.value, 'foo');
      assert.strictEqual(fixture.$.input.value, 'foo');
      assert.strictEqual(fixture.$.textarea.value, 'foo');
      assert.strictEqual(fixture.$.result.textContent, 'foo');

      fixture.set('otherValue', '<i>baz</i>');
      fixture.set('propValue', 'baz');

      assert.strictEqual(fixture.$.textEl.innerHTML, '&lt;i&gt;baz&lt;/i&gt;');
      assert.strictEqual(fixture.$.htmlEl.innerHTML, '<i>baz</i>');
      assert.strictEqual(fixture.$.propEl.getAttribute('prop-data'), 'baz');

      fixture.set('foo', 1);
      fixture.set('displayValue', 'none');

      assert.strictEqual(fixture.$.classEl.classList.contains('foo'), true);
      assert.strictEqual(fixture.$.styleEl.style.display, 'none');
    } finally {
      fixture.dispose();
    }
  });

  it('initialize data from attribute', async () => {
    const componentName = testing.define(class extends Component {
      get template () {
        return '<span>[[foo]]</span>';
      }

      get props () {
        return {
          ...super.props,
          foo: {
            type: String,
          },
        };
      }
    });

    const fixture = await testing.createFixture(`
      <${componentName} id="comp" foo="foo was here"></${componentName}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.comp.textContent, 'foo was here');
    } finally {
      fixture.dispose();
    }
  });

  it('initialize data from default value', async () => {
    const componentName = testing.define(class extends Component {
      get template () {
        return '<span>[[foo]]</span>';
      }

      get props () {
        return {
          ...super.props,
          foo: {
            type: String,
            value: 'default foo',
          },
        };
      }
    });

    const fixture = await testing.createFixture(`
      <${componentName} id="comp"></${componentName}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.comp.textContent, 'default foo');
    } finally {
      fixture.dispose();
    }
  });

  it('compute data', async () => {
    const componentName = testing.define(class extends Component {
      get template () {
        return '<span>[[full]]</span>';
      }

      get props () {
        return {
          ...super.props,
          first: {
            type: String,
          },

          last: {
            type: String,
          },

          full: {
            type: String,
            computed: '_computeFull(first, last)',
          },
        };
      }

      _computeFull (first, last) {
        return `${first || ''} ${last || ''}`.trim();
      }
    });

    const fixture = await testing.createFixture(`
      <${componentName} id="comp"></${componentName}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.comp.full, '');

      fixture.$.comp.set('first', 'foo');
      fixture.$.comp.set('last', 'bar');

      assert.strictEqual(fixture.$.comp.full, 'foo bar');
    } finally {
      fixture.dispose();
    }
  });

  it('observe value', async () => {
    const logs = [];
    const componentName = testing.define(class extends Component {
      get props () {
        return {
          foo: {
            type: String,
            observer: 'fooChanged(foo)',
          },
        };
      }

      fooChanged (foo) {
        if (!foo) {
          return;
        }
        logs.push(foo);
      }
    });

    const fixture = await testing.createFixture(`
      <${componentName} id="comp"></${componentName}>
    `);

    try {
      await fixture.waitConnected();

      fixture.$.comp.set('foo', 'one');
      fixture.$.comp.set('foo', 'two');
      fixture.$.comp.set('foo', 'three');

      assert.deepStrictEqual(logs, ['one', 'two', 'three']);
    } finally {
      fixture.dispose();
    }
  });

  it('notify data', async () => {
    const comp1 = testing.define(class extends Component {
      get props () {
        return {
          ...super.props,
          foo: {
            type: String,
            value: 'xyz',
          },
        };
      }

      get template () {
        return html`
          <div style="background-color: lime; padding: 5px">
            <div>
              <div>Foo</div>
              <input type="text" value="{{foo}}">
            </div>
            <div>
              <div>Comp2</div>
              <${comp2} id="comp2" value="{{foo}}"></${comp1}>
            </div>
          </div>
        `;
      }
    });

    const comp2 = testing.define(class extends Component {
      get props () {
        return {
          ...super.props,
          value: {
            type: String,
            notify: true,
          },
        };
      }

      get template () {
        return html`
          <div style="background-color: yellow; padding: 5px">
            <div>Value</div>
            <input type="text" value="{{value}}">
          </div>
        `;
      }
    });

    const fixture = await testing.createFixture(html`
      <div>
        <div>Fixture Foo</div>
        <input type="text" value="{{foo}}">
      </div>
      <div>
        <div>Comp1</div>
        <${comp1} id="comp1"></${comp1}>
      </div>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$$(comp1).foo, 'xyz');
      assert.strictEqual(fixture.$$(comp2).value, 'xyz');

      fixture.$$(comp1).set('foo', 'foo');
      assert.strictEqual(fixture.$$(comp1).foo, 'foo');
      assert.strictEqual(fixture.$$(comp2).value, 'foo');

      fixture.$$(comp2).set('value', 'bar');
      assert.strictEqual(fixture.$$(comp1).foo, 'bar');
      assert.strictEqual(fixture.$$(comp2).value, 'bar');
    } finally {
      fixture.dispose();
    }
  });

  it('has required field', async () => {
    const tag = testing.define(class extends Component {
      get props () {
        return {
          ...super.props,
          foo: {
            type: String,
            required: true,
          },
        };
      }
    });

    {
      let hit = 0;
      repository.$config.silent = true;
      repository.$config.errorHandler = () => hit++;

      const fixture = await testing.createFixture(`
        <${tag}></${tag}>
      `);

      try {
        await fixture.waitConnected();
        assert.strictEqual(hit, 1);
      } finally {
        repository.$config.silent = false;
        repository.$config.errorHandler = undefined;
      }
    }

    const fixture = await testing.createFixture(`
      <${tag} foo="qqq"></${tag}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$$(tag).foo, 'qqq');
    } finally {
      fixture.dispose();
    }
  });

  it('bind event', async () => {
    let hit = 0;
    const fixture = await testing.createFixture(`
      <button id="button" (click)="doClick(evt)">Click</button>
    `, {
      doClick (evt) {
        hit++;
      },
    });

    try {
      await fixture.waitConnected();

      fixture.$.button.click();

      assert.strictEqual(hit, 1);
    } finally {
      fixture.dispose();
    }
  });
});
