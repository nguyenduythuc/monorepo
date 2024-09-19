import {Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const mmkvStorage: Storage = {
  setItem: (key, value) => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    storage.delete(key);
    return Promise.resolve();
  },
};
