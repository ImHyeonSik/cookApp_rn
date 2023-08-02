import AsyncStorage from '@react-native-community/async-storage';
import Common from '../src/common';

export const setItemToAsync = (storageName, item) => {
  if (Common.isEmpty(storageName)) {
    throw Error('Storage Name is Empty');
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(storageName, JSON.stringify(item), error => {
      if (error) {
        reject(error);
      }

      resolve('입력 성공');
    });
  });
};

export const getItemFromAsync = storageName => {
  if (Common.isEmpty(storageName)) {
    throw Error('Storage Name is Empty');
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageName, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result === null) {
        resolve(null);
      }

      resolve(JSON.parse(result));
    });
  });
};
