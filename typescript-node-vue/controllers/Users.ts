import {Request, Response, Router} from 'express';
import {promises} from 'fs';
import {StatusCodes} from 'http-status-codes';

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

async function getUsers() {
  const Response = await promises.readFile(`${process.cwd()}/controllers/Users.json`);
  return JSON.parse(Response.toString());
}

export default (router: Router) => {
  router.get('/users', async (req: Request, res: Response) => {
    const Users = await getUsers();
    return res.send(Users);
  });
  router.get('/users/:id', async (req: Request, res: Response) => {
    const Users: Array<IUser> = await getUsers();
    const Params: GetRequest = new GetRequest(req.params);
    const found = Users.find((item: IUser) => {
      if (item.Id === Params.id) {
        return true;
      }
    });
    if (found) {
      return res.send(found);
    }
    return res.sendStatus(StatusCodes.NOT_FOUND);
  });
}