import { DestinationPlugin, PluginType, ScreenEventType, SegmentAPISettings, SegmentClient, TrackEventType, UpdateType } from '@segment/analytics-react-native';
export declare class FacebookAppEventsPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    trackScreens: boolean;
    limitedDataUse: boolean;
    /**
     * Mappings for event names from Segment Settings
     */
    appEvents: {
        [key: string]: string;
    };
    configure(analytics: SegmentClient): Promise<void>;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
    private sanitizeEventName;
}
//# sourceMappingURL=FacebookAppEventsPlugin.d.ts.map