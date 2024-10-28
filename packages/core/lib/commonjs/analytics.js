"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentClient = void 0;
var _deepmerge = _interopRequireDefault(require("deepmerge"));
var _reactNative = require("react-native");
var _constants = require("./constants");
var _context = require("./context");
var _events = require("./events");
var _flushPolicies = require("./flushPolicies");
var _flushPolicyExecuter = require("./flushPolicies/flush-policy-executer");
var _SegmentDestination = require("./plugins/SegmentDestination");
var _storage = require("./storage");
var _timeline = require("./timeline");
var _types = require("./types");
var _util = require("./util");
var _uuid = require("./uuid");
var _errors = require("./errors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SegmentClient {
  // the config parameters for the client - a merge of user provided and default options

  // Storage

  // current app state
  appState = 'unknown';

  // subscription for propagating changes to appState

  // logger

  // whether the user has called cleanup
  destroyed = false;
  isAddingPlugins = false;
  pluginsToAdd = [];
  flushPolicyExecuter = new _flushPolicyExecuter.FlushPolicyExecuter([], () => {
    void this.flush();
  });
  onPluginAddedObservers = [];
  platformPlugins = [];

  // Watchables
  /**
   * Observable to know when the client is fully initialized and ready to send events to destination
   */
  isReady = new _flushPolicies.Observable(false);
  /**
   * Access or subscribe to client context
   */

  /**
   * Access or subscribe to adTrackingEnabled (also accesible from context)
   */

  /**
   * Access or subscribe to integration settings
   */

  /**
   * Access or subscribe to integration settings
   */

  /**
   * Access or subscribe to edge functions settings
   */

  /**
   * Access or subscribe to destination filter settings
   */

  /**
   * Access or subscribe to user info (anonymousId, userId, traits)
   */

  // private telemetry?: Telemetry;

  /**
   * Returns the plugins currently loaded in the timeline
   * @param ofType Type of plugins, defaults to all
   * @returns List of Plugin objects
   */
  getPlugins(ofType) {
    const plugins = {
      ...this.timeline.plugins
    };
    if (ofType !== undefined) {
      return [...(plugins[ofType] ?? [])];
    }
    return [...this.getPlugins(_types.PluginType.before), ...this.getPlugins(_types.PluginType.enrichment), ...this.getPlugins(_types.PluginType.utility), ...this.getPlugins(_types.PluginType.destination), ...this.getPlugins(_types.PluginType.after)] ?? [];
  }

  /**
   * Retrieves a copy of the current client configuration
   */
  getConfig() {
    return {
      ...this.config
    };
  }
  constructor({
    config,
    logger,
    store
  }) {
    this.logger = logger;
    this.config = config;
    this.store = store;
    this.timeline = new _timeline.Timeline();

    // Initialize the watchables
    this.context = {
      get: this.store.context.get,
      set: this.store.context.set,
      onChange: this.store.context.onChange
    };
    this.adTrackingEnabled = {
      get: (0, _storage.createGetter)(() => this.store.context.get()?.device?.adTrackingEnabled ?? false, async () => {
        const context = await this.store.context.get(true);
        return context?.device?.adTrackingEnabled ?? false;
      }),
      onChange: callback => this.store.context.onChange(context => {
        callback(context?.device?.adTrackingEnabled ?? false);
      })
    };
    this.settings = {
      get: this.store.settings.get,
      onChange: this.store.settings.onChange
    };
    this.consentSettings = {
      get: this.store.consentSettings.get,
      onChange: this.store.consentSettings.onChange
    };
    this.edgeFunctionSettings = {
      get: this.store.edgeFunctionSettings.get,
      onChange: this.store.edgeFunctionSettings.onChange
    };
    this.filters = {
      get: this.store.filters.get,
      onChange: this.store.filters.onChange
    };
    this.userInfo = {
      get: this.store.userInfo.get,
      set: this.store.userInfo.set,
      onChange: this.store.userInfo.onChange
    };
    this.deepLinkData = {
      get: this.store.deepLinkData.get,
      onChange: this.store.deepLinkData.onChange
    };

    // add segment destination plugin unless
    // asked not to via configuration.
    if (this.config.autoAddSegmentDestination === true) {
      const segmentDestination = new _SegmentDestination.SegmentDestination();
      this.add({
        plugin: segmentDestination
      });
    }

    // Setup platform specific plugins
    this.platformPlugins.forEach(plugin => this.add({
      plugin: plugin
    }));

    // set up tracking for lifecycle events
    this.setupLifecycleEvents();
  }

  // Watch for isReady so that we can handle any pending events
  async storageReady() {
    return new Promise(resolve => {
      this.store.isReady.onChange(value => {
        resolve(value);
      });
    });
  }

  /**
   * Initializes the client plugins, settings and subscribers.
   * Can only be called once.
   */
  async init() {
    try {
      if (this.isReady.value) {
        this.logger.warn('SegmentClient already initialized');
        return;
      }
      if ((await this.store.isReady.get(true)) === false) {
        await this.storageReady();
      }

      // Get new settings from segment
      // It's important to run this before checkInstalledVersion and trackDeeplinks to give time for destination plugins
      // which make use of the settings object to initialize
      await this.fetchSettings();
      await (0, _util.allSettled)([
      // save the current installed version
      this.checkInstalledVersion(),
      // check if the app was opened from a deep link
      this.trackDeepLinks()]);
      await this.onReady();
      this.isReady.value = true;
    } catch (error) {
      this.reportInternalError(new _errors.SegmentError(_errors.ErrorType.InitializationError, 'Client did not initialize correctly', error));
    }
  }
  generateFiltersMap(rules) {
    const map = {};
    for (const r of rules) {
      const key = r.destinationName ?? _constants.workspaceDestinationFilterKey;
      map[key] = r;
    }
    return map;
  }
  async fetchSettings() {
    const settingsPrefix = this.config.cdnProxy ?? _constants.settingsCDN;
    const settingsEndpoint = `${settingsPrefix}/${this.config.writeKey}/settings`;
    try {
      const res = await fetch(settingsEndpoint, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      (0, _errors.checkResponseForErrors)(res);
      const resJson = await res.json();
      const integrations = resJson.integrations;
      const consentSettings = resJson.consentSettings;
      const edgeFunctionSettings = resJson.edgeFunction;
      const filters = this.generateFiltersMap(resJson.middlewareSettings?.routingRules ?? []);
      this.logger.info('Received settings from Segment succesfully.');
      await Promise.all([this.store.settings.set(integrations), this.store.consentSettings.set(consentSettings), this.store.edgeFunctionSettings.set(edgeFunctionSettings), this.store.filters.set(filters)]);
    } catch (e) {
      this.reportInternalError((0, _errors.translateHTTPError)(e));
      this.logger.warn(`Could not receive settings from Segment. ${this.config.defaultSettings ? 'Will use the default settings.' : 'Device mode destinations will be ignored unless you specify default settings in the client config.'}`);
      if (this.config.defaultSettings) {
        await this.store.settings.set(this.config.defaultSettings.integrations);
      }
    }
  }

  /**
   * There is no garbage collection in JS, which means that any listeners, timeouts and subscriptions
   * would run until the application closes
   *
   * This method exists in case the user for some reason needs to recreate the class instance during runtime.
   * In this case, they should run client.cleanup() to destroy the listeners in the old client before creating a new one.
   *
   * There is a Stage 3 EMCAScript proposal to add a user-defined finalizer, which we could potentially switch to if
   * it gets approved: https://github.com/tc39/proposal-weakrefs#finalizers
   */
  cleanup() {
    this.flushPolicyExecuter.cleanup();
    this.appStateSubscription?.remove();
    this.destroyed = true;
  }
  setupLifecycleEvents() {
    this.appStateSubscription?.remove();
    this.appStateSubscription = _reactNative.AppState.addEventListener('change', nextAppState => {
      this.handleAppStateChange(nextAppState);
    });
  }

  /**
     Applies the supplied closure to the currently loaded set of plugins.
     NOTE: This does not apply to plugins contained within DestinationPlugins.
      - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
   */
  apply(closure) {
    this.timeline.apply(closure);
  }

  /**
   * Adds a new plugin to the currently loaded set.
   * @param {{ plugin: Plugin, settings?: IntegrationSettings }} Plugin to be added. Settings are optional if you want to force a configuration instead of the Segment Cloud received one
   */
  add({
    plugin,
    settings
  }) {
    // plugins can either be added immediately or
    // can be cached and added later during the next state update
    // this is to avoid adding plugins before network requests made as part of setup have resolved
    if (settings !== undefined && plugin.type === _types.PluginType.destination) {
      void this.store.settings.add(plugin.key, settings);
    }
    if (!this.isReady.value) {
      this.pluginsToAdd.push(plugin);
    } else {
      this.addPlugin(plugin);
    }
  }
  addPlugin(plugin) {
    plugin.configure(this);
    this.timeline.add(plugin);
    this.triggerOnPluginLoaded(plugin);
  }

  /**
     Removes and unloads plugins with a matching name from the system.
      - Parameter pluginName: An plugin name.
  */
  remove({
    plugin
  }) {
    this.timeline.remove(plugin);
  }
  async process(incomingEvent, enrichment) {
    const event = this.applyRawEventData(incomingEvent);
    event.enrichment = enrichment;
    if (this.isReady.value) {
      return this.startTimelineProcessing(event);
    } else {
      this.store.pendingEvents.add(event);
      return event;
    }
  }

  /**
   * Starts timeline processing
   * @param incomingEvent Segment Event
   * @returns Segment Event
   */
  async startTimelineProcessing(incomingEvent) {
    const event = await this.applyContextData(incomingEvent);
    this.flushPolicyExecuter.notify(event);
    return this.timeline.process(event);
  }
  async trackDeepLinks() {
    if (this.getConfig().trackDeepLinks === true) {
      const deepLinkProperties = await this.store.deepLinkData.get(true);
      this.trackDeepLinkEvent(deepLinkProperties);
      this.store.deepLinkData.onChange(data => {
        this.trackDeepLinkEvent(data);
      });
    }
  }
  trackDeepLinkEvent(deepLinkProperties) {
    if (deepLinkProperties.url !== '') {
      const event = (0, _events.createTrackEvent)({
        event: 'Deep Link Opened',
        properties: {
          ...deepLinkProperties
        }
      });
      void this.process(event);
      this.logger.info('TRACK (Deep Link Opened) event saved', event);
    }
  }

  /**
   * Executes when everything in the client is ready for sending events
   * @param isReady
   */
  async onReady() {
    // Add all plugins awaiting store
    if (this.pluginsToAdd.length > 0 && !this.isAddingPlugins) {
      this.isAddingPlugins = true;
      try {
        // start by adding the plugins
        this.pluginsToAdd.forEach(plugin => {
          this.addPlugin(plugin);
        });

        // now that they're all added, clear the cache
        // this prevents this block running for every update
        this.pluginsToAdd = [];
      } finally {
        this.isAddingPlugins = false;
      }
    }

    // Start flush policies
    // This should be done before any pending events are added to the queue so that any policies that rely on events queued can trigger accordingly
    this.setupFlushPolicies();

    // Send all events in the queue
    const pending = await this.store.pendingEvents.get(true);
    for (const e of pending) {
      await this.startTimelineProcessing(e);
      await this.store.pendingEvents.remove(e);
    }
    this.flushPolicyExecuter.manualFlush();
  }
  async flush() {
    try {
      if (this.destroyed) {
        return;
      }
      this.flushPolicyExecuter.reset();
      const promises = [];
      (0, _util.getPluginsWithFlush)(this.timeline).forEach(plugin => {
        promises.push(plugin.flush());
      });
      const results = await (0, _util.allSettled)(promises);
      for (const r of results) {
        if (r.status === 'rejected') {
          this.reportInternalError(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          new _errors.SegmentError(_errors.ErrorType.FlushError, `Flush failed: ${r.reason}`));
        }
      }
    } catch (error) {
      this.reportInternalError(new _errors.SegmentError(_errors.ErrorType.FlushError, 'Flush failed', error));
    }
  }
  async screen(name, options, enrichment) {
    const event = (0, _events.createScreenEvent)({
      name,
      properties: options
    });
    await this.process(event, enrichment);
    this.logger.info('SCREEN event saved', event);
  }
  async track(eventName, options, enrichment) {
    const event = (0, _events.createTrackEvent)({
      event: eventName,
      properties: options
    });
    await this.process(event, enrichment);
    this.logger.info('TRACK event saved', event);
  }
  async identify(userId, userTraits, enrichment) {
    const event = (0, _events.createIdentifyEvent)({
      userId: userId,
      userTraits: userTraits
    });
    await this.process(event, enrichment);
    this.logger.info('IDENTIFY event saved', event);
  }
  async group(groupId, groupTraits, enrichment) {
    const event = (0, _events.createGroupEvent)({
      groupId,
      groupTraits
    });
    await this.process(event, enrichment);
    this.logger.info('GROUP event saved', event);
  }
  async alias(newUserId, enrichment) {
    // We don't use a concurrency safe version of get here as we don't want to lock the values yet,
    // we will update the values correctly when InjectUserInfo processes the change
    const {
      anonymousId,
      userId: previousUserId
    } = this.store.userInfo.get();
    const event = (0, _events.createAliasEvent)({
      anonymousId,
      userId: previousUserId,
      newUserId
    });
    await this.process(event, enrichment);
    this.logger.info('ALIAS event saved', event);
  }

  /**
   * Called once when the client is first created
   *
   * Detect and save the the currently installed application version
   * Send application lifecycle events if trackAppLifecycleEvents is enabled
   *
   * Exactly one of these events will be sent, depending on the current and previous version:s
   * Application Installed - no information on the previous version, so it's a fresh install
   * Application Updated - the previous detected version is different from the current version
   * Application Opened - the previously detected version is same as the current version
   */
  async checkInstalledVersion() {
    const context = await (0, _context.getContext)(undefined, this.config);
    const previousContext = this.store.context.get();

    // Only overwrite the previous context values to preserve any values that are added by enrichment plugins like IDFA
    await this.store.context.set((0, _deepmerge.default)(previousContext ?? {}, context));
    if (this.config.trackAppLifecycleEvents !== true) {
      return;
    }
    if (previousContext?.app === undefined) {
      const event = (0, _events.createTrackEvent)({
        event: 'Application Installed',
        properties: {
          version: context.app.version,
          build: context.app.build
        }
      });
      void this.process(event);
      this.logger.info('TRACK (Application Installed) event saved', event);
    } else if (context.app.version !== previousContext.app.version) {
      const event = (0, _events.createTrackEvent)({
        event: 'Application Updated',
        properties: {
          version: context.app.version,
          build: context.app.build,
          previous_version: previousContext.app.version,
          previous_build: previousContext.app.build
        }
      });
      void this.process(event);
      this.logger.info('TRACK (Application Updated) event saved', event);
    }
    const event = (0, _events.createTrackEvent)({
      event: 'Application Opened',
      properties: {
        from_background: false,
        version: context.app.version,
        build: context.app.build
      }
    });
    void this.process(event);
    this.logger.info('TRACK (Application Opened) event saved', event);
  }

  /**
   * AppState event listener. Called whenever the app state changes.
   *
   * Send application lifecycle events if trackAppLifecycleEvents is enabled.
   *
   * Application Opened - only when the app state changes from 'inactive' or 'background' to 'active'
   *   The initial event from 'unknown' to 'active' is handled on launch in checkInstalledVersion
   * Application Backgrounded - when the app state changes from 'inactive' or 'background' to 'active
   *
   * @param nextAppState 'active', 'inactive', 'background' or 'unknown'
   */
  handleAppStateChange(nextAppState) {
    if (this.config.trackAppLifecycleEvents === true) {
      if (['inactive', 'background'].includes(this.appState) && nextAppState === 'active') {
        const context = this.store.context.get();
        const event = (0, _events.createTrackEvent)({
          event: 'Application Opened',
          properties: {
            from_background: true,
            version: context?.app?.version,
            build: context?.app?.build
          }
        });
        void this.process(event);
        this.logger.info('TRACK (Application Opened) event saved', event);
      } else if (this.appState === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        const event = (0, _events.createTrackEvent)({
          event: 'Application Backgrounded'
        });
        void this.process(event);
        this.logger.info('TRACK (Application Backgrounded) event saved', event);
      }
    }
    this.appState = nextAppState;
  }
  async reset(resetAnonymousId = true) {
    try {
      const {
        anonymousId: currentId
      } = await this.store.userInfo.get(true);
      const anonymousId = resetAnonymousId === true ? (0, _uuid.getUUID)() : currentId;
      await this.store.userInfo.set({
        anonymousId,
        userId: undefined,
        traits: undefined
      });
      await (0, _util.allSettled)((0, _util.getPluginsWithReset)(this.timeline).map(plugin => plugin.reset()));
      this.logger.info('Client has been reset');
    } catch (error) {
      this.reportInternalError(new _errors.SegmentError(_errors.ErrorType.ResetError, 'Error during reset', error));
    }
  }

  /**
   * Registers a callback for each plugin that gets added to the analytics client.
   * @param callback Function to call
   */
  onPluginLoaded(callback) {
    const i = this.onPluginAddedObservers.push(callback);
    return () => {
      this.onPluginAddedObservers.splice(i, 1);
    };
  }
  triggerOnPluginLoaded(plugin) {
    this.onPluginAddedObservers.map(f => f?.(plugin));
  }

  /**
   * Initializes the flush policies from config and subscribes to updates to
   * trigger flush
   */
  setupFlushPolicies() {
    const flushPolicies = [];

    // If there are zero policies or flushAt/flushInterval use the defaults:
    if (this.config.flushPolicies !== undefined) {
      flushPolicies.push(...this.config.flushPolicies);
    } else {
      if (this.config.flushAt === undefined || this.config.flushAt !== null && this.config.flushAt > 0) {
        flushPolicies.push(new _flushPolicies.CountFlushPolicy(this.config.flushAt ?? _constants.defaultFlushAt));
      }
      if (this.config.flushInterval === undefined || this.config.flushInterval !== null && this.config.flushInterval > 0) {
        flushPolicies.push(new _flushPolicies.TimerFlushPolicy((this.config.flushInterval ?? _constants.defaultFlushInterval) * 1000));
      }
    }
    for (const fp of flushPolicies) {
      this.flushPolicyExecuter.add(fp);
    }
  }

  /**
   * Adds a FlushPolicy to the list
   * @param policies policies to add
   */
  addFlushPolicy(...policies) {
    for (const policy of policies) {
      this.flushPolicyExecuter.add(policy);
    }
  }

  /**
   * Removes a FlushPolicy from the execution
   *
   * @param policies policies to remove
   * @returns true if the value was removed, false if not found
   */
  removeFlushPolicy(...policies) {
    for (const policy of policies) {
      this.flushPolicyExecuter.remove(policy);
    }
  }

  /**
   * Returns the current enabled flush policies
   */
  getFlushPolicies() {
    return this.flushPolicyExecuter.policies;
  }
  reportInternalError(error, fatal = false) {
    if (fatal) {
      this.logger.error('A critical error ocurred: ', error);
    } else {
      this.logger.warn('An internal error occurred: ', error);
    }
    this.config.errorHandler?.(error);
  }

  /**
   * Sets the messageId and timestamp
   * @param event Segment Event
   * @returns event with data injected
   */
  applyRawEventData = event => {
    return {
      ...event,
      messageId: (0, _uuid.getUUID)(),
      timestamp: new Date().toISOString(),
      integrations: event.integrations ?? {}
    };
  };

  /**
   * Injects context and userInfo data into the event
   * This is handled outside of the timeline to prevent concurrency issues between plugins
   * This is only added after the client is ready to let the client restore values from storage
   * @param event Segment Event
   * @returns event with data injected
   */
  applyContextData = async event => {
    const userInfo = await this.processUserInfo(event);
    const context = await this.context.get(true);
    return {
      ...event,
      ...userInfo,
      context: {
        ...event.context,
        ...context
      }
    };
  };

  /**
   * Processes the userInfo to add to an event.
   * For Identify and Alias: it saves the new userId and traits into the storage
   * For all: set the userId and anonymousId from the current values
   * @param event segment event
   * @returns userInfo to inject to an event
   */
  processUserInfo = async event => {
    // Order here is IMPORTANT!
    // Identify and Alias userInfo set operations have to come as soon as possible
    // Do not block the set by doing a safe get first as it might cause a race condition
    // within events procesing in the timeline asyncronously
    if (event.type === _types.EventType.IdentifyEvent) {
      const userInfo = await this.userInfo.set(state => ({
        ...state,
        userId: event.userId ?? state.userId,
        traits: {
          ...state.traits,
          ...event.traits
        }
      }));
      return {
        anonymousId: userInfo.anonymousId,
        userId: event.userId ?? userInfo.userId,
        traits: {
          ...userInfo.traits,
          ...event.traits
        }
      };
    } else if (event.type === _types.EventType.AliasEvent) {
      let previousUserId;
      const userInfo = await this.userInfo.set(state => {
        previousUserId = state.userId ?? state.anonymousId;
        return {
          ...state,
          userId: event.userId
        };
      });
      return {
        anonymousId: userInfo.anonymousId,
        userId: event.userId,
        previousId: previousUserId
      };
    }
    const userInfo = await this.userInfo.get(true);
    return {
      anonymousId: userInfo.anonymousId,
      userId: userInfo.userId
    };
  };
}
exports.SegmentClient = SegmentClient;
//# sourceMappingURL=analytics.js.map