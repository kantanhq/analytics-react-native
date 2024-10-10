import { EventPlugin, EventType, PluginType } from '@segment/analytics-react-native';
const MAX_SESSION_TIME_IN_MS = 300000;
export class AmplitudeSessionPlugin extends EventPlugin {
  type = PluginType.enrichment;
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
      case EventType.IdentifyEvent:
        result = this.identify(result);
        break;
      case EventType.TrackEvent:
        result = this.track(result);
        break;
      case EventType.ScreenEvent:
        result = this.screen(result);
        break;
      case EventType.AliasEvent:
        result = this.alias(result);
        break;
      case EventType.GroupEvent:
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
//# sourceMappingURL=AmplitudeSessionPlugin.js.map