"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _countFlushPolicy = require("./count-flush-policy");
Object.keys(_countFlushPolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _countFlushPolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _countFlushPolicy[key];
    }
  });
});
var _timerFlushPolicy = require("./timer-flush-policy");
Object.keys(_timerFlushPolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _timerFlushPolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _timerFlushPolicy[key];
    }
  });
});
var _startupFlushPolicy = require("./startup-flush-policy");
Object.keys(_startupFlushPolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _startupFlushPolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _startupFlushPolicy[key];
    }
  });
});
var _backgroundFlushPolicy = require("./background-flush-policy");
Object.keys(_backgroundFlushPolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _backgroundFlushPolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _backgroundFlushPolicy[key];
    }
  });
});
//# sourceMappingURL=index.js.map