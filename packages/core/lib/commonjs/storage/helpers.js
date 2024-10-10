"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetter = createGetter;
/**
 * Helper to create a function that can execute both sync and async.
 * Used for supporting Sovran's getState signature. e.g.
 * - Async => enforces consistency by executing inline with the reducers
 * - Sync => returns immediately with the current value, not awaiting for any reducer
 * @param syncFunction code to execute when called synchronously
 * @param asyncFunction code to execute when called async/ concurrency safe
 * @returns a getStateFunc that can support both async and sync modes
 */
function createGetter(syncFunction, asyncFunction) {
  function getState(safe) {
    if (safe === true) {
      return asyncFunction();
    }
    return syncFunction();
  }
  return getState;
}
//# sourceMappingURL=helpers.js.map