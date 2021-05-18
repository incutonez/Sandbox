import _ from 'lodash';
import Proxy from '@/classes/Proxy';
import {AxiosResponse} from 'axios';
import Collection from '@/classes/Collection';
import IStore from '@/interfaces/IStore';

/**
 * This is a little tricky... we extend our IStore as an interface, and then we can use a class to extend
 * something else.  We do the former, so we get all of our properties mixed in.
 * See also: https://stackoverflow.com/questions/53128744
 */
interface Store<T> extends IStore<T> {

}

class Store<T> extends Collection<T> {
  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set above and below
  constructor(type: new (data: T) => T, config: any = {}) {
    super(type);
    // TODO: How to get reference to class's static instead of using the name
    /* Order of importance... if model has a proxy, then let's start with that, and then if the store
     * has a proxy, let's override what's in the model, and finally if the instance has a proxy config
     * let's use that over all of the others */
    config = _.merge({}, {proxy: Reflect.get(type, 'proxy')}, config);
    // TODO: What's a better way of doing this instead of having to do new Model() when passing in config?
    this.proxy = new Proxy(config.proxy);
    // TODO: Problem is here... when you initially add the sorter, it's not linked to the column
    this.addSorter(config.sorters);
    this.add(config.data);
  }

  async load(): Promise<void> {
    try {
      const Response: AxiosResponse | undefined = await this.proxy.load();
      this.clear();
      this.add(Response?.data);
      this.doSort(this.sorters);
    }
    catch (ex) {
      console.error(ex);
    }
  }
}

export default Store;
