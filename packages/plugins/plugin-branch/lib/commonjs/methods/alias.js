"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeBranch = _interopRequireDefault(require("react-native-branch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = event => {
  const userId = event.userId;
  if (userId !== undefined) {
    _reactNativeBranch.default.setIdentity(userId);
  }
};
exports.default = _default;
//# sourceMappingURL=alias.js.map