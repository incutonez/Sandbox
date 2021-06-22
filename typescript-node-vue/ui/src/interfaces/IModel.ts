import Proxy from '@/classes/Proxy';

export default interface IModel {
  proxy: Proxy;
  isModel: boolean;

  showExpander(): boolean;

  set(field: any, data?: any): void;
}
