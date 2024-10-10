"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BranchPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _identify = _interopRequireDefault(require("./methods/identify"));
var _screen = _interopRequireDefault(require("./methods/screen"));
var _alias = _interopRequireDefault(require("./methods/alias"));
var _track = _interopRequireDefault(require("./methods/track"));
var _reset = _interopRequireDefault(require("./methods/reset"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class BranchPlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
  key = 'Branch Metrics';
  identify(event) {
    (0, _identify.default)(event);
    return event;
  }
  async track(event) {
    await (0, _track.default)(event);
    return event;
  }
  async screen(event) {
    await (0, _screen.default)(event);
    return event;
  }
  alias(event) {
    (0, _alias.default)(event);
    return event;
  }
  reset() {
    (0, _reset.default)();
  }
}
exports.BranchPlugin = BranchPlugin;
//# sourceMappingURL=BranchPlugin.js.map