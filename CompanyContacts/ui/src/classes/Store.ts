import Proxy from "ui/classes/Proxy";
import { AxiosResponse } from "axios";
import Collection from "ui/classes/Collection";
import IStore from "ui/interfaces/IStore";
import utilities from "ui/utilities";
import IKeyValue from "@jef/shared/interfaces/IKeyValue";

/**
 * This is a little tricky... we extend our IStore as an interface, and then we can use a class to extend
 * something else.  We do the former, so we get all of our properties mixed in.
 * See also: https://stackoverflow.com/questions/53128744
 */
interface Store<T> extends IStore<T> {

}

class Store<T> extends Collection<T> {
  static proxy = {};

  isStore = true;
  loading = false;

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set above and below
  constructor(type: new (data: T) => T, config: any = {}) {
    super(type);
    /* Order of importance... if model has a proxy, then let's start with that, and then if the store
     * has a proxy, let's override what's in the model, and finally if the instance has a proxy config
     * let's use that over all of the others */
    config = utilities.merge({}, {
      proxy: Reflect.get(type, "proxy"),
    }, {
      proxy: Reflect.get(this.constructor, "proxy"),
    }, config);
    this.proxy = new Proxy(config.proxy);
    // TODO: Problem is here... when you initially add the sorter, it's not linked to the column
    this.addSorter(config.sorters);
    this.add(config.data);
    if (config.autoLoad) {
      this.load();
    }
  }

  async load(config?: any): Promise<void> {
    this.loading = true;
    try {
      config = config || {};
      const Response: AxiosResponse | undefined = await this.proxy.load(config);
      this.clear();
      this.add(Response?.data);
      this.doSort(this.sorters);
    }
    catch (ex) {
      this.logException(ex);
    }
    this.loading = false;
  }

  getData(excluded: IKeyValue = {}): any[] {
    const data: any[] = [];
    this.forEach((record) => {
      data.push(record.getData(excluded));
    });
    return data;
  }

  get url(): string {
    return this.proxy.url;
  }
}

export default Store;
