import { Store } from "../classes/Store.js";
import { Enum } from "../classes/Enum.js";

class EnumStore extends Store {
  constructor(data, model = Enum, sorters = [{
    property: "value",
  }]) {
    super(data, model, sorters);
  }

  initialize(items) {
    super.initialize(items);
    const keys = {};
    const { valueKey, idKey } = this;
    this.forEach((item) => keys[item[valueKey]] = item[idKey]);
    Object.assign(this, keys);
  }

  getKey(value) {
    const { idKey } = this;
    const found = this.values.find((record) => record[idKey] === value);
    return found?.[this.valueKey];
  }

  getValue(value) {
    const { valueKey } = this;
    const found = this.values.find((record) => record[valueKey] === value);
    return found?.[this.idKey];
  }

  createKey(item, alter = false) {
    // We split on uppercase
    return alter ? item.split(/([A-Z][a-z]+)/g).filter(Boolean).join("_").toUpperCase() : item;
  }

  get keys() {
    return Object.keys(this);
  }

  get values() {
    return Object.values(this);
  }

  toClassDescription() {
    return "/**\n" + this.map((item) => {
      return ` * @property ${item[this.valueKey]}`;
    }).join("\n") + "\n */";
  }
}

export {
  EnumStore,
};
