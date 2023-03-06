
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
    console.log("getUniqueKeys returns: ", keys);
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

export function extractUniqueValues(arr, keys) {
    let result = {};
    for (let obj of arr) {
        for (let key of keys) {
            if (obj.hasOwnProperty(key)) {
                if (!result.hasOwnProperty(key)) {
                    result[key] = new Set();
                }
                result[key].add(obj[key]);
            }
        }
    }
    return Object.entries(result).map(([key, value]) => ({ [key]: Array.from(value) }));
}

export function removeSingleValuePairs(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
            if (arr[i][key].length <= 1) {
                if (arr[i][key].length === 0) {
                    delete arr[i][key];
                } else {
                    if (!arr[i][key][0]) {
                        delete arr[i][key];
                    }
                }
            }
        }
    }
    return arr.filter(item => Object.keys(item).length !== 0);
}

export const returnFilteredAssetURI = (data, values) => {
    const filteredData = data.filter((item) => Object.values(item).some((val) => values.includes(val)));
    const filteredDataURI = filteredData.map((item) => item.uri);
    return filteredDataURI;
};

export function combineObjects(arr) {
    let result = {};
    arr.forEach(obj => {
      Object.keys(obj).forEach(outerKey => {
        const innerObj = obj[outerKey];
        if (typeof innerObj === 'object' && innerObj !== null) {
          Object.keys(innerObj).forEach(innerKey => {
            if (!result[outerKey]) {
              result[outerKey] = {};
            }
            if (!result[outerKey][innerKey]) {
              result[outerKey][innerKey] = [innerObj[innerKey]];
            } else if (!result[outerKey][innerKey].includes(innerObj[innerKey])) {
              result[outerKey][innerKey].push(innerObj[innerKey]);
            }
          });
        } else {
          if (!result[outerKey]) {
            result[outerKey] = [innerObj];
          } else if (!result[outerKey].includes(innerObj)) {
            result[outerKey].push(innerObj);
          }
        }
      });
    });
    return result;
  }
  
// export function removeArrays(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let key in arr[i]) {
//             if (Array.isArray(arr[i][key])) {
//                 delete arr[i][key];
//             }
//         }
//     }
//     return arr.filter(item => Object.keys(item).length !== 0);
// }

export const shapedArray = (setKeychain, keys, keychain) => {
    setKeychain(keychain.filter((key) => keys.includes(key)));
    console.log('set keys: ', keychain.filter((key) => keys.includes(key)));
}
