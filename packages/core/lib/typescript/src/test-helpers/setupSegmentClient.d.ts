import { SegmentClient } from '../analytics';
import { UtilityPlugin } from '../plugin';
import { Config, SegmentEvent } from '../types';
import { MockSegmentStore, StoreData } from './mockSegmentStore';
export declare const createTestClient: (storeData?: Partial<StoreData>, config?: Partial<Config>) => {
    client: SegmentClient;
    store: MockSegmentStore;
    plugin: UtilityPlugin;
    expectEvent: (event: Partial<SegmentEvent>) => void;
};
//# sourceMappingURL=setupSegmentClient.d.ts.map