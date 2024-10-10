"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBridgeStore = exports.onStoreAction = void 0;
const actionMap = {};
const registerBridgeStore = (...stores) => {
  for (const store of stores) {
    for (const [key, actionCreator] of Object.entries(store.actions)) {
      if (actionMap[key] === undefined) {
        actionMap[key] = [];
      }
      actionMap[key].push({
        key,
        store: store.store,
        actionCreator: actionCreator
      });
    }
  }
};
exports.registerBridgeStore = registerBridgeStore;
const onStoreAction = async (event, payload) => {
  if (actionMap[event] !== undefined && actionMap[event].length > 0) {
    const actions = actionMap[event];
    for (const action of actions) {
      await action.store.dispatch(action.actionCreator(payload));
    }
  }
};
exports.onStoreAction = onStoreAction;
//# sourceMappingURL=bridge.js.map