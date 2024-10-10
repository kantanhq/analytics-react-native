import { PlatformPlugin, SegmentClient, PluginType } from '@segment/analytics-react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
export declare class DeviceTokenPlugin extends PlatformPlugin {
    type: PluginType;
    authStatus: Promise<FirebaseMessagingTypes.AuthorizationStatus | undefined>;
    configure(analytics: SegmentClient): Promise<void>;
    private getDeviceToken;
    setDeviceToken(token: string): Promise<void>;
    updatePermissionStatus(): Promise<void>;
    private checkUserPermission;
}
//# sourceMappingURL=DeviceTokenPlugin.d.ts.map