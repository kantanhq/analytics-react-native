import { DestinationPlugin, IdentifyEventType, PluginType, TrackEventType, SegmentAPISettings, UpdateType } from '@segment/analytics-react-native';
export declare class AdjustPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    private settings;
    private hasRegisteredCallback;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    reset(): void;
}
//# sourceMappingURL=AdjustPlugin.d.ts.map