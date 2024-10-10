"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountFlushPolicy = void 0;
var _types = require("./types");
/**
 * CountFlushPolicy uploads events when the count of events reaches a set limit
 */
class CountFlushPolicy extends _types.FlushPolicyBase {
  count = 0;
  constructor(limit) {
    super();
    this.flushAt = limit;
  }
  start() {
    this.count = 0;
  }
  onEvent(_event) {
    this.count += 1;
    if (this.count >= this.flushAt) {
      this.shouldFlush.value = true;
    }
  }
  reset() {
    super.reset();
    this.count = 0;
  }
}
exports.CountFlushPolicy = CountFlushPolicy;
//# sourceMappingURL=count-flush-policy.js.map