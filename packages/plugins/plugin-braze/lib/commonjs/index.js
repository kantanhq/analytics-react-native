"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BrazePlugin = require("./BrazePlugin");
Object.keys(_BrazePlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BrazePlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BrazePlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map