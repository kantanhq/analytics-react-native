"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeAppsflyer = _interopRequireDefault(require("react-native-appsflyer"));
var _analyticsReactNative = require("@segment/analytics-react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = async event => {
  const properties = event.properties || {};
  const revenue = extractRevenue('revenue', properties);
  const currency = extractCurrency('currency', properties, 'USD');
  if (revenue !== undefined && revenue !== null && currency !== undefined && currency !== null) {
    const otherProperties = Object.entries(properties).filter(([key]) => key !== 'revenue' && key !== 'currency').reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {});
    await _reactNativeAppsflyer.default.logEvent(event.event, {
      ...otherProperties,
      af_revenue: revenue,
      af_currency: currency
    });
  } else {
    await _reactNativeAppsflyer.default.logEvent(event.event, properties);
  }
};
exports.default = _default;
const extractRevenue = (key, properties) => {
  const value = properties[key];
  if (value === undefined || value === null) {
    return null;
  }
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      return parseFloat(value);
    default:
      return null;
  }
};
const extractCurrency = (key, properties, defaultCurrency) => {
  const value = properties[key];
  if ((0, _analyticsReactNative.isString)(value)) {
    return value;
  }
  return defaultCurrency;
};
//# sourceMappingURL=track.js.map