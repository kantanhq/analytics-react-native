import { EventPlugin, IdentifyEventType, PluginType, SegmentAPISettings, SegmentEvent, TrackEventType, ScreenEventType, GroupEventType, UpdateType, AliasEventType } from '@segment/analytics-react-native';
export declare class AmplitudeSessionPlugin extends EventPlugin {
    type: PluginType;
    key: string;
    active: boolean;
    sessionId: number | undefined;
    sessionTimer: ReturnType<typeof setTimeout> | undefined;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    execute(event: SegmentEvent): SegmentEvent;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
    group(event: GroupEventType): GroupEventType;
    alias(event: AliasEventType): AliasEventType;
    reset(): void;
    private insertSession;
    private resetSession;
    private refreshSession;
}
//# sourceMappingURL=AmplitudeSessionPlugin.d.ts.map