"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _FirebasePlugin = require("./FirebasePlugin");
Object.keys(_FirebasePlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FirebasePlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FirebasePlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map