import type { CategoryConsentStatusProvider } from '@segment/analytics-react-native';
declare enum ConsentStatus {
    Granted = 1,
    Denied = 0,
    Unknown = -1
}
/** Interface derived from https://www.npmjs.com/package/react-native-onetrust-cmp */
export interface OTPublishersNativeSDK {
    getConsentStatusForCategory(categoryId: string): Promise<ConsentStatus>;
    setBroadcastAllowedValues(categoryIds: string[]): void;
    listenForConsentChanges(categoryId: string, callback: (cid: string, status: ConsentStatus) => void): void;
    stopListeningForConsentChanges(): void;
}
export declare class OneTrustConsentProvider implements CategoryConsentStatusProvider {
    private oneTrust;
    getConsentStatus: () => Promise<Record<string, boolean>>;
    private onConsentChangeCallback;
    constructor(oneTrust: OTPublishersNativeSDK);
    onConsentChange(cb: (updConsent: Record<string, boolean>) => void): void;
    setApplicableCategories(categories: string[]): void;
    shutdown(): void;
}
export {};
//# sourceMappingURL=OneTrustProvider.d.ts.map