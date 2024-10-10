"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = exports.Logger = void 0;
class Logger {
  constructor(isDisabled = process.env.NODE_ENV === 'production') {
    this.isDisabled = isDisabled;
  }
  enable() {
    this.isDisabled = false;
  }
  disable() {
    this.isDisabled = true;
  }
  info(message, ...optionalParams) {
    if (!this.isDisabled) {
      console.info(message, ...optionalParams);
    }
  }
  warn(message, ...optionalParams) {
    if (!this.isDisabled) {
      console.warn(message, ...optionalParams);
    }
  }
  error(message, ...optionalParams) {
    if (!this.isDisabled) {
      console.error(message, ...optionalParams);
    }
  }
}
exports.Logger = Logger;
const createLogger = isDisabled => new Logger(isDisabled);
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map