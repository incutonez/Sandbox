export default interface IBaseCollection<T> {
  type: new (data: any) => T;

  add(args: T | T[]): void;

  clear(): void;

  first(): T;

  last(): T;

  emit(event: string): void;

  on(event: string, handler: () => void): void;

  off(event: string, handler: () => void): void;
}
