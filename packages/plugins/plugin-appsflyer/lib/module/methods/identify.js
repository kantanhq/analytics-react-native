import appsFlyer from 'react-native-appsflyer';
import { unknownToString } from '@segment/analytics-react-native';
export default (event => {
  const userId = event.userId;
  if (userId !== undefined && userId !== null && userId.length > 0) {
    appsFlyer.setCustomerUserId(userId);
  }
  const traits = event.traits;
  if (traits !== undefined && traits !== null) {
    const aFTraits = {};
    if (traits.email !== undefined && traits.email !== null) {
      aFTraits.email = traits.email;
    }
    if (traits.firstName !== undefined && traits.firstName !== null) {
      aFTraits.firstName = traits.firstName;
    }
    if (traits.lastName !== undefined && traits.firstName !== null) {
      aFTraits.lastName = traits.lastName;
    }
    if (traits.currencyCode !== undefined && traits.currencyCode !== null) {
      const codeString = unknownToString(traits.currencyCode);
      if (codeString !== undefined) {
        appsFlyer.setCurrencyCode(codeString);
      }
    }
    appsFlyer.setAdditionalData(aFTraits);
  }
});
//# sourceMappingURL=identify.js.map