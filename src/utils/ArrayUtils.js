
// Remove duplicates from an array of objects in JavaScript
export const uniqueElByProps = (arr, prop) => {
    const obj = {}; // create an empty object
    for (let i = 0; i < arr.length; i++) { // loop through the array
        if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i]; // if the object doesn't have the property, add it to the object and set the value to the current array item
    }
    const newArr = []; // create an empty array
    for (const key in obj) newArr.push(obj[key]); // loop through the object and push the values to the array (this removes the duplicates)
    return newArr; // return the array
};

export const combineObjsInArr = (arr) => {
    const obj = {}; // create an empty object
    for (let i = 0; i < arr.length; i++) { // loop through the array
        if (!obj[arr[i]]) obj[arr[i]] = arr[i]; // if the object doesn't have the property, add it to the object and set the value to the current array item
    }
    const newArr = []; // create an empty array
    for (const key in obj) newArr.push(obj[key]); // loop through the object and push the values to the array (this removes the duplicates)
    return newArr; // return the array
};

export function getUniqueKeys(arr) {
    const keys = [];
    arr.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (!keys.includes(key)) {
                keys.push(key);
            }
        });
    });
    console.log(keys);
    return keys;
}

export function getUniqueValues(arr) {
    const values = [];
    arr.forEach(obj => {
        Object.values(obj).forEach(value => {
            if (!values.includes(value)) {
                values.push(value);
            }
        });
    });
    console.log(values);
    return values;
}

export const getKeyValues = (arr, key) => {
    const values = [];
    arr.forEach(obj => {
        const value = obj[key];
        if (value !== undefined && !values.includes(value)) {
            values.push(value);
        }
    });
    return values;
};

export const getuniqueKeyswithValues = (arr) => {
    const keys = getUniqueKeys(arr);
    const values = [];
    keys.forEach(key => {
        values.push(getKeyValues(arr, key));
    });
    const uniqueKeysWithValues = [];
    for (let i = 0; i < keys.length; i++) {
        uniqueKeysWithValues.push({ [keys[i]]: values[i] });
    }
    console.log(uniqueKeysWithValues);
    return uniqueKeysWithValues;
}

function getKeyValuesByKeys(arrs, keys) {
    const values = [];
    arrs.forEach(arr => {
        arr.forEach(obj => {
            keys.forEach(key => {
                if (obj[key] !== undefined) {
                    values.push(obj[key]);
                }
            });
        });
    });
    return values;
}
