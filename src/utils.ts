export const combineObjects = (a: any, b: any) => {
    // Combine both objects, not allowing any undefineds in b to override a
    const out: any = {};
    Object.entries(a).forEach(([key, value]) => {
        out[key] = value;
    });
    Object.entries(b).forEach(([key, value]) => {
        if (value !== undefined) {
            out[key] = value;
        }
    });
    return out;
}