"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdjustPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNativeAdjust = require("react-native-adjust");
var _identify = _interopRequireDefault(require("./methods/identify"));
var _track = _interopRequireDefault(require("./methods/track"));
var _reset = _interopRequireDefault(require("./methods/reset"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AdjustPlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
  key = 'Adjust';
  settings = null;
  hasRegisteredCallback = false;
  update(settings, _) {
    const adjustSettings = settings.integrations[this.key];
    if (adjustSettings === undefined || adjustSettings === null) {
      return;
    }
    this.settings = adjustSettings;
    const environment = this.settings.setEnvironmentProduction === true ? 'production' : 'sandbox';
    const adjustConfig = new _reactNativeAdjust.AdjustConfig(this.settings.appToken, environment);
    if (this.hasRegisteredCallback === false) {
      adjustConfig.setAttributionCallbackListener(attribution => {
        const trackPayload = {
          provider: 'Adjust',
          trackerToken: attribution.trackerToken,
          trackerName: attribution.trackerName,
          campaign: {
            source: attribution.network,
            name: attribution.campaign,
            content: attribution.clickLabel,
            adCreative: attribution.creative,
            adGroup: attribution.adgroup
          }
        };
        void this.analytics?.track('Install Attributed', trackPayload);
      });
      this.hasRegisteredCallback = true;
    }
    const bufferingEnabled = this.settings.setEventBufferingEnabled;
    if (bufferingEnabled === true) {
      adjustConfig.setEventBufferingEnabled(bufferingEnabled);
    }
    const useDelay = this.settings.setDelay;
    if (useDelay === true) {
      const delayTime = this.settings.delayTime;
      if (delayTime !== null && delayTime !== undefined) {
        adjustConfig.setDelayStart(delayTime);
      }
    }
    _reactNativeAdjust.Adjust.create(adjustConfig);
  }
  identify(event) {
    (0, _identify.default)(event);
    return event;
  }
  track(event) {
    (0, _track.default)(event, this.settings);
    return event;
  }
  reset() {
    (0, _reset.default)();
  }
}
exports.AdjustPlugin = AdjustPlugin;
//# sourceMappingURL=AdjustPlugin.js.map