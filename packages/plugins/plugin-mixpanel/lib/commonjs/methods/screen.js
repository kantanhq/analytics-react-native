"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _track = _interopRequireDefault(require("./track"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (event, mixpanel, settings) => {
  const callTrack = (eventName, properties) => {
    (0, _track.default)(eventName, properties, settings, mixpanel);
  };
  const properties = event.properties;
  if (settings.consolidatedPageCalls === true) {
    const eventName = 'Loaded a Screen';
    const screenName = event.name;
    if (screenName !== undefined) {
      properties.name = screenName;
    }
    callTrack(eventName, properties);
  } else if (settings.trackAllPages === true) {
    const eventName = `Viewed ${event.name} Screen`;
    callTrack(eventName, properties);
  } else if (settings.trackNamedPages === true && event.name !== undefined) {
    const eventName = `Viewed ${event.name} Screen`;
    callTrack(eventName, properties);
  } else if (settings.trackCategorizedPages === true && event.properties?.category !== undefined) {
    const category = event.properties.category;
    const eventName = `Viewed ${category?.toString() ?? ''} Screen`;
    callTrack(eventName, properties);
  }
};
exports.default = _default;
//# sourceMappingURL=screen.js.map