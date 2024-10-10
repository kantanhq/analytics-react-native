import { PluginType, SegmentClient, SegmentEvent, UtilityPlugin } from '@segment/analytics-react-native';
/**
 * Adds processing for Destination Filters
 * (https://segment.com/docs/connections/destinations/destination-filters/)
 * to work on device mode destinations
 */
export declare class DestinationFiltersPlugin extends UtilityPlugin {
    type: PluginType;
    private key?;
    private filtersUnsubscribe?;
    private filter?;
    constructor(destination?: string);
    private addToPlugin;
    configure(analytics: SegmentClient): void;
    execute(event: SegmentEvent): SegmentEvent | undefined;
}
//# sourceMappingURL=DestinationFilters.d.ts.map