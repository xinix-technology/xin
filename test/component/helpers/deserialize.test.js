import assert from 'assert';
import { deserialize } from '../../../component/helpers';

describe('#deserialize()', () => {
  it('deserialize to number', () => {
    assert.strictEqual(0, deserialize('', Number));
    assert.strictEqual(0, deserialize('0', Number));
    assert.strictEqual(1, deserialize('1', Number));
    assert.strictEqual(100, deserialize('100', Number));
    assert.strictEqual(5.6, deserialize('5.6', Number));
    assert.strictEqual(0.6, deserialize('.6', Number));
  });

  it('deserialize to boolean', () => {
    assert.strictEqual(true, deserialize('', Boolean));
    assert.strictEqual(true, deserialize('true', Boolean));
    assert.strictEqual(true, deserialize('1', Boolean));
    assert.strictEqual(true, deserialize('on', Boolean));

    assert.strictEqual(false, deserialize('false', Boolean));
    assert.strictEqual(false, deserialize('0', Boolean));
    assert.strictEqual(false, deserialize('off', Boolean));
  });

  it('deserialize to array', () => {
    assert.strictEqual(0, deserialize('[]', Array).length);
    assert.strictEqual(1, deserialize('[{}]', Array).length);
  });

  it('deserialize to object', () => {
    assert.strictEqual('bar', deserialize('{"foo":"bar"}', Object).foo);
  });

  it('deserialize to date', () => {
    const dt = new Date();
    assert.strictEqual(dt.toJSON(), deserialize(dt.toJSON(), Date).toJSON());
  });

  it('deserialize to regexp', () => {
    assert(deserialize('/foo/', RegExp) instanceof RegExp);
  });

  it('deserialize to function', () => {
    const fn = deserialize('return arguments[0] + arguments[1]', Function);
    assert(fn instanceof Function);
    assert.strictEqual(fn(1, 2), 3);
  });
});
