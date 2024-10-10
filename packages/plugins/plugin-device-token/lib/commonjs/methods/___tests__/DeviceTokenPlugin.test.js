"use strict";

var _analyticsReactNative = require("@segment/analytics-react-native");
var _testHelpers = require("@segment/analytics-react-native/src/test-helpers");
var _reactNative = require("react-native");
var _DeviceTokenPlugin = require("../../DeviceTokenPlugin");
const mockRequestPermission = jest.fn().mockReturnValue(1);
const mockGetAPNSToken = jest.fn().mockReturnValue('device-token');
const mockGetDeviceToken = jest.fn().mockReturnValue('device-token');
jest.mock('@react-native-firebase/messaging', () => () => ({
  getAPNSToken: mockGetAPNSToken,
  getToken: mockGetDeviceToken,
  hasPermission: mockRequestPermission
}));
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: () => null
}));
describe('DeviceTokenPlugin', () => {
  const store = new _testHelpers.MockSegmentStore();
  const clientArgs = {
    logger: (0, _testHelpers.getMockLogger)(),
    config: {
      writeKey: '123-456',
      trackApplicationLifecycleEvents: true,
      flushInterval: 0
    },
    store
  };
  let plugin = new _DeviceTokenPlugin.DeviceTokenPlugin();
  beforeEach(() => {
    store.reset();
    jest.clearAllMocks();
    plugin = new _DeviceTokenPlugin.DeviceTokenPlugin();
  });
  it('requests authorization when configure is called', async () => {
    const analytics = new _analyticsReactNative.SegmentClient(clientArgs);
    await plugin.configure(analytics);
    expect(mockRequestPermission).toHaveBeenCalled();
  });
  it('retrieves the APNS value if authorized and OS is iOS', async () => {
    _reactNative.Platform.OS = 'ios';
    const analytics = new _analyticsReactNative.SegmentClient(clientArgs);
    await plugin.configure(analytics);
    expect(mockRequestPermission).toHaveReturnedWith(1);
    expect(mockGetAPNSToken).toHaveBeenCalled();
  });
  it('retrieves the device token for Android builds', async () => {
    _reactNative.Platform.OS = 'android';
    const analytics = new _analyticsReactNative.SegmentClient(clientArgs);
    await plugin.configure(analytics);
    expect(mockGetDeviceToken).toHaveBeenCalled();
  });
  it('retrieves the device token when updatePermissions is called', async () => {
    _reactNative.Platform.OS = 'ios';
    await plugin.updatePermissionStatus();
    expect(mockGetAPNSToken).toHaveBeenCalled();
  });
  it('sets the device token in context for iOS', async () => {
    const analytics = new _analyticsReactNative.SegmentClient(clientArgs);
    await plugin.configure(analytics);
    const token = await store.context.get(true);
    expect(token).toEqual({
      device: {
        token: 'device-token'
      }
    });
  });
  it('sets the device token in context for Android', async () => {
    _reactNative.Platform.OS = 'android';
    const analytics = new _analyticsReactNative.SegmentClient(clientArgs);
    await plugin.configure(analytics);
    const token = await store.context.get(true);
    expect(token).toEqual({
      device: {
        token: 'device-token'
      }
    });
  });
});
//# sourceMappingURL=DeviceTokenPlugin.test.js.map