import type { DeepLinkData, Dictionary, Queue, Settable, Storage, Watchable } from '../storage';
import type { Context, DeepPartial, DestinationFilters, EdgeFunctionSettings, IntegrationSettings, RoutingRule, SegmentAPIConsentSettings, SegmentAPIIntegrations, SegmentEvent, UserInfoState } from '../types';
export type StoreData = {
    isReady: boolean;
    context?: DeepPartial<Context>;
    settings: SegmentAPIIntegrations;
    consentSettings?: SegmentAPIConsentSettings;
    edgeFunctionSettings?: EdgeFunctionSettings;
    filters: DestinationFilters;
    userInfo: UserInfoState;
    deepLinkData: DeepLinkData;
    pendingEvents: SegmentEvent[];
};
export declare function createMockStoreGetter<T>(fn: () => T): import("../storage").getStateFunc<T>;
export declare class MockSegmentStore implements Storage {
    private data;
    private initialData;
    reset: () => void;
    constructor(initialData?: Partial<StoreData>);
    private callbacks;
    readonly isReady: {
        get: import("../storage").getStateFunc<boolean>;
        onChange: (_callback: (value: boolean) => void) => () => void;
    };
    readonly context: Watchable<DeepPartial<Context> | undefined> & Settable<DeepPartial<Context>>;
    readonly settings: Watchable<SegmentAPIIntegrations | undefined> & Settable<SegmentAPIIntegrations> & Dictionary<string, IntegrationSettings, SegmentAPIIntegrations>;
    readonly consentSettings: Watchable<SegmentAPIConsentSettings | undefined> & Settable<SegmentAPIConsentSettings | undefined>;
    readonly edgeFunctionSettings: Watchable<EdgeFunctionSettings | undefined> & Settable<EdgeFunctionSettings | undefined>;
    readonly filters: Watchable<DestinationFilters | undefined> & Settable<DestinationFilters> & Dictionary<string, RoutingRule, DestinationFilters>;
    readonly userInfo: Watchable<UserInfoState> & Settable<UserInfoState>;
    readonly deepLinkData: {
        get: import("../storage").getStateFunc<DeepLinkData>;
        set: (value: DeepLinkData) => void;
        onChange: (callback: (value: DeepLinkData) => void) => () => void;
    };
    readonly pendingEvents: Watchable<SegmentEvent[]> & Settable<SegmentEvent[]> & Queue<SegmentEvent, SegmentEvent[]>;
}
//# sourceMappingURL=mockSegmentStore.d.ts.map