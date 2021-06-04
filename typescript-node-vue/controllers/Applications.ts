import {Request, Response, Router} from 'express';
import {getConnection} from 'typeorm';
import {Application} from '../db/entity/Application.js';

export default (router: Router) => {
  router.get('/applications', async (req: Request, res: Response) => {
    try {
      const connection = getConnection();
      const results = await connection.manager.find(Application, {
        relations: ['Contacts', 'Company']
      });
      return res.send(results);
    }
    catch (ex) {
      return res.send(ex);
    }
  });
}