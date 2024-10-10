"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeFbsdkNext = require("react-native-fbsdk-next");
var _utils = require("../utils");
const PREFIX = 'Viewed';
const SUFFIX = 'Screen';
const MAX_CHARACTERS_EVENT_NAME = 40 - PREFIX.length - SUFFIX.length;
const sanitizeName = name => {
  const trimmedName = name.substring(0, MAX_CHARACTERS_EVENT_NAME);
  return `${PREFIX} ${trimmedName} ${SUFFIX}`;
};
const sanitizeEvent = event => {
  const properties = {};
  if (event.properties === undefined || event.properties === null) {
    return {};
  }
  for (const key of Object.keys(event.properties)) {
    const sanitized = (0, _utils.sanitizeValue)(event.properties[key]);
    if (sanitized !== undefined) {
      properties[key] = sanitized;
    }
  }
  return {
    ...properties
  };
};
var _default = event => {
  const name = sanitizeName(event.name);
  const params = sanitizeEvent(event);
  _reactNativeFbsdkNext.AppEventsLogger.logEvent(name, params);
};
exports.default = _default;
//# sourceMappingURL=screen.js.map