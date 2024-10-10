import { NativeModules, Platform } from 'react-native';
const sizeOf = obj => {
  const size = encodeURI(JSON.stringify(obj)).split(/%..|./).length - 1;
  return size / 1024;
};
export const warnMissingNativeModule = () => {
  const MISSING_NATIVE_MODULE_WARNING = "The package 'analytics-react-native' can't access a custom native module. Make sure: \n\n" + Platform.select({
    ios: "- You have run 'pod install'\n",
    default: ''
  }) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
  console.warn(MISSING_NATIVE_MODULE_WARNING);
};
export const getNativeModule = moduleName => {
  const module = NativeModules[moduleName] ?? undefined;
  if (module === undefined) {
    warnMissingNativeModule();
  }
  return module;
};
export const chunk = (array, count, maxKB) => {
  if (!array.length || !count) {
    return [];
  }
  let currentChunk = 0;
  let rollingKBSize = 0;
  const result = array.reduce((chunks, item, index) => {
    if (maxKB !== undefined) {
      rollingKBSize += sizeOf(item);
      // If we overflow chunk until the previous index, else keep going
      if (rollingKBSize >= maxKB) {
        chunks[++currentChunk] = [item];
        return chunks;
      }
    }
    if (index !== 0 && index % count === 0) {
      chunks[++currentChunk] = [item];
    } else {
      if (chunks[currentChunk] === undefined) {
        chunks[currentChunk] = [];
      }
      chunks[currentChunk].push(item);
    }
    return chunks;
  }, []);
  return result;
};
export const getAllPlugins = timeline => {
  const allPlugins = Object.values(timeline.plugins);
  if (allPlugins.length) {
    return allPlugins.reduce((prev = [], curr = []) => prev.concat(curr));
  }
  return [];
};
export const getPluginsWithFlush = timeline => {
  const allPlugins = getAllPlugins(timeline);

  // checking for the existence of .flush()
  const eventPlugins = allPlugins?.filter(f => f.flush !== undefined);
  return eventPlugins;
};
export const getPluginsWithReset = timeline => {
  const allPlugins = getAllPlugins(timeline);

  // checking for the existence of .reset()
  const eventPlugins = allPlugins?.filter(f => f.reset !== undefined);
  return eventPlugins;
};
const settlePromise = async promise => {
  try {
    const result = await promise;
    return {
      status: 'fulfilled',
      value: result
    };
  } catch (error) {
    return {
      status: 'rejected',
      reason: error
    };
  }
};
export const allSettled = async promises => {
  return Promise.all(promises.map(settlePromise));
};
export function isNumber(x) {
  return typeof x === 'number';
}
export function isString(x) {
  return typeof x === 'string';
}
export function isBoolean(x) {
  return typeof x === 'boolean';
}
export function isDate(value) {
  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}
export function objectToString(value, json = true) {
  // If the object has a custom toString we well use that
  if (value.toString !== Object.prototype.toString) {
    return value.toString();
  }
  if (json) {
    return JSON.stringify(value);
  }
  return undefined;
}
export function unknownToString(value, stringifyJSON = true, replaceNull = '', replaceUndefined = '') {
  if (value === null) {
    if (replaceNull !== undefined) {
      return replaceNull;
    } else {
      return undefined;
    }
  }
  if (value === undefined) {
    if (replaceUndefined !== undefined) {
      return replaceUndefined;
    } else {
      return undefined;
    }
  }
  if (isNumber(value) || isBoolean(value) || isString(value)) {
    return value.toString();
  }
  if (isObject(value)) {
    return objectToString(value, stringifyJSON);
  }
  if (stringifyJSON) {
    return JSON.stringify(value);
  }
  return undefined;
}

/**
 * Checks if value is a dictionary like object
 * @param value unknown object
 * @returns typeguard, value is dicitonary
 */
export const isObject = value => value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);

/**
 * Utility to deeply compare 2 objects
 * @param a unknown object
 * @param b unknown object
 * @returns true if both objects have the same keys and values
 */
export function deepCompare(a, b) {
  // Shallow compare first, just in case
  if (a === b) {
    return true;
  }

  // If not objects then compare values directly
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepCompare(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
export const createPromise = (timeout = undefined, _errorHandler = _ => {
  //
}) => {
  let resolver;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    if (timeout !== undefined) {
      setTimeout(() => {
        reject(new Error('Promise timed out'));
      }, timeout);
    }
  });
  promise.catch(_errorHandler);
  return {
    promise: promise,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolve: resolver
  };
};
//# sourceMappingURL=util.js.map