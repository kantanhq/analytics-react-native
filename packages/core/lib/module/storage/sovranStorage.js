import { createStore, registerBridgeStore } from '@segment/sovran-react-native';
import deepmerge from 'deepmerge';
import { getUUID } from '../uuid';
import { createGetter } from './helpers';
import { isObject, isString } from '../util';
const INITIAL_VALUES = {
  context: {},
  settings: {},
  consentSettings: undefined,
  edgeFunctionSettings: undefined,
  filters: {},
  userInfo: {
    anonymousId: getUUID(),
    userId: undefined,
    traits: undefined
  },
  pendingEvents: []
};
const isEverythingReady = state => Object.values(state).every(v => v === true);

/**
 * Global store for deeplink information
 * A single instance is needed for all SovranStorage objects since only one deeplink data exists at a time
 * No need to persist this information
 */
const deepLinkStore = createStore({
  referring_application: '',
  url: ''
});

/**
 * Action to set the referring app and link url
 * @param deepLinkData referring app and link url
 */
const addDeepLinkData = deepLinkData => state => {
  if (!isObject(deepLinkData)) {
    return state;
  }
  return {
    referring_application: deepLinkData.referring_application,
    url: deepLinkData.url
  };
};

/**
 * Registers the deeplink store to listen to native events
 */
registerBridgeStore({
  store: deepLinkStore,
  actions: {
    'add-deepLink-data': addDeepLinkData
  }
});

/**
 * Action to set the anonymousId from native
 * @param anonymousId native anonymousId string
 */

const addAnonymousId = payload => state => {
  if (isObject(payload)) {
    const nativeAnonymousId = payload.anonymousId;
    if (isString(nativeAnonymousId)) {
      return {
        userInfo: {
          ...state.userInfo,
          anonymousId: nativeAnonymousId
        }
      };
    }
  }
  return state;
};
function createStoreGetter(store, key) {
  return createGetter(() => {
    const state = store.getState();
    if (key !== undefined) {
      return state[key];
    }
    return state;
  }, async () => {
    const promise = await store.getState(true);
    if (key !== undefined) {
      return promise[key];
    }
    return promise;
  });
}
export class SovranStorage {
  deepLinkStore = deepLinkStore;
  constructor(config) {
    this.storeId = config.storeId;
    this.storePersistor = config.storePersistor;
    this.storePersistorSaveDelay = config.storePersistorSaveDelay;
    this.readinessStore = createStore({
      hasRestoredContext: false,
      hasRestoredSettings: false,
      hasRestoredUserInfo: false,
      hasRestoredFilters: false,
      hasRestoredPendingEvents: false
    });
    const markAsReadyGenerator = key => () => {
      void this.readinessStore.dispatch(state => ({
        ...state,
        [key]: true
      }));
    };
    this.isReady = {
      get: createGetter(() => {
        const state = this.readinessStore.getState();
        return isEverythingReady(state);
      }, async () => {
        const promise = await this.readinessStore.getState(true).then(isEverythingReady);
        return promise;
      }),
      onChange: callback => {
        return this.readinessStore.subscribe(store => {
          if (isEverythingReady(store)) {
            callback(true);
          }
        });
      }
    };

    // Context Store

    this.contextStore = createStore({
      context: INITIAL_VALUES.context
    }, {
      persist: {
        storeId: `${this.storeId}-context`,
        persistor: this.storePersistor,
        onInitialized: markAsReadyGenerator('hasRestoredContext')
      }
    });
    this.context = {
      get: createStoreGetter(this.contextStore, 'context'),
      onChange: callback => this.contextStore.subscribe(store => callback(store.context)),
      set: async value => {
        const {
          context
        } = await this.contextStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state.context);
          } else {
            newState = deepmerge(state.context, value);
          }
          return {
            context: newState
          };
        });
        return context;
      }
    };

    // Settings Store

    this.settingsStore = createStore({
      settings: INITIAL_VALUES.settings
    }, {
      persist: {
        storeId: `${this.storeId}-settings`,
        persistor: this.storePersistor,
        saveDelay: this.storePersistorSaveDelay,
        onInitialized: markAsReadyGenerator('hasRestoredSettings')
      }
    });
    this.settings = {
      get: createStoreGetter(this.settingsStore, 'settings'),
      onChange: callback => this.settingsStore.subscribe(store => callback(store.settings)),
      set: async value => {
        const {
          settings
        } = await this.settingsStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state.settings);
          } else {
            newState = {
              ...state.settings,
              ...value
            };
          }
          return {
            settings: newState
          };
        });
        return settings;
      },
      add: (key, value) => {
        return this.settingsStore.dispatch(state => ({
          settings: {
            ...state.settings,
            [key]: value
          }
        }));
      }
    };

    // Consent settings

    this.consentSettingsStore = createStore({
      consentSettings: INITIAL_VALUES.consentSettings
    }, {
      persist: {
        storeId: `${this.storeId}-consentSettings`,
        persistor: this.storePersistor,
        saveDelay: this.storePersistorSaveDelay,
        onInitialized: markAsReadyGenerator('hasRestoredSettings')
      }
    });
    this.consentSettings = {
      get: createStoreGetter(this.consentSettingsStore, 'consentSettings'),
      onChange: callback => this.consentSettingsStore.subscribe(store => callback(store.consentSettings)),
      set: async value => {
        const {
          consentSettings
        } = await this.consentSettingsStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state.consentSettings);
          } else {
            newState = Object.assign({}, state.consentSettings, value);
          }
          return {
            consentSettings: newState
          };
        });
        return consentSettings;
      }
    };

    // Edge function settings

    this.edgeFunctionSettingsStore = createStore({
      edgeFunctionSettings: INITIAL_VALUES.edgeFunctionSettings
    }, {
      persist: {
        storeId: `${this.storeId}-edgeFunctionSettings`,
        persistor: this.storePersistor,
        saveDelay: this.storePersistorSaveDelay,
        onInitialized: markAsReadyGenerator('hasRestoredSettings')
      }
    });
    this.edgeFunctionSettings = {
      get: createStoreGetter(this.edgeFunctionSettingsStore, 'edgeFunctionSettings'),
      onChange: callback => this.edgeFunctionSettingsStore.subscribe(store => callback(store.edgeFunctionSettings)),
      set: async value => {
        const {
          edgeFunctionSettings
        } = await this.edgeFunctionSettingsStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state.edgeFunctionSettings);
          } else {
            newState = Object.assign({}, state.edgeFunctionSettings, value);
          }
          return {
            edgeFunctionSettings: newState
          };
        });
        return edgeFunctionSettings;
      }
    };

    // Filters

    this.filtersStore = createStore(INITIAL_VALUES.filters, {
      persist: {
        storeId: `${this.storeId}-filters`,
        persistor: this.storePersistor,
        saveDelay: this.storePersistorSaveDelay,
        onInitialized: markAsReadyGenerator('hasRestoredFilters')
      }
    });
    this.filters = {
      get: createStoreGetter(this.filtersStore),
      onChange: callback => this.filtersStore.subscribe(store => callback(store)),
      set: async value => {
        const filters = await this.filtersStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state);
          } else {
            newState = {
              ...state,
              ...value
            };
          }
          return newState;
        });
        return filters;
      },
      add: (key, value) => {
        return this.filtersStore.dispatch(state => ({
          ...state,
          [key]: value
        }));
      }
    };

    // User Info Store

    this.userInfoStore = createStore({
      userInfo: INITIAL_VALUES.userInfo
    }, {
      persist: {
        storeId: `${this.storeId}-userInfo`,
        persistor: this.storePersistor,
        saveDelay: this.storePersistorSaveDelay,
        onInitialized: markAsReadyGenerator('hasRestoredUserInfo')
      }
    });
    this.userInfo = {
      get: createStoreGetter(this.userInfoStore, 'userInfo'),
      onChange: callback => this.userInfoStore.subscribe(store => callback(store.userInfo)),
      set: async value => {
        const {
          userInfo
        } = await this.userInfoStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state.userInfo);
          } else {
            newState = deepmerge(state.userInfo, value);
          }
          return {
            userInfo: newState
          };
        });
        return userInfo;
      }
    };

    // Pending Events
    this.pendingStore = createStore(INITIAL_VALUES.pendingEvents, {
      persist: {
        storeId: `${this.storeId}-pendingEvents`,
        persistor: this.storePersistor,
        saveDelay: this.storePersistorSaveDelay,
        onInitialized: markAsReadyGenerator('hasRestoredPendingEvents')
      }
    });
    this.pendingEvents = {
      get: createStoreGetter(this.pendingStore),
      onChange: callback => this.pendingStore.subscribe(store => callback(store)),
      set: async value => {
        return await this.pendingStore.dispatch(state => {
          let newState;
          if (value instanceof Function) {
            newState = value(state);
          } else {
            newState = [...value];
          }
          return newState;
        });
      },
      add: event => {
        return this.pendingStore.dispatch(events => [...events, event]);
      },
      remove: event => {
        return this.pendingStore.dispatch(events => events.filter(e => e.messageId != event.messageId));
      }
    };
    registerBridgeStore({
      store: this.userInfoStore,
      actions: {
        'add-anonymous-id': addAnonymousId
      }
    });
    this.deepLinkData = {
      get: createStoreGetter(this.deepLinkStore),
      onChange: callback => this.deepLinkStore.subscribe(callback)
    };
    this.fixAnonymousId();
  }

  /**
   * This is a fix for users that have started the app with the anonymousId set to 'anonymousId' bug
   */
  fixAnonymousId = () => {
    const fixUnsubscribe = this.userInfoStore.subscribe(store => {
      if (store.userInfo.anonymousId === 'anonymousId') {
        void this.userInfoStore.dispatch(state => {
          return {
            userInfo: {
              ...state.userInfo,
              anonymousId: getUUID()
            }
          };
        });
      }
      fixUnsubscribe();
    });
  };
}
//# sourceMappingURL=sovranStorage.js.map