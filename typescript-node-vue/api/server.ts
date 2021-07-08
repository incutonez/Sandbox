import express from 'express';
import dotenv from 'dotenv';
import ip from 'ip';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import controllers from './controllers/index.js';
import cors from 'cors';
import 'reflect-metadata';
import './db/config.js';

dotenv.config();
const App = express();
const Server = http.createServer(App);

/**
 * __dirname was removed, so we have to use path.dirname in conjunction with fileURLToPath and import.meta.url
 * See also: https://github.com/nodejs/help/issues/2907
 */
const Dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
App.use(express.static(process.env.NODE_ENV === 'production' ? `${Dir}${process.env.UI_DIR_PROD}` : `${Dir}${process.env.UI_DIR}`));
App.use(express.json());
/**
 * When using the Vue CLI locally, it's on a different port, but we set Axios to use the server's port
 * See also: https://expressjs.com/en/resources/middleware/cors.html
 */
App.use(cors());
controllers(App);

Server.listen(process.env.PORT, () => {
  console.log('running on', process.env.PORT, ip.address());
});