import _ from 'lodash';
import Model from '@/classes/Model';
import Proxy from '@/classes/Proxy';
import {AxiosResponse} from 'axios';
import Sorter from '@/interfaces/ISorter';
import Collection from '@/classes/Collection';

interface Store {
  model: Model;
  proxy: Proxy;
  sorters: Collection<Sorter>;
  events: EventTarget;
  data: any[];
}

class Store extends Array {
  sorters = new Collection<Sorter>(Sorter);

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set above and below
  constructor(config: any = {}) {
    super();
    // TODO: How to get reference to class's static instead of using the name
    /* Order of importance... if model has a proxy, then let's start with that, and then if the store
     * has a proxy, let's override what's in the model, and finally if the instance has a proxy config
     * let's use that over all of the others */
    config = _.merge({}, {proxy: config.model.proxy}, config);
    // TODO: What's a better way of doing this instead of having to do new Model() when passing in config?
    this.model = config.model;
    this.proxy = new Proxy(config.proxy);
    // this.sorters.push(...config.sorters);
    this.events = new EventTarget();
    this.add(config.data);
  }

  async load(): Promise<void> {
    try {
      const Response: AxiosResponse | undefined = await this.proxy.load();
      this.clear();
      this.add(Response?.data);
    }
    catch (ex) {
      console.error(ex);
    }
  }

  add(data: any): void {
    if (data) {
      const Model: any = this.model;
      data = data.map((item: Model) => {
        return new Model(item);
      });
      this.push(...data);
    }
  }

  first(): Model {
    return this[0];
  }

  last(): Model {
    return this[this.length - 1];
  }

  clear(): void {
    while (this.length) {
      this.pop();
    }
  }

  // TODO: Get a dupe func warning here
  // doSort(sorters: Sorter): void {
  //   this.doSort([sorters]);
  // }

  doSort(sorters: Collection<Sorter>): void {
    this.sort((lhs: Model, rhs: Model) => {
      let result = 0;
      for (let i = 0; i < sorters.length; i++) {
        const sorter = sorters[i];
        const direction = sorter.direction === 'ASC' ? 1 : -1;
        const fields = sorter.field && sorter.field.split('.');
        if (fields) {
          let field = fields[0];
          let lhsValue = Reflect.get(lhs, field);
          let rhsValue = Reflect.get(rhs, field);
          for (let j = 1; j < fields.length; j++) {
            field = fields[j];
            lhsValue = lhsValue[field];
            rhsValue = rhsValue[field];
          }
          if (lhsValue === rhsValue) {
            continue;
          }
          else if (lhsValue < rhsValue) {
            result = -1 * direction;
            break;
          }
          result = 1 * direction;
          break;
        }
      }
      return result;
    });
    this.emit('sort');
  }

  // TODO: I think I keep adding sorters here if they sort on columns... need to remove
  addSorter(sorter: Sorter | Sorter[], clear: boolean): void {
    if (clear) {
      this.sorters.clear();
    }
    if (Array.isArray(sorter)) {
      this.sorters.add(sorter);
    }
    else {
      this.sorters.add(sorter);
    }
    this.doSort(this.sorters);
  }

  emit(event: string): void {
    this.events.dispatchEvent(new Event(event));
  }

  on(event: string, handler: () => void): void {
    this.events.addEventListener(event, handler);
  }

  off(event: string, handler: () => void): void {
    this.events.removeEventListener(event, handler);
  }
}

export default Store;
