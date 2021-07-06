import Proxy from '@/classes/Proxy';
import IModel from '@/interfaces/IModel';
import IAssociation from '@/interfaces/IAssociation';
import Store from '@/classes/Store';
import utilities from '@/utilities';
import {IValueAttribute} from '@/interfaces/Components';
import IKeyValue from '@/interfaces/IKeyValue';

export interface IAssociations {
  [key: string]: IAssociation;
}

interface Model extends IModel {
}

class Model {
  static proxy = {
    type: 'memory'
  };

  idKey = 'Id';
  isModel = true;

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set... Interface?
  constructor(config: any = {}) {
    this.proxy = new Proxy(utilities.merge({}, Reflect.get(this.constructor, 'proxy'), config.proxy));
    this.set(config);
  }

  // TODO: Had to add the default config here, otherwise, we'd get an error
  async load(config: any): Promise<void> {
    try {
      const Response = await this.proxy?.load(config);
      this.set(Response?.data);
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
        if (reqType === 'rest') {
          url = `${url}/${this.get(this.idKey)}`;
        }
      }
      const Response = await this.proxy?.save({
        url: url,
        params: this.getData(this.saveExclude)
      });
      const data = Response?.data;
      if (data) {
        this.set(data);
      }
    }
    catch (ex) {
      console.error(ex);
    }
  }

  set(field: any, data?: any): void {
    const associations = this.associations;
    const protectedFields = this.protectedFields;
    if (utilities.isObject(field)) {
      data = field;
    }
    else {
      data = {
        [field]: data
      };
    }
    for (const field in data) {
      // Make sure we're only setting fields
      /* TODO: There doesn't seem to be a great way of determining the properties unless they're actually
       * created... JavaScript requires that a field has an initialized value in order for it to exist...
       * maybe should come up with a separate "fields" object or something, as it's possible some interface
       * properties won't exist when the class is created, which would make getFields kind of useless? */
      if (protectedFields.indexOf(field) !== -1) {
        continue;
      }
      const value = data[field];
      const association = associations && associations[field];
      if (association) {
        if (association.type === 'store') {
          const store = Reflect.get(this, field);
          if (store) {
            store.add(value);
          }
          else {
            Reflect.set(this, field, new Store(association.model, {
              data: value
            }));
          }
        }
        else if (association.type === 'model') {
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

  get(field: string): IValueAttribute {
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

  get fields(): string[] {
    const protectedFields = this.protectedFields;
    const fields = Object.getOwnPropertyNames(this);
    return fields.filter((field) => {
      return protectedFields.indexOf(field) === -1;
    });
  }

  get protectedFields(): string[] {
    return ['proxy', 'isModel', 'idKey', 'saveExclude'];
  }

  get associations(): IAssociations | null {
    return null;
  }

  get url(): string {
    return this.proxy.url;
  }

  // TODO: Potentially loop through associations and figure this out?
  showExpander(): boolean {
    return false;
  }
}

export default Model;
