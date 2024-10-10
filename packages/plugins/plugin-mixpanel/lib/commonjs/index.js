"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MixpanelPlugin = require("./MixpanelPlugin");
Object.keys(_MixpanelPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MixpanelPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MixpanelPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map