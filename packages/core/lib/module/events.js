import { EventType } from './types';
export const createTrackEvent = ({
  event,
  properties = {}
}) => ({
  type: EventType.TrackEvent,
  event,
  properties
});
export const createScreenEvent = ({
  name,
  properties = {}
}) => ({
  type: EventType.ScreenEvent,
  name,
  properties
});
export const createIdentifyEvent = ({
  userId,
  userTraits = {}
}) => {
  return {
    type: EventType.IdentifyEvent,
    userId: userId,
    traits: userTraits
  };
};
export const createGroupEvent = ({
  groupId,
  groupTraits = {}
}) => ({
  type: EventType.GroupEvent,
  groupId,
  traits: groupTraits
});
export const createAliasEvent = ({
  anonymousId,
  userId,
  newUserId
}) => ({
  type: EventType.AliasEvent,
  userId: newUserId,
  previousId: userId ?? anonymousId
});
//# sourceMappingURL=events.js.map