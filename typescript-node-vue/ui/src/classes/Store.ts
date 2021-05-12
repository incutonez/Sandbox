import _ from 'lodash';
import Model from '@/classes/Model';
import Proxy from '@/classes/Proxy';
import {AxiosResponse} from 'axios';

// TODO: Seems redundant?
interface IStore {
  model?: Model
  proxy?: Proxy
}

export default class Store extends Array {
  model: Model;
  proxy: Proxy;

  static configs: IStore = {};

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set above and below
  constructor(config: any = {}) {
    // TODO: How to get reference to class's static instead of using the name
    /* Order of importance... if model has a proxy, then let's start with that, and then if the store
     * has a proxy, let's override what's in the model, and finally if the instance has a proxy config
     * let's use that over all of the others */
    config = _.merge({}, {proxy: config.model.configs.proxy}, Store.configs, config);
    super();
    // TODO: What's a better way of doing this instead of having to do new Model() when passing in config?
    this.model = config.model;
    this.proxy = new Proxy(config.proxy);
  }

  async load() {
    try {
      const Response: AxiosResponse | undefined = await this.proxy.load();
      this.clear();
      this.add(Response?.data);
    }
    catch (ex) {
      console.error(ex);
    }
  }

  add(data: any) {
    if (data) {
      const Model: any = this.model;
      data = data.map((item: Model) => {
        return new Model(item);
      });
      this.push(...data);
    }
  }

  first() {
    return this[0];
  }

  last() {
    return this[this.length - 1];
  }

  clear() {
    while (this.length) {
      this.pop();
    }
  }
}
