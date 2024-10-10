"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestinationFiltersPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var tsub = _interopRequireWildcard(require("@segment/tsub"));
var _clone = _interopRequireDefault(require("clone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const WORKSPACE_DESTINATION_FILTER_KEY = '';

/**
 * Adds processing for Destination Filters
 * (https://segment.com/docs/connections/destinations/destination-filters/)
 * to work on device mode destinations
 */
class DestinationFiltersPlugin extends _analyticsReactNative.UtilityPlugin {
  type = _analyticsReactNative.PluginType.before;
  constructor(destination) {
    super();
    this.key = destination;
  }
  addToPlugin = plugin => {
    if (plugin.type === _analyticsReactNative.PluginType.destination) {
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
      analytics.getPlugins(_analyticsReactNative.PluginType.destination).forEach(this.addToPlugin);
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
          transformedEvent = (0, _clone.default)(event);
        }
        const newEvent = tsub.transform(transformedEvent, transformers[i]);
        if (newEvent === undefined || newEvent === null || !(0, _analyticsReactNative.isObject)(newEvent)) {
          return undefined;
        }
        transformedEvent = newEvent;
      }
    }
    return transformedEvent ?? event;
  }
}
exports.DestinationFiltersPlugin = DestinationFiltersPlugin;
//# sourceMappingURL=DestinationFilters.js.map