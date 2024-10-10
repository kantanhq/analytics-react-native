import { DestinationPlugin, PluginType, generateMapTransform } from '@segment/analytics-react-native';
import { mapTraits, transformMap } from './parameterMapping';
import CleverTap from 'clevertap-react-native';
const mappedTraits = generateMapTransform(mapTraits, transformMap);
export class ClevertapPlugin extends DestinationPlugin {
  type = PluginType.destination;
  key = 'CleverTap';
  identify(event) {
    const traits = event.traits;
    const safeTraits = mappedTraits(traits);
    const userId = event.userId ?? event.anonymousId;
    if (safeTraits.DOB !== undefined && safeTraits.DOB !== null && !(safeTraits.DOB instanceof Date)) {
      if (typeof safeTraits.DOB === 'string' || typeof safeTraits.DOB === 'number') {
        const birthday = new Date(safeTraits.DOB);
        if (birthday !== undefined && birthday !== null && !isNaN(birthday.getTime())) {
          safeTraits.DOB = birthday;
        }
      } else {
        delete safeTraits.DOB;
        this.analytics?.logger.warn(`Birthday found "${event.traits?.birthday}" could not be parsed as a Date. Try converting to ISO format.`);
      }
    }
    const clevertapTraits = {
      ...safeTraits,
      Identity: userId
    };
    CleverTap.profileSet(clevertapTraits);
    return event;
  }
  track(event) {
    if (event.event === 'Order Completed') {
      const userId = event.userId ?? event.anonymousId;
      const {
        products = [],
        ...props
      } = event.properties ?? {};
      const chargeDetails = {
        ...props,
        Identity: userId
      };
      const sanitizedProducts = products ?? [];
      CleverTap.recordChargedEvent(chargeDetails, sanitizedProducts);
    } else {
      CleverTap.recordEvent(event.event, event.properties);
    }
    return event;
  }
  screen(event) {
    const screenName = event.name ?? 'Screen Viewed';
    const userId = event.userId ?? event.anonymousId;
    const screenProps = {
      ...event.properties,
      Identity: userId
    };
    CleverTap.recordEvent(screenName, screenProps);
    return event;
  }
}
//# sourceMappingURL=ClevertapPlugin.js.map