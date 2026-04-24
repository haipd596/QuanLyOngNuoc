import { TFunction } from '@packages/@types';
import { Field } from '@packages/schema/fields/fieldModel';

class Observable<T> {
  observers: { key: string, func: TFunction<T> }[];

  constructor() {
    this.observers = [];
  }

  subscribe(key: string, func: TFunction<T>) {
    this.observers.push({ key, func });
  }

  cleanup() {
    this.observers = [];
  }

  unsubscribe(keyToRemoved: string) {
    this.observers = this.observers.filter(({ key }) => key !== keyToRemoved);
  }

  notify(data: T, cb: any) {
    this.observers.forEach(({ func }) => func(data, cb));
  }

  notifyByKey(key: string, data: T) {
    this.observers.forEach(({ func, key: _key }) => {
      if (key === _key) {
        func(data, () => {});
      }
    });
  }
}

/**
 * Apply the code to form viewer when change field properties
 */
export const observableAutoRun = new Observable<Field[]>();

export const observableTableRefChange = new Observable<Field[]>();

export const observableRangPicker = new Observable<Field[]>();
