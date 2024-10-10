import React from 'react';
import type { Config, ClientMethods } from './types';
import { SegmentClient } from './analytics';
export declare const createClient: (config: Config) => SegmentClient;
export declare const AnalyticsProvider: ({ client, children, }: {
    client?: SegmentClient | undefined;
    children?: React.ReactNode;
}) => React.JSX.Element | null;
export declare const useAnalytics: () => ClientMethods;
//# sourceMappingURL=client.d.ts.map