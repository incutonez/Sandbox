import {Request, Response, Router} from 'express';
import {getConnection, getRepository} from 'typeorm';
import {Company} from '../db/entity/Company.js';
import {StatusCodes} from 'http-status-codes';
import GetRequest from '../classes/GetRequest.js';
import utilities from '../utilities.js';

const RoutePrefix = '/companies';

export default (router: Router) => {
  router.get(RoutePrefix, async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const found = await connection.manager.find(Company);
      if (found) {
        return res.send(found);
      }
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    catch (ex) {
      return res.send(ex);
    }
  });

  router.post(RoutePrefix, async (req: Request, res: Response) => {
    try {
      const repo = getRepository(Company);
      await repo.save(req.body);
      return res.sendStatus(StatusCodes.CREATED);
    }
    catch (ex) {
      res.send(ex);
    }
  });

  router.post(`${RoutePrefix}/search`, async (req: Request, res: Response) => {
    try {
      const connection = getRepository(Company);
      const results = await connection.createQueryBuilder('Companies')
      .leftJoinAndSelect('Companies.Contacts', 'Contacts')
      .leftJoinAndSelect('Companies.Applications', 'Applications')
      /**
       * By default, we never include the CreateDate when selecting the Company.
       * However, we can turn this on by doing a custom createQueryBuilder and using the addSelect method
       * See also: https://stackoverflow.com/a/55169910/1253609
       */
      .addSelect(['Companies.CreateDate'])
      .where(utilities.createWhere(req.body))
      .getMany();
      return res.send(results);
    }
    catch (ex) {
      return res.send(ex);
    }
  });

  router.get(`${RoutePrefix}/:Id`, async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const params = new GetRequest(req.params);
      const found = await connection.manager.findOne(Company, params.Id, {
        relations: ['Contacts', 'Applications']
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

  router.put(`${RoutePrefix}/:Id`, async (req: Request, res: Response) => {
    try {
      const table = getRepository(Company);
      await table.save(req.body);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
}