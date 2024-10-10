"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = void 0;
var _types = require("./types");
var _util = require("./util");
var _errors = require("./errors");
const PLUGIN_ORDER = [_types.PluginType.before, _types.PluginType.enrichment, _types.PluginType.destination, _types.PluginType.after];
class Timeline {
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
      }, _types.UpdateType.initial);
      hasInitialSettings = true;
    }
    plugin.analytics?.settings.onChange(newSettings => {
      if (newSettings !== undefined) {
        plugin.update({
          integrations: newSettings
        }, hasInitialSettings ? _types.UpdateType.refresh : _types.UpdateType.initial);
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
    (0, _util.getAllPlugins)(this).forEach(plugin => closure(plugin));
  }
  async process(incomingEvent) {
    let result = incomingEvent;
    for (const key of PLUGIN_ORDER) {
      const pluginResult = await this.applyPlugins({
        type: key,
        event: result
      });
      if (key !== _types.PluginType.destination) {
        if (result === undefined) {
          return;
        } else if (key === _types.PluginType.enrichment && pluginResult?.enrichment) {
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
            if (type !== _types.PluginType.destination) {
              result = await pluginResult;
              if (result === undefined) {
                break;
              }
            } else {
              await pluginResult;
            }
          } catch (error) {
            plugin.analytics?.reportInternalError(new _errors.SegmentError(_errors.ErrorType.PluginError, JSON.stringify(error), error));
            plugin.analytics?.logger.warn(`Destination ${plugin.key} failed to execute: ${JSON.stringify(error)}`);
          }
        }
      }
    }
    return result;
  }
}
exports.Timeline = Timeline;
//# sourceMappingURL=timeline.js.map