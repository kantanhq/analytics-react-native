"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mappedCustomEventToken = exports.extract = void 0;
const mappedCustomEventToken = (eventName, settings) => {
  let result = null;
  const tokens = settings?.customEvents;
  if (tokens) {
    result = tokens[eventName];
  }
  return result;
};
exports.mappedCustomEventToken = mappedCustomEventToken;
const extract = (key, properties, defaultValue = null) => {
  let result = defaultValue;
  Object.entries(properties).forEach(([propKey, propValue]) => {
    // not sure if this comparison is actually necessary,
    // but existed in the old destination so ...
    if (key.toLowerCase() === propKey.toLowerCase()) {
      result = propValue;
    }
  });
  return result;
};
exports.extract = extract;
//# sourceMappingURL=util.js.map