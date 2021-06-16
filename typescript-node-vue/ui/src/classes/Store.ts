import Proxy from '@/classes/Proxy';
import {AxiosResponse} from 'axios';
import Collection from '@/classes/Collection';
import IStore from '@/interfaces/IStore';
import utilities from '@/utilities';

/**
 * This is a little tricky... we extend our IStore as an interface, and then we can use a class to extend
 * something else.  We do the former, so we get all of our properties mixed in.
 * See also: https://stackoverflow.com/questions/53128744
 */
interface Store<T> extends IStore<T> {

}

class Store<T> extends Collection<T> {
  static proxy = {};

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set above and below
  constructor(type: new (data: T) => T, config: any = {}) {
    super(type);
    this.loading = false;
    /* Order of importance... if model has a proxy, then let's start with that, and then if the store
     * has a proxy, let's override what's in the model, and finally if the instance has a proxy config
     * let's use that over all of the others */
    config = utilities.merge({}, {proxy: Reflect.get(type, 'proxy')}, {proxy: Reflect.get(this.constructor, 'proxy')}, config);
    this.proxy = new Proxy(config.proxy);
    // TODO: Problem is here... when you initially add the sorter, it's not linked to the column
    this.addSorter(config.sorters);
    this.add(config.data);
  }

  async load(config?: any): Promise<void> {
    try {
      this.loading = true;
      const Response: AxiosResponse | undefined = await this.proxy.load(config);
      this.clear();
      this.add(Response?.data);
      this.doSort(this.sorters);
      this.loading = false;
    }
    catch (ex) {
      this.logException(ex);
    }
  }
}

export default Store;
