"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockSegmentStore = void 0;
exports.createMockStoreGetter = createMockStoreGetter;
var _SegmentDestination = require("../plugins/SegmentDestination");
var _utils = require("./utils");
var _helpers = require("../storage/helpers");
const INITIAL_VALUES = {
  isReady: true,
  context: undefined,
  settings: {
    [_SegmentDestination.SEGMENT_DESTINATION_KEY]: {}
  },
  consentSettings: undefined,
  filters: {},
  userInfo: {
    anonymousId: 'anonymousId',
    userId: undefined,
    traits: undefined
  },
  deepLinkData: {
    referring_application: '',
    url: ''
  },
  pendingEvents: []
};
function createMockStoreGetter(fn) {
  return (0, _helpers.createGetter)(fn, () => {
    return new Promise(resolve => {
      resolve(fn());
    });
  });
}
class MockSegmentStore {
  reset = () => {
    this.data = JSON.parse(JSON.stringify(this.initialData));
  };
  constructor(initialData) {
    this.data = {
      ...INITIAL_VALUES,
      ...initialData
    };
    this.initialData = JSON.parse(JSON.stringify({
      ...INITIAL_VALUES,
      ...initialData
    }));
  }
  callbacks = {
    context: (0, _utils.createCallbackManager)(),
    settings: (0, _utils.createCallbackManager)(),
    consentSettings: (0, _utils.createCallbackManager)(),
    edgeFunctionSettings: (0, _utils.createCallbackManager)(),
    filters: (0, _utils.createCallbackManager)(),
    userInfo: (0, _utils.createCallbackManager)(),
    deepLinkData: (0, _utils.createCallbackManager)(),
    pendingEvents: (0, _utils.createCallbackManager)()
  };
  isReady = {
    get: createMockStoreGetter(() => {
      return this.data.isReady;
    }),
    onChange: _callback => {
      return () => {
        return;
      };
    }
  };
  context = {
    get: createMockStoreGetter(() => ({
      ...this.data.context
    })),
    onChange: callback => this.callbacks.context.register(callback),
    set: value => {
      this.data.context = value instanceof Function ? value(this.data.context ?? {}) : {
        ...value
      };
      this.callbacks.context.run(this.data.context);
      return this.data.context;
    }
  };
  settings = {
    get: createMockStoreGetter(() => this.data.settings),
    onChange: callback => this.callbacks.settings.register(callback),
    set: value => {
      this.data.settings = value instanceof Function ? value(this.data.settings ?? {}) : {
        ...value
      };
      this.callbacks.settings.run(this.data.settings);
      return this.data.settings;
    },
    add: (key, value) => {
      this.data.settings[key] = value;
      this.callbacks.settings.run(this.data.settings);
      return Promise.resolve(this.data.settings);
    }
  };
  consentSettings = {
    get: createMockStoreGetter(() => this.data.consentSettings),
    onChange: callback => this.callbacks.consentSettings.register(callback),
    set: value => {
      this.data.consentSettings = value instanceof Function ? value(this.data.consentSettings) : value;
      this.callbacks.consentSettings.run(this.data.consentSettings);
      return this.data.consentSettings;
    }
  };
  edgeFunctionSettings = {
    get: createMockStoreGetter(() => this.data.edgeFunctionSettings),
    onChange: callback => this.callbacks.edgeFunctionSettings.register(callback),
    set: value => {
      this.data.edgeFunctionSettings = value instanceof Function ? value(this.data.edgeFunctionSettings) : value;
      this.callbacks.edgeFunctionSettings.run(this.data.edgeFunctionSettings);
      return this.data.edgeFunctionSettings;
    }
  };
  filters = {
    get: createMockStoreGetter(() => this.data.filters),
    onChange: callback => this.callbacks.filters.register(callback),
    set: value => {
      this.data.filters = value instanceof Function ? value(this.data.filters ?? {}) : {
        ...value
      };
      this.callbacks.filters.run(this.data.filters);
      return this.data.filters;
    },
    add: (key, value) => {
      this.data.filters[key] = value;
      this.callbacks.filters.run(this.data.filters);
      return Promise.resolve(this.data.filters);
    }
  };
  userInfo = {
    get: createMockStoreGetter(() => this.data.userInfo),
    onChange: callback => this.callbacks.userInfo.register(callback),
    set: value => {
      this.data.userInfo = value instanceof Function ? value(this.data.userInfo ?? {}) : {
        ...value
      };
      this.callbacks.userInfo.run(this.data.userInfo);
      return this.data.userInfo;
    }
  };
  deepLinkData = {
    get: createMockStoreGetter(() => {
      return this.data.deepLinkData;
    }),
    set: value => {
      this.data.deepLinkData = value;
      this.callbacks.deepLinkData.run(value);
    },
    onChange: callback => this.callbacks.deepLinkData.register(callback)
  };
  pendingEvents = {
    get: createMockStoreGetter(() => {
      return this.data.pendingEvents;
    }),
    set: value => {
      this.data.pendingEvents = value instanceof Function ? value(this.data.pendingEvents ?? []) : [...value];
      this.callbacks.pendingEvents.run(this.data.pendingEvents);
      return this.data.pendingEvents;
    },
    add: value => {
      this.data.pendingEvents.push(value);
      this.callbacks.pendingEvents.run(this.data.pendingEvents);
      return Promise.resolve(this.data.pendingEvents);
    },
    remove: value => {
      this.data.pendingEvents = this.data.pendingEvents.filter(e => e.messageId != value.messageId);
      this.callbacks.pendingEvents.run(this.data.pendingEvents);
      return Promise.resolve(this.data.pendingEvents);
    },
    onChange: callback => this.callbacks.pendingEvents.register(callback)
  };
}
exports.MockSegmentStore = MockSegmentStore;
//# sourceMappingURL=mockSegmentStore.js.map