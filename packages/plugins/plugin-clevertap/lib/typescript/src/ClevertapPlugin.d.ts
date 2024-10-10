import { DestinationPlugin, PluginType, TrackEventType, ScreenEventType, IdentifyEventType } from '@segment/analytics-react-native';
export declare class ClevertapPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
}
//# sourceMappingURL=ClevertapPlugin.d.ts.map