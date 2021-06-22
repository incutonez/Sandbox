import {Request, Response, Router} from 'express';
import {getManager} from 'typeorm';
import {Application} from '../db/entity/Application.js';
import utilities from '../utilities.js';
import GetRequest from '../classes/GetRequest.js';
import {StatusCodes} from 'http-status-codes';

const RoutePrefix = '/applications/';

export default (router: Router) => {
  router.post(`${RoutePrefix}search`, async (req: Request, res: Response) => {
    try {
      const manager = getManager();
      const results = await manager.createQueryBuilder(Application, 'application')
      .leftJoinAndSelect('application.Contacts', 'Contacts')
      .leftJoinAndSelect('application.Company', 'Company')
      .addSelect(['application.CreateDate'])
      .where(utilities.createWhere(req.body))
      .getMany();
      return res.send(results);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
  router.get(`${RoutePrefix}:Id`, async (req: Request, res: Response) => {
    try {
      const manager = getManager();
      const params = new GetRequest(req.params);
      const results = await manager.findOne(Application, {
        where: params,
        relations: ['Contacts', 'Company']
      });
      if (results) {
        return res.send(results);
      }
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
}