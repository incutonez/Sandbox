import Proxy from '@/classes/Proxy';

// TODO: How to do mixin?
interface IStore<T> {
  proxy: Proxy;
  data: any[];

  load(): Promise<void>;
}

export default IStore;
