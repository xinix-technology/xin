const { define } = window.xin;
const { View } = window.xin.components;

class XFormView extends View {
  get template () {
    return `
      <h2>Form</h2>

      <p>This form show you how binding works!</p>

      <input type="text" value="{{op1}}">
      +
      <input type="text" value="{{op2}}">
      =
      <input type="text" readonly value="[[calc(op1, op2)]]">
    `;
  }

  get props () {
    return Object.assign({}, super.props, {
      op1: {
        type: Number,
        value: 0,
      },

      op2: {
        type: Number,
        value: 0,
      },
    });
  }

  attached () {
    super.attached();

    this.set('op1', Math.floor(Math.random() * 100));
    this.set('op2', Math.floor(Math.random() * 100));
  }

  calc (op1, op2) {
    return Number(op1) + Number(op2);
  }
}

define('x-form-view', XFormView);
