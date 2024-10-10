"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTestClient = void 0;
var _analytics = require("../analytics");
var _plugin = require("../plugin");
var _types = require("../types");
var _mockLogger = require("./mockLogger");
var _mockSegmentStore = require("./mockSegmentStore");
jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2010-01-01T00:00:00.000Z');
const createTestClient = (storeData, config) => {
  const store = new _mockSegmentStore.MockSegmentStore({
    isReady: true,
    ...storeData
  });
  const clientArgs = {
    config: {
      writeKey: 'mock-write-key',
      autoAddSegmentDestination: false,
      flushInterval: 0,
      ...config
    },
    logger: (0, _mockLogger.getMockLogger)(),
    store: store
  };
  const client = new _analytics.SegmentClient(clientArgs);
  class ObservablePlugin extends _plugin.UtilityPlugin {
    type = _types.PluginType.after;
    execute = async event => {
      await super.execute(event);
      return event;
    };
  }
  const mockPlugin = new ObservablePlugin();
  jest.spyOn(mockPlugin, 'execute');
  client.add({
    plugin: mockPlugin
  });
  return {
    client,
    store,
    plugin: mockPlugin,
    expectEvent: event => {
      return expect(mockPlugin.execute).toHaveBeenCalledWith(expect.objectContaining(event));
    }
  };
};
exports.createTestClient = createTestClient;
//# sourceMappingURL=setupSegmentClient.js.map