import {IFieldValue} from '@/interfaces/Components';

export default interface IBaseCollection<T> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  type: new (data: any) => T;

  add(args: T | T[]): void;

  clear(): void;

  first(): T;

  last(): T;

  collect(field: string): IFieldValue[];
}
