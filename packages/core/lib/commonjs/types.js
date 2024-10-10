"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateType = exports.PluginType = exports.EventType = void 0;
/**
 * Makes all the properties in an object optional
 */
let PluginType = exports.PluginType = /*#__PURE__*/function (PluginType) {
  PluginType["before"] = "before";
  PluginType["enrichment"] = "enrichment";
  PluginType["destination"] = "destination";
  PluginType["after"] = "after";
  PluginType["utility"] = "utility";
  return PluginType;
}({});
let UpdateType = exports.UpdateType = /*#__PURE__*/function (UpdateType) {
  UpdateType["initial"] = "initial";
  UpdateType["refresh"] = "refresh";
  return UpdateType;
}({});
let EventType = exports.EventType = /*#__PURE__*/function (EventType) {
  EventType["TrackEvent"] = "track";
  EventType["IdentifyEvent"] = "identify";
  EventType["ScreenEvent"] = "screen";
  EventType["GroupEvent"] = "group";
  EventType["AliasEvent"] = "alias";
  return EventType;
}({}); // Native Module types
//# sourceMappingURL=types.js.map