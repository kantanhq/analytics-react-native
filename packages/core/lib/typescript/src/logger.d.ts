import type { DeactivableLoggerType } from './types';
export declare class Logger implements DeactivableLoggerType {
    isDisabled: boolean;
    constructor(isDisabled?: boolean);
    enable(): void;
    disable(): void;
    info(message?: unknown, ...optionalParams: unknown[]): void;
    warn(message?: unknown, ...optionalParams: unknown[]): void;
    error(message?: unknown, ...optionalParams: unknown[]): void;
}
export declare const createLogger: (isDisabled?: boolean) => Logger;
//# sourceMappingURL=logger.d.ts.map