"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _analytics = _interopRequireDefault(require("@react-native-firebase/analytics"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = async event => {
  const screenProps = {
    screen_name: event.name,
    screen_class: event.name,
    ...event.properties
  };
  await (0, _analytics.default)().logScreenView(screenProps);
};
exports.default = _default;
//# sourceMappingURL=screen.js.map