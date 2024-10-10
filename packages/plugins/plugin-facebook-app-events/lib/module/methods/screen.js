import { AppEventsLogger } from 'react-native-fbsdk-next';
import { sanitizeValue } from '../utils';
const PREFIX = 'Viewed';
const SUFFIX = 'Screen';
const MAX_CHARACTERS_EVENT_NAME = 40 - PREFIX.length - SUFFIX.length;
const sanitizeName = name => {
  const trimmedName = name.substring(0, MAX_CHARACTERS_EVENT_NAME);
  return `${PREFIX} ${trimmedName} ${SUFFIX}`;
};
const sanitizeEvent = event => {
  const properties = {};
  if (event.properties === undefined || event.properties === null) {
    return {};
  }
  for (const key of Object.keys(event.properties)) {
    const sanitized = sanitizeValue(event.properties[key]);
    if (sanitized !== undefined) {
      properties[key] = sanitized;
    }
  }
  return {
    ...properties
  };
};
export default (event => {
  const name = sanitizeName(event.name);
  const params = sanitizeEvent(event);
  AppEventsLogger.logEvent(name, params);
});
//# sourceMappingURL=screen.js.map