import { Plugin, PluginType, SegmentClient } from '@segment/analytics-react-native';
/**
 * IDFA Plugin
 * @constructor
 * @param {boolean} shouldAskPermission - defaults to true. Passing false
 *  when initializing new `IDFA Plugin` will prevent plugin from
 * requesting tracking status
 */
export declare class IdfaPlugin extends Plugin {
    type: PluginType;
    private shouldAskPermission;
    constructor(shouldAskPermission?: boolean);
    configure(analytics: SegmentClient): void;
    /** `requestTrackingPermission()` will prompt the user for
  tracking permission and returns a promise you can use to
  make additional tracking decisions based on the user response
  */
    requestTrackingPermission(): Promise<boolean>;
    getTrackingStatus(): void;
}
//# sourceMappingURL=IdfaPlugin.d.ts.map