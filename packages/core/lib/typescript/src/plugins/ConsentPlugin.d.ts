import { Plugin } from '../plugin';
import { PluginType } from '../types';
import type { SegmentEvent, UpdateType, SegmentAPISettings } from '../types';
import type { SegmentClient } from '../analytics';
export interface CategoryConsentStatusProvider {
    setApplicableCategories(categories: string[]): void;
    getConsentStatus(): Promise<Record<string, boolean>>;
    onConsentChange(cb: (updConsent: Record<string, boolean>) => void): void;
    shutdown?(): void;
}
/**
 * This plugin interfaces with the consent provider and it:
 *
 * - stamps all events with the consent metadata.
 * - augments all destinations with a consent filter plugin that prevents events from reaching them if
 * they are not compliant current consent setup
 * - listens for consent change from the provider and notifies Segment
 */
export declare class ConsentPlugin extends Plugin {
    type: PluginType;
    private consentCategoryProvider;
    private categories;
    queuedEvents: SegmentEvent[];
    consentStarted: boolean;
    constructor(consentCategoryProvider: CategoryConsentStatusProvider);
    update(_settings: SegmentAPISettings, _type: UpdateType): void;
    configure(analytics: SegmentClient): void;
    execute(event: SegmentEvent): Promise<SegmentEvent | undefined>;
    shutdown(): void;
    private injectConsentFilterIfApplicable;
    private isDestinationPlugin;
    private containsConsentSettings;
    private isConsentUpdateEvent;
    private hasUnmappedDestinations;
    private isConsentFeatureSetup;
    private notifyConsentChange;
    start(): void;
    sendQueuedEvents(): void;
}
//# sourceMappingURL=ConsentPlugin.d.ts.map