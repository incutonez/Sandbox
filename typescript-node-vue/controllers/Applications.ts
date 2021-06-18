import {Request, Response, Router} from 'express';
import {getManager} from 'typeorm';
import {Application} from '../db/entity/Application.js';
import utilities from '../utilities.js';

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
}