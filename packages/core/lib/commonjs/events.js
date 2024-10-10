"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTrackEvent = exports.createScreenEvent = exports.createIdentifyEvent = exports.createGroupEvent = exports.createAliasEvent = void 0;
var _types = require("./types");
const createTrackEvent = ({
  event,
  properties = {}
}) => ({
  type: _types.EventType.TrackEvent,
  event,
  properties
});
exports.createTrackEvent = createTrackEvent;
const createScreenEvent = ({
  name,
  properties = {}
}) => ({
  type: _types.EventType.ScreenEvent,
  name,
  properties
});
exports.createScreenEvent = createScreenEvent;
const createIdentifyEvent = ({
  userId,
  userTraits = {}
}) => {
  return {
    type: _types.EventType.IdentifyEvent,
    userId: userId,
    traits: userTraits
  };
};
exports.createIdentifyEvent = createIdentifyEvent;
const createGroupEvent = ({
  groupId,
  groupTraits = {}
}) => ({
  type: _types.EventType.GroupEvent,
  groupId,
  traits: groupTraits
});
exports.createGroupEvent = createGroupEvent;
const createAliasEvent = ({
  anonymousId,
  userId,
  newUserId
}) => ({
  type: _types.EventType.AliasEvent,
  userId: newUserId,
  previousId: userId ?? anonymousId
});
exports.createAliasEvent = createAliasEvent;
//# sourceMappingURL=events.js.map