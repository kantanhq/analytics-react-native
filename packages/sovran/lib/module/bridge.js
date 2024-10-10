const actionMap = {};
export const registerBridgeStore = (...stores) => {
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
export const onStoreAction = async (event, payload) => {
  if (actionMap[event] !== undefined && actionMap[event].length > 0) {
    const actions = actionMap[event];
    for (const action of actions) {
      await action.store.dispatch(action.actionCreator(payload));
    }
  }
};
//# sourceMappingURL=bridge.js.map