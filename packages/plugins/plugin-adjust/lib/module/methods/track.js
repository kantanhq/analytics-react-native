import { Adjust, AdjustEvent } from 'react-native-adjust';
import { extract, mappedCustomEventToken } from '../util';
export default ((event, settings) => {
  const anonId = event.anonymousId;
  if (anonId !== undefined && anonId !== null && anonId.length > 0) {
    Adjust.addSessionPartnerParameter('anonymous_id', anonId);
  }
  const token = mappedCustomEventToken(event.event, settings);
  if (token !== undefined && token !== null) {
    const adjEvent = new AdjustEvent(token);
    const properties = event.properties;
    if (properties !== undefined && properties !== null) {
      Object.entries(properties).forEach(([key, value]) => {
        adjEvent.addCallbackParameter(key, value);
      });
      const revenue = extract('revenue', properties);
      const currency = extract('currency', properties, 'USD');
      const orderId = extract('orderId', properties);
      if (revenue !== undefined && revenue !== null && currency !== undefined && currency !== null) {
        adjEvent.setRevenue(revenue, currency);
      }
      if (orderId !== undefined && orderId !== null) {
        adjEvent.setTransactionId(orderId);
      }
    }
    Adjust.trackEvent(adjEvent);
  }
});
//# sourceMappingURL=track.js.map