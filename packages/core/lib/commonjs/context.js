"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = void 0;
var _info = require("./info");
var _util = require("./util");
var _uuid = require("./uuid");
const defaultContext = {
  appName: '',
  appVersion: '',
  buildNumber: '',
  bundleId: '',
  locale: '',
  networkType: '',
  osName: '',
  osVersion: '',
  screenHeight: 0,
  screenWidth: 0,
  timezone: '',
  manufacturer: '',
  model: '',
  deviceName: '',
  deviceId: '',
  deviceType: '',
  screenDensity: 0
};
const getContext = async (userTraits = {}, config) => {
  // We need to remove all stuff from the config that is not actually required by the native module
  const nativeConfig = {
    collectDeviceId: config?.collectDeviceId ?? false
  };
  const nativeModule = (0, _util.getNativeModule)('AnalyticsReactNative');
  const {
    appName,
    appVersion,
    buildNumber,
    bundleId,
    locale,
    networkType,
    osName,
    osVersion,
    screenHeight,
    screenWidth,
    timezone,
    manufacturer,
    model,
    deviceName,
    deviceId,
    deviceType,
    screenDensity
  } = (await nativeModule.getContextInfo(nativeConfig)) ?? defaultContext;
  const device = {
    id: deviceId,
    manufacturer: manufacturer,
    model: model,
    name: deviceName,
    type: deviceType
  };
  return {
    app: {
      build: buildNumber,
      name: appName,
      namespace: bundleId,
      version: appVersion
    },
    device,
    library: {
      name: _info.libraryInfo.name,
      version: _info.libraryInfo.version
    },
    locale,
    network: {
      cellular: networkType === 'cellular',
      wifi: networkType === 'wifi'
    },
    os: {
      name: osName,
      version: osVersion
    },
    screen: {
      width: screenWidth,
      height: screenHeight,
      density: screenDensity
    },
    timezone,
    traits: userTraits,
    instanceId: (0, _uuid.getUUID)()
  };
};
exports.getContext = getContext;
//# sourceMappingURL=context.js.map