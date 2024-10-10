import { NativeModule } from 'react-native';
import type { EventPlugin } from './plugin';
import type { Timeline } from './timeline';
export declare const warnMissingNativeModule: () => void;
export declare const getNativeModule: (moduleName: string) => NativeModule;
export declare const chunk: <T>(array: T[], count: number, maxKB?: number) => T[][];
export declare const getAllPlugins: (timeline: Timeline) => import("./plugin").Plugin[];
export declare const getPluginsWithFlush: (timeline: Timeline) => EventPlugin[];
export declare const getPluginsWithReset: (timeline: Timeline) => EventPlugin[];
type PromiseResult<T> = {
    status: 'fulfilled';
    value: T;
} | {
    status: 'rejected';
    reason: unknown;
};
export declare const allSettled: <T>(promises: (T | Promise<T>)[]) => Promise<PromiseResult<T>[]>;
export declare function isNumber(x: unknown): x is number;
export declare function isString(x: unknown): x is string;
export declare function isBoolean(x: unknown): x is boolean;
export declare function isDate(value: unknown): value is Date;
export declare function objectToString(value: object, json?: boolean): string | undefined;
export declare function unknownToString(value: unknown, stringifyJSON?: boolean, replaceNull?: string | undefined, replaceUndefined?: string | undefined): string | undefined;
/**
 * Checks if value is a dictionary like object
 * @param value unknown object
 * @returns typeguard, value is dicitonary
 */
export declare const isObject: (value: unknown) => value is Record<string, unknown>;
/**
 * Utility to deeply compare 2 objects
 * @param a unknown object
 * @param b unknown object
 * @returns true if both objects have the same keys and values
 */
export declare function deepCompare<T>(a: T, b: T): boolean;
export declare const createPromise: <T>(timeout?: number | undefined, _errorHandler?: (err: Error) => void) => {
    promise: Promise<T>;
    resolve: (value: T) => void;
};
export {};
//# sourceMappingURL=util.d.ts.map