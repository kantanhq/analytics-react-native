import { ErrorType, SegmentError } from '@segment/analytics-react-native';
export default (async (event, mixpanel, analytics) => {
  let distinctId = '';
  const newId = event.userId;
  try {
    distinctId = await mixpanel.getDistinctId();
  } catch (e) {
    analytics.reportInternalError(new SegmentError(ErrorType.PluginError, JSON.stringify(e), e));
    analytics.logger.warn(e);
  }
  if (distinctId !== '') {
    mixpanel.alias(newId, distinctId);
  }
});
//# sourceMappingURL=alias.js.map