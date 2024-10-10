"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = (event, mixpanel, settings) => {
  const groupId = event.groupId;
  const groupTraits = settings.groupIdentifierTraits;
  if (groupTraits !== undefined) {
    for (const groupTrait of groupTraits) {
      for (const eventTrait in event.traits) {
        if (groupTrait.toLocaleLowerCase() === eventTrait.toLocaleLowerCase()) {
          const group = event.traits[groupTrait];
          const traits = event.traits;
          mixpanel.getGroup(group, groupId).setOnce('properties', traits);
        }
      }
      mixpanel.setGroup(groupTrait, groupId);
    }
  }
};
exports.default = _default;
//# sourceMappingURL=group.js.map