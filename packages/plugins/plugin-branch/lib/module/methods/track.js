import { generateMapTransform } from '@segment/analytics-react-native';
import { mapEventNames, mapEventProps, transformMap } from './parameterMapping';
import { createBranchEventWithProps } from './util';
export default (async event => {
  const transformEvent = generateMapTransform(mapEventProps, transformMap);
  const safeEvent = transformEvent(event);
  const safeEventName = safeEvent.event;
  const safeProps = safeEvent.properties;
  const isStandardBranchEvent = (event.event in mapEventNames);
  const branchEvent = await createBranchEventWithProps(safeEventName, safeProps, isStandardBranchEvent);
  await branchEvent.logEvent();
});
//# sourceMappingURL=track.js.map