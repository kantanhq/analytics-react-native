"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrazeMiddlewarePlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
class BrazeMiddlewarePlugin extends _analyticsReactNative.Plugin {
  type = _analyticsReactNative.PluginType.before;
  key = 'Appboy';
  lastSeenTraits = undefined;
  execute(event) {
    //check to see if anything has changed
    //if it hasn't changed disable integration
    if (event.type === _analyticsReactNative.EventType.IdentifyEvent) {
      if (this.lastSeenTraits?.userId === event.userId && this.lastSeenTraits?.anonymousId === event.anonymousId && this.lastSeenTraits?.traits === event.traits) {
        const integrations = event.integrations;
        if (integrations !== undefined) {
          integrations[this.key] = false;
        }
      } else {
        this.lastSeenTraits = {
          anonymousId: event.anonymousId ?? '',
          userId: event.userId,
          traits: event.traits
        };
      }
    }
    return event;
  }
}
exports.BrazeMiddlewarePlugin = BrazeMiddlewarePlugin;
//# sourceMappingURL=BrazeMiddlewarePlugin.js.map