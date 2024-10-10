"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AsyncStoragePersistor: true
};
Object.defineProperty(exports, "AsyncStoragePersistor", {
  enumerable: true,
  get: function () {
    return _asyncStoragePersistor.AsyncStoragePersistor;
  }
});
var _persistor = require("./persistor");
Object.keys(_persistor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _persistor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _persistor[key];
    }
  });
});
var _asyncStoragePersistor = require("./async-storage-persistor");
//# sourceMappingURL=index.js.map