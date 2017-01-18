import xin from '../';

class Middleware extends xin.Component {
  attached () {
    super.attached();

    this.__app.use(this.callback());
  }
}

export default Middleware;
