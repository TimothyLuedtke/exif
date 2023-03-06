export const reduceObjFromKeys = (source, keys) => {
    const obj = {};
    keys.forEach(key => {
        obj[key] = source[key];
    });
    return obj;
}

export const morphObjToArrKeyValObjs = (obj) => {
    const arr = [];
    Object.keys(obj).forEach(key => {
        arr.push({ [key]: obj[key] });
    });
    return arr;
}