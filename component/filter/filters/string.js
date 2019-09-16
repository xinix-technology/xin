import { nothing } from '../../../helpers';

export default function (val) {
  if (nothing(val)) {
    return '';
  }
  return String(val);
}
