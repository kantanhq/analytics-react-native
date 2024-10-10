"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  defaultConfig: true,
  getNativeModule: true,
  isNumber: true,
  isString: true,
  isObject: true,
  isBoolean: true,
  isDate: true,
  objectToString: true,
  unknownToString: true,
  deepCompare: true,
  chunk: true,
  SegmentClient: true,
  QueueFlushingPlugin: true,
  createTrackEvent: true,
  uploadEvents: true,
  SegmentDestination: true,
  ConsentPlugin: true
};
Object.defineProperty(exports, "ConsentPlugin", {
  enumerable: true,
  get: function () {
    return _ConsentPlugin.ConsentPlugin;
  }
});
Object.defineProperty(exports, "QueueFlushingPlugin", {
  enumerable: true,
  get: function () {
    return _QueueFlushingPlugin.QueueFlushingPlugin;
  }
});
Object.defineProperty(exports, "SegmentClient", {
  enumerable: true,
  get: function () {
    return _analytics.SegmentClient;
  }
});
Object.defineProperty(exports, "SegmentDestination", {
  enumerable: true,
  get: function () {
    return _SegmentDestination.SegmentDestination;
  }
});
Object.defineProperty(exports, "chunk", {
  enumerable: true,
  get: function () {
    return _util.chunk;
  }
});
Object.defineProperty(exports, "createTrackEvent", {
  enumerable: true,
  get: function () {
    return _events.createTrackEvent;
  }
});
Object.defineProperty(exports, "deepCompare", {
  enumerable: true,
  get: function () {
    return _util.deepCompare;
  }
});
Object.defineProperty(exports, "defaultConfig", {
  enumerable: true,
  get: function () {
    return _constants.defaultConfig;
  }
});
Object.defineProperty(exports, "getNativeModule", {
  enumerable: true,
  get: function () {
    return _util.getNativeModule;
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function () {
    return _util.isBoolean;
  }
});
Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function () {
    return _util.isDate;
  }
});
Object.defineProperty(exports, "isNumber", {
  enumerable: true,
  get: function () {
    return _util.isNumber;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function () {
    return _util.isObject;
  }
});
Object.defineProperty(exports, "isString", {
  enumerable: true,
  get: function () {
    return _util.isString;
  }
});
Object.defineProperty(exports, "objectToString", {
  enumerable: true,
  get: function () {
    return _util.objectToString;
  }
});
Object.defineProperty(exports, "unknownToString", {
  enumerable: true,
  get: function () {
    return _util.unknownToString;
  }
});
Object.defineProperty(exports, "uploadEvents", {
  enumerable: true,
  get: function () {
    return _api.uploadEvents;
  }
});
var _constants = require("./constants");
var _client = require("./client");
Object.keys(_client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _client[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _client[key];
    }
  });
});
var _plugin = require("./plugin");
Object.keys(_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _plugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _plugin[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _mapTransform = require("./mapTransform");
Object.keys(_mapTransform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mapTransform[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapTransform[key];
    }
  });
});
var _util = require("./util");
var _analytics = require("./analytics");
var _QueueFlushingPlugin = require("./plugins/QueueFlushingPlugin");
var _events = require("./events");
var _api = require("./api");
var _SegmentDestination = require("./plugins/SegmentDestination");
var _ConsentPlugin = require("./plugins/ConsentPlugin");
var _flushPolicies = require("./flushPolicies");
Object.keys(_flushPolicies).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _flushPolicies[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flushPolicies[key];
    }
  });
});
var _errors = require("./errors");
Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _errors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errors[key];
    }
  });
});
//# sourceMappingURL=index.js.map