import Proxy from '@/classes/Proxy';

interface IStore<T> {
  proxy: Proxy;
  data: T[];
  loading: boolean;

  load(): Promise<void>;
}

export default IStore;
