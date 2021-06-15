import {Request, Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {getManager} from 'typeorm';
import {Contact} from '../db/entity/Contact.js';
import GetRequest from '../classes/GetRequest.js';
import utilities from '../utilities.js';

const RoutePrefix = '/contacts';

export default (router: Router) => {
  router.get(RoutePrefix, async (req: Request, res: Response) => {
    try {
      const manager = getManager();
      const contacts = await manager.find(Contact);
      return res.send(contacts);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
  router.post(`${RoutePrefix}/search`, async (req: Request, res: Response) => {
    try {
      const manager = getManager();
      const contacts = await manager.find(Contact, {
        relations: ['Company', 'Application'],
        where: utilities.createWhere(req.body)
      });
      return res.send(contacts);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
  router.get(`${RoutePrefix}/:id`, async (req: Request, res: Response) => {
    try {
      const manager = getManager();
      const params = new GetRequest(req.params);
      const found = await manager.findOne(Contact, params.id, {
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