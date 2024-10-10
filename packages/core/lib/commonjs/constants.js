"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workspaceDestinationFilterKey = exports.settingsCDN = exports.defaultFlushInterval = exports.defaultFlushAt = exports.defaultConfig = exports.defaultApiHost = void 0;
const defaultApiHost = exports.defaultApiHost = 'https://api.segment.io/v1/b';
const settingsCDN = exports.settingsCDN = 'https://cdn-settings.segment.com/v1/projects';
const defaultConfig = exports.defaultConfig = {
  writeKey: '',
  maxBatchSize: 1000,
  trackDeepLinks: false,
  trackAppLifecycleEvents: false,
  autoAddSegmentDestination: true
};
const workspaceDestinationFilterKey = exports.workspaceDestinationFilterKey = '';
const defaultFlushAt = exports.defaultFlushAt = 20;
const defaultFlushInterval = exports.defaultFlushInterval = 30;
//# sourceMappingURL=constants.js.map