"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnalytics = exports.createClient = exports.AnalyticsProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants");
var _logger = require("./logger");
var _analytics = require("./analytics");
var _storage = require("./storage");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createClient = config => {
  const logger = config?.logger || (0, _logger.createLogger)();
  if (typeof config?.debug === 'boolean') {
    if (config.debug) {
      logger.enable();
    } else {
      logger.disable();
    }
  }
  const clientConfig = {
    ..._constants.defaultConfig,
    ...config
  };
  const segmentStore = new _storage.SovranStorage({
    storeId: config.writeKey,
    storePersistor: config.storePersistor,
    storePersistorSaveDelay: config.storePersistorSaveDelay
  });
  const client = new _analytics.SegmentClient({
    config: clientConfig,
    logger,
    store: segmentStore
  });

  // We don't await the client to be initialized to let the user start attaching plugins and queueing events
  // The client will handle initialization in the background and send events when it is ready
  // To subscribe to the client being fully initialized use client.isReady.onChange()
  void client.init();
  return client;
};
exports.createClient = createClient;
const Context = /*#__PURE__*/(0, _react.createContext)(null);
const AnalyticsProvider = ({
  client,
  children
}) => {
  if (!client) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: client
  }, children);
};
exports.AnalyticsProvider = AnalyticsProvider;
const useAnalytics = () => {
  const client = (0, _react.useContext)(Context);
  return _react.default.useMemo(() => {
    if (!client) {
      console.error('Segment client not configured!', 'To use the useAnalytics() hook, pass an initialized Segment client into the AnalyticsProvider');
    }
    return {
      screen: async (...args) => client?.screen(...args),
      track: async (...args) => client?.track(...args),
      identify: async (...args) => client?.identify(...args),
      flush: async () => client?.flush(),
      group: async (...args) => client?.group(...args),
      alias: async (...args) => client?.alias(...args),
      reset: async (...args) => client?.reset(...args)
    };
  }, [client]);
};
exports.useAnalytics = useAnalytics;
//# sourceMappingURL=client.js.map