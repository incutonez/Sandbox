import {createConnection} from 'typeorm';
import * as entities from './entity/index.js';

await createConnection({
  name: 'default',
  type: 'sqlite',
  database: 'db/database_dev.db',
  synchronize: true,
  logging: false,
  /**
   * Have to load entities using actual classes
   * See also: https://stackoverflow.com/a/67040103/1253609
   * See also: https://github.com/typeorm/typeorm/issues/6997
   */
  entities: Object.values(entities),
  migrations: [
    'dist/db/migration/**/*.js'
  ],
  subscribers: [
    'dist/db/subscriber/**/*.js'
  ],
  cli: {
    entitiesDir: 'db/entity',
    migrationsDir: 'db/migration',
    subscribersDir: 'db/subscriber'
  }
});