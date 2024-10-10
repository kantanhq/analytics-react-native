import type { SegmentEvent } from '../types';
import { FlushPolicyBase } from './types';
/**
 * A Timer based flush policy.
 *
 * Flushes events on an interval.
 */
export declare class TimerFlushPolicy extends FlushPolicyBase {
    private flushTimeout;
    private interval;
    private startTimer;
    /**
     * @param interval interval to flush in milliseconds
     */
    constructor(interval: number);
    start(): void;
    end(): void;
    onEvent(_event: SegmentEvent): void;
    reset(): void;
}
//# sourceMappingURL=timer-flush-policy.d.ts.map