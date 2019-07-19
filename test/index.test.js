import assert from 'assert';

describe('xin', () => {
  it('has core functionalities', async () => {
    const imported = await import('@xinix/xin');

    assert(typeof imported.bootstrap === 'function');
    assert(imported.Repository);
  });

  it('has component functionalities', async () => {
    const imported = await import('@xinix/xin');

    assert(typeof imported.define === 'function');
    assert(typeof imported.base === 'function');
    assert(imported.Component);
    assert(imported.Template);
    assert(imported.Filter);
  });

  it('define global xin repository', () => {
    assert.strictEqual(window.xin$repository.constructor.name, 'Repository');
    assert(typeof window.xin$repository.get === 'function');
    assert(typeof window.xin$repository.put === 'function');
    assert(typeof window.xin$repository.update === 'function');
  });
});
