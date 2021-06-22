import * as core from 'express-serve-static-core';

interface GetRequest {
  Id: number;
}

class GetRequest {
  constructor(config: core.ParamsDictionary) {
    this.Id = Number(config.Id);
  }
}

export default GetRequest;