import Proxy from '@/classes/Proxy';
import {IValueAttribute} from '@/interfaces/Components';

export default interface IModel {
  proxy: Proxy;
  isModel: boolean;

  showExpander(): boolean;

  set(field: any, data?: any): void;

  get(field: string): IValueAttribute;
}
