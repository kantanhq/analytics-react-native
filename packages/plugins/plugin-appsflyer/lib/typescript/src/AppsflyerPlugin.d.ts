import { DestinationPlugin, IdentifyEventType, PluginType, TrackEventType, UpdateType, SegmentAPISettings } from '@segment/analytics-react-native';
export declare class AppsflyerPlugin extends DestinationPlugin {
    constructor(props?: {
        timeToWaitForATTUserAuthorization: number;
        is_adset: boolean;
        is_adset_id: boolean;
        is_ad_id: boolean;
    });
    type: PluginType;
    key: string;
    is_adset: boolean;
    is_adset_id: boolean;
    is_ad_id: boolean;
    private settings;
    private hasRegisteredInstallCallback;
    private hasRegisteredDeepLinkCallback;
    private hasInitialized;
    timeToWaitForATTUserAuthorization: number;
    update(settings: SegmentAPISettings, _: UpdateType): Promise<void>;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): Promise<TrackEventType>;
    registerConversionCallback: () => void;
    registerDeepLinkCallback: () => void;
    registerUnifiedDeepLinkCallback: () => void;
}
//# sourceMappingURL=AppsflyerPlugin.d.ts.map