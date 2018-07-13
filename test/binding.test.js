import assert from 'assert';
import { Fixture } from '@xinix/xin/components';
import { define, Component } from '@xinix/xin';

describe('Binding', () => {
  it('bind value from property', async () => {
    let fixture = Fixture.create(`<input id="el" type="text" value="[[value]]">`);
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.equal(fixture.$.el.value, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind value from text content', async () => {
    let fixture = Fixture.create(`<textarea id="el">[[value]]</textarea>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.equal(fixture.$.el.value, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind text from text content', async () => {
    let fixture = Fixture.create(`<span id="el">[[value]]</span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.equal(fixture.$.el.textContent, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind text from attribute', async () => {
    let fixture = Fixture.create(`<span id="el" text="[[value]]"></span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', 'foo');
      assert.equal(fixture.$.el.textContent, 'foo');
    } finally {
      fixture.dispose();
    }
  });

  it('bind html from attribute', async () => {
    let fixture = Fixture.create(`<span id="el" html="[[value]]"></span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', '<b>bold</b> <i>italic</i>');
      assert.equal(fixture.$.el.textContent, 'bold italic');
      assert.equal(fixture.$.el.innerHTML, '<b>bold</b> <i>italic</i>');
    } finally {
      fixture.dispose();
    }
  });

  it('bind style from attribute', async () => {
    let fixture = Fixture.create(`<span id="el" style.border="[[value]]"></span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', '1px solid red');
      assert.equal(fixture.$.el.style.border, '1px solid red');
    } finally {
      fixture.dispose();
    }
  });

  it('bind class from attribute', async () => {
    let fixture = Fixture.create(`<span id="el" class.foo="[[value]]"></span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', true);
      assert(fixture.$.el.classList.contains('foo'));
    } finally {
      fixture.dispose();
    }
  });

  it('bind attribute', async () => {
    let fixture = Fixture.create(`<span id="el" foo$="[[value]]"></span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', 'bar');
      assert.equal(fixture.$.el.getAttribute('foo'), 'bar');
      assert.equal(fixture.$.el.foo, undefined);
    } finally {
      fixture.dispose();
    }
  });

  it('bind property', async () => {
    let fixture = Fixture.create(`<span id="el" foo="[[value]]"></span>`);
    try {
      await fixture.waitConnected();
      fixture.set('value', 'bar');
      assert.equal(fixture.$.el.getAttribute('foo'), '[[value]]');
      assert.equal(fixture.$.el.foo, 'bar');
    } finally {
      fixture.dispose();
    }
  });

  it('change value', async () => {
    let fixture = Fixture.create(require('./binding.test.html'), {
      value: 'original',
    });

    try {
      await fixture.waitConnected();

      assert.equal(fixture.value, 'original');
      assert.equal(fixture.$.input.value, 'original');
      assert.equal(fixture.$.textarea.value, 'original');
      assert.equal(fixture.$.result.textContent.trim(), 'original');

      fixture.set('value', 'foo');

      assert.equal(fixture.value, 'foo');
      assert.equal(fixture.$.input.value, 'foo');
      assert.equal(fixture.$.textarea.value, 'foo');
      assert.equal(fixture.$.result.textContent, 'foo');

      fixture.set('otherValue', '<i>baz</i>');
      fixture.set('propValue', 'baz');

      assert.equal(fixture.$.textEl.innerHTML, '&lt;i&gt;baz&lt;/i&gt;');
      assert.equal(fixture.$.htmlEl.innerHTML, '<i>baz</i>');
      assert.equal(fixture.$.propEl.getAttribute('prop-data'), 'baz');

      fixture.set('foo', 1);
      fixture.set('displayValue', 'none');

      assert.equal(fixture.$.classEl.classList.contains('foo'), true);
      assert.equal(fixture.$.styleEl.style.display, 'none');
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

    let fixture = Fixture.create(`
      <test-binding-1 id="comp" foo="foo was here"></test-binding-1>
    `);

    await fixture.waitConnected();

    assert.equal(fixture.$.comp.textContent, 'foo was here');

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

    let fixture = Fixture.create(`
      <test-binding-2 id="comp"></test-binding-2>
    `);

    await fixture.waitConnected();

    assert.equal(fixture.$.comp.textContent, 'default foo');

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
        return `${first || ''} ${last || ''}`.trim();
      }
    });

    let fixture = Fixture.create(`
      <test-binding-3 id="comp"></test-binding-3>
    `);

    try {
      await fixture.waitConnected();

      fixture.$.comp.set('first', 'foo');
      fixture.$.comp.set('last', 'bar');

      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(fixture.$.comp.full, 'foo bar');
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

    let fixture = Fixture.create(`
      <test-binding-4 id="comp" value="{{foo}}"></test-binding-4>
    `);

    try {
      await fixture.waitConnected();

      fixture.set('foo', 'foo');
      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(fixture.foo, 'foo');
      assert.equal(fixture.$.comp.value, 'foo');

      fixture.$.comp.set('value', 'bar');
      await new Promise(resolve => setTimeout(resolve, 100));
      assert.equal(fixture.foo, 'bar');
      assert.equal(fixture.$.comp.value, 'bar');
    } finally {
      await fixture.dispose();
    }
  });
});
