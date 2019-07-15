import { Template } from '@xinix/xin/component/template';
import assert from 'assert';
import { Async } from '@xinix/xin/core';

import '@xinix/xin/components/for';

describe('component/template/template Template', () => {
  it('bind value', () => {
    const div = document.createElement('div');
    const template = new Template(`
      <div id="here">[[foo]]</div>
    `);

    template.set('foo', 'bar');

    template.mount(div);

    assert.strictEqual(div.textContent.trim(), 'bar');
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

    template.set('rows', [
      'satu',
      'dua',
      'tiga',
    ]);

    template.mount(div);

    document.body.appendChild(div);

    await Async.sleep(50);

    assert.strictEqual(div.querySelectorAll('.child').length, 3);

    document.body.removeChild(div);
  });
});
