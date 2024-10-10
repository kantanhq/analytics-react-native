let AsyncStorage;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  AsyncStorage = null;
}
let hasShownWarning = false;
function warnIfMissingPackage() {
  if (AsyncStorage === null) {
    if (!hasShownWarning) {
      console.warn("Segment: Tried to access AsyncStoragePersistor but couldn't find package @react-native-async-storage/async-storage.\n\
        - Install '@react-native-async-storage/async-storage' to use the default persistence layer you need\n\
        - You might be missing the 'storePersistor' argument in your client configuration to use your own persistence layer\n\
        Execution will continue but no information will be persisted. This warning will only show once.");
      hasShownWarning = true;
    }
    return true;
  }
  return false;
}

/**
 * Persistor implementation using AsyncStorage
 */
export const AsyncStoragePersistor = {
  get: async key => {
    if (warnIfMissingPackage()) {
      return;
    }
    try {
      const persistedStateJSON = await AsyncStorage?.getItem?.(key);
      if (persistedStateJSON !== null && persistedStateJSON !== undefined) {
        return JSON.parse(persistedStateJSON);
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  },
  set: async (key, state) => {
    if (warnIfMissingPackage()) {
      return;
    }
    try {
      await AsyncStorage?.setItem?.(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }
};
//# sourceMappingURL=async-storage-persistor.js.map