"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirebasePlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _screen = _interopRequireDefault(require("./methods/screen"));
var _track = _interopRequireDefault(require("./methods/track"));
var _reset = _interopRequireDefault(require("./methods/reset"));
var _analytics = _interopRequireDefault(require("@react-native-firebase/analytics"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FirebasePlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
  key = 'Firebase';
  async identify(event) {
    if (event.userId !== undefined) {
      await (0, _analytics.default)().setUserId(event.userId);
    }
    if (event.traits) {
      const eventTraits = event.traits;
      const checkType = value => {
        return typeof value === 'object' && !Array.isArray(value);
      };
      const safeTraits = Object.keys(eventTraits).reduce((acc, trait) => {
        if (checkType(eventTraits[trait])) {
          this.analytics?.logger.warn('We detected an object or array data type. Firebase does not accept nested traits.');
          return acc;
        }
        if (trait !== undefined) {
          acc[trait] = typeof eventTraits[trait] === 'undefined' ? '' : eventTraits[trait].toString();
        }
        return acc;
      }, {});
      await (0, _analytics.default)().setUserProperties(safeTraits);
    }
    return event;
  }
  async track(event) {
    try {
      await (0, _track.default)(event);
    } catch (error) {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Error on Firebase Track', error));
    }
    return event;
  }
  async screen(event) {
    try {
      await (0, _screen.default)(event);
    } catch (error) {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Error on Firebase Track', error));
    }
    return event;
  }
  async reset() {
    try {
      await (0, _reset.default)();
    } catch (error) {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Error on Firebase Track', error));
    }
  }
}
exports.FirebasePlugin = FirebasePlugin;
//# sourceMappingURL=FirebasePlugin.js.map