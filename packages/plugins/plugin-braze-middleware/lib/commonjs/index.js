"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BrazeMiddlewarePlugin = require("./BrazeMiddlewarePlugin");
Object.keys(_BrazeMiddlewarePlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BrazeMiddlewarePlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BrazeMiddlewarePlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map