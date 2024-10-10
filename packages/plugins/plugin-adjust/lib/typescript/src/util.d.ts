import type { SegmentAdjustSettings } from '@segment/analytics-react-native';
export declare const mappedCustomEventToken: (eventName: string, settings: SegmentAdjustSettings) => string | null;
export declare const extract: <T>(key: string, properties: {
    [key: string]: unknown;
}, defaultValue?: T | null) => T | null;
//# sourceMappingURL=util.d.ts.map