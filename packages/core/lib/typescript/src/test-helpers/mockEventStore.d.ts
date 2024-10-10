import type { SegmentEvent } from '../types';
export declare class MockEventStore {
    private initialData;
    private events;
    private callbackManager;
    constructor(initialData?: SegmentEvent[]);
    reset: () => void;
    getState: import("../storage").getStateFunc<{
        events: SegmentEvent[];
    }>;
    subscribe: (callback: (value: {
        events: SegmentEvent[];
    }) => void) => () => void;
    dispatch: (callback: (value: {
        events: SegmentEvent[];
    }) => {
        events: SegmentEvent[];
    }) => void;
}
//# sourceMappingURL=mockEventStore.d.ts.map