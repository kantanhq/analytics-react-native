"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsReactNativePluginIdfa = void 0;
var _types = require("./types");
const AnalyticsReactNativePluginIdfa = exports.AnalyticsReactNativePluginIdfa = {
  getTrackingAuthorizationStatus: async () => {
    return Promise.resolve({
      adTrackingEnabled: false,
      advertisingId: 'trackMeId',
      trackingStatus: _types.TrackingStatus.Denied
    });
  }
};
//# sourceMappingURL=AnalyticsReactNativePluginIdfa.e2e.mock.js.map