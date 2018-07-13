import { Component } from '../component';

export class Middleware extends Component {
  attached () {
    super.attached();

    this.__app.use(this.callback());
  }
}
