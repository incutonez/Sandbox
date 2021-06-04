import express, {Express} from 'express';
// Potentially switch to using @ imports?  https://stackoverflow.com/questions/42711175
import users from './Users.js';
import AppSettings from './AppSettings.js';

export default function(app: Express) {
  const Router = express.Router();
  users(Router);
  AppSettings(Router);
  app.use(process.env.BASE_API_PATH, Router);
}