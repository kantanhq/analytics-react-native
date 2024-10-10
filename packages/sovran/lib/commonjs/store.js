"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;
var _persistor = require("./persistor");
var _deepmerge = _interopRequireDefault(require("deepmerge"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEFAULT_SAVE_STATE_DELAY_IN_MS = 1000;
const DEFAULT_STORE_NAME = 'default';

/**
 * Generic observable store
 */

/**
 * Creates a new observable for a particular type that manages all its subscribers
 * @returns {Observable<V>} observable object
 */
const createObservable = () => {
  const callbacks = [];
  const unsubscribe = callback => {
    callbacks.splice(callbacks.indexOf(callback), 1);
  };
  const subscribe = callback => {
    callbacks.push(callback);
    return () => {
      unsubscribe(callback);
    };
  };
  const notify = value => {
    for (const callback of [...callbacks]) {
      callback(value);
    }
  };
  return {
    subscribe,
    unsubscribe,
    notify
  };
};

// Type for the getState function, it is written as an interface to support overloading

/**
 * Sovran State Store
 */

/**
 * Creates a simple state store.
 * @param initialState initial store values
 * @param storeId store instance id
 * @returns {Store<T>} object
 */

/**
 * Creates a sovran state management store
 * @param initialState initial state of the store
 * @param config configuration options
 * @returns Sovran Store object
 */
const createStore = (initialState, config) => {
  let state = Array.isArray(initialState) ? [...initialState] : {
    ...initialState
  };
  const queue = [];
  const isPersisted = config?.persist !== undefined;
  let saveTimeout;
  const persistor = config?.persist?.persistor ?? _persistor.AsyncStoragePersistor;
  const storeId = isPersisted ? config.persist.storeId : DEFAULT_STORE_NAME;
  if (isPersisted) {
    persistor.get(storeId).then(async persistedState => {
      if (persistedState !== undefined && persistedState !== null && typeof persistedState === 'object') {
        const restoredState = await dispatch(oldState => {
          return (0, _deepmerge.default)(oldState, persistedState);
        });
        config?.persist?.onInitialized?.(restoredState);
      } else {
        const stateToSave = getState();
        await persistor.set(storeId, stateToSave);
        config?.persist?.onInitialized?.(stateToSave);
      }
    }).catch(reason => {
      console.warn(reason);
    });
  }
  const updatePersistor = state => {
    if (config === undefined) {
      return;
    }
    if (saveTimeout !== undefined) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
      void (async () => {
        try {
          saveTimeout = undefined;
          await persistor.set(storeId, state);
        } catch (error) {
          console.warn(error);
        }
      })();
    }, config.persist?.saveDelay ?? DEFAULT_SAVE_STATE_DELAY_IN_MS);
  };
  const observable = createObservable();
  const queueObserve = createObservable();
  function getState(safe) {
    if (safe !== true) {
      return Array.isArray(state) ? [...state] : {
        ...state
      };
    }
    return new Promise(resolve => {
      queue.push({
        call: state => {
          resolve(state);
          return state;
        }
      });
      queueObserve.notify(queue);
    });
  }
  const dispatch = async action => {
    return new Promise(resolve => {
      queue.push({
        call: action,
        finally: resolve
      });
      queueObserve.notify(queue);
    });
  };
  const processQueue = async () => {
    queueObserve.unsubscribe(processQueue);
    while (queue.length > 0) {
      const action = queue.shift();
      try {
        if (action !== undefined) {
          const newState = await action.call(state);
          if (newState !== state) {
            state = newState;
            // TODO: Debounce notifications
            observable.notify(state);
            if (isPersisted) {
              updatePersistor(state);
            }
          }
        }
      } catch {
        console.log('Promise not handled correctly');
      } finally {
        action?.finally?.(state);
      }
    }
    queueObserve.subscribe(processQueue);
    return state;
  };
  queueObserve.subscribe(processQueue);
  const subscribe = callback => {
    const unsubscribe = observable.subscribe(callback);
    return () => {
      unsubscribe();
    };
  };
  return {
    subscribe,
    dispatch,
    getState
  };
};
exports.createStore = createStore;
//# sourceMappingURL=store.js.map