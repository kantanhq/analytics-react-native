/**
 * Makes all the properties in an object optional
 */

export let PluginType = /*#__PURE__*/function (PluginType) {
  PluginType["before"] = "before";
  PluginType["enrichment"] = "enrichment";
  PluginType["destination"] = "destination";
  PluginType["after"] = "after";
  PluginType["utility"] = "utility";
  return PluginType;
}({});
export let UpdateType = /*#__PURE__*/function (UpdateType) {
  UpdateType["initial"] = "initial";
  UpdateType["refresh"] = "refresh";
  return UpdateType;
}({});
export let EventType = /*#__PURE__*/function (EventType) {
  EventType["TrackEvent"] = "track";
  EventType["IdentifyEvent"] = "identify";
  EventType["ScreenEvent"] = "screen";
  EventType["GroupEvent"] = "group";
  EventType["AliasEvent"] = "alias";
  return EventType;
}({});

// Native Module types
//# sourceMappingURL=types.js.map