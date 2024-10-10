"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundFlushPolicy = void 0;
var _reactNative = require("react-native");
var _types = require("./types");
/**
 * StatupFlushPolicy triggers a flush right away on client startup
 */
class BackgroundFlushPolicy extends _types.FlushPolicyBase {
  appState = _reactNative.AppState.currentState;
  start() {
    this.appStateSubscription = _reactNative.AppState.addEventListener('change', nextAppState => {
      if (this.appState === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        // When the app goes into the background we will trigger a flush
        this.shouldFlush.value = true;
      }
    });
  }
  onEvent(_event) {
    // Nothing to do
  }
  end() {
    this.appStateSubscription?.remove();
  }
}
exports.BackgroundFlushPolicy = BackgroundFlushPolicy;
//# sourceMappingURL=background-flush-policy.js.map