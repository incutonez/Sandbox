import Proxy from '@/classes/Proxy';
import {IFieldValue} from '@/interfaces/Components';
import IKeyValue from '@/interfaces/IKeyValue';

export default interface IModel {
  proxy: Proxy;
  isModel: boolean;
  idKey: string;
  saveExclude?: IKeyValue;

  showExpander(): boolean;

  load(config: any): Promise<void>;

  save(config?: any): Promise<void>;

  set(field: any, data?: any): void;

  get(field: string): IFieldValue;

  clone(): IModel;
}
