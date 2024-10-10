"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMockDestinationPlugin = void 0;
var _plugin = require("../plugin");
const getMockDestinationPlugin = () => {
  const destinationPlugin = new _plugin.DestinationPlugin();
  destinationPlugin.flush = jest.fn();
  return destinationPlugin;
};
exports.getMockDestinationPlugin = getMockDestinationPlugin;
//# sourceMappingURL=mockDestinationPlugin.js.map