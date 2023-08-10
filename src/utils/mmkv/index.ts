import { MMKV } from 'react-native-mmkv';
import type { tStorageType, tStorageResult } from './type';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
// import { recordError } from '@utils/index';
const storage = new MMKV();
if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}
export function remove(key: string) {
  try {
    storage.delete(key);
  } catch (error) {
    // recordError({
    //   error,
    //   name: 'remove storage',
    //   message: 'remove storage error',
    //   stack: 'mmkv',
    // });
  }
}
export function clearAll() {
  try {
    storage.clearAll();
  } catch (error) {
    // recordError({
    //   error,
    //   name: 'clearAll storage',
    //   message: 'clearAll storage error',
    //   stack: 'mmkv',
    // });
  }
}
export function retrieve<T extends tStorageType>(key: string, type: T): tStorageResult<T> {
  try {
    if (type === 'string') {
      return storage.getString(key) as tStorageResult<T>;
    }
    if (type === 'number') {
      return storage.getNumber(key) as tStorageResult<T>;
    }
    if (type === 'boolean') {
      return storage.getBoolean(key) as tStorageResult<T>;
    }
    return undefined as tStorageResult<T>;
  } catch (error) {
    // recordError({
    //   error,
    //   name: 'retrieve storage',
    //   message: 'retrieve storage error',
    //   stack: 'mmkv',
    // });
    return undefined as tStorageResult<T>;
  }
}
export function add(key: string, value: string | number | boolean) {
  try {
    storage.set(key, value);
  } catch (error) {
    console.log(error);
    // recordError({
    //   error,
    //   name: 'add storage',
    //   message: 'add storage error',
    //   stack: 'mmkv',
    // });
  }
}

export function has(key: string) {
  try {
    return storage.contains(key);
  } catch (error) {
    // recordError({
    //   error,
    //   name: 'has storage',
    //   message: 'has storage error',
    //   stack: 'mmkv',
    // });
    return false;
  }
}
