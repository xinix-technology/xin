import { nothing } from '../../helpers';

export default {
  boolean (val) {
    return `${Boolean(val)}`;
  },

  consoleError (val) {
    console.error('consoleError filtered:', val);
    return val;
  },

  consoleInfo (val) {
    console.info('consoleInfo filtered:', val);
    return val;
  },

  consoleLog (val) {
    console.log('consoleLog filtered:', val); // eslint-disable-line no-console
    return val;
  },

  consoleTrace (val) {
    console.trace('consoleTrace filtered:', val); // eslint-disable-line no-console
    return val;
  },

  consoleWarn (val) {
    console.warn('consoleWarn filtered:', val);
    return val;
  },

  cssurl (v) {
    return `url(${v})`;
  },

  currency (val) {
    return (val || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  },

  default (val, defVal) {
    return (val || defVal);
  },

  json (val, indent) {
    return JSON.stringify(val, null, Number(indent));
  },

  lower (val) {
    return String(val || '').toLowerCase();
  },

  not (val) {
    return !val;
  },

  number (val) {
    return Number(val || 0).toLocaleString();
  },

  required (val) {
    if (nothing(val) || val === '') {
      throw new Error('Value is required');
    }
    return val;
  },

  slice (val, begin, end) {
    return Array.prototype.slice.call(val || [], begin, end);
  },

  string (val) {
    if (nothing(val)) {
      return '';
    }
    return String(val);
  },

  upper (val) {
    return String(val || '').toUpperCase();
  },
};
