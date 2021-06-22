import Proxy from '@/classes/Proxy';
import IModel from '@/interfaces/IModel';
import _ from 'lodash';
import IAssociation from '@/interfaces/IAssociation';
import Store from '@/classes/Store';
import utilities from '@/utilities';

export interface IAssociations {
  [key: string]: IAssociation;
}

interface Model extends IModel {
}

class Model {
  static proxy = {
    type: 'memory'
  };

  isModel = true;

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set... Interface?
  constructor(config: any = {}) {
    this.proxy = new Proxy(_.merge({}, Reflect.get(this.constructor, 'proxy'), config.proxy));
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

  set(field: any, data?: any): void {
    const associations = this.associations;
    if (utilities.isObject(field)) {
      data = field;
    }
    else {
      data = {
        [field]: data
      };
    }
    for (const field in data) {
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
          else {
            Reflect.set(this, field, new association.model(value));
          }
        }
      }
      else {
        Reflect.set(this, field, value);
      }
    }
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
