"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppsflyerPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
var _reactNativeAppsflyer = _interopRequireDefault(require("react-native-appsflyer"));
var _identify = _interopRequireDefault(require("./methods/identify"));
var _track = _interopRequireDefault(require("./methods/track"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AppsflyerPlugin extends _analyticsReactNative.DestinationPlugin {
  constructor(props) {
    super();
    if (props != null) {
      this.timeToWaitForATTUserAuthorization = props.timeToWaitForATTUserAuthorization;
      this.is_adset = props.is_adset === undefined ? false : props.is_adset;
      this.is_ad_id = props.is_ad_id === undefined ? false : props.is_ad_id;
      this.is_adset_id = props.is_adset_id === undefined ? false : props.is_adset_id;
    }
  }
  type = _analyticsReactNative.PluginType.destination;
  key = 'AppsFlyer';
  is_adset = false;
  is_adset_id = false;
  is_ad_id = false;
  settings = null;
  hasRegisteredInstallCallback = false;
  hasRegisteredDeepLinkCallback = false;
  hasInitialized = false;
  timeToWaitForATTUserAuthorization = 60;
  async update(settings, _) {
    const defaultOpts = {
      isDebug: false,
      timeToWaitForATTUserAuthorization: this.timeToWaitForATTUserAuthorization,
      onInstallConversionDataListener: true
    };
    const appsflyerSettings = settings.integrations[this.key];
    if (appsflyerSettings === undefined) {
      return;
    }
    const clientConfig = this.analytics?.getConfig();
    this.settings = appsflyerSettings;
    if (this.settings.trackAttributionData && !this.hasRegisteredInstallCallback) {
      this.registerConversionCallback();
      this.hasRegisteredInstallCallback = true;
    }
    if (clientConfig?.trackDeepLinks === true && !this.hasRegisteredDeepLinkCallback) {
      this.registerDeepLinkCallback();
      this.registerUnifiedDeepLinkCallback();
      this.hasRegisteredDeepLinkCallback = true;
    }
    if (!this.hasInitialized) {
      try {
        await _reactNativeAppsflyer.default.initSdk({
          devKey: this.settings.appsFlyerDevKey,
          appId: this.settings.appleAppID,
          onDeepLinkListener: clientConfig?.trackDeepLinks === true,
          ...defaultOpts
        });
        this.hasInitialized = true;
      } catch (error) {
        const message = 'AppsFlyer failed to initialize';
        this.analytics?.reportInternalError(new _analyticsReactNative.SegmentError(_analyticsReactNative.ErrorType.PluginError, message, error));
        this.analytics?.logger.warn(`${message}: ${JSON.stringify(error)}`);
      }
    }
  }
  identify(event) {
    (0, _identify.default)(event);
    return event;
  }
  async track(event) {
    await (0, _track.default)(event);
    return event;
  }
  registerConversionCallback = () => {
    _reactNativeAppsflyer.default.onInstallConversionData(res => {
      const {
        af_status,
        media_source,
        campaign,
        is_first_launch,
        adset_id,
        ad_id,
        adset
      } = res?.data;
      const properties = {
        provider: this.key,
        campaign: {
          source: media_source,
          name: campaign
        }
      };
      if (this.is_adset_id) {
        Object.assign(properties, {
          adset_id: adset_id
        });
      }
      if (this.is_ad_id) {
        Object.assign(properties, {
          ad_id: ad_id
        });
      }
      if (this.is_adset) {
        Object.assign(properties, {
          adset: adset
        });
      }
      if (Boolean(is_first_launch) && JSON.parse(is_first_launch) === true) {
        if (af_status === 'Non-organic') {
          void this.analytics?.track('Install Attributed', properties);
        } else {
          void this.analytics?.track('Organic Install', {
            provider: 'AppsFlyer'
          });
        }
      }
    });
  };
  registerDeepLinkCallback = () => {
    _reactNativeAppsflyer.default.onAppOpenAttribution(res => {
      if (res?.status === 'success') {
        const {
          campaign,
          media_source
        } = res.data;
        const properties = {
          provider: this.key,
          campaign: {
            name: campaign,
            source: media_source
          }
        };
        void this.analytics?.track('Deep Link Opened', properties);
      }
    });
  };
  registerUnifiedDeepLinkCallback = () => {
    _reactNativeAppsflyer.default.onDeepLink(res => {
      if (res.deepLinkStatus !== 'NOT_FOUND') {
        const {
          DLValue,
          media_source,
          campaign
        } = res.data;
        const properties = {
          deepLink: DLValue,
          campaign: {
            name: campaign,
            source: media_source
          }
        };
        void this.analytics?.track('Deep Link Opened', properties);
      }
    });
  };
}
exports.AppsflyerPlugin = AppsflyerPlugin;
//# sourceMappingURL=AppsflyerPlugin.js.map