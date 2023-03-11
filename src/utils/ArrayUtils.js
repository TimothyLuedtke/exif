

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

export const shapedArray = (setKeychain, keys, keychain) => {
    setKeychain(keychain.filter((key) => keys.includes(key)));
    console.log('set keys: ', keychain.filter((key) => keys.includes(key)));
}
