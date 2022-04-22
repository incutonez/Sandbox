import Proxy from "ui/classes/Proxy";
import Store from "ui/classes/Store";
import utilities from "ui/utilities";
import { IFieldValue } from "ui/interfaces/Components";
import IKeyValue from "@jef/shared/interfaces/IKeyValue";
import IModel from "ui/interfaces/IModel";
import { IAssociations } from "ui/interfaces/IAssociation";

interface Model extends IModel {
}

// TODO: https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABGBAxGBTANgEwBQZggC2GATgIYBGWGA-AFyJVxy0VgCUiA3gFCJEZDFBBkkoSLAR4oFMgHMRTDgE8ANIgDWGVUwDOUMjDALu-QYIDyVAFYZoAOhwZgJjAAUycAA7koqrLySlCaOhq8ApaC+iJ4AG4UWCAY5lHR1nYOUM6u7l6+-oFQABYw+mG6mhYZ0YnJGJqEJOTUtEzNpJQ0jYgA7sZyPUxGKZoQCG4KYm0YI2Qp6RkAvpwA3EuCy+qbiJ2tw4ijjbsTYFMzh8dLqxtbG8t8TxBYFPr6iACCkdEAAihgdDYfCcJYYAAe5SgHwAvEcFhgNkszoYFtA4GQ8GcpoxEGo0rVMvYnG99DAFGBZGUKohseT1rtBCi2BhHFg4AoqeVHG5gfpQdFHksQohebh9HgCYThKJxIgbMScuEJaVygzBXwhS9SYgAEJ7cFQQg4D7fGqCAASMCYRGIVHIiAAPohwC43GAMDgkdEUaN0Zi6QpcfifoT9CA-JiFdlHKTyZSeFamABGba0yb09WWR5ahCGIQODE4RBwj19PWSpHM2hsjl4YQTMg4HmYcXrIA
class Model {
  static proxy = {
    type: "memory",
  };

  idKey = "Id";
  isModel = true;
  // Signifies whether the record exists on the server or not
  exists = false;

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set... Interface?
  constructor(config: any = {}) {
    this.proxy = new Proxy(utilities.merge({
      type: "memory",
    }, Reflect.get(this.constructor, "proxy"), config.proxy));
    this.setAll(config);
  }

  // TODO: Had to add the default config here, otherwise, we'd get an error
  async load(config: any): Promise<void> {
    try {
      if (!config.url) {
        if (this.proxy.type === "rest") {
          config.url = `${this.url}/${this.get(this.idKey)}`;
        }
      }
      const Response = await this.proxy?.load(config);
      this.exists = true;
      this.setAll(Response?.data);
    }
    catch (ex) {
      console.error(ex);
    }
  }

  async save(config: any = {}): Promise<void> {
    try {
      let url = config.url;
      if (!url) {
        const reqType = this.proxy.type;
        url = this.url;
        if (reqType === "rest" && this.exists) {
          url = `${url}/${this.get(this.idKey)}`;
        }
      }
      const Response = await this.proxy?.save({
        url: url,
        method: this.exists ? this.proxy.methods.put : "post",
        params: this.getData(this.saveExclude),
      });
      const data = Response?.data;
      if (data) {
        this.setAll(data);
      }
    }
    catch (ex) {
      console.error(ex);
    }
  }

  /**
   * This method will set all properties for this class, as it's based off of what's in the fields
   * getter.
   * @param data
   */
  setAll(data: any): void {
    this.fields.forEach((field) => {
      this.set(field, data[field]);
    });
  }

  set(field: any, data?: any): void {
    const associations = this.associations;
    // If first param is an object, we're updating in bulk
    if (utilities.isObject(field)) {
      data = field;
    }
    // Otherwise, set data to object, so we can use it appropriately
    else {
      data = {
        [field]: data,
      };
    }
    for (const field in data) {
      // Make sure we're only setting fields
      /* TODO: There doesn't seem to be a great way of determining the properties unless they're actually
       * created... JavaScript requires that a field has an initialized value in order for it to exist...
       * maybe should come up with a separate "fields" object or something, as it's possible some interface
       * properties won't exist when the class is created, which would make getFields kind of useless? */
      const value = data[field];
      const association = associations && associations[field];
      if (association) {
        if (association.type === "store") {
          const store = this.get(field) as Store<Model>;
          if (store) {
            store.add(value);
          }
          else {
            Reflect.set(this, field, new Store(association.model, {
              data: value,
            }));
          }
        }
        else if (association.type === "model") {
          const model = Reflect.get(this, field);
          if (model) {
            model.set(value);
          }
          // We don't create an empty association if there's no data
          else if (value) {
            Reflect.set(this, field, new association.model(value));
          }
        }
      }
      else {
        Reflect.set(this, field, value);
      }
    }
  }

  get(field: string): IFieldValue {
    return Reflect.get(this, field);
  }

  getData(excluded?: IKeyValue): any {
    const data: IKeyValue = {};
    const fields = this.fields;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const exclude = excluded && excluded[field];
      // If we have an object, then that means we're wanting to exclude association properties
      if (!exclude || utilities.isObject(exclude)) {
        let item = Reflect.get(this, field);
        if (item && (item.isModel || item.isStore)) {
          item = item.getData(exclude);
        }
        data[field] = item;
      }
    }
    return data;
  }

  // TODO: https://www.typescriptlang.org/play?#code/C4TwDgpgBAsghmAygYwBYQLZwCrggZygF4oBvAKCin2ACcBLAOwHMAuaup5gbkqieARmEWu0YBXDACMRvKgBM4g9gBElEOVCkB7bQBsIcRux37DjXgF9y5UJFgIU6LAB5sUCAA9BjeYQBKEMjatPIuNAwsADRQANYQINoAZg5IaJg4ePgAfNnEZHwAtLSG8tqMeiBQANoA0vyMcQnJUNgAuuzwac6ZkPjV2HVtbeTW5MGMNFBJ9BB6fvkUVFQAcnAYEOwA5BFcW1F8VACS8tsCQiJbo1BwhBM0vHbQRzDa8nP5XU4ZLk8tM3M-NleORzrQknBkNBXu89B5vBBfIQXm8PhRRjZkHpboQYWjDlB7nRxMhgCEABQASgKy1phPK+DMADo9NpmOStsg4Ho9HsYsBUPR8EzhMAAGKzeb4KmUzRUMa00USwHSiYzNgcSLMaptfI66lLOlUNX0Zj5E3MJkTLnAckAeSkACsgsAmfEQNKAVLKZSCbSSsBxLRGha5VBrGMiVplVLFgSAELY1DbXYsK6WG53BnAEFPKBHeOfRzpVx-FJSGNAqAAMnzeL0IKxOKgha8PgW9ZpyyVkr8VK7RoDQca+HEkFoIog4t70odztJboS0orM59YYjmOzUBKwVC+UYEAA7i2qeQdyF5JPpyqqdwgA?
  get fields(): string[] {
    throw new Error("Implement method");
  }

  get associations(): IAssociations | null {
    return null;
  }

  get url(): string {
    return this.proxy.url;
  }

  // Idea taken from https://stackoverflow.com/a/44782052/1253609
  clone(): Model {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  // TODO: Potentially loop through associations and figure this out?
  showExpander(): boolean {
    return false;
  }
}

export default Model;
