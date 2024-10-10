"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestinationMetadataEnrichment = void 0;
var _plugin = require("../plugin");
var _types = require("../types");
class DestinationMetadataEnrichment extends _plugin.UtilityPlugin {
  type = _types.PluginType.enrichment;
  constructor(destinationKey) {
    super();
    this.destinationKey = destinationKey;
  }
  execute(event) {
    const pluginSettings = this.analytics?.settings.get();
    const plugins = this.analytics?.getPlugins(_types.PluginType.destination);
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
exports.DestinationMetadataEnrichment = DestinationMetadataEnrichment;
//# sourceMappingURL=DestinationMetadataEnrichment.js.map