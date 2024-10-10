import { Observable } from './flushPolicies';
import type { DestinationPlugin, Plugin } from './plugin';
import { DeepLinkData, Settable, Storage, Watchable } from './storage';
import { DestinationFilters, SegmentAPISettings, SegmentAPIConsentSettings, EdgeFunctionSettings, EnrichmentClosure } from './types';
import { Config, Context, DeepPartial, GroupTraits, IntegrationSettings, JsonMap, LoggerType, PluginType, SegmentAPIIntegrations, SegmentEvent, UserInfoState, UserTraits } from './types';
import type { FlushPolicy } from './flushPolicies';
import { SegmentError } from './errors';
type OnPluginAddedCallback = (plugin: Plugin) => void;
export declare class SegmentClient {
    private config;
    private store;
    private appState;
    private appStateSubscription?;
    logger: LoggerType;
    private destroyed;
    private isAddingPlugins;
    private timeline;
    private pluginsToAdd;
    private flushPolicyExecuter;
    private onPluginAddedObservers;
    private readonly platformPlugins;
    /**
     * Observable to know when the client is fully initialized and ready to send events to destination
     */
    readonly isReady: Observable<boolean>;
    /**
     * Access or subscribe to client context
     */
    readonly context: Watchable<DeepPartial<Context> | undefined> & Settable<DeepPartial<Context>>;
    /**
     * Access or subscribe to adTrackingEnabled (also accesible from context)
     */
    readonly adTrackingEnabled: Watchable<boolean>;
    /**
     * Access or subscribe to integration settings
     */
    readonly settings: Watchable<SegmentAPIIntegrations | undefined>;
    /**
     * Access or subscribe to integration settings
     */
    readonly consentSettings: Watchable<SegmentAPIConsentSettings | undefined>;
    /**
     * Access or subscribe to edge functions settings
     */
    readonly edgeFunctionSettings: Watchable<EdgeFunctionSettings | undefined>;
    /**
     * Access or subscribe to destination filter settings
     */
    readonly filters: Watchable<DestinationFilters | undefined>;
    /**
     * Access or subscribe to user info (anonymousId, userId, traits)
     */
    readonly userInfo: Watchable<UserInfoState> & Settable<UserInfoState>;
    readonly deepLinkData: Watchable<DeepLinkData>;
    /**
     * Returns the plugins currently loaded in the timeline
     * @param ofType Type of plugins, defaults to all
     * @returns List of Plugin objects
     */
    getPlugins(ofType?: PluginType): readonly Plugin[];
    /**
     * Retrieves a copy of the current client configuration
     */
    getConfig(): {
        writeKey: string;
        debug?: boolean | undefined;
        logger?: import("./types").DeactivableLoggerType | undefined;
        flushAt?: number | undefined;
        flushInterval?: number | undefined;
        flushPolicies?: FlushPolicy[] | undefined;
        trackAppLifecycleEvents?: boolean | undefined; /**
         * Access or subscribe to integration settings
         */
        maxBatchSize?: number | undefined;
        trackDeepLinks?: boolean | undefined;
        defaultSettings?: SegmentAPISettings | undefined;
        autoAddSegmentDestination?: boolean | undefined;
        collectDeviceId?: boolean | undefined;
        storePersistor?: import("@segment/sovran-react-native").Persistor | undefined;
        storePersistorSaveDelay?: number | undefined;
        proxy?: string | undefined;
        cdnProxy?: string | undefined;
        errorHandler?: ((error: SegmentError) => void) | undefined;
    };
    constructor({ config, logger, store, }: {
        config: Config;
        logger: LoggerType;
        store: Storage;
    });
    private storageReady;
    /**
     * Initializes the client plugins, settings and subscribers.
     * Can only be called once.
     */
    init(): Promise<void>;
    private generateFiltersMap;
    fetchSettings(): Promise<void>;
    /**
     * There is no garbage collection in JS, which means that any listeners, timeouts and subscriptions
     * would run until the application closes
     *
     * This method exists in case the user for some reason needs to recreate the class instance during runtime.
     * In this case, they should run client.cleanup() to destroy the listeners in the old client before creating a new one.
     *
     * There is a Stage 3 EMCAScript proposal to add a user-defined finalizer, which we could potentially switch to if
     * it gets approved: https://github.com/tc39/proposal-weakrefs#finalizers
     */
    cleanup(): void;
    private setupLifecycleEvents;
    /**
       Applies the supplied closure to the currently loaded set of plugins.
       NOTE: This does not apply to plugins contained within DestinationPlugins.
  
       - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
  
    */
    apply(closure: (plugin: Plugin) => void): void;
    /**
     * Adds a new plugin to the currently loaded set.
     * @param {{ plugin: Plugin, settings?: IntegrationSettings }} Plugin to be added. Settings are optional if you want to force a configuration instead of the Segment Cloud received one
     */
    add<P extends Plugin>({ plugin, settings, }: {
        plugin: P;
        settings?: P extends DestinationPlugin ? IntegrationSettings : never;
    }): void;
    private addPlugin;
    /**
       Removes and unloads plugins with a matching name from the system.
  
       - Parameter pluginName: An plugin name.
    */
    remove({ plugin }: {
        plugin: Plugin;
    }): void;
    process(incomingEvent: SegmentEvent, enrichment?: EnrichmentClosure): Promise<SegmentEvent | undefined>;
    /**
     * Starts timeline processing
     * @param incomingEvent Segment Event
     * @returns Segment Event
     */
    private startTimelineProcessing;
    private trackDeepLinks;
    private trackDeepLinkEvent;
    /**
     * Executes when everything in the client is ready for sending events
     * @param isReady
     */
    private onReady;
    flush(): Promise<void>;
    screen(name: string, options?: JsonMap, enrichment?: EnrichmentClosure): Promise<void>;
    track(eventName: string, options?: JsonMap, enrichment?: EnrichmentClosure): Promise<void>;
    identify(userId?: string, userTraits?: UserTraits, enrichment?: EnrichmentClosure): Promise<void>;
    group(groupId: string, groupTraits?: GroupTraits, enrichment?: EnrichmentClosure): Promise<void>;
    alias(newUserId: string, enrichment?: EnrichmentClosure): Promise<void>;
    /**
     * Called once when the client is first created
     *
     * Detect and save the the currently installed application version
     * Send application lifecycle events if trackAppLifecycleEvents is enabled
     *
     * Exactly one of these events will be sent, depending on the current and previous version:s
     * Application Installed - no information on the previous version, so it's a fresh install
     * Application Updated - the previous detected version is different from the current version
     * Application Opened - the previously detected version is same as the current version
     */
    private checkInstalledVersion;
    /**
     * AppState event listener. Called whenever the app state changes.
     *
     * Send application lifecycle events if trackAppLifecycleEvents is enabled.
     *
     * Application Opened - only when the app state changes from 'inactive' or 'background' to 'active'
     *   The initial event from 'unknown' to 'active' is handled on launch in checkInstalledVersion
     * Application Backgrounded - when the app state changes from 'inactive' or 'background' to 'active
     *
     * @param nextAppState 'active', 'inactive', 'background' or 'unknown'
     */
    private handleAppStateChange;
    reset(resetAnonymousId?: boolean): Promise<void>;
    /**
     * Registers a callback for each plugin that gets added to the analytics client.
     * @param callback Function to call
     */
    onPluginLoaded(callback: OnPluginAddedCallback): () => void;
    private triggerOnPluginLoaded;
    /**
     * Initializes the flush policies from config and subscribes to updates to
     * trigger flush
     */
    private setupFlushPolicies;
    /**
     * Adds a FlushPolicy to the list
     * @param policies policies to add
     */
    addFlushPolicy(...policies: FlushPolicy[]): void;
    /**
     * Removes a FlushPolicy from the execution
     *
     * @param policies policies to remove
     * @returns true if the value was removed, false if not found
     */
    removeFlushPolicy(...policies: FlushPolicy[]): void;
    /**
     * Returns the current enabled flush policies
     */
    getFlushPolicies(): FlushPolicy[];
    reportInternalError(error: SegmentError, fatal?: boolean): void;
    /**
     * Sets the messageId and timestamp
     * @param event Segment Event
     * @returns event with data injected
     */
    private applyRawEventData;
    /**
     * Injects context and userInfo data into the event
     * This is handled outside of the timeline to prevent concurrency issues between plugins
     * This is only added after the client is ready to let the client restore values from storage
     * @param event Segment Event
     * @returns event with data injected
     */
    private applyContextData;
    /**
     * Processes the userInfo to add to an event.
     * For Identify and Alias: it saves the new userId and traits into the storage
     * For all: set the userId and anonymousId from the current values
     * @param event segment event
     * @returns userInfo to inject to an event
     */
    private processUserInfo;
}
export {};
//# sourceMappingURL=analytics.d.ts.map