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

export function removeEmptyUniqueVals(obj) {
    for (let key in obj) {
        if (
        // Array.isArray(obj[key]) && obj[key].length < 2 ||
            obj[key] === null ||
            obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

export function filterNestedObjArr(data, criteria) {
    return data.filter(obj => {
        for (let key in criteria) {
          if (!criteria[key].includes(obj.data[key]) && !criteria[key].includes(obj.exif[key])) {
            return false;
          }
        }
        return true;
      });
}
