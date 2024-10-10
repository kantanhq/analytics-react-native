import { DestinationPlugin, IdentifyEventType, PluginType, ScreenEventType, TrackEventType } from '@segment/analytics-react-native';
export declare class FirebasePlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    identify(event: IdentifyEventType): Promise<IdentifyEventType>;
    track(event: TrackEventType): Promise<TrackEventType>;
    screen(event: ScreenEventType): Promise<ScreenEventType>;
    reset(): Promise<void>;
}
//# sourceMappingURL=FirebasePlugin.d.ts.map