import Proxy from "ui/classes/Proxy";
import { ICollection } from "ui/interfaces/ICollection";

interface IStore<T> extends ICollection<T> {
  proxy: Proxy;
  data: T[];
  loading: boolean;
  isStore: boolean;

  load(): Promise<void>;
}

export default IStore;
