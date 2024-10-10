import { SegmentClient } from '../analytics';
import { UtilityPlugin } from '../plugin';
import { PluginType } from '../types';
import { getMockLogger } from './mockLogger';
import { MockSegmentStore } from './mockSegmentStore';
jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2010-01-01T00:00:00.000Z');
export const createTestClient = (storeData, config) => {
  const store = new MockSegmentStore({
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
    logger: getMockLogger(),
    store: store
  };
  const client = new SegmentClient(clientArgs);
  class ObservablePlugin extends UtilityPlugin {
    type = PluginType.after;
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
//# sourceMappingURL=setupSegmentClient.js.map