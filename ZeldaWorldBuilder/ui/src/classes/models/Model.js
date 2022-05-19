import {
  clone,
  isObject,
} from "../../utilities.js";
import { v4 as uuidv4 } from "uuid";
import { isArray } from "@incutonez/shared";

// TODOJEF: Remove when we remove the Store class
class Model {
  id = uuidv4();
  set(field, value) {
    // Turn single instances into object syntax, so we can normalize the processing
    if (!isObject(field)) {
      field = {
        [field]: value,
      };
    }
    for (const key in field) {
      Reflect.set(this, key, field[key]);
    }
  }

  /**
   * If this is set, then we exclude any properties within the array when cloning or getting data
   * @returns {String[]}
   */
  get exclude() {
    return [];
  }

  get isModel() {
    return true;
  }

  getData({ exclude = this.exclude, options } = {}) {
    const data = {};
    for (const key in this) {
      if (exclude?.indexOf(key) !== -1) {
        continue;
      }
      const entry = this[key];
      if (entry?.isModel || entry?.isStore) {
        console.log(entry);
        data[key] = entry.getData({
          options,
        });
        console.log("yup!", data[key]);
      }
      else if (isObject(entry) || isArray(entry)) {
        data[key] = clone(entry);
      }
      else {
        data[key] = entry;
      }
    }
    for (const key in options) {
      data[key] = options[key];
    }
    console.log(data);
    return data;
  }

  clone(options = {}) {
    return new this.constructor(this.getData({
      options,
      exclude: this.exclude,
    }));
  }
}

export {
  Model,
};
