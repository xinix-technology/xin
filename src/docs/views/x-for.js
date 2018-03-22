import { define } from '@xinix/xin';
import { View } from '@xinix/xin/components/view';

import html from './x-for.html';

class XFor extends View {
  get template () {
    return html;
  }

  get listeners () {
    return {
      'submit #userForm': 'preSubmit(evt)',
    };
  }

  get props () {
    return Object.assign({}, super.props, {
      products: {
        type: Array,
        value: () => ([]),
      },

      events: {
        type: Array,
        value: () => ([]),
      },

      user: {
        type: Object,
        value: () => ({}),
      },
    });
  }

  focusing () {
    super.focusing();

    this.set('products', [
      {
        name: 'Foo',
        price: 1000,
      },
      {
        name: 'Bar',
        price: 2300,
      },
      {
        name: 'Baz',
        price: 41200,
      },
    ]);
  }

  blurred () {
    super.blurred();
  }

  formatPrice (price) {
    return `Rp ${price}`;
  }

  addNewProduct (evt) {
    evt.preventDefault();

    this.push('products', {
      name: `User-${new Date().getTime()}`,
      price: Math.random() * 1000 | 0,
    });
  }

  deleteProduct (index) {
    this.splice('products', index, 1);
  }
}

define('x-for', XFor);
