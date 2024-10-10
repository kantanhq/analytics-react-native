"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrazePlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNativeSdk = _interopRequireDefault(require("@braze/react-native-sdk"));
var _flush = _interopRequireDefault(require("./methods/flush"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultProperties = {
  network: '',
  campaign: '',
  adGroup: '',
  creative: ''
};
class BrazePlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
  key = 'Appboy';
  revenueEnabled = false;
  update(settings, _) {
    const brazeSettings = settings.integrations[this.key];
    if (brazeSettings.logPurchaseWhenRevenuePresent === true) {
      this.revenueEnabled = true;
    }
  }

  /**
   * Cleans up the attributes to only send valid values to Braze SDK
   * @param value value of any type
   * @returns value if type is valid, undefined if the type is not supported by Braze
   */
  sanitizeAttribute = value => {
    // All basic values
    if (value === null || (0, _analyticsReactNative.isNumber)(value) || (0, _analyticsReactNative.isString)(value) || (0, _analyticsReactNative.isBoolean)(value) || (0, _analyticsReactNative.isDate)(value)) {
      return value;
    }

    // Arrays and objects we will attempt to serialize
    if (Array.isArray(value)) {
      return value.map(v => {
        if ((0, _analyticsReactNative.isObject)(v)) {
          return (0, _analyticsReactNative.objectToString)(v) ?? '';
        }
        return `${v}`;
      });
    }
    if ((0, _analyticsReactNative.isObject)(value)) {
      return (0, _analyticsReactNative.objectToString)(value);
    }
    return undefined;
  };
  identify(event) {
    //check to see if anything has changed.
    //if it hasn't changed don't send event
    const identical = this.lastSeenTraits?.traits === undefined ? false : (0, _analyticsReactNative.deepCompare)(this.lastSeenTraits.traits, event.traits);
    if (this.lastSeenTraits?.userId === event.userId && this.lastSeenTraits?.anonymousId === event.anonymousId && identical) {
      return;
    } else {
      if (event.userId !== undefined && event.userId !== null) {
        _reactNativeSdk.default.changeUser(event.userId);
      }
      if (event.traits?.birthday !== undefined) {
        const birthday = new Date(event.traits.birthday);
        if (birthday !== undefined && birthday !== null && !isNaN(birthday.getTime())) {
          const data = new Date(event.traits.birthday);
          _reactNativeSdk.default.setDateOfBirth(data.getFullYear(),
          // getMonth is zero indexed
          data.getMonth() + 1, data.getDate());
        } else {
          this.analytics?.logger.warn(`Birthday found "${event.traits?.birthday}" could not be parsed as a Date. Try converting to ISO format.`);
        }
      }
      if (event.traits?.email !== undefined) {
        _reactNativeSdk.default.setEmail(event.traits.email);
      }
      if (event.traits?.firstName !== undefined) {
        _reactNativeSdk.default.setFirstName(event.traits.firstName);
      }
      if (event.traits?.lastName !== undefined) {
        _reactNativeSdk.default.setLastName(event.traits.lastName);
      }
      if (event.traits?.gender !== undefined) {
        const validGenders = ['m', 'f', 'n', 'o', 'p', 'u'];
        const isValidGender = validGenders.indexOf(event.traits.gender) > -1;
        if (isValidGender) {
          _reactNativeSdk.default.setGender(event.traits.gender);
        }
      }
      if (event.traits?.phone !== undefined) {
        _reactNativeSdk.default.setPhoneNumber(event.traits.phone);
      }
      if (event.traits?.address !== undefined) {
        if (event.traits.address.city !== undefined) {
          _reactNativeSdk.default.setHomeCity(event.traits.address.city);
        }
        if (event.traits?.address.country !== undefined) {
          _reactNativeSdk.default.setCountry(event.traits.address.country);
        }
      }
      const appBoyTraits = ['birthday', 'email', 'firstName', 'lastName', 'gender', 'phone', 'address'];
      Object.entries(event.traits ?? {}).forEach(([key, value]) => {
        const sanitized = this.sanitizeAttribute(value);
        if (sanitized !== undefined && appBoyTraits.indexOf(key) < 0) {
          _reactNativeSdk.default.setCustomUserAttribute(key, sanitized);
        }
      });
      this.lastSeenTraits = {
        anonymousId: event.anonymousId ?? '',
        userId: event.userId,
        traits: event.traits
      };
    }
    return event;
  }
  track(event) {
    const eventName = event.event;
    const revenue = this.extractRevenue(event.properties, 'revenue');
    if (event.event === 'Install Attributed') {
      if (event.properties?.campaign !== undefined && event.properties?.campaign !== null) {
        const attributionData = event.properties.campaign;
        let network, campaign, adGroup, creative;
        if ((0, _analyticsReactNative.isObject)(attributionData)) {
          network = (0, _analyticsReactNative.unknownToString)(attributionData.source, true, undefined, undefined) ?? defaultProperties.network;
          campaign = (0, _analyticsReactNative.unknownToString)(attributionData.name, true, undefined, undefined) ?? defaultProperties.campaign;
          adGroup = (0, _analyticsReactNative.unknownToString)(attributionData.ad_group, true, undefined, undefined) ?? defaultProperties.adGroup;
          creative = (0, _analyticsReactNative.unknownToString)(attributionData.ad_creative, true, undefined, undefined) ?? defaultProperties.creative;
        } else {
          network = defaultProperties.network;
          campaign = defaultProperties.campaign;
          adGroup = defaultProperties.adGroup;
          creative = defaultProperties.creative;
        }
        _reactNativeSdk.default.setAttributionData(network, campaign, adGroup, creative);
      }
    }
    if (eventName === 'Order Completed' || eventName === 'Completed Order') {
      this.logPurchaseEvent(event);
    } else if (this.revenueEnabled === true && revenue !== 0 && revenue !== undefined) {
      this.logPurchaseEvent(event);
    } else {
      _reactNativeSdk.default.logCustomEvent(eventName, event.properties);
    }
    return event;
  }
  flush() {
    (0, _flush.default)();
  }
  extractRevenue = (properties, key) => {
    if (!properties) {
      return 0;
    }
    const revenue = properties[key];
    if (revenue !== undefined && revenue !== null) {
      switch (typeof revenue) {
        case 'string':
          return parseFloat(revenue);
        case 'number':
          return revenue;
        default:
          return 0;
      }
    } else {
      return 0;
    }
  };
  logPurchaseEvent(event) {
    // Make USD as the default currency.
    let currency = 'USD';
    const revenue = this.extractRevenue(event.properties, 'revenue');
    if (typeof event.properties?.currency === 'string' && event.properties.currency.length === 3) {
      currency = event.properties.currency;
    }
    if (event.properties) {
      const appBoyProperties = Object.assign({}, event.properties);
      delete appBoyProperties.currency;
      delete appBoyProperties.revenue;
      if (appBoyProperties.products !== undefined && appBoyProperties.products !== null) {
        const products = appBoyProperties.products.slice(0);
        delete appBoyProperties.products;
        products.forEach(product => {
          const productDict = Object.assign({}, (0, _analyticsReactNative.isObject)(product) ? product : {});
          const productId = (0, _analyticsReactNative.unknownToString)(productDict.product_id, true, undefined, undefined) ?? '';
          const productRevenue = this.extractRevenue(productDict, 'price');
          const productQuantity = (0, _analyticsReactNative.isNumber)(productDict.quantity) ? productDict.quantity : 1;
          delete productDict.product_id;
          delete productDict.price;
          delete productDict.quantity;
          const productProperties = Object.assign({}, appBoyProperties, productDict);
          _reactNativeSdk.default.logPurchase((0, _analyticsReactNative.unknownToString)(productId) ?? '', String(productRevenue), currency, productQuantity, productProperties);
        });
      } else {
        _reactNativeSdk.default.logPurchase(event.event, String(revenue), currency, 1, appBoyProperties);
      }
    } else {
      _reactNativeSdk.default.logPurchase(event.event, String(revenue), currency, 1);
    }
  }
}
exports.BrazePlugin = BrazePlugin;
//# sourceMappingURL=BrazePlugin.js.map