/**
 * Generates a mapTransform function from a keymap and a transform map.
 * The resulting function can be called with any object/dictionary and return
 * a new object with key replacements and value transformations applied
 *
 * @param keyMap A dictionary of key mappings in format: ['OLD':'NEW']
 * @param transformMap A map of transformations by key (new key if the key was replaced)
 * @returns A function that maps keys from an object and transforms its values
 */
export declare const generateMapTransform: (keyMap: {
    [key: string]: string;
}, transformMap: {
    [key: string]: (oldValue: unknown) => unknown;
}) => (json: Record<string, unknown>) => Record<string, unknown>;
//# sourceMappingURL=mapTransform.d.ts.map