import appsFlyer from 'react-native-appsflyer';
import { isString } from '@segment/analytics-react-native';
export default (async event => {
  const properties = event.properties || {};
  const revenue = extractRevenue('revenue', properties);
  const currency = extractCurrency('currency', properties, 'USD');
  if (revenue !== undefined && revenue !== null && currency !== undefined && currency !== null) {
    const otherProperties = Object.entries(properties).filter(([key]) => key !== 'revenue' && key !== 'currency').reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {});
    await appsFlyer.logEvent(event.event, {
      ...otherProperties,
      af_revenue: revenue,
      af_currency: currency
    });
  } else {
    await appsFlyer.logEvent(event.event, properties);
  }
});
const extractRevenue = (key, properties) => {
  const value = properties[key];
  if (value === undefined || value === null) {
    return null;
  }
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      return parseFloat(value);
    default:
      return null;
  }
};
const extractCurrency = (key, properties, defaultCurrency) => {
  const value = properties[key];
  if (isString(value)) {
    return value;
  }
  return defaultCurrency;
};
//# sourceMappingURL=track.js.map