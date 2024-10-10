import type { SegmentEvent } from '../types';
import { FlushPolicyBase } from './types';
/**
 * StatupFlushPolicy triggers a flush right away on client startup
 */
export declare class StartupFlushPolicy extends FlushPolicyBase {
    constructor();
    start(): void;
    onEvent(_event: SegmentEvent): void;
}
//# sourceMappingURL=startup-flush-policy.d.ts.map