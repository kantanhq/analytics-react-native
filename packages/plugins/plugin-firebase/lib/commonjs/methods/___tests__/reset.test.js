"use strict";

var _reset = _interopRequireDefault(require("../reset"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mockReset = jest.fn();
jest.mock('@react-native-firebase/analytics', () => () => ({
  resetAnalyticsData: mockReset
}));
describe('#reset', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('forwards the reset event', async () => {
    await (0, _reset.default)();
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledWith();
  });
});
//# sourceMappingURL=reset.test.js.map