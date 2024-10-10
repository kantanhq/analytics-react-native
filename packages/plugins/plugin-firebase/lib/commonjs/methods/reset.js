"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analytics = _interopRequireDefault(require("@react-native-firebase/analytics"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = async () => {
  await (0, _analytics.default)().resetAnalyticsData();
};
exports.default = _default;
//# sourceMappingURL=reset.js.map