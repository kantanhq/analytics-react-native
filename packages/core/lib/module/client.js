import React, { createContext, useContext } from 'react';
import { defaultConfig } from './constants';
import { createLogger } from './logger';
import { SegmentClient } from './analytics';
import { SovranStorage } from './storage';
export const createClient = config => {
  const logger = config?.logger || createLogger();
  if (typeof config?.debug === 'boolean') {
    if (config.debug) {
      logger.enable();
    } else {
      logger.disable();
    }
  }
  const clientConfig = {
    ...defaultConfig,
    ...config
  };
  const segmentStore = new SovranStorage({
    storeId: config.writeKey,
    storePersistor: config.storePersistor,
    storePersistorSaveDelay: config.storePersistorSaveDelay
  });
  const client = new SegmentClient({
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
const Context = /*#__PURE__*/createContext(null);
export const AnalyticsProvider = ({
  client,
  children
}) => {
  if (!client) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: client
  }, children);
};
export const useAnalytics = () => {
  const client = useContext(Context);
  return React.useMemo(() => {
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
//# sourceMappingURL=client.js.map