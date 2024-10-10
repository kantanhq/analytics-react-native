import type { SegmentEvent } from '../types';
import { FlushPolicyBase } from './types';
/**
 * CountFlushPolicy uploads events when the count of events reaches a set limit
 */
export declare class CountFlushPolicy extends FlushPolicyBase {
    private count;
    private flushAt;
    constructor(limit: number);
    start(): void;
    onEvent(_event: SegmentEvent): void;
    reset(): void;
}
//# sourceMappingURL=count-flush-policy.d.ts.map