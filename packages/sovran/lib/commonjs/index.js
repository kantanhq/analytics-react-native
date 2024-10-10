"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  registerBridgeStore: true,
  createStore: true
};
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function () {
    return _store.createStore;
  }
});
Object.defineProperty(exports, "registerBridgeStore", {
  enumerable: true,
  get: function () {
    return _bridge.registerBridgeStore;
  }
});
var _reactNative = require("react-native");
var _bridge = require("./bridge");
var _store = require("./store");
var _persistor = require("./persistor");
Object.keys(_persistor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _persistor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _persistor[key];
    }
  });
});
const LINKING_ERROR = "The package 'sovran-react-native' doesn't seem to be linked. Make sure: \n\n" + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const Sovran = _reactNative.NativeModules.Sovran;
if (Sovran !== undefined && Sovran !== null) {
  const {
    ON_STORE_ACTION
  } = Sovran.getConstants?.() ?? {
    ON_STORE_ACTION: ''
  };
  const SovranBridge = new _reactNative.NativeEventEmitter(Sovran);

  // Listen to Native events
  SovranBridge.addListener(ON_STORE_ACTION, event => {
    void (async () => {
      try {
        await (0, _bridge.onStoreAction)(event.type, event.payload);
      } catch (error) {
        console.warn(error);
      }
    })();
  });
} else {
  console.warn(LINKING_ERROR);
}
//# sourceMappingURL=index.js.map