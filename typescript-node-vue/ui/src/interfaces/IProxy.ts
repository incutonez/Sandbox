import {Method} from 'axios';

interface IProxyMethods {
  // TODO: Create enum for this
  get: Method;
  post: Method;
  put: Method;
  delete: Method;
}

export default interface IProxy {
  url: string;
  type: string;
  methods: IProxyMethods;
}
