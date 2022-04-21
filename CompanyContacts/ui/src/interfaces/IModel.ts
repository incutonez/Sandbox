import Proxy from '@/classes/Proxy';
import {IFieldValue} from '@/interfaces/Components';
import IKeyValue from '@jef/shared/interfaces/IKeyValue';

export default interface IModel {
  proxy: Proxy;
  isModel: boolean;
  idKey: string;
  exists: boolean;
  saveExclude?: IKeyValue;

  showExpander(): boolean;

  load(config: any): Promise<void>;

  save(config?: any): Promise<void>;

  set(field: any, data?: any): void;

  setAll(data: any): void;

  get(field: string): IFieldValue;

  clone(): IModel;
}
