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
    const repo = window.xin$repository;
    assert.strictEqual(repo.constructor.name, 'Repository');
    assert(typeof repo.get === 'function');
    assert(typeof repo.put === 'function');
    assert(typeof repo.update === 'function');
  });
});
