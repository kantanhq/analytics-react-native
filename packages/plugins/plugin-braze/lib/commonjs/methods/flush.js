"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSdk = _interopRequireDefault(require("@braze/react-native-sdk"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = () => {
  _reactNativeSdk.default.requestImmediateDataFlush();
};
exports.default = _default;
//# sourceMappingURL=flush.js.map