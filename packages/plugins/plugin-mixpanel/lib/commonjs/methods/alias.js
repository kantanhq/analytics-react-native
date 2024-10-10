"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _default = async (event, mixpanel, analytics) => {
  let distinctId = '';
  const newId = event.userId;
  try {
    distinctId = await mixpanel.getDistinctId();
  } catch (e) {
    analytics.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, JSON.stringify(e), e));
    analytics.logger.warn(e);
  }
  if (distinctId !== '') {
    mixpanel.alias(newId, distinctId);
  }
};
exports.default = _default;
//# sourceMappingURL=alias.js.map