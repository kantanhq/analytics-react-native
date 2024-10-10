"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AdvertisingIdPlugin = require("./AdvertisingIdPlugin");
Object.keys(_AdvertisingIdPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AdvertisingIdPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AdvertisingIdPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map