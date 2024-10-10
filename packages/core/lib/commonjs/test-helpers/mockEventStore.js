"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockEventStore = void 0;
var _mockSegmentStore = require("./mockSegmentStore");
var _utils = require("./utils");
class MockEventStore {
  initialData = [];
  events = [];
  callbackManager = (0, _utils.createCallbackManager)();
  constructor(initialData) {
    this.events = [...(initialData ?? [])];
    this.initialData = JSON.parse(JSON.stringify(initialData ?? []));
  }
  reset = () => {
    this.events = JSON.parse(JSON.stringify(this.initialData));
  };
  getState = (0, _mockSegmentStore.createMockStoreGetter)(() => ({
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
exports.MockEventStore = MockEventStore;
//# sourceMappingURL=mockEventStore.js.map