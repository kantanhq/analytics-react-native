"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMockTimeline = void 0;
var _timeline = require("../timeline");
var _mockDestinationPlugin = require("./mockDestinationPlugin");
const getMockTimeline = () => {
  const timeline = new _timeline.Timeline();
  const destinationPlugin = (0, _mockDestinationPlugin.getMockDestinationPlugin)();
  timeline.add(destinationPlugin);
  return timeline;
};
exports.getMockTimeline = getMockTimeline;
//# sourceMappingURL=mockTimeline.js.map