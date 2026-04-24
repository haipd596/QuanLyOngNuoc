import { AnyObject } from 'antd/es/_util/type';

export class LocalStorageCache {
  _name: string;

  _data: AnyObject;

  constructor(name: string) {
    this._name = name;
    this._data = {};
  }

  putCache(data: AnyObject) {
    try {
      localStorage.setItem(this._name, JSON.stringify(data));
      this._data = data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  getCache() {
    try {
      const dataFromCache = localStorage.getItem(this._name);

      if (dataFromCache) {
        return JSON.parse(dataFromCache);
      }
      return null;

      // throw new Error(`Not found cache for ${this._name}`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
