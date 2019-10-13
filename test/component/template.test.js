import { Template, html } from '../..';
import assert from 'assert';

describe('component:template Template', () => {
  it('bind value', () => {
    const div = document.createElement('div');
    const template = new Template(html`
      <div id="here">[[foo]]</div>
      <input type="text" value="{{foo}}">
    `);

    try {
      template.set('foo', 'bar');
      template.mount(div);
      assert.strictEqual(div.textContent.trim(), 'bar');
    } finally {
      template.dispose();
    }
  });

  it('prepare value to be set', () => {
    const div = document.createElement('div');
    const template = new Template(`
      <div>[[num]]</div>
      <input type="text" value="{{num}}">
    `, {
      num: {
        type: Number,
        value: 0,
      },
    });

    document.body.appendChild(div);

    try {
      template.mount(div);

      template.set('num', 100);
      assert.strictEqual(template.num, 100);

      template.set('num', 0);
      assert.strictEqual(template.num, 0);

      template.set('num', null);
      assert.strictEqual(template.num, undefined);

      template.set('num', '120');
      assert.strictEqual(template.num, 120);
    } finally {
      template.dispose();
      document.body.removeChild(div);
    }
  });
});
