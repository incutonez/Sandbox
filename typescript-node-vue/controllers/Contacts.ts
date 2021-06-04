import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {getConnection} from 'typeorm';
import {Contact} from '../db/entity/Contact.js';
import GetRequest from '../classes/GetRequest.js';

export default (router: Router) => {
  router.get('/contacts', async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const contacts = await connection.manager.find(Contact, {
        relations: ['Company']
      });
      return res.send(contacts);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
  router.get('/contacts/:id', async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const params = new GetRequest(req.params);
      const found = await connection.manager.findOne(Contact, params.id, {
        relations: ['Company']
      });
      if (found) {
        return res.send(found);
      }
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
}