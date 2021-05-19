import Proxy from '@/classes/Proxy';

interface IStore<T> {
  proxy: Proxy;
  data: T[];

  load(): Promise<void>;
}

export default IStore;
