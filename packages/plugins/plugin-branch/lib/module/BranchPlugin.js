import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import identify from './methods/identify';
import screen from './methods/screen';
import alias from './methods/alias';
import track from './methods/track';
import reset from './methods/reset';
export class BranchPlugin extends DestinationPlugin {
  type = PluginType.destination;
  key = 'Branch Metrics';
  identify(event) {
    identify(event);
    return event;
  }
  async track(event) {
    await track(event);
    return event;
  }
  async screen(event) {
    await screen(event);
    return event;
  }
  alias(event) {
    alias(event);
    return event;
  }
  reset() {
    reset();
  }
}
//# sourceMappingURL=BranchPlugin.js.map