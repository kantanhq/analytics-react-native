import { PluginType, UpdateType } from './types';
import { getAllPlugins } from './util';
import { ErrorType, SegmentError } from './errors';
const PLUGIN_ORDER = [PluginType.before, PluginType.enrichment, PluginType.destination, PluginType.after];
export class Timeline {
  plugins = {
    before: [],
    enrichment: [],
    destination: [],
    after: []
  };
  add(plugin) {
    const {
      type
    } = plugin;
    if (this.plugins[type]) {
      this.plugins[type]?.push(plugin);
    } else {
      this.plugins[type] = [plugin];
    }
    const settings = plugin.analytics?.settings.get();
    let hasInitialSettings = false;
    if (settings !== undefined) {
      plugin.update({
        integrations: settings
      }, UpdateType.initial);
      hasInitialSettings = true;
    }
    plugin.analytics?.settings.onChange(newSettings => {
      if (newSettings !== undefined) {
        plugin.update({
          integrations: newSettings
        }, hasInitialSettings ? UpdateType.refresh : UpdateType.initial);
        hasInitialSettings = true;
      }
    });
  }
  remove(plugin) {
    const plugins = this.plugins[plugin.type];
    if (plugins) {
      const index = plugins.findIndex(f => f === plugin);
      if (index > -1) {
        plugins.splice(index, 1);
      }
    }
  }
  apply(closure) {
    getAllPlugins(this).forEach(plugin => closure(plugin));
  }
  async process(incomingEvent) {
    let result = incomingEvent;
    for (const key of PLUGIN_ORDER) {
      const pluginResult = await this.applyPlugins({
        type: key,
        event: result
      });
      if (key !== PluginType.destination) {
        if (result === undefined) {
          return;
        } else if (key === PluginType.enrichment && pluginResult?.enrichment) {
          result = pluginResult.enrichment(pluginResult);
        } else {
          result = pluginResult;
        }
      }
    }
    return result;
  }
  async applyPlugins({
    type,
    event
  }) {
    let result = event;
    const plugins = this.plugins[type];
    if (plugins) {
      for (const plugin of plugins) {
        if (result) {
          try {
            const pluginResult = plugin.execute(result);
            // Each destination is independent from each other, so we don't roll over changes caused internally in each one of their processing
            if (type !== PluginType.destination) {
              result = await pluginResult;
              if (result === undefined) {
                break;
              }
            } else {
              await pluginResult;
            }
          } catch (error) {
            plugin.analytics?.reportInternalError(new SegmentError(ErrorType.PluginError, JSON.stringify(error), error));
            plugin.analytics?.logger.warn(`Destination ${plugin.key} failed to execute: ${JSON.stringify(error)}`);
          }
        }
      }
    }
    return result;
  }
}
//# sourceMappingURL=timeline.js.map