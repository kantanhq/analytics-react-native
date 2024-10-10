"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _mockDestinationPlugin = require("./mockDestinationPlugin");
Object.keys(_mockDestinationPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mockDestinationPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mockDestinationPlugin[key];
    }
  });
});
var _mockEventStore = require("./mockEventStore");
Object.keys(_mockEventStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mockEventStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mockEventStore[key];
    }
  });
});
var _mockLogger = require("./mockLogger");
Object.keys(_mockLogger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mockLogger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mockLogger[key];
    }
  });
});
var _mockSegmentStore = require("./mockSegmentStore");
Object.keys(_mockSegmentStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mockSegmentStore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mockSegmentStore[key];
    }
  });
});
var _mockTimeline = require("./mockTimeline");
Object.keys(_mockTimeline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mockTimeline[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mockTimeline[key];
    }
  });
});
var _setupSegmentClient = require("./setupSegmentClient");
Object.keys(_setupSegmentClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _setupSegmentClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _setupSegmentClient[key];
    }
  });
});
var _utils = require("./utils");
Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
//# sourceMappingURL=index.js.map