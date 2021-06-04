import express, {Express} from 'express';
// Potentially switch to using @ imports?  https://stackoverflow.com/questions/42711175
import AppSettings from './AppSettings.js';
import Contacts from './Contacts.js';
import Companies from './Companies.js';

export default function(app: Express) {
  const Router = express.Router();
  Companies(Router);
  Contacts(Router);
  AppSettings(Router);
  app.use(process.env.BASE_API_PATH, Router);
}