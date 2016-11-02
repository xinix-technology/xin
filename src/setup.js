const setup = new Map();

setup.load = obj => {
  for (let i in obj) {
    setup.set(i, obj[i]);
  }
};

export default setup;
