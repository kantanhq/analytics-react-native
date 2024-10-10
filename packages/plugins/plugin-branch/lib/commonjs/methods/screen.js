"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeBranch = require("react-native-branch");
var _analyticsReactNative = require("@segment/analytics-react-native");
var _parameterMapping = require("./parameterMapping");
var _util = require("./util");
var _default = async event => {
  const transformEvent = (0, _analyticsReactNative.generateMapTransform)(_parameterMapping.mapEventProps, _parameterMapping.transformMap);
  const safeEvent = transformEvent(event);
  const safeProps = safeEvent.properties;
  const branchEvent = await (0, _util.createBranchEventWithProps)(_reactNativeBranch.BranchEvent.ViewItem, safeProps, true);
  await branchEvent.logEvent();
};
exports.default = _default;
//# sourceMappingURL=screen.js.map