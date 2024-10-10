"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OneTrustConsentProvider = void 0;
var ConsentStatus = /*#__PURE__*/function (ConsentStatus) {
  ConsentStatus[ConsentStatus["Granted"] = 1] = "Granted";
  ConsentStatus[ConsentStatus["Denied"] = 0] = "Denied";
  ConsentStatus[ConsentStatus["Unknown"] = -1] = "Unknown";
  return ConsentStatus;
}(ConsentStatus || {});
/** Interface derived from https://www.npmjs.com/package/react-native-onetrust-cmp */
class OneTrustConsentProvider {
  constructor(oneTrust) {
    this.oneTrust = oneTrust;
  }
  onConsentChange(cb) {
    this.onConsentChangeCallback = cb;
  }
  setApplicableCategories(categories) {
    const initialStatusesP = Promise.all(categories.map(categoryId => this.oneTrust.getConsentStatusForCategory(categoryId).then(status => [categoryId, status === ConsentStatus.Granted]))).then(entries => Object.fromEntries(entries));
    let latestStatuses;
    this.getConsentStatus = () => Promise.resolve(latestStatuses ?? initialStatusesP);
    this.oneTrust.stopListeningForConsentChanges();
    this.oneTrust.setBroadcastAllowedValues(categories);
    categories.forEach(categoryId => {
      this.oneTrust.listenForConsentChanges(categoryId, (_, status) => {
        initialStatusesP.then(initialStatuses => {
          latestStatuses = {
            ...initialStatuses,
            ...latestStatuses,
            [categoryId]: status === ConsentStatus.Granted
          };
          this.onConsentChangeCallback(latestStatuses);
        }).catch(e => {
          throw e;
        });
      });
    });
  }
  shutdown() {
    this.oneTrust.stopListeningForConsentChanges();
  }
}
exports.OneTrustConsentProvider = OneTrustConsentProvider;
//# sourceMappingURL=OneTrustProvider.js.map