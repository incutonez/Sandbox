import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
// import {getConnection} from 'typeorm';
// import Contact from '../db/entity/Contact.js';

// TODO: Potentially create more generic approach https://dev.to/dakdevs/extend-express-request-in-typescript-1693
class GetRequest {
  id: number;

  constructor(config: any = {}) {
    this.id = Number(config.id);
  }
}

// TODO: Figure out how to share between API and UI... I think I'll need to make a mixin
interface IUser {
  Id: number,
  UserName: string
}

export default (router: Router) => {
  router.get('/users', async (req: Request, res: Response) => {
    // const connection = getConnection();
    // const contacts = await connection.manager.find(Contact);
    // return res.send(contacts);
    return res.sendStatus(StatusCodes.NOT_FOUND);
  });
  router.get('/users/:id', async (req: Request, res: Response) => {
    // const connection = getConnection();
    // const Params: GetRequest = new GetRequest(req.params);
    // const found = await connection.manager.findOne(Contact, Params.id);
    // if (found) {
    //   return res.send(found);
    // }
    return res.sendStatus(StatusCodes.NOT_FOUND);
  });
}