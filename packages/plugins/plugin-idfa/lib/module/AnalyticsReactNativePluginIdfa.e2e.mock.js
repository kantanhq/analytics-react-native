import { TrackingStatus } from './types';
const AnalyticsReactNativePluginIdfa = {
  getTrackingAuthorizationStatus: async () => {
    return Promise.resolve({
      adTrackingEnabled: false,
      advertisingId: 'trackMeId',
      trackingStatus: TrackingStatus.Denied
    });
  }
};
export { AnalyticsReactNativePluginIdfa };
//# sourceMappingURL=AnalyticsReactNativePluginIdfa.e2e.mock.js.map