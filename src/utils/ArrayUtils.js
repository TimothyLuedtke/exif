
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

export const removeDupPhotos = (newAsset, currentAssets) => {  // newAsset is an array of objects and currentAssets is an array of objects
    const existingAssetIds = currentAssets.map((asset) => asset.id); // create an array of the ids of the current assets
    const filteredNewAssets = newAsset.filter((asset) => !existingAssetIds.includes(asset.id)); // filter the new assets to remove any that already exist in the current assets
    return filteredNewAssets; // return the filtered new assets
};

