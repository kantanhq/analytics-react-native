"use strict";

var _screen = _interopRequireDefault(require("../screen"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mockScreen = jest.fn();
jest.mock('@react-native-firebase/analytics', () => () => ({
  logScreenView: mockScreen
}));
describe('#screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('forwards the screen event', async () => {
    const event = {
      type: 'screen',
      name: 'HomeScreen',
      anonymousId: 'anon',
      messageId: 'message-id',
      timestamp: '00000',
      properties: {}
    };
    await (0, _screen.default)(event);
    expect(mockScreen).toHaveBeenCalledTimes(1);
    expect(mockScreen).toHaveBeenCalledWith({
      screen_name: 'HomeScreen',
      screen_class: 'HomeScreen'
    });
  });
});
//# sourceMappingURL=screen.test.js.map