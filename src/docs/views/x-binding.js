import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components/view';

class XBinding extends View {
  get template () {
    return require('./x-binding.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      foo: {
        type: String,
        value: '',
      },
    });
  }
}

define('x-binding', XBinding);
