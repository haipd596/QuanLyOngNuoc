import { generateUniqId } from './generateUniqId';

export class UniqId {
  static ids: string[] = [];

  key: string;

  prefix: string = '';

  constructor(prefix: string, key?: string) {
    this.prefix = prefix;
    this.key = key || '';
    this.generateFieldKey();
  }

  addKey(key: string) {
    if (!UniqId.ids.includes(key)) {
      UniqId.ids.push(key);
    }

    return this;
  }

  generateFieldKey() {
    if (this.key) {
      UniqId.ids.push(this.key);
      return this;
    }

    if (!this.key) {
      const key = generateUniqId(this.prefix);
      if (UniqId.ids.includes(key)) {
        this.generateFieldKey();
        return this;
      }
      this.key = key;
    }

    return this;
  }
}
