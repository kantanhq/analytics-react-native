import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import { Adjust, AdjustConfig } from 'react-native-adjust';
import identify from './methods/identify';
import track from './methods/track';
import reset from './methods/reset';
export class AdjustPlugin extends DestinationPlugin {
  type = PluginType.destination;
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
    const adjustConfig = new AdjustConfig(this.settings.appToken, environment);
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
    Adjust.create(adjustConfig);
  }
  identify(event) {
    identify(event);
    return event;
  }
  track(event) {
    track(event, this.settings);
    return event;
  }
  reset() {
    reset();
  }
}
//# sourceMappingURL=AdjustPlugin.js.map