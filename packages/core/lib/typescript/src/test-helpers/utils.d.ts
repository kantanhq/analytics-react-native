export declare const createCallbackManager: <V, R = void>() => {
    register: (callback: (value: V) => R) => () => void;
    deregister: (callback: (value: V) => R) => void;
    run: (value: V) => void;
};
//# sourceMappingURL=utils.d.ts.map