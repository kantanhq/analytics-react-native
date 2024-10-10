"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BranchPlugin = require("./BranchPlugin");
Object.keys(_BranchPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BranchPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BranchPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map