import { DestinationPlugin, PluginType, SegmentError, ErrorType } from '@segment/analytics-react-native';
import { Mixpanel } from 'mixpanel-react-native';
import identify from './methods/identify';
import screen from './methods/screen';
import group from './methods/group';
import alias from './methods/alias';
import track from './methods/track';
export const EU_SERVER = 'api.eu.mixpanel.com';
export class MixpanelPlugin extends DestinationPlugin {
  type = PluginType.destination;
  key = 'Mixpanel';
  trackScreens = false;
  isInitialized = () => this.mixpanel !== undefined && this.settings !== undefined;
  update(settings, _) {
    const mixpanelSettings = settings.integrations[this.key];
    if (mixpanelSettings === undefined || this.mixpanel !== undefined) {
      return;
    }
    if (mixpanelSettings.token.length === 0) {
      return;
    }
    this.mixpanel = new Mixpanel(mixpanelSettings.token, false);
    this.mixpanel.init().catch(error => {
      this.analytics?.reportInternalError(new SegmentError(ErrorType.PluginError, 'Error initializing Mixpanel', error));
    });
    this.settings = mixpanelSettings;
    if (mixpanelSettings.enableEuropeanEndpoint === true) {
      this.mixpanel?.setServerURL(EU_SERVER);
    }
  }
  identify(event) {
    if (this.isInitialized()) {
      identify(event, this.mixpanel, this.settings);
    }
    return event;
  }
  track(event) {
    const eventName = event.event;
    const properties = event.properties;
    if (this.isInitialized()) {
      track(eventName, properties, this.settings, this.mixpanel);
    }
    return event;
  }
  screen(event) {
    if (this.isInitialized()) {
      screen(event, this.mixpanel, this.settings);
    }
    return event;
  }
  group(event) {
    if (this.isInitialized()) {
      group(event, this.mixpanel, this.settings);
    }
    return event;
  }
  async alias(event) {
    if (this.mixpanel !== undefined && this.analytics !== undefined) {
      await alias(event, this.mixpanel, this.analytics);
    }
    return event;
  }
  flush() {
    this.mixpanel?.flush();
  }
  reset() {
    this.mixpanel?.reset();
  }
}
//# sourceMappingURL=MixpanelPlugin.js.map