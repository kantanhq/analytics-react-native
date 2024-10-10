import { isNumber, isString, unknownToString } from '@segment/analytics-react-native';
export const sanitizeValue = value => {
  if (isNumber(value) || isString(value)) {
    return value;
  }
  return unknownToString(value);
};
//# sourceMappingURL=utils.js.map