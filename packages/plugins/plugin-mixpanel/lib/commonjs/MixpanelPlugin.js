"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MixpanelPlugin = exports.EU_SERVER = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _mixpanelReactNative = require("mixpanel-react-native");
var _identify = _interopRequireDefault(require("./methods/identify"));
var _screen = _interopRequireDefault(require("./methods/screen"));
var _group = _interopRequireDefault(require("./methods/group"));
var _alias = _interopRequireDefault(require("./methods/alias"));
var _track = _interopRequireDefault(require("./methods/track"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const EU_SERVER = exports.EU_SERVER = 'api.eu.mixpanel.com';
class MixpanelPlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
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
    this.mixpanel = new _mixpanelReactNative.Mixpanel(mixpanelSettings.token, false);
    this.mixpanel.init().catch(error => {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Error initializing Mixpanel', error));
    });
    this.settings = mixpanelSettings;
    if (mixpanelSettings.enableEuropeanEndpoint === true) {
      this.mixpanel?.setServerURL(EU_SERVER);
    }
  }
  identify(event) {
    if (this.isInitialized()) {
      (0, _identify.default)(event, this.mixpanel, this.settings);
    }
    return event;
  }
  track(event) {
    const eventName = event.event;
    const properties = event.properties;
    if (this.isInitialized()) {
      (0, _track.default)(eventName, properties, this.settings, this.mixpanel);
    }
    return event;
  }
  screen(event) {
    if (this.isInitialized()) {
      (0, _screen.default)(event, this.mixpanel, this.settings);
    }
    return event;
  }
  group(event) {
    if (this.isInitialized()) {
      (0, _group.default)(event, this.mixpanel, this.settings);
    }
    return event;
  }
  async alias(event) {
    if (this.mixpanel !== undefined && this.analytics !== undefined) {
      await (0, _alias.default)(event, this.mixpanel, this.analytics);
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
exports.MixpanelPlugin = MixpanelPlugin;
//# sourceMappingURL=MixpanelPlugin.js.map