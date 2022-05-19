import { Enum } from "../classes/Enum.js";
import {
  Collection,
  isArray,
  isObject,
} from "@incutonez/shared";

export class EnumStore extends Collection {
  constructor(data = [], model = Enum) {
    let items;
    const records = [];
    if (isObject(data)) {
      items = data.records || [];
      delete data.records;
      data.model ??= model;
      data.sorters ??= [{
        property: "value",
      }];
    }
    else {
      items = data;
    }
    super(data);
    const { displayField, idField } = this;
    if (isArray(items)) {
      items.forEach((item, index) => {
        if (!isObject(item)) {
          item = {
            [displayField]: item,
          };
        }
        item[idField] ??= index;
        records.push(item);
      });
    }
    else {
      for (const item in items) {
        records.push({
          [displayField]: item,
          [idField]: items[item],
        });
      }
    }
    this.records = records;
    const keys = {};
    this.forEach((item) => keys[item[displayField]] = item[idField]);
    Object.assign(this, keys);
  }

  getKey(value) {
    const { idField } = this;
    const found = this.find((record) => record[idField] === value);
    return found?.[this.displayField];
  }

  getValue(value) {
    const { displayField } = this;
    const found = this.find((record) => record[displayField] === value);
    return found?.[this.idField];
  }

  findRecord(id) {
    const { idField } = this;
    return this.find((record) => record[idField] === id);
  }

  toClassDescription() {
    const props = this.map((item) => ` * @property ${item[this.displayField]}`);
    return `/**\n${props.join("\n")}\n */`;
  }
}
