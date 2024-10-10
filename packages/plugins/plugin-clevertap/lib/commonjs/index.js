"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ClevertapPlugin = require("./ClevertapPlugin");
Object.keys(_ClevertapPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ClevertapPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ClevertapPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map