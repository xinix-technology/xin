const puppeteer = require('puppeteer');
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const assert = require('assert');

describe('App', () => {
  it('click and focusing new view', async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });

      assert.equal(await page.evaluate(() => location.hash), '');

      await page.click('a');
      await new Promise(resolve => setTimeout(resolve, 500));

      assert.equal(await page.evaluate(() => location.hash), '#!/intro');
      assert.equal(
        await page.evaluate(() => document.querySelector('.xin-view--visible.xin-view--focus').uri),
        '/intro',
      );
    } finally {
      await browser.close();
    }
  }).timeout(5000);
});
