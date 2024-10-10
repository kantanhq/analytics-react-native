import { PluginType, SegmentEvent } from './types';
import type { Plugin } from './plugin';
type TimelinePlugins = {
    [key in PluginType]?: Plugin[];
};
export declare class Timeline {
    plugins: TimelinePlugins;
    add(plugin: Plugin): void;
    remove(plugin: Plugin): void;
    apply(closure: (plugin: Plugin) => void): void;
    process(incomingEvent: SegmentEvent): Promise<SegmentEvent | undefined>;
    applyPlugins({ type, event, }: {
        type: PluginType;
        event: SegmentEvent;
    }): Promise<SegmentEvent | undefined>;
}
export {};
//# sourceMappingURL=timeline.d.ts.map