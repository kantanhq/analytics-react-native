import { Plugin, PluginType, SegmentClient } from '@segment/analytics-react-native';
export declare class AdvertisingIdPlugin extends Plugin {
    type: PluginType;
    configure(analytics: SegmentClient): void;
    setContext(id: string): Promise<void>;
}
//# sourceMappingURL=AdvertisingIdPlugin.d.ts.map