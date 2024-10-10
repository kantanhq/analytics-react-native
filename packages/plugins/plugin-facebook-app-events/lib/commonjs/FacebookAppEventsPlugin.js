"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FacebookAppEventsPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNativeFbsdkNext = require("react-native-fbsdk-next");
var _screen = _interopRequireDefault(require("./methods/screen"));
var _parameterMapping = require("./parameterMapping");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FB_PLUGIN_KEY = 'Facebook App Events';
// FB Event Names must be <= 40 characters
const MAX_CHARACTERS_EVENT_NAME = 40;
const mappedPropNames = (0, _analyticsReactNative.generateMapTransform)(_parameterMapping.mapEventProps, _parameterMapping.transformMap);
const isFBPluginSettings = settings => {
  return typeof settings === 'object' && Object.keys(settings).some(k => k === 'trackScreenEvents' || k === 'appEvents' || k === 'limitedDataUse');
};
const sanitizeEvent = event => {
  const properties = event.properties;
  if (!(0, _analyticsReactNative.isObject)(properties)) {
    return {};
  }
  const products = Array.isArray(properties.products) ? properties.products : [];
  const productCount = (0, _analyticsReactNative.isNumber)(properties.fb_num_items) ? properties.fb_num_items : products.length;
  const params = {};
  for (const key of Object.keys(properties)) {
    if (Object.values(_parameterMapping.mapEventProps).includes(key)) {
      const sanitized = (0, _utils.sanitizeValue)(properties[key]);
      if (sanitized !== undefined) {
        params[key] = sanitized;
      }
    }
  }
  if ((0, _analyticsReactNative.isNumber)(event._logTime)) {
    params._logTime = event._logTime;
  }

  // Map messageId to event_id to support FB deduplication
  // https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events#event-deduplication-options
  const messageId = (0, _analyticsReactNative.unknownToString)(event.messageId);
  if (messageId !== null && messageId !== undefined && messageId !== '') {
    params.event_id = messageId;
  }
  return {
    ...params,
    fb_num_items: productCount,
    _appVersion: event.context.app.version
  };
};
class FacebookAppEventsPlugin extends _analyticsReactNative.DestinationPlugin {
  type = _analyticsReactNative.PluginType.destination;
  key = FB_PLUGIN_KEY;
  trackScreens = false;
  limitedDataUse = false;
  /**
   * Mappings for event names from Segment Settings
   */
  appEvents = {};
  async configure(analytics) {
    this.analytics = analytics;
    const adTrackingEnabled = this.analytics?.adTrackingEnabled.get();
    this.analytics.adTrackingEnabled.onChange(value => {
      void (async () => {
        try {
          await _reactNativeFbsdkNext.Settings.setAdvertiserTrackingEnabled(value);
        } catch (error) {
          this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, 'Facebook failed to set AdvertiserTrackingEnabled', error));
        }
      })();
    });

    //you will likely need consent first
    //this example assumes consentManager plugin is used
    _reactNativeFbsdkNext.Settings.initializeSDK();
    if (adTrackingEnabled) {
      try {
        await _reactNativeFbsdkNext.Settings.setAdvertiserTrackingEnabled(true);
      } catch (e) {
        //handle error
        this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, JSON.stringify(e), e));
        this.analytics?.logger.warn('Add Tracking Enabled Error', e);
      }
    }

    //default facebook data processing options
    _reactNativeFbsdkNext.Settings.setDataProcessingOptions([], 0, 0);
  }
  update(settings, _) {
    const fbSettings = settings.integrations[this.key];
    if (isFBPluginSettings(fbSettings)) {
      this.trackScreens = fbSettings.trackScreenEvent ?? false;
      this.limitedDataUse = fbSettings.limitedDataUse ?? false;
      this.appEvents = fbSettings.appEvents ?? {};
      if (this.limitedDataUse) {
        // Enable LDU
        _reactNativeFbsdkNext.Settings.setDataProcessingOptions(['LDU']);
      }
    }
  }
  track(event) {
    const safeEvent = mappedPropNames(event);
    const convertedName = safeEvent.event;
    const safeName = this.sanitizeEventName(convertedName);
    const safeProps = sanitizeEvent(safeEvent);
    const currency = safeProps.fb_currency ?? 'USD';
    if (safeProps._valueToSum !== undefined && safeName === 'fb_mobile_purchase') {
      const purchasePrice = safeProps._valueToSum;
      _reactNativeFbsdkNext.AppEventsLogger.logPurchase(purchasePrice, currency, safeProps);
    } else if (typeof safeProps._valueToSum === 'number') {
      _reactNativeFbsdkNext.AppEventsLogger.logEvent(safeName, safeProps._valueToSum, safeProps);
    } else {
      _reactNativeFbsdkNext.AppEventsLogger.logEvent(safeName, safeProps);
    }
    return event;
  }
  screen(event) {
    if (this.trackScreens === true) {
      (0, _screen.default)(event);
    }
    return event;
  }
  sanitizeEventName(name) {
    //Facebook expects '_' instead of '.'
    const fbName = this.appEvents[name] ?? name;
    const sanitizedName = fbName.replace('.', '_');
    return sanitizedName.substring(0, MAX_CHARACTERS_EVENT_NAME);
  }
}
exports.FacebookAppEventsPlugin = FacebookAppEventsPlugin;
//# sourceMappingURL=FacebookAppEventsPlugin.js.map