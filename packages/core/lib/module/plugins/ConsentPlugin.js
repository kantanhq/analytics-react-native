import { Plugin } from '../plugin';
import { PluginType } from '../types';
import { SEGMENT_DESTINATION_KEY } from './SegmentDestination';
const CONSENT_PREF_UPDATE_EVENT = 'Segment Consent Preference';
/**
 * This plugin interfaces with the consent provider and it:
 *
 * - stamps all events with the consent metadata.
 * - augments all destinations with a consent filter plugin that prevents events from reaching them if
 * they are not compliant current consent setup
 * - listens for consent change from the provider and notifies Segment
 */
export class ConsentPlugin extends Plugin {
  type = PluginType.before;
  categories = [];
  queuedEvents = [];
  consentStarted = false;
  constructor(consentCategoryProvider) {
    super();
    this.consentCategoryProvider = consentCategoryProvider;
  }
  update(_settings, _type) {
    const consentSettings = this.analytics?.consentSettings.get();
    this.categories = consentSettings?.allCategories || [];
    this.consentCategoryProvider.setApplicableCategories(this.categories);
  }
  configure(analytics) {
    super.configure(analytics);
    analytics.getPlugins().forEach(this.injectConsentFilterIfApplicable);
    analytics.onPluginLoaded(this.injectConsentFilterIfApplicable);
    this.consentCategoryProvider.onConsentChange(() => {
      this.notifyConsentChange();
    });
    let lastDeviceAttrs = analytics.context.get()?.device;
    analytics.context.onChange(c => {
      const newAttrs = c?.device;
      if (newAttrs?.adTrackingEnabled !== lastDeviceAttrs?.adTrackingEnabled || newAttrs?.advertisingId !== lastDeviceAttrs?.advertisingId || newAttrs?.trackingStatus !== lastDeviceAttrs?.trackingStatus) {
        this.notifyConsentChange();
      }
      lastDeviceAttrs = newAttrs;
    });
  }
  async execute(event) {
    if (this.consentStarted === true) {
      event.context = {
        ...event.context,
        consent: {
          categoryPreferences: await this.consentCategoryProvider.getConsentStatus()
        }
      };
      return event;
    }
    if (this.consentStarted === false) {
      // constrain the queue to avoid running out of memory if consent is never started
      if (this.queuedEvents.length <= 1000) {
        this.queuedEvents.push(event);
        return;
      }
      return;
    }
    return;
  }
  shutdown() {
    this.consentCategoryProvider.shutdown?.();
  }
  injectConsentFilterIfApplicable = plugin => {
    if (this.isDestinationPlugin(plugin)) {
      plugin.add(new ConsentFilterPlugin(event => {
        const allCategories = this.analytics?.consentSettings.get()?.allCategories || [];
        const settings = this.analytics?.settings.get() || {};
        const preferences = event.context?.consent?.categoryPreferences || {};
        if (plugin.key === SEGMENT_DESTINATION_KEY) {
          const noneConsented = allCategories.every(category => !preferences[category]);
          return this.isConsentUpdateEvent(event) || !this.isConsentFeatureSetup() || !(noneConsented && !this.hasUnmappedDestinations());
        }
        const integrationSettings = settings?.[plugin.key];
        if (this.containsConsentSettings(integrationSettings)) {
          const categories = integrationSettings.consentSettings.categories;
          return !this.isConsentUpdateEvent(event) && categories.every(category => preferences?.[category]);
        }
        return true;
      }));
    }
  };
  isDestinationPlugin(plugin) {
    return plugin.type === PluginType.destination;
  }
  containsConsentSettings = settings => {
    return typeof settings?.consentSettings?.categories === 'object';
  };
  isConsentUpdateEvent(event) {
    return event.event === CONSENT_PREF_UPDATE_EVENT;
  }
  hasUnmappedDestinations() {
    return this.analytics?.consentSettings.get()?.hasUnmappedDestinations === true;
  }
  isConsentFeatureSetup() {
    return typeof this.analytics?.consentSettings.get() === 'object';
  }
  notifyConsentChange() {
    // actual preferences will be attached in the execute method
    this.analytics?.track(CONSENT_PREF_UPDATE_EVENT).catch(e => {
      throw e;
    });
  }
  start() {
    this.consentStarted = true;
    this.sendQueuedEvents();
  }
  sendQueuedEvents() {
    this.queuedEvents.forEach(event => {
      this.analytics?.process(event);
    });
    this.queuedEvents = [];
  }
}

/**
 * This plugin reads the consent metadata set on the context object and then drops the events
 * if they are going into a destination which violates's set consent preferences
 */
class ConsentFilterPlugin extends Plugin {
  type = PluginType.before;
  constructor(shouldAllowEvent) {
    super();
    this.shouldAllowEvent = shouldAllowEvent;
  }
  execute(event) {
    return this.shouldAllowEvent(event) ? event : undefined;
  }
}
//# sourceMappingURL=ConsentPlugin.js.map