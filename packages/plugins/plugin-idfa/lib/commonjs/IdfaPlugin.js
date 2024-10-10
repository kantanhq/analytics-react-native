"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdfaPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _AnalyticsReactNativePluginIdfa = require("./AnalyticsReactNativePluginIdfa");
var _reactNative = require("react-native");
const {
  getTrackingAuthorizationStatus
} = _AnalyticsReactNativePluginIdfa.AnalyticsReactNativePluginIdfa;

/**
 * IDFA Plugin
 * @constructor
 * @param {boolean} shouldAskPermission - defaults to true. Passing false
 *  when initializing new `IDFA Plugin` will prevent plugin from
 * requesting tracking status
 */

class IdfaPlugin extends _analyticsReactNative.Plugin {
  type = _analyticsReactNative.PluginType.enrichment;
  shouldAskPermission = true;
  constructor(shouldAskPermission = true) {
    super();
    this.shouldAskPermission = shouldAskPermission;
  }
  configure(analytics) {
    this.analytics = analytics;
    if (_reactNative.Platform.OS !== 'ios') {
      return;
    }
    if (this.shouldAskPermission === true) {
      this.getTrackingStatus();
    }
  }

  /** `requestTrackingPermission()` will prompt the user for
  tracking permission and returns a promise you can use to
  make additional tracking decisions based on the user response
  */
  async requestTrackingPermission() {
    try {
      const idfaData = await getTrackingAuthorizationStatus();
      await this.analytics?.context.set({
        device: {
          ...idfaData
        }
      });
      return idfaData.adTrackingEnabled;
    } catch (error) {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, JSON.stringify(error), error));
      this.analytics?.logger.warn(error);
      return false;
    }
  }
  getTrackingStatus() {
    getTrackingAuthorizationStatus().then(idfa => {
      // update our context with the idfa data
      void this.analytics?.context.set({
        device: {
          ...idfa
        }
      });
      return idfa;
    }).catch(error => {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Error retreiving IDFA', error));
      this.analytics?.logger.warn(error);
    });
  }
}
exports.IdfaPlugin = IdfaPlugin;
//# sourceMappingURL=IdfaPlugin.js.map