export class EventEmitter {
  constructor () {
    this._listeners = [];
  }

  addListener (type, listener) {
    this._listeners.push({ type, listener });
  }

  removeListener (type, listener) {
    const index = this._listeners.findIndex(l => l.type === type && l.listener === listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  removeAllListeners (type) {
    const newListeners = [];
    if (type) {
      this._listeners.forEach(l => {
        if (l.type !== type) {
          newListeners.push(l);
        }
      });
    }
    this._listeners = newListeners;
  }

  emit (type, ...args) {
    setTimeout(() => {
      const ls = this._listeners.filter(l => l.type === type);
      ls.forEach(({ listener }) => listener(...args));
      if (ls.length === 0 && type === 'error') {
        throw args[0];
      }
    });
  }
}
