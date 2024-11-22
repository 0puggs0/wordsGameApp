import { MMKV } from "react-native-mmkv";
export type StorageKey = "token";
export class Storage {
  private static storage = new MMKV();
  static set = (key: StorageKey, value: string) => {
    this.storage.set(key, value);
  };
  static get = (key: StorageKey) => {
    return this.storage.getString(key);
  };
  static clearAll = () => {
    return this.storage.clearAll();
  };
}
