import { define, Component } from '@xinix/xin';
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

    this.$$('foo-alarm').start();
  }

  blurred () {
    super.blurred();

    this.$$('foo-alarm').stop();
    this.set('events', []);
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

  gotHit (evt) {
    this.push('events', evt.detail);
  }

  preSubmit (evt) {
    evt.preventDefault();

    if (!this.user.username) {
      evt.stopImmediatePropagation();
      alert('Username empty');
      return;
    }

    if (!this.user.password) {
      evt.stopImmediatePropagation();
      alert('Password empty');
    }
  }

  submitForm (evt) {
    evt.preventDefault();

    alert(`User submitted ${JSON.stringify(this.user, null, 2)}`);
  }
}

define('x-for', XFor);

class FooAlarm extends Component {
  get props () {
    return Object.assign({}, super.props, {
      interval: {
        type: Number,
        value: 1000,
      },
    });
  }

  start () {
    let doSomething = () => {
      this.fire('hit', new Date());

      this.timeout = setTimeout(doSomething, this.interval);
    };

    doSomething();
  }

  stop () {
    clearTimeout(this.timeout);
  }
}

define('foo-alarm', FooAlarm);
