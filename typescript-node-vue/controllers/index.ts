import express, {Express} from 'express';
import users from './Users.js';

export default function(app: Express) {
  const Router = express.Router();
  users(Router);
  app.use(process.env.BASE_API_PATH, Router);
}