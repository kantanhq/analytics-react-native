"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClevertapPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _parameterMapping = require("./parameterMapping");
var _clevertapReactNative = _interopRequireDefault(require("clevertap-react-native"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mappedTraits = (0, _analyticsReactNative.generateMapTransform)(_parameterMapping.mapTraits, _parameterMapping.transformMap);
class ClevertapPlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
  key = 'CleverTap';
  identify(event) {
    const traits = event.traits;
    const safeTraits = mappedTraits(traits);
    const userId = event.userId ?? event.anonymousId;
    if (safeTraits.DOB !== undefined && safeTraits.DOB !== null && !(safeTraits.DOB instanceof Date)) {
      if (typeof safeTraits.DOB === 'string' || typeof safeTraits.DOB === 'number') {
        const birthday = new Date(safeTraits.DOB);
        if (birthday !== undefined && birthday !== null && !isNaN(birthday.getTime())) {
          safeTraits.DOB = birthday;
        }
      } else {
        delete safeTraits.DOB;
        this.analytics?.logger.warn(`Birthday found "${event.traits?.birthday}" could not be parsed as a Date. Try converting to ISO format.`);
      }
    }
    const clevertapTraits = {
      ...safeTraits,
      Identity: userId
    };
    _clevertapReactNative.default.profileSet(clevertapTraits);
    return event;
  }
  track(event) {
    if (event.event === 'Order Completed') {
      const userId = event.userId ?? event.anonymousId;
      const {
        products = [],
        ...props
      } = event.properties ?? {};
      const chargeDetails = {
        ...props,
        Identity: userId
      };
      const sanitizedProducts = products ?? [];
      _clevertapReactNative.default.recordChargedEvent(chargeDetails, sanitizedProducts);
    } else {
      _clevertapReactNative.default.recordEvent(event.event, event.properties);
    }
    return event;
  }
  screen(event) {
    const screenName = event.name ?? 'Screen Viewed';
    const userId = event.userId ?? event.anonymousId;
    const screenProps = {
      ...event.properties,
      Identity: userId
    };
    _clevertapReactNative.default.recordEvent(screenName, screenProps);
    return event;
  }
}
exports.ClevertapPlugin = ClevertapPlugin;
//# sourceMappingURL=ClevertapPlugin.js.map