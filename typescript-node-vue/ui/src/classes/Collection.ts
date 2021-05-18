class Collection<T> extends Array<T> {
  type: new (data: any) => T;

  constructor(type: new (data: T) => T, args?: any) {
    super();
    this.type = type;
    this.add(args);
  }

  add(args: T | T[]) {
    if (!args) {
      return;
    }
    if (!Array.isArray(args)) {
      args = [args];
    }
    args.forEach(item => this.push(item));
  }

  clear() {
    while (this.length) {
      this.pop();
    }
  }
}

export default Collection;
