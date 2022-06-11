// TODO: How to share between UI and API?
import { AxiosRequestConfig } from "axios";

export default class Server {
  status: number;
  message: string;
  requestConfig: AxiosRequestConfig;

  constructor(config: any = {}) {
    this.status = config.status;
    this.message = config.message;
    this.requestConfig = config.requestConfig;
  }
}
