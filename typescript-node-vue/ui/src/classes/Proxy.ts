import _ from 'lodash';
import Ajax, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Server from './exceptions/Server';
import IProxy from '@/interfaces/IProxy';

interface Proxy extends IProxy {
}

class Proxy {
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

  static async load(config: any = {}, scope: any = {
    type: 'ajax',
    methods: {
      get: 'get'
    }
  }): Promise<AxiosResponse | undefined> {
    try {
      const reqType = config.type || scope.type;
      if (reqType === 'ajax') {
        Ajax.defaults.baseURL = 'http://localhost:1337';
        const method = config.method || scope.methods.get;
        const request: AxiosRequestConfig = {
          url: config.url || scope.url,
          method: method
        };
        // Send as query params
        if (method === 'get') {
          request.params = config.params;
        }
        // Send as JSON data
        else {
          request.data = config.params;
        }
        // TODO: Potentially store last config, so we can have a reload method?
        return await Ajax.request(request);
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

  async load(config: any = {}): Promise<AxiosResponse | undefined> {
    return Proxy.load(config, this);
  }

  // TODO: Is there a better way of doing this?
  getInitialConfig(): any {
    return Object.getOwnPropertyNames(this).reduce((result: any, currentValue: string) => {
      result[currentValue] = Reflect.get(this, currentValue);
      return result;
    }, {});
  }
}

export default Proxy;
