export const createCallbackManager = () => {
  const callbacks = [];
  const deregister = callback => {
    callbacks.splice(callbacks.indexOf(callback), 1);
  };
  const register = callback => {
    callbacks.push(callback);
    return () => {
      deregister(callback);
    };
  };
  const run = value => {
    for (const callback of [...callbacks]) {
      callback(value);
    }
  };
  return {
    register,
    deregister,
    run
  };
};
//# sourceMappingURL=utils.js.map