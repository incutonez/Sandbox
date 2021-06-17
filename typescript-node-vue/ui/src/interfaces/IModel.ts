import Proxy from '@/classes/Proxy';

export default interface IModel {
  proxy: Proxy;

  showExpander(): boolean;
}
