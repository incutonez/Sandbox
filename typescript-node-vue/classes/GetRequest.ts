import * as core from 'express-serve-static-core';

interface GetRequest {
  id: number;
}

class GetRequest {
  constructor(config: core.ParamsDictionary) {
    this.id = Number(config.id);
  }
}

export default GetRequest;