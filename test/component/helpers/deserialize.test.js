import assert from 'assert';
import { deserialize } from '../../../component/helpers';

describe('deserialize', () => {
  it('deserialize to number', () => {
    assert.equal(0, deserialize('', Number));
    assert.equal(0, deserialize('0', Number));
    assert.equal(1, deserialize('1', Number));
    assert.equal(100, deserialize('100', Number));
    assert.equal(5.6, deserialize('5.6', Number));
    assert.equal(0.6, deserialize('.6', Number));
  });

  it('deserialize to boolean', () => {
    assert.equal(true, deserialize('', Boolean));
    assert.equal(true, deserialize('true', Boolean));
    assert.equal(true, deserialize('1', Boolean));
    assert.equal(true, deserialize('on', Boolean));

    assert.equal(false, deserialize('false', Boolean));
    assert.equal(false, deserialize('0', Boolean));
    assert.equal(false, deserialize('off', Boolean));
  });

  it('deserialize to array', () => {
    assert.equal(0, deserialize('[]', Array).length);
    assert.equal(1, deserialize('[{}]', Array).length);
  });

  it('deserialize to object', () => {
    assert.equal('bar', deserialize('{"foo":"bar"}', Object).foo);
  });

  it('deserialize to date', () => {
    let dt = new Date();
    assert.equal(dt.toJSON(), deserialize(dt.toJSON(), Date).toJSON());
  });

  it('deserialize to regexp', () => {
    assert(deserialize('/foo/', RegExp) instanceof RegExp);
  });

  it('deserialize to function', () => {
    let fn = deserialize('return arguments[0] + arguments[1]', Function);
    assert(fn instanceof Function);
    assert.equal(fn(1, 2), 3);
  });
});
