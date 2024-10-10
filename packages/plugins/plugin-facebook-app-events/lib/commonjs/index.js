"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _FacebookAppEventsPlugin = require("./FacebookAppEventsPlugin");
Object.keys(_FacebookAppEventsPlugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FacebookAppEventsPlugin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FacebookAppEventsPlugin[key];
    }
  });
});
//# sourceMappingURL=index.js.map