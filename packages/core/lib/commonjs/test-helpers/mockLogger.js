"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMockLogger = void 0;
var _logger = require("../logger");
const getMockLogger = () => {
  const logger = new _logger.Logger();
  logger.disable();
  logger.info = jest.fn();
  logger.warn = jest.fn();
  logger.error = jest.fn();
  return logger;
};
exports.getMockLogger = getMockLogger;
//# sourceMappingURL=mockLogger.js.map