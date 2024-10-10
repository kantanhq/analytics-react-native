"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapTransform = void 0;
var _util = require("./util");
/**
 * Generates a mapTransform function from a keymap and a transform map.
 * The resulting function can be called with any object/dictionary and return
 * a new object with key replacements and value transformations applied
 *
 * @param keyMap A dictionary of key mappings in format: ['OLD':'NEW']
 * @param transformMap A map of transformations by key (new key if the key was replaced)
 * @returns A function that maps keys from an object and transforms its values
 */
const generateMapTransform = (keyMap, transformMap) => {
  const mapTransform = json => {
    // Clone at top level
    const result = {};
    for (const key in json) {
      const newKey = keyMap[key] ?? key;
      let value = json[key];
      if (Array.isArray(value)) {
        value = value.map(nestedValue => {
          if ((0, _util.isObject)(nestedValue)) {
            return mapTransform(nestedValue);
          }
          return nestedValue;
        });
      } else if ((0, _util.isObject)(value)) {
        value = mapTransform(value);
      }
      if (newKey in transformMap) {
        value = transformMap[newKey](value);
      }
      result[newKey] = value;
    }
    return result;
  };
  return mapTransform;
};
exports.generateMapTransform = generateMapTransform;
//# sourceMappingURL=mapTransform.js.map