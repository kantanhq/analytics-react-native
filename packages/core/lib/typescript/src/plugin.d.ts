import type { SegmentClient } from './analytics';
import { Timeline } from './timeline';
import { AliasEventType, GroupEventType, IdentifyEventType, PluginType, ScreenEventType, SegmentAPISettings, SegmentEvent, TrackEventType, UpdateType } from './types';
export declare class Plugin {
    type: PluginType;
    analytics?: SegmentClient;
    configure(analytics: SegmentClient): void;
    update(_settings: SegmentAPISettings, _type: UpdateType): void;
    execute(event: SegmentEvent): Promise<SegmentEvent | undefined> | SegmentEvent | undefined;
    shutdown(): void;
}
export declare class EventPlugin extends Plugin {
    execute(event: SegmentEvent): Promise<SegmentEvent | undefined> | SegmentEvent | undefined;
    identify(event: IdentifyEventType): Promise<IdentifyEventType | undefined> | IdentifyEventType | undefined;
    track(event: TrackEventType): Promise<TrackEventType | undefined> | TrackEventType | undefined;
    screen(event: ScreenEventType): Promise<ScreenEventType | undefined> | ScreenEventType | undefined;
    alias(event: AliasEventType): Promise<AliasEventType | undefined> | AliasEventType | undefined;
    group(event: GroupEventType): Promise<GroupEventType | undefined> | GroupEventType | undefined;
    flush(): void | Promise<void>;
    reset(): void | Promise<void>;
}
export declare class DestinationPlugin extends EventPlugin {
    type: PluginType;
    key: string;
    timeline: Timeline;
    private hasSettings;
    private isEnabled;
    /**
       Adds a new plugin to the currently loaded set.
  
       - Parameter plugin: The plugin to be added.
       - Returns: Returns the name of the supplied plugin.
    */
    add(plugin: Plugin): Plugin;
    /**
       Applies the supplied closure to the currently loaded set of plugins.
  
       - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
    */
    apply(closure: (plugin: Plugin) => void): void;
    configure(analytics: SegmentClient): void;
    /**
       Removes and unloads plugins with a matching name from the system.
  
       - Parameter pluginName: An plugin name.
    */
    remove(plugin: Plugin): void;
    execute(event: SegmentEvent): Promise<SegmentEvent | undefined>;
}
export declare class UtilityPlugin extends EventPlugin {
}
export declare class PlatformPlugin extends Plugin {
}
//# sourceMappingURL=plugin.d.ts.map