import type { SegmentEvent } from '../types';
import type { FlushPolicy } from './types';
export declare class FlushPolicyExecuter {
    readonly policies: FlushPolicy[];
    private observers;
    private onFlush;
    constructor(policies: FlushPolicy[], onFlush: () => void);
    add(policy: FlushPolicy): void;
    remove(policy: FlushPolicy): boolean;
    removeIndex(index: number): boolean;
    /**
     * Checks if any flush policy is requesting a flush
     * This is only intended for startup/initialization, all policy shouldFlush
     * changes are already observed and reacted to.
     *
     * This is for policies that might startup with a shouldFlush = true value
     */
    manualFlush(): void;
    /**
     * Notifies each flush policy that an event is being processed
     */
    notify(event: SegmentEvent): void;
    /**
     * Resets all flush policies
     */
    reset(): void;
    cleanup(): void;
    private startPolicy;
}
//# sourceMappingURL=flush-policy-executer.d.ts.map