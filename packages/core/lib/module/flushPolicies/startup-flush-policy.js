import { FlushPolicyBase } from './types';

/**
 * StatupFlushPolicy triggers a flush right away on client startup
 */
export class StartupFlushPolicy extends FlushPolicyBase {
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
//# sourceMappingURL=startup-flush-policy.js.map