import Proxy from '@/classes/Proxy';

export default class Model {
  proxy: Proxy;

  // TODO: How to codify this instead of using any?  It's like I'm using the fields I set... Interface?
  constructor(config: any = {}) {
    this.proxy = new Proxy(config.proxy);
  }

  // TODO: Had to add the default config here, otherwise, we'd get an error
  async load(config: any) {
    try {
      const Response = await this.proxy.load(config);
      this.set(Response?.data);
      // TODO: Potentially use a spread operator here?  Object.assign(this, Response)
    }
    catch (ex) {
      console.error(ex);
    }
  }

  set(data: any) {
    for (const field in data) {
      // @ts-ignore
      this[field] = data[field];
      console.log('setting', field, data[field]);
    }
  }
}
