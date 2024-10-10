/**
 * Error types reported through the errorHandler in the client
 */
export let ErrorType = /*#__PURE__*/function (ErrorType) {
  ErrorType[ErrorType["NetworkUnexpectedHTTPCode"] = 0] = "NetworkUnexpectedHTTPCode";
  ErrorType[ErrorType["NetworkServerLimited"] = 1] = "NetworkServerLimited";
  ErrorType[ErrorType["NetworkServerRejected"] = 2] = "NetworkServerRejected";
  ErrorType[ErrorType["NetworkUnknown"] = 3] = "NetworkUnknown";
  ErrorType[ErrorType["JsonUnableToSerialize"] = 4] = "JsonUnableToSerialize";
  ErrorType[ErrorType["JsonUnableToDeserialize"] = 5] = "JsonUnableToDeserialize";
  ErrorType[ErrorType["JsonUnknown"] = 6] = "JsonUnknown";
  ErrorType[ErrorType["PluginError"] = 7] = "PluginError";
  ErrorType[ErrorType["InitializationError"] = 8] = "InitializationError";
  ErrorType[ErrorType["ResetError"] = 9] = "ResetError";
  ErrorType[ErrorType["FlushError"] = 10] = "FlushError";
  return ErrorType;
}({});

/**
 * Segment Error object for ErrorHandler option
 */
export class SegmentError extends Error {
  constructor(type, message, innerError) {
    super(message);
    Object.setPrototypeOf(this, SegmentError.prototype);
    this.type = type;
    this.message = message;
    this.innerError = innerError;
  }
}

/**
 * Custom Error type for Segment HTTP Error responses
 */
export class NetworkError extends SegmentError {
  constructor(statusCode, message, innerError) {
    let type;
    if (statusCode === 429) {
      type = ErrorType.NetworkServerLimited;
    } else if (statusCode > 300 && statusCode < 400) {
      type = ErrorType.NetworkUnexpectedHTTPCode;
    } else if (statusCode >= 400) {
      type = ErrorType.NetworkServerRejected;
    } else {
      type = ErrorType.NetworkUnknown;
    }
    super(type, message, innerError);
    Object.setPrototypeOf(this, NetworkError.prototype);
    this.statusCode = statusCode;
    this.type = type;
  }
}

/**
 * Error type for JSON Serialization errors
 */
export class JSONError extends SegmentError {
  constructor(type, message, innerError) {
    super(type, message, innerError);
    Object.setPrototypeOf(this, JSONError.prototype);
  }
}

/**
 * Utility method for handling HTTP fetch errors
 * @param response Fetch Response
 * @returns response if status OK, throws NetworkError for everything else
 */
export const checkResponseForErrors = response => {
  if (!response.ok) {
    throw new NetworkError(response.status, response.statusText);
  }
  return response;
};

/**
 * Converts a .fetch() error to a SegmentError object for reporting to the error handler
 * @param error any JS error instance
 * @returns a SegmentError object
 */
export const translateHTTPError = error => {
  // SegmentError already
  if (error instanceof SegmentError) {
    return error;
    // JSON Deserialization Errors
  } else if (error instanceof SyntaxError) {
    return new JSONError(ErrorType.JsonUnableToDeserialize, error.message, error);

    // HTTP Errors
  } else {
    const message = error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error';
    return new NetworkError(-1, message, error);
  }
};
//# sourceMappingURL=errors.js.map