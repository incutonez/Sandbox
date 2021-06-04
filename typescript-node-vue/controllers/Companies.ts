import {Request, Response, Router} from 'express';
import {getConnection, getRepository} from 'typeorm';
import {Company} from '../db/entity/Company.js';
import {StatusCodes} from 'http-status-codes';
import GetRequest from '../classes/GetRequest.js';

export default (router: Router) => {
  router.get('/companies', async (req: Request, res: Response) => {
    try {
      const connection = getRepository(Company);
      const results = await connection.createQueryBuilder('Companies')
      .leftJoinAndSelect('Companies.Contacts', 'Contacts')
      /**
       * By default, we never include the CreateDate when selecting the Company.
       * However, we can turn this on by doing a custom createQueryBuilder and using the addSelect method
       * See also: https://stackoverflow.com/a/55169910/1253609
       */
      .addSelect(['Companies.CreateDate'])
      .getMany();
      return res.send(results);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
  router.get('/companies/:id', async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const params = new GetRequest(req.params);
      const found = await connection.manager.findOne(Company, params.id, {
        relations: ['Contacts']
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