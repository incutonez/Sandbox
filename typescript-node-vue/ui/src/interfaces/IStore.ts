import Proxy from '@/classes/Proxy';
import {ICollection} from '@/interfaces/ICollection';

interface IStore<T> extends ICollection<T> {
  proxy: Proxy;
  data: T[];
  loading: boolean;

  load(): Promise<void>;
}

export default IStore;
