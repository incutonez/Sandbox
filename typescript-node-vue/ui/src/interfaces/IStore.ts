import Model from '@/classes/Model';
import Proxy from '@/classes/Proxy';
import ISorter from '@/interfaces/ISorter';

// TODO: How to do mixin?
export default interface IStore {
  model?: Model;
  proxy?: Proxy;
  sorters?: Array<ISorter>
}
