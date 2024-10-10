/**
 * Error types reported through the errorHandler in the client
 */
export declare enum ErrorType {
    NetworkUnexpectedHTTPCode = 0,
    NetworkServerLimited = 1,
    NetworkServerRejected = 2,
    NetworkUnknown = 3,
    JsonUnableToSerialize = 4,
    JsonUnableToDeserialize = 5,
    JsonUnknown = 6,
    PluginError = 7,
    InitializationError = 8,
    ResetError = 9,
    FlushError = 10
}
/**
 * Segment Error object for ErrorHandler option
 */
export declare class SegmentError extends Error {
    type: ErrorType;
    message: string;
    innerError?: unknown;
    constructor(type: ErrorType, message: string, innerError?: unknown);
}
/**
 * Custom Error type for Segment HTTP Error responses
 */
export declare class NetworkError extends SegmentError {
    statusCode: number;
    type: ErrorType.NetworkServerLimited | ErrorType.NetworkServerRejected | ErrorType.NetworkUnexpectedHTTPCode | ErrorType.NetworkUnknown;
    constructor(statusCode: number, message: string, innerError?: unknown);
}
/**
 * Error type for JSON Serialization errors
 */
export declare class JSONError extends SegmentError {
    constructor(type: ErrorType.JsonUnableToDeserialize | ErrorType.JsonUnableToSerialize, message: string, innerError?: unknown);
}
/**
 * Utility method for handling HTTP fetch errors
 * @param response Fetch Response
 * @returns response if status OK, throws NetworkError for everything else
 */
export declare const checkResponseForErrors: (response: Response) => Response;
/**
 * Converts a .fetch() error to a SegmentError object for reporting to the error handler
 * @param error any JS error instance
 * @returns a SegmentError object
 */
export declare const translateHTTPError: (error: unknown) => SegmentError;
//# sourceMappingURL=errors.d.ts.map