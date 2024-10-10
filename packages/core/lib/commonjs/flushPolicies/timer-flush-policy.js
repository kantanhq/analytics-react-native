"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerFlushPolicy = void 0;
var _types = require("./types");
/**
 * A Timer based flush policy.
 *
 * Flushes events on an interval.
 */
class TimerFlushPolicy extends _types.FlushPolicyBase {
  startTimer() {
    clearTimeout(this.flushTimeout);
    this.flushTimeout = setTimeout(() => {
      this.shouldFlush.value = true;
    }, this.interval);
  }

  /**
   * @param interval interval to flush in milliseconds
   */
  constructor(interval) {
    super();
    this.interval = interval;
  }
  start() {
    this.startTimer();
  }
  end() {
    clearTimeout(this.flushTimeout);
  }
  onEvent(_event) {
    // Reset interval
    this.startTimer();
  }
  reset() {
    super.reset();
    this.startTimer();
  }
}
exports.TimerFlushPolicy = TimerFlushPolicy;
//# sourceMappingURL=timer-flush-policy.js.map