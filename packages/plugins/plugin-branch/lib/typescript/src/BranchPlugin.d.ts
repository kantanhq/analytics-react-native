import { DestinationPlugin, PluginType, TrackEventType, ScreenEventType, IdentifyEventType, AliasEventType } from '@segment/analytics-react-native';
export declare class BranchPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): Promise<TrackEventType>;
    screen(event: ScreenEventType): Promise<ScreenEventType>;
    alias(event: AliasEventType): AliasEventType;
    reset(): void;
}
//# sourceMappingURL=BranchPlugin.d.ts.map