import { createMockStoreGetter } from './mockSegmentStore';
import { createCallbackManager } from './utils';
export class MockEventStore {
  initialData = [];
  events = [];
  callbackManager = createCallbackManager();
  constructor(initialData) {
    this.events = [...(initialData ?? [])];
    this.initialData = JSON.parse(JSON.stringify(initialData ?? []));
  }
  reset = () => {
    this.events = JSON.parse(JSON.stringify(this.initialData));
  };
  getState = createMockStoreGetter(() => ({
    events: this.events
  }));
  subscribe = callback => this.callbackManager.register(callback);
  dispatch = callback => {
    this.events = callback({
      events: this.events
    }).events;
    this.callbackManager.run({
      events: this.events
    });
  };
}
//# sourceMappingURL=mockEventStore.js.map