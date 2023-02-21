import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error(error);
  }
};

export const getMultiDatas = async keys => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (error) {
    console.error(error);
  }
};

export const multiRemove = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error(error);
  }
};
