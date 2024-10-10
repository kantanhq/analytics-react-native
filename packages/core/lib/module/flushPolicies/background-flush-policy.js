import { AppState } from 'react-native';
import { FlushPolicyBase } from './types';

/**
 * StatupFlushPolicy triggers a flush right away on client startup
 */
export class BackgroundFlushPolicy extends FlushPolicyBase {
  appState = AppState.currentState;
  start() {
    this.appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (this.appState === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        // When the app goes into the background we will trigger a flush
        this.shouldFlush.value = true;
      }
    });
  }
  onEvent(_event) {
    // Nothing to do
  }
  end() {
    this.appStateSubscription?.remove();
  }
}
//# sourceMappingURL=background-flush-policy.js.map