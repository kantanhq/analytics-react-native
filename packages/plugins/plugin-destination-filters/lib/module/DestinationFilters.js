import { isObject, PluginType, UtilityPlugin } from '@segment/analytics-react-native';
import * as tsub from '@segment/tsub';
import clone from 'clone';
const WORKSPACE_DESTINATION_FILTER_KEY = '';

/**
 * Adds processing for Destination Filters
 * (https://segment.com/docs/connections/destinations/destination-filters/)
 * to work on device mode destinations
 */
export class DestinationFiltersPlugin extends UtilityPlugin {
  type = PluginType.before;
  constructor(destination) {
    super();
    this.key = destination;
  }
  addToPlugin = plugin => {
    if (plugin.type === PluginType.destination) {
      const destination = plugin;
      destination.add(new DestinationFiltersPlugin(destination.key));
    }
  };
  configure(analytics) {
    super.configure(analytics);
    if (this.key === undefined) {
      // We watch for new destination plugins being added to inject a
      // destination filter instance for them
      analytics.onPluginLoaded(this.addToPlugin);
      // We also inject an instance for each plugin already loaded
      analytics.getPlugins(PluginType.destination).forEach(this.addToPlugin);
    }
    const key = this.key ?? WORKSPACE_DESTINATION_FILTER_KEY;
    this.filter = analytics.filters.get()?.[key];
    this.filtersUnsubscribe?.();
    this.filtersUnsubscribe = analytics.filters.onChange(filters => {
      this.filter = filters?.[key];
    });
  }
  execute(event) {
    if (this.filter === undefined) {
      return event;
    }
    const {
      matchers,
      transformers
    } = this.filter;
    let transformedEvent;
    for (let i = 0; i < matchers.length; i++) {
      if (tsub.matches(event, matchers[i])) {
        // We have to deep clone the event as the tsub transform modifies the event in place
        if (transformedEvent === undefined) {
          transformedEvent = clone(event);
        }
        const newEvent = tsub.transform(transformedEvent, transformers[i]);
        if (newEvent === undefined || newEvent === null || !isObject(newEvent)) {
          return undefined;
        }
        transformedEvent = newEvent;
      }
    }
    return transformedEvent ?? event;
  }
}
//# sourceMappingURL=DestinationFilters.js.map