import 'file-loader?name=demo/features/[name].[ext]!extract-loader?!./binding.html'; // eslint-disable-line import/no-webpack-loader-syntax

import { define, Component } from '@xinix/xin';

class XPanel extends Component {
  get props () {
    return Object.assign({}, super.props, {
      foo: {
        type: String,
        value: '',
      },
    });
  }
}

define('x-panel', XPanel);
