"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _AppsflyerPlugin = require("./AppsflyerPlugin");
Object.keys(_AppsflyerPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AppsflyerPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AppsflyerPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map