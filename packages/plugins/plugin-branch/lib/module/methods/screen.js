import { BranchEvent } from 'react-native-branch';
import { generateMapTransform } from '@segment/analytics-react-native';
import { mapEventProps, transformMap } from './parameterMapping';
import { createBranchEventWithProps } from './util';
export default (async event => {
  const transformEvent = generateMapTransform(mapEventProps, transformMap);
  const safeEvent = transformEvent(event);
  const safeProps = safeEvent.properties;
  const branchEvent = await createBranchEventWithProps(BranchEvent.ViewItem, safeProps, true);
  await branchEvent.logEvent();
});
//# sourceMappingURL=screen.js.map