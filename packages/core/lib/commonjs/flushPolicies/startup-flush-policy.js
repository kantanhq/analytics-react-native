"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartupFlushPolicy = void 0;
var _types = require("./types");
/**
 * StatupFlushPolicy triggers a flush right away on client startup
 */
class StartupFlushPolicy extends _types.FlushPolicyBase {
  constructor() {
    super();
    this.shouldFlush.value = true;
  }
  start() {
    // Nothing to do
  }
  onEvent(_event) {
    // Nothing to do
  }
}
exports.StartupFlushPolicy = StartupFlushPolicy;
//# sourceMappingURL=startup-flush-policy.js.map