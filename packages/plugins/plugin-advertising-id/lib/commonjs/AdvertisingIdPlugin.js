"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvertisingIdPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNative = require("react-native");
class AdvertisingIdPlugin extends _analyticsReactNative.Plugin {
  type = _analyticsReactNative.PluginType.enrichment;
  configure(analytics) {
    if (_reactNative.Platform.OS !== 'android') {
      return;
    }
    this.analytics = analytics;
    (0, _analyticsReactNative.getNativeModule)('AnalyticsReactNativePluginAdvertisingId')?.getAdvertisingId().then(id => {
      if (id === null) {
        void analytics.track('LimitAdTrackingEnabled (Google Play Services) is enabled');
      } else {
        void this.setContext(id);
      }
    }).catch(error => {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Error retrieving AdvertisingID', error));
    });
  }
  async setContext(id) {
    try {
      await this.analytics?.context.set({
        device: {
          advertisingId: id,
          adTrackingEnabled: true
        }
      });
    } catch (error) {
      const message = 'AdvertisingID failed to set context';
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, message, error));
      this.analytics?.logger.warn(`${message}: ${JSON.stringify(error)}`);
    }
  }
}
exports.AdvertisingIdPlugin = AdvertisingIdPlugin;
//# sourceMappingURL=AdvertisingIdPlugin.js.map