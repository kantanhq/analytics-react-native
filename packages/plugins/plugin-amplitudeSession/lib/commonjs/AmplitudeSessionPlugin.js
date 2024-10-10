"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmplitudeSessionPlugin = void 0;
var _analyticsReactNative = require("@segment/analytics-react-native");
const MAX_SESSION_TIME_IN_MS = 300000;
class AmplitudeSessionPlugin extends _analyticsReactNative.EventPlugin {
  type = _analyticsReactNative.PluginType.enrichment;
  key = 'Actions Amplitude';
  active = false;
  update(settings, _) {
    const integrations = settings.integrations;
    if (this.key in integrations) {
      this.active = true;
      this.refreshSession();
    }
  }
  execute(event) {
    if (!this.active) {
      return event;
    }
    this.refreshSession();
    let result = event;
    switch (result.type) {
      case _analyticsReactNative.EventType.IdentifyEvent:
        result = this.identify(result);
        break;
      case _analyticsReactNative.EventType.TrackEvent:
        result = this.track(result);
        break;
      case _analyticsReactNative.EventType.ScreenEvent:
        result = this.screen(result);
        break;
      case _analyticsReactNative.EventType.AliasEvent:
        result = this.alias(result);
        break;
      case _analyticsReactNative.EventType.GroupEvent:
        result = this.group(result);
        break;
    }
    return result;
  }
  identify(event) {
    return this.insertSession(event);
  }
  track(event) {
    return this.insertSession(event);
  }
  screen(event) {
    return this.insertSession(event);
  }
  group(event) {
    return this.insertSession(event);
  }
  alias(event) {
    return this.insertSession(event);
  }
  reset() {
    this.resetSession();
  }
  insertSession = event => {
    const returnEvent = event;
    const integrations = event.integrations;
    returnEvent.integrations = {
      ...integrations,
      [this.key]: {
        session_id: this.sessionId
      }
    };
    return returnEvent;
  };
  resetSession = () => {
    this.sessionId = Date.now();
    this.sessionTimer = undefined;
  };
  refreshSession = () => {
    if (this.sessionId === undefined) {
      this.sessionId = Date.now();
    }
    if (this.sessionTimer !== undefined) {
      clearTimeout(this.sessionTimer);
    }
    this.sessionTimer = setTimeout(() => this.resetSession(), MAX_SESSION_TIME_IN_MS);
  };
}
exports.AmplitudeSessionPlugin = AmplitudeSessionPlugin;
//# sourceMappingURL=AmplitudeSessionPlugin.js.map