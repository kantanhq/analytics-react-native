import { Plugin, PluginType, SegmentEvent } from '@segment/analytics-react-native';
export declare class BrazeMiddlewarePlugin extends Plugin {
    type: PluginType;
    key: string;
    private lastSeenTraits;
    execute(event: SegmentEvent): SegmentEvent | undefined;
}
//# sourceMappingURL=BrazeMiddlewarePlugin.d.ts.map