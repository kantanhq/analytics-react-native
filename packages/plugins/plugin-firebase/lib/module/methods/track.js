import firebaseAnalytics from '@react-native-firebase/analytics';
import { generateMapTransform } from '@segment/analytics-react-native';
import { mapEventProps, transformMap } from './parameterMapping';
const mappedPropNames = generateMapTransform(mapEventProps, transformMap);
const sanitizeName = name => {
  return name.replace(/[^a-zA-Z0-9]/g, '_');
};
export default (async event => {
  const safeEvent = mappedPropNames(event);
  const convertedName = safeEvent.event;
  let safeEventName = sanitizeName(convertedName);
  const safeProps = safeEvent.properties;
  // Clip the event name if it exceeds 40 characters
  if (safeEventName.length > 40) {
    safeEventName = safeEventName.substring(0, 40);
  }
  await firebaseAnalytics().logEvent(safeEventName, safeProps);
});
//# sourceMappingURL=track.js.map