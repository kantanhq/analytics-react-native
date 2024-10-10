export declare const mapEventNames: {
    [key: string]: string;
};
export declare const mapEventProps: {
    [key: string]: string;
};
export declare const mapProductProps: {
    [key: string]: string;
};
export interface Product {
    canonicalUrl: string;
    contentImageUrl: string;
    contentMetadata: {
        [key: string]: string | number;
    } & {
        customMetadata: {
            product_id?: string;
        };
    };
}
export declare const transformMap: {
    [key: string]: (value: unknown) => unknown;
};
//# sourceMappingURL=parameterMapping.d.ts.map