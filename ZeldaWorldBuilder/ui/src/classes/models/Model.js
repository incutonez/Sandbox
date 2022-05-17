import {
  clone,
  isObject,
} from "../../utilities.js";
import { v4 as uuidv4 } from "uuid";

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

  getData({ exclude, options } = {}) {
    const data = {};
    for (const key in this) {
      if (exclude?.indexOf(key) !== -1) {
        continue;
      }
      data[key] = this[key];
    }
    for (const key in options) {
      data[key] = options[key];
    }
    return clone(data);
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
