import { UtilityPlugin } from '../plugin';
import { PluginType } from '../types';
export class DestinationMetadataEnrichment extends UtilityPlugin {
  type = PluginType.enrichment;
  constructor(destinationKey) {
    super();
    this.destinationKey = destinationKey;
  }
  execute(event) {
    const pluginSettings = this.analytics?.settings.get();
    const plugins = this.analytics?.getPlugins(PluginType.destination);
    if (pluginSettings === undefined) {
      return event;
    }

    // Disable all destinations that have a device mode plugin
    const destinations = plugins?.map(plugin => plugin.key) ?? [];
    const bundled = new Set();
    for (const key of destinations) {
      if (key === this.destinationKey) {
        continue;
      }
      if (Object.keys(pluginSettings).includes(key)) {
        bundled.add(key);
      }
    }
    const unbundled = new Set();
    const segmentInfo = pluginSettings[this.destinationKey] ?? {};
    const unbundledIntegrations = segmentInfo.unbundledIntegrations ?? [];

    // All active integrations, not in `bundled` are put in `unbundled`
    // All unbundledIntegrations not in `bundled` are put in `unbundled`
    for (const integration in pluginSettings) {
      if (integration !== this.destinationKey && !bundled.has(integration)) {
        unbundled.add(integration);
      }
    }
    for (const integration of unbundledIntegrations) {
      if (!bundled.has(integration)) {
        unbundled.add(integration);
      }
    }

    // User/event defined integrations override the cloud/device mode merge
    const enrichedEvent = {
      ...event,
      _metadata: {
        bundled: Array.from(bundled),
        unbundled: Array.from(unbundled),
        bundledIds: []
      }
    };
    return enrichedEvent;
  }
}
//# sourceMappingURL=DestinationMetadataEnrichment.js.map