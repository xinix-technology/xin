import assert from 'assert';
import { Filter, testing } from '../..';

describe('component:filter Filter', () => {
  it('format currency', async () => {
    const fixture = await testing.createFixture(`
      <span id="val">[[money|currency]]</span>
    `);

    try {
      await fixture.waitConnected();

      fixture.set('money', 12345);

      assert.strictEqual(fixture.$.val.textContent, '12,345.00');
    } finally {
      fixture.dispose();
    }
  });

  it('format string', () => {
    assert.strictEqual(Filter.resolve('string').invoke('foo'), 'foo');
    assert.strictEqual(Filter.resolve('string').invoke(undefined), '');
    assert.strictEqual(Filter.resolve('string').invoke(null), '');
    assert.strictEqual(Filter.resolve('string').invoke(true), 'true');
    assert.strictEqual(Filter.resolve('string').invoke(100), '100');
  });

  it('format number', () => {
    assert.strictEqual(Filter.resolve('number').invoke('1000'), '1,000');
  });

  it('format boolean', () => {
    assert.strictEqual(Filter.resolve('boolean').invoke(true), 'true');
    assert.strictEqual(Filter.resolve('boolean').invoke(false), 'false');
  });

  it('format default', () => {
    assert.strictEqual(Filter.resolve('default:foo').invoke(0), 'foo');
    assert.strictEqual(Filter.resolve('default:foo').invoke('bar'), 'bar');
  });

  it('format upper', () => {
    assert.strictEqual(Filter.resolve('upper').invoke('foo'), 'FOO');
  });

  it('format lower', () => {
    assert.strictEqual(Filter.resolve('lower').invoke('FOO'), 'foo');
  });

  it('format not', () => {
    assert.strictEqual(Filter.resolve('not').invoke(''), true);
    assert.strictEqual(Filter.resolve('not').invoke(0), true);
    assert.strictEqual(Filter.resolve('not').invoke('foo'), false);
  });

  it('format cssurl', () => {
    assert.strictEqual(Filter.resolve('cssurl').invoke('/foo'), 'url(/foo)');
  });

  it('put new filter', () => {
    Filter.put('bar', (v, ...args) => {
      return `${v} ${args.toString()}`.trim();
    });

    assert.strictEqual(Filter.resolve('bar:1,2,3').invoke('foo'), 'foo 1,2,3');
  });
});
