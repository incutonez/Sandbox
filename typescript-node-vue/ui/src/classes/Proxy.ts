import _ from 'lodash';
import Ajax, {Method, AxiosResponse} from 'axios';
import Server from './exceptions/Server';

interface IProxyMethods {
  // TODO: Create enum for this
  get: Method;
  post: Method;
  put: Method;
  delete: Method;
}

export interface IProxy {
  url: string;
  type: string;
  methods: IProxyMethods;
}

export default class Proxy {
  url: string;
  type: string;
  methods: IProxyMethods;

  static configs: IProxy = {
    url: '',
    type: 'memory',
    methods: {
      get: 'get',
      post: 'post',
      put: 'put',
      delete: 'delete'
    }
  };

  constructor(config: any) {
    config = _.merge({}, Proxy.configs, config);
    this.url = config.url;
    this.type = config.type;
    this.methods = config.methods;
  }

  async load(config: any = {}): Promise<AxiosResponse | undefined> {
    try {
      if (this.type === 'ajax') {
        Ajax.defaults.baseURL = 'http://localhost:1337';
        // TODO: Potentially store last config, so we can have a reload method?
        return await Ajax.request({
          url: config.url || this.url,
          method: config.method || this.methods.get
        });
      }
    }
    catch (ex) {
      const Response: AxiosResponse = ex.response;
      throw new Server({
        status: Response.status,
        message: Response.statusText,
        requestConfig: Response.config
      });
    }
  }

  // TODO: Is there a better way of doing this?
  getInitialConfig(): any {
    const Me: this = this;
    return Object.getOwnPropertyNames(Me).reduce(function(result: any, currentValue: string) {
      result[currentValue] = Reflect.get(Me, currentValue);
      return result;
    }, {});
  }
}
