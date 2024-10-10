import type { SegmentAPIIntegrations, IntegrationSettings, SegmentEvent, DeepPartial, Context, UserInfoState, RoutingRule, DestinationFilters, SegmentAPIConsentSettings, EdgeFunctionSettings } from '..';
import type { Storage, StorageConfig, DeepLinkData, Watchable, Settable, Dictionary, Queue } from './types';
export declare class SovranStorage implements Storage {
    private storeId;
    private storePersistor?;
    private storePersistorSaveDelay?;
    private readinessStore;
    private contextStore;
    private consentSettingsStore;
    private edgeFunctionSettingsStore;
    private settingsStore;
    private userInfoStore;
    private deepLinkStore;
    private filtersStore;
    private pendingStore;
    readonly isReady: Watchable<boolean>;
    readonly context: Watchable<DeepPartial<Context> | undefined> & Settable<DeepPartial<Context>>;
    readonly settings: Watchable<SegmentAPIIntegrations | undefined> & Settable<SegmentAPIIntegrations> & Dictionary<string, IntegrationSettings, SegmentAPIIntegrations>;
    readonly consentSettings: Watchable<SegmentAPIConsentSettings | undefined> & Settable<SegmentAPIConsentSettings | undefined>;
    readonly edgeFunctionSettings: Watchable<EdgeFunctionSettings | undefined> & Settable<EdgeFunctionSettings | undefined>;
    readonly filters: Watchable<DestinationFilters | undefined> & Settable<DestinationFilters> & Dictionary<string, RoutingRule, DestinationFilters>;
    readonly userInfo: Watchable<UserInfoState> & Settable<UserInfoState>;
    readonly deepLinkData: Watchable<DeepLinkData>;
    readonly pendingEvents: Watchable<SegmentEvent[]> & Settable<SegmentEvent[]> & Queue<SegmentEvent, SegmentEvent[]>;
    constructor(config: StorageConfig);
    /**
     * This is a fix for users that have started the app with the anonymousId set to 'anonymousId' bug
     */
    private fixAnonymousId;
}
//# sourceMappingURL=sovranStorage.d.ts.map