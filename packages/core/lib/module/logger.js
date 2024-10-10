export class Logger {
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
export const createLogger = isDisabled => new Logger(isDisabled);
//# sourceMappingURL=logger.js.map