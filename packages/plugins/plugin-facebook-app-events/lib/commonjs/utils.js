"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeValue = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
const sanitizeValue = value => {
  if ((0, _analyticsReactNative.isNumber)(value) || (0, _analyticsReactNative.isString)(value)) {
    return value;
  }
  return (0, _analyticsReactNative.unknownToString)(value);
};
exports.sanitizeValue = sanitizeValue;
//# sourceMappingURL=utils.js.map