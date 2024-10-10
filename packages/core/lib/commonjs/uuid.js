"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUUID = void 0;
require("react-native-get-random-values");
var _uuid = require("uuid");
const getUUID = () => {
  const UUID = (0, _uuid.v4)().toString();
  return UUID;
};
exports.getUUID = getUUID;
//# sourceMappingURL=uuid.js.map