import { Template, Async } from '../..';
import assert from 'assert';

import '../../components/for';

describe('component:template Template', () => {
  it('bind value', () => {
    const div = document.createElement('div');
    const template = new Template(`
    <div id="here">[[foo]]</div>
    <input type="text" value="{{foo}}">
    `);

    try {
      template.set('foo', 'bar');
      template.mount(div);
      assert.strictEqual(div.textContent.trim(), 'bar');
    } finally {
      template.unmount(div);
    }
  });

  it('bind array to xin-for', async () => {
    const div = document.createElement('div');
    const template = new Template(`
      <div id="here">
        <xin-for items="[[rows]]">
          <template>
            <div class="child">[[item]]</div>
          </template>
        </xin-for>
      </div>
    `);

    document.body.appendChild(div);
    try {
      template.set('rows', [
        'satu',
        'dua',
        'tiga',
      ]);

      template.mount(div);

      await Async.sleep(50);

      assert.strictEqual(div.querySelectorAll('.child').length, 3);
    } finally {
      template.unmount(div);
      document.body.removeChild(div);
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
      assert.strictEqual(template.num, 0);

      template.set('num', '120');
      assert.strictEqual(template.num, 120);
    } finally {
      template.unmount(div);
      document.body.removeChild(div);
    }
  });
});
