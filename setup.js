const setup = new Map();

setup.load = obj => {
  for (let i in obj) {
    setup.set(i, obj[i]);
  }
};

if ('xin' in window && typeof window.xin === 'object') {
  setup.load(window.xin);
}

export default setup;
