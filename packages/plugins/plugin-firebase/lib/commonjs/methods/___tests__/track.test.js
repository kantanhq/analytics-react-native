"use strict";

var _analyticsReactNative = require("@segment/analytics-react-native");
var _track = _interopRequireDefault(require("../track"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
jest.mock('uuid');
const mockLogEvent = jest.fn();
jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: mockLogEvent
}));
describe('#track', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('forwards a track event with name only', async () => {
    const event = {
      type: _analyticsReactNative.EventType.TrackEvent,
      event: 'test_event',
      anonymousId: 'anon',
      messageId: 'message-id',
      timestamp: '00000',
      properties: {}
    };
    await (0, _track.default)(event);
    expect(mockLogEvent).toHaveBeenCalledTimes(1);
    expect(mockLogEvent).toHaveBeenCalledWith('test_event', {});
  });
  it('forwards a track event with name and properties', async () => {
    const event = {
      type: _analyticsReactNative.EventType.TrackEvent,
      event: 'another_test_event',
      anonymousId: 'anon',
      messageId: 'message-id',
      timestamp: '00000',
      properties: {
        foo: 'bar'
      }
    };
    await (0, _track.default)(event);
    expect(mockLogEvent).toHaveBeenCalledTimes(1);
    expect(mockLogEvent).toHaveBeenCalledWith('another_test_event', {
      foo: 'bar'
    });
  });
  it('removes non-alphanumeric characters from', async () => {
    const event = {
      type: _analyticsReactNative.EventType.TrackEvent,
      event: 'yet another!!test$%^&event-CAPS',
      anonymousId: 'anon',
      messageId: 'message-id',
      timestamp: '00000',
      properties: {}
    };
    await (0, _track.default)(event);
    expect(mockLogEvent).toHaveBeenCalledTimes(1);
    expect(mockLogEvent).toHaveBeenCalledWith('yet_another__test____event_CAPS', {});
  });
  it('converts the event name to firebase event when applicable', async () => {
    const event = {
      type: _analyticsReactNative.EventType.TrackEvent,
      event: 'Order Refunded',
      anonymousId: 'anon',
      messageId: 'message-id',
      timestamp: '00000',
      properties: {}
    };
    await (0, _track.default)(event);
    expect(mockLogEvent).toHaveBeenCalledTimes(1);
    expect(mockLogEvent).toHaveBeenCalledWith('refund', {});
  });
});
//# sourceMappingURL=track.test.js.map