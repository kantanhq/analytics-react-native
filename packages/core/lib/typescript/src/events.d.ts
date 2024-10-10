import { GroupEventType, GroupTraits, IdentifyEventType, JsonMap, ScreenEventType, TrackEventType, UserTraits, AliasEventType } from './types';
export declare const createTrackEvent: ({ event, properties, }: {
    event: string;
    properties?: JsonMap | undefined;
}) => TrackEventType;
export declare const createScreenEvent: ({ name, properties, }: {
    name: string;
    properties?: JsonMap | undefined;
}) => ScreenEventType;
export declare const createIdentifyEvent: ({ userId, userTraits, }: {
    userId?: string | undefined;
    userTraits?: UserTraits | undefined;
}) => IdentifyEventType;
export declare const createGroupEvent: ({ groupId, groupTraits, }: {
    groupId: string;
    groupTraits?: GroupTraits | undefined;
}) => GroupEventType;
export declare const createAliasEvent: ({ anonymousId, userId, newUserId, }: {
    anonymousId: string;
    userId?: string | undefined;
    newUserId: string;
}) => AliasEventType;
//# sourceMappingURL=events.d.ts.map