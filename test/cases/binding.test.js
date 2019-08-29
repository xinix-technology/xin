import assert from 'assert';
import { Fixture } from '@xinix/xin/components';
import { define, Component } from '@xinix/xin';

describe('cases:binding', () => {
  it.only('bind value from property', async () => {
    const fixture = await Fixture.create(`
      <input id="el" type="text" value="[[value]]">
      <!--div>[[foo.bar]]</div-->
    `, {
      foo: {
        bar: 'baz',
      },
    });

    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.value, 'foo');
    } finally {
      // fixture.dispose();
    }
  });

  it('bind value from text content', async () => {
    const fixture = await Fixture.create('<textarea id="el">[[value]]</textarea>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.value, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind text from text content', async () => {
    const fixture = await Fixture.create('<span id="el">[[value]]</span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.textContent, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind text from attribute', async () => {
    const fixture = await Fixture.create('<span id="el" text="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.strictEqual(fixture.$.el.textContent, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind html from attribute', async () => {
    const fixture = await Fixture.create('<span id="el" html="[[value]]"></span>');
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
    const fixture = await Fixture.create('<span id="el" style.border="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', '1px solid red');
      assert.strictEqual(fixture.$.el.style.border, '1px solid red');
    } finally {
      fixture.dispose();
    }
  });

  it('bind class from attribute', async () => {
    const fixture = await Fixture.create('<span id="el" class.foo="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', true);
      assert(fixture.$.el.classList.contains('foo'));
    } finally {
      fixture.dispose();
    }
  });

  it('bind attribute', async () => {
    const fixture = await Fixture.create('<span id="el" foo$="[[value]]"></span>');
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
    const fixture = await Fixture.create('<span id="el" foo="[[value]]"></span>');
    try {
      await fixture.waitConnected();
      fixture.set('value', 'bar');
      assert.strictEqual(fixture.$.el.getAttribute('foo'), '[[value]]');
      assert.strictEqual(fixture.$.el.foo, 'bar');
    } finally {
      fixture.dispose();
    }
  });

  it('change value', async () => {
    const fixture = await Fixture.create(require('./binding.test.html'), {
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
    define('test-binding-1', class extends Component {
      get template () {
        return '<span>[[foo]]</span>';
      }

      get props () {
        return Object.assign({}, super.props, {
          foo: {
            type: String,
          },
        });
      }
    });

    const fixture = await Fixture.create(`
      <test-binding-1 id="comp" foo="foo was here"></test-binding-1>
    `);

    await fixture.waitConnected();

    assert.strictEqual(fixture.$.comp.textContent, 'foo was here');

    await fixture.dispose();
  });

  it('initialize data from default value', async () => {
    define('test-binding-2', class extends Component {
      get template () {
        return '<span>[[foo]]</span>';
      }

      get props () {
        return Object.assign({}, super.props, {
          foo: {
            type: String,
            value: 'default foo',
          },
        });
      }
    });

    const fixture = await Fixture.create(`
      <test-binding-2 id="comp"></test-binding-2>
    `);

    await fixture.waitConnected();

    assert.strictEqual(fixture.$.comp.textContent, 'default foo');

    await fixture.dispose();
  });

  it('compute data', async () => {
    define('test-binding-3', class extends Component {
      get template () {
        return '<span>[[full]]</span>';
      }

      get props () {
        return Object.assign({}, super.props, {
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
        });
      }

      _computeFull (first, last) {
        return `${first} ${last}`.trim();
      }
    });

    const fixture = await Fixture.create(`
      <test-binding-3 id="comp"></test-binding-3>
    `);

    try {
      await fixture.waitConnected();

      fixture.$.comp.set('first', 'foo');
      fixture.$.comp.set('last', 'bar');

      assert.strictEqual(fixture.$.comp.full, 'foo bar');
    } finally {
      await fixture.dispose();
    }
  });

  it('notify data', async () => {
    define('test-binding-4', class extends Component {
      get props () {
        return Object.assign({}, super.props, {
          value: {
            type: String,
            notify: true,
          },
        });
      }
    });

    const fixture = await Fixture.create(`
      <test-binding-4 id="comp" value="{{foo}}"></test-binding-4>
    `);

    try {
      await fixture.waitConnected();

      fixture.set('foo', 'foo');
      assert.strictEqual(fixture.foo, 'foo');
      assert.strictEqual(fixture.$.comp.value, 'foo');

      fixture.$.comp.set('value', 'bar');
      assert.strictEqual(fixture.foo, 'bar');
      assert.strictEqual(fixture.$.comp.value, 'bar');
    } finally {
      await fixture.dispose();
    }
  });
});
