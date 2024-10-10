import type { SegmentEvent } from '../types';
import { FlushPolicyBase } from './types';
/**
 * StatupFlushPolicy triggers a flush right away on client startup
 */
export declare class BackgroundFlushPolicy extends FlushPolicyBase {
    private appStateSubscription?;
    private appState;
    start(): void;
    onEvent(_event: SegmentEvent): void;
    end(): void;
}
//# sourceMappingURL=background-flush-policy.d.ts.map