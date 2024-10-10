import { DestinationPlugin, IdentifyEventType, PluginType, TrackEventType, SegmentAPISettings, UpdateType, JsonMap } from '@segment/analytics-react-native';
export declare class BrazePlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    private lastSeenTraits;
    private revenueEnabled;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    /**
     * Cleans up the attributes to only send valid values to Braze SDK
     * @param value value of any type
     * @returns value if type is valid, undefined if the type is not supported by Braze
     */
    private sanitizeAttribute;
    identify(event: IdentifyEventType): IdentifyEventType | undefined;
    track(event: TrackEventType): TrackEventType;
    flush(): void;
    extractRevenue: (properties: JsonMap | undefined, key: string) => number;
    logPurchaseEvent(event: TrackEventType): void;
}
//# sourceMappingURL=BrazePlugin.d.ts.map