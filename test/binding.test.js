const puppeteer = require('puppeteer');
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const assert = require('assert');

describe('Binding', () => {
  it('change data', async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/#!/binding`, { waitUntil: 'networkidle0' });

      assert.equal(await page.evaluate(() => document.querySelector('x-binding').foo), '');
      await page.evaluate(() => document.querySelector('x-binding').set('foo', 'foo'));
      assert.equal(await page.evaluate(() => document.querySelector('x-binding').foo), 'foo');

      await page.tap('x-binding #input');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
      await page.keyboard.type('bar');
      assert.equal(await page.evaluate(() => document.querySelector('x-binding').foo), 'bar');
      assert.equal(await page.evaluate(() => document.querySelector('x-binding #result').textContent), 'bar');

      await page.tap('x-binding #inputRo');
      await page.keyboard.press('Backspace');
      await page.keyboard.type('z');
      assert.equal(await page.evaluate(() => document.querySelector('x-binding').foo), 'bar');
      assert.equal(await page.evaluate(() => document.querySelector('x-binding #result').textContent), 'bar');
      assert.equal(await page.evaluate(() => document.querySelector('x-binding #inputRo').value), 'baz');
    } finally {
      await browser.close();
    }
  });
});
