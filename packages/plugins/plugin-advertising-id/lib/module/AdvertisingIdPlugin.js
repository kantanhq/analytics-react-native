import { Plugin, PluginType, getNativeModule, ErrorType, SegmentError } from '@segment/analytics-react-native';
import { Platform } from 'react-native';
export class AdvertisingIdPlugin extends Plugin {
  type = PluginType.enrichment;
  configure(analytics) {
    if (Platform.OS !== 'android') {
      return;
    }
    this.analytics = analytics;
    getNativeModule('AnalyticsReactNativePluginAdvertisingId')?.getAdvertisingId().then(id => {
      if (id === null) {
        void analytics.track('LimitAdTrackingEnabled (Google Play Services) is enabled');
      } else {
        void this.setContext(id);
      }
    }).catch(error => {
      this.analytics?.reportInternalError(new SegmentError(ErrorType.PluginError, 'Error retrieving AdvertisingID', error));
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
      this.analytics?.reportInternalError(new SegmentError(ErrorType.PluginError, message, error));
      this.analytics?.logger.warn(`${message}: ${JSON.stringify(error)}`);
    }
  }
}
//# sourceMappingURL=AdvertisingIdPlugin.js.map