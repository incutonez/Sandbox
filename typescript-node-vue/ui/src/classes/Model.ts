import Proxy from '@/classes/Proxy';
import IModel from '@/interfaces/IModel';
import _ from 'lodash';

interface Model extends IModel {
}

class Model {
  static proxy = {
    type: 'memory'
  };

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set... Interface?
  constructor(config: any = {}) {
    this.proxy = new Proxy(_.merge({}, Reflect.get(this.constructor, 'proxy'), config.proxy));
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

  set(data: any): void {
    for (const field in data) {
      Reflect.set(this, field, data[field]);
    }
  }
}

export default Model;
