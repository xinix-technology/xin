const puppeteer = require('puppeteer');
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const assert = require('assert');

describe('Xin', () => {
  it('define repository', async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });

      await new Promise(resolve => setTimeout(resolve, 500));
      let hasXin = await page.evaluate(() => Boolean(window.xin && typeof window.xin.get === 'function' && typeof window.xin.put === 'function'));

      assert(hasXin);
    } finally {
      await browser.close();
    }
  });

  it('run middleware', async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/#!/skip-by-middleware`, { waitUntil: 'networkidle0' });

      assert.equal(
        await page.evaluate(() => document.querySelector('.xin-view--visible.xin-view--focus').uri),
        '/not-found',
      );
    } finally {
      await browser.close();
    }
  });

  // describe.skip('new component', () => {
  //   it('new component with full slot', async () => {
  //     define('foo-1', class extends Component {
  //       get template () {
  //         return 'foo <slot></slot> bar';
  //       }
  //     });

  //     let fixture = Fixture.create(`
  //       <foo-1 id="foo">baz</foo-1>
  //     `);

  //     await fixture.waitConnected();

  //     await new Promise(resolve => {
  //       setTimeout(resolve, 1);
  //     });

  //     expect(window.foo.textContent).toEqual('foo baz bar');

  //     fixture.dispose();
  //   });

  //   it('new component with name slot', async () => {
  //     define('foo-2', class extends Component {
  //       get template () {
  //         return '<slot name="first"></slot> <slot name="last"></slot>';
  //       }
  //     });

  //     let fixture = Fixture.create(`
  //       <foo-2 id="foo">
  //         <span slot="first">first</span>
  //         <span slot="last">last</span>
  //       </foo-2>
  //     `);

  //     await fixture.waitConnected();

  //     expect(window.foo.textContent).toEqual('first last');

  //     fixture.dispose();
  //   });
  // });
});
