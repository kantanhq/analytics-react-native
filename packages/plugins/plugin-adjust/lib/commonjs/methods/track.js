"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeAdjust = require("react-native-adjust");
var _util = require("../util");
var _default = (event, settings) => {
  const anonId = event.anonymousId;
  if (anonId !== undefined && anonId !== null && anonId.length > 0) {
    _reactNativeAdjust.Adjust.addSessionPartnerParameter('anonymous_id', anonId);
  }
  const token = (0, _util.mappedCustomEventToken)(event.event, settings);
  if (token !== undefined && token !== null) {
    const adjEvent = new _reactNativeAdjust.AdjustEvent(token);
    const properties = event.properties;
    if (properties !== undefined && properties !== null) {
      Object.entries(properties).forEach(([key, value]) => {
        adjEvent.addCallbackParameter(key, value);
      });
      const revenue = (0, _util.extract)('revenue', properties);
      const currency = (0, _util.extract)('currency', properties, 'USD');
      const orderId = (0, _util.extract)('orderId', properties);
      if (revenue !== undefined && revenue !== null && currency !== undefined && currency !== null) {
        adjEvent.setRevenue(revenue, currency);
      }
      if (orderId !== undefined && orderId !== null) {
        adjEvent.setTransactionId(orderId);
      }
    }
    _reactNativeAdjust.Adjust.trackEvent(adjEvent);
  }
};
exports.default = _default;
//# sourceMappingURL=track.js.map