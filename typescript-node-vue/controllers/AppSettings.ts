import {Request, Response, Router} from 'express';
import Enums from '../shared/enums/index.js';

export default (router: Router) => {
  router.get('/appsettings', async (req: Request, res: Response) => {
    return res.send({
      Constants: Enums
    });
  });
}