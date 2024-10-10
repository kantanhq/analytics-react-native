"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _DeviceTokenPlugin = require("./DeviceTokenPlugin");
Object.keys(_DeviceTokenPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DeviceTokenPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DeviceTokenPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map