"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueueFlushingPlugin = void 0;
var _sovranReactNative = require("@segment/sovran-react-native");
var _constants = require("../constants");
var _plugin = require("../plugin");
var _types = require("../types");
var _util = require("../util");
var _errors = require("../errors");
/**
 * This plugin manages a queue where all events get added to after timeline processing.
 * It takes a onFlush callback to trigger any action particular to your destination sending events.
 * It can autotrigger a flush of the queue when it reaches the config flushAt limit.
 */
class QueueFlushingPlugin extends _plugin.UtilityPlugin {
  // Gets executed last to keep the queue after all timeline processing is done
  type = _types.PluginType.after;
  isPendingUpload = false;
  timeoutWarned = false;

  /**
   * @param onFlush callback to execute when the queue is flushed (either by reaching the limit or manually) e.g. code to upload events to your destination
   * @param storeKey key to store the queue in the store. Must be unique per destination instance
   * @param restoreTimeout time in ms to wait for the queue to be restored from the store before uploading events (default: 500ms)
   */
  constructor(onFlush, storeKey = 'events', restoreTimeout = 1000) {
    super();
    this.onFlush = onFlush;
    this.storeKey = storeKey;
    const {
      promise,
      resolve
    } = (0, _util.createPromise)(restoreTimeout);
    this.isRestored = promise;
    this.isRestoredResolve = resolve;
  }
  configure(analytics) {
    super.configure(analytics);
    const config = analytics?.getConfig() ?? _constants.defaultConfig;

    // Create its own storage per SegmentDestination instance to support multiple instances
    this.queueStore = (0, _sovranReactNative.createStore)({
      events: []
    }, {
      persist: {
        storeId: `${config.writeKey}-${this.storeKey}`,
        persistor: config.storePersistor,
        saveDelay: config.storePersistorSaveDelay ?? 0,
        onInitialized: () => {
          this.isRestoredResolve();
        }
      }
    });
  }
  async execute(event) {
    await this.queueStore?.dispatch(state => {
      const events = [...state.events, event];
      return {
        events
      };
    });
    return event;
  }

  /**
   * Calls the onFlush callback with the events in the queue
   */
  async flush() {
    // Wait for the queue to be restored
    try {
      await this.isRestored;
      if (this.timeoutWarned === true) {
        this.analytics?.logger.info('Flush triggered successfully.');
        this.timeoutWarned = false;
      }
    } catch (e) {
      // If the queue is not restored before the timeout, we will notify but not block flushing events
      this.analytics?.reportInternalError(new _errors.SegmentError(_errors.ErrorType.InitializationError, 'Queue restoration timeout', e));
      if (this.timeoutWarned === false) {
        this.analytics?.logger.warn('Flush triggered but queue restoration and settings loading not complete. Flush will be retried.', e);
        this.timeoutWarned = true;
      }
    }
    const events = (await this.queueStore?.getState(true))?.events ?? [];
    if (!this.isPendingUpload) {
      try {
        this.isPendingUpload = true;
        await this.onFlush(events);
      } finally {
        this.isPendingUpload = false;
      }
    }
  }

  /**
   * Removes one or multiple events from the queue
   * @param events events to remove
   */
  async dequeue(events) {
    await this.queueStore?.dispatch(state => {
      const eventsToRemove = Array.isArray(events) ? events : [events];
      if (eventsToRemove.length === 0 || state.events.length === 0) {
        return state;
      }
      const setToRemove = new Set(eventsToRemove);
      const filteredEvents = state.events.filter(e => !setToRemove.has(e));
      return {
        events: filteredEvents
      };
    });
  }
}
exports.QueueFlushingPlugin = QueueFlushingPlugin;
//# sourceMappingURL=QueueFlushingPlugin.js.map