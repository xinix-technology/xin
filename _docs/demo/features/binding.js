import 'file-loader?name=demo/features/[name].[ext]!extract-loader?!./binding.html';

import xin from '../../';

class XPanel extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      foo: {
        type: String,
        value: '',
      },
    });
  }
}

xin.define('x-panel', XPanel);
