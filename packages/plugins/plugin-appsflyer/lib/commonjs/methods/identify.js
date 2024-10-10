"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeAppsflyer = _interopRequireDefault(require("react-native-appsflyer"));
var _analyticsReactNative = require("@segment/analytics-react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = event => {
  const userId = event.userId;
  if (userId !== undefined && userId !== null && userId.length > 0) {
    _reactNativeAppsflyer.default.setCustomerUserId(userId);
  }
  const traits = event.traits;
  if (traits !== undefined && traits !== null) {
    const aFTraits = {};
    if (traits.email !== undefined && traits.email !== null) {
      aFTraits.email = traits.email;
    }
    if (traits.firstName !== undefined && traits.firstName !== null) {
      aFTraits.firstName = traits.firstName;
    }
    if (traits.lastName !== undefined && traits.firstName !== null) {
      aFTraits.lastName = traits.lastName;
    }
    if (traits.currencyCode !== undefined && traits.currencyCode !== null) {
      const codeString = (0, _analyticsReactNative.unknownToString)(traits.currencyCode);
      if (codeString !== undefined) {
        _reactNativeAppsflyer.default.setCurrencyCode(codeString);
      }
    }
    _reactNativeAppsflyer.default.setAdditionalData(aFTraits);
  }
};
exports.default = _default;
//# sourceMappingURL=identify.js.map