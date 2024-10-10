import { DestinationPlugin } from '../plugin';
import { PluginType, SegmentAPISettings, SegmentEvent, UpdateType } from '../types';
import type { SegmentClient } from '../analytics';
export declare const SEGMENT_DESTINATION_KEY = "Segment.io";
export declare class SegmentDestination extends DestinationPlugin {
    type: PluginType;
    key: string;
    private apiHost?;
    private settingsResolve;
    private settingsPromise;
    constructor();
    private sendEvents;
    private readonly queuePlugin;
    private getEndpoint;
    configure(analytics: SegmentClient): void;
    update(settings: SegmentAPISettings, _type: UpdateType): void;
    execute(event: SegmentEvent): Promise<SegmentEvent | undefined>;
    flush(): Promise<void>;
}
//# sourceMappingURL=SegmentDestination.d.ts.map