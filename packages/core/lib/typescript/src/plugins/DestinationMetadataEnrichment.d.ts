import { UtilityPlugin } from '../plugin';
import { PluginType, SegmentEvent } from '../types';
export declare class DestinationMetadataEnrichment extends UtilityPlugin {
    type: PluginType;
    private destinationKey;
    constructor(destinationKey: string);
    execute(event: SegmentEvent): SegmentEvent;
}
//# sourceMappingURL=DestinationMetadataEnrichment.d.ts.map