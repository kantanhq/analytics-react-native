"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsReactNativePluginIdfa = void 0;
var _reactNative = require("react-native");
/**
 * This module is just here to have a way to mock the Native Module of IDFA with Detox
 */

const AnalyticsReactNativePluginIdfa = exports.AnalyticsReactNativePluginIdfa = _reactNative.Platform.select({
  default: {
    getTrackingAuthorizationStatus: async () => {
      return Promise.reject('IDFA is only supported on iOS');
    }
  },
  ios: _reactNative.NativeModules.AnalyticsReactNativePluginIdfa
});
//# sourceMappingURL=AnalyticsReactNativePluginIdfa.js.map