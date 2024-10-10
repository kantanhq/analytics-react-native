"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPromise = exports.chunk = exports.allSettled = void 0;
exports.deepCompare = deepCompare;
exports.getPluginsWithReset = exports.getPluginsWithFlush = exports.getNativeModule = exports.getAllPlugins = void 0;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isNumber = isNumber;
exports.isObject = void 0;
exports.isString = isString;
exports.objectToString = objectToString;
exports.unknownToString = unknownToString;
exports.warnMissingNativeModule = void 0;
var _reactNative = require("react-native");
const sizeOf = obj => {
  const size = encodeURI(JSON.stringify(obj)).split(/%..|./).length - 1;
  return size / 1024;
};
const warnMissingNativeModule = () => {
  const MISSING_NATIVE_MODULE_WARNING = "The package 'analytics-react-native' can't access a custom native module. Make sure: \n\n" + _reactNative.Platform.select({
    ios: "- You have run 'pod install'\n",
    default: ''
  }) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
  console.warn(MISSING_NATIVE_MODULE_WARNING);
};
exports.warnMissingNativeModule = warnMissingNativeModule;
const getNativeModule = moduleName => {
  const module = _reactNative.NativeModules[moduleName] ?? undefined;
  if (module === undefined) {
    warnMissingNativeModule();
  }
  return module;
};
exports.getNativeModule = getNativeModule;
const chunk = (array, count, maxKB) => {
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
exports.chunk = chunk;
const getAllPlugins = timeline => {
  const allPlugins = Object.values(timeline.plugins);
  if (allPlugins.length) {
    return allPlugins.reduce((prev = [], curr = []) => prev.concat(curr));
  }
  return [];
};
exports.getAllPlugins = getAllPlugins;
const getPluginsWithFlush = timeline => {
  const allPlugins = getAllPlugins(timeline);

  // checking for the existence of .flush()
  const eventPlugins = allPlugins?.filter(f => f.flush !== undefined);
  return eventPlugins;
};
exports.getPluginsWithFlush = getPluginsWithFlush;
const getPluginsWithReset = timeline => {
  const allPlugins = getAllPlugins(timeline);

  // checking for the existence of .reset()
  const eventPlugins = allPlugins?.filter(f => f.reset !== undefined);
  return eventPlugins;
};
exports.getPluginsWithReset = getPluginsWithReset;
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
const allSettled = async promises => {
  return Promise.all(promises.map(settlePromise));
};
exports.allSettled = allSettled;
function isNumber(x) {
  return typeof x === 'number';
}
function isString(x) {
  return typeof x === 'string';
}
function isBoolean(x) {
  return typeof x === 'boolean';
}
function isDate(value) {
  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}
function objectToString(value, json = true) {
  // If the object has a custom toString we well use that
  if (value.toString !== Object.prototype.toString) {
    return value.toString();
  }
  if (json) {
    return JSON.stringify(value);
  }
  return undefined;
}
function unknownToString(value, stringifyJSON = true, replaceNull = '', replaceUndefined = '') {
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
const isObject = value => value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);

/**
 * Utility to deeply compare 2 objects
 * @param a unknown object
 * @param b unknown object
 * @returns true if both objects have the same keys and values
 */
exports.isObject = isObject;
function deepCompare(a, b) {
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
const createPromise = (timeout = undefined, _errorHandler = _ => {
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
exports.createPromise = createPromise;
//# sourceMappingURL=util.js.map