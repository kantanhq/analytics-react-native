import { FlushPolicyBase } from './types';

/**
 * CountFlushPolicy uploads events when the count of events reaches a set limit
 */
export class CountFlushPolicy extends FlushPolicyBase {
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
//# sourceMappingURL=count-flush-policy.js.map