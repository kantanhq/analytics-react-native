"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analytics = _interopRequireDefault(require("@react-native-firebase/analytics"));
var _analyticsReactNative = require("@segment/analytics-react-native");
var _parameterMapping = require("./parameterMapping");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mappedPropNames = (0, _analyticsReactNative.generateMapTransform)(_parameterMapping.mapEventProps, _parameterMapping.transformMap);
const sanitizeName = name => {
  return name.replace(/[^a-zA-Z0-9]/g, '_');
};
var _default = async event => {
  const safeEvent = mappedPropNames(event);
  const convertedName = safeEvent.event;
  let safeEventName = sanitizeName(convertedName);
  const safeProps = safeEvent.properties;
  // Clip the event name if it exceeds 40 characters
  if (safeEventName.length > 40) {
    safeEventName = safeEventName.substring(0, 40);
  }
  await (0, _analytics.default)().logEvent(safeEventName, safeProps);
};
exports.default = _default;
//# sourceMappingURL=track.js.map