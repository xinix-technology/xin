import { nothing } from '../../../helpers';

export default function (val) {
  if (nothing(val) || val === '') {
    throw new Error('Value is required');
  }
  return val;
}
