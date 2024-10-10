import { FlushPolicyBase } from './types';

/**
 * A Timer based flush policy.
 *
 * Flushes events on an interval.
 */
export class TimerFlushPolicy extends FlushPolicyBase {
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
//# sourceMappingURL=timer-flush-policy.js.map