import {createConnection} from 'typeorm';
import config from './config.js';
import {CapacitorConnectionOptions} from 'typeorm/driver/capacitor/CapacitorConnectionOptions';

async function main() {
  await createConnection((config as CapacitorConnectionOptions));
}

main();