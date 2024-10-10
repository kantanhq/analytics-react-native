"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceTokenPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNative = require("react-native");
var _messaging = _interopRequireDefault(require("@react-native-firebase/messaging"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeviceTokenPlugin extends _analyticsReactNative.PlatformPlugin {
  type = _analyticsReactNative.PluginType.enrichment;
  authStatus = this.checkUserPermission();
  async configure(analytics) {
    this.analytics = analytics;
    try {
      const isAuthorized = await this.authStatus;
      if (isAuthorized !== undefined && isAuthorized > 0) {
        const token = await this.getDeviceToken();
        if (token !== undefined) {
          await this.setDeviceToken(token);
        }
      } else {
        this.analytics?.logger.warn('Not authorized to retrieve device token');
      }
    } catch (error) {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Unable to confirm authorization status', error));
    }
  }
  async getDeviceToken() {
    if (_reactNative.Platform.OS === 'ios') {
      return (await (0, _messaging.default)().getAPNSToken()) ?? undefined;
    }
    if (_reactNative.Platform.OS === 'android') {
      const deviceToken = (await (0, _messaging.default)().getToken()) ?? undefined;
      if (deviceToken !== undefined && deviceToken.length > 0) {
        return deviceToken;
      } else {
        return undefined;
      }
    }
    this.analytics?.logger.warn('Device token only available on iOS and Android platforms');
    return undefined;
  }
  async setDeviceToken(token) {
    await this.analytics?.context.set({
      device: {
        token: token
      }
    });
    await this.analytics?.track('Device Token Retrieved');
  }
  async updatePermissionStatus() {
    const isAuthorized = await this.checkUserPermission();
    if (isAuthorized !== undefined && isAuthorized > 0) {
      const token = await this.getDeviceToken();
      if (token !== undefined) {
        await this.setDeviceToken(token);
      }
    }
  }
  async checkUserPermission() {
    try {
      return await (0, _messaging.default)().hasPermission();
    } catch (error) {
      this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Unable to confirm authorization status', error));
      return undefined;
    }
  }
}
exports.DeviceTokenPlugin = DeviceTokenPlugin;
//# sourceMappingURL=DeviceTokenPlugin.js.map