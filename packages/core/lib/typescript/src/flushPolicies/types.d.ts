import type { SegmentEvent } from '../types';
type Observer<T> = (value: T) => void;
/**
 * A simple observable value or object
 */
export declare class Observable<T> {
    private internalValue;
    private observers;
    constructor(value: T);
    get value(): T;
    set value(v: T);
    onChange(observer: Observer<T>): () => void;
}
/**
 * FlushPolicy defines the strategy for executing flushes
 * (uploading events to destinations)
 */
export interface FlushPolicy {
    /**
     * Marks when the client should atempt to upload events
     */
    shouldFlush: Observable<boolean>;
    /**
     * Start gets executed when the FlushPolicy is added to the client.
     *
     * This is a good place to initialize configuration or timers as it will only
     * execute when this policy is enabled
     */
    start(): void;
    /**
     * Executed every time an event is tracked by the client
     * @param event triggered event
     */
    onEvent(event: SegmentEvent): void;
    /**
     * Resets the values of this policy.
     *
     * Called when the flush has been completed.
     */
    reset(): void;
    /**
     * Ends the execution of the flush policy.
     * All cleanup methods should be contained here
     */
    end(): void;
}
/**
 * A Base Class for implementing a FlushPolicy.
 *
 * Initializes the shouldFlush value to false and sets it to false on reset
 */
export declare abstract class FlushPolicyBase implements FlushPolicy {
    shouldFlush: Observable<boolean>;
    reset(): void;
    end(): void;
    abstract start(): void;
    abstract onEvent(event: SegmentEvent): void;
}
export {};
//# sourceMappingURL=types.d.ts.map