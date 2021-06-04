export default {
  'name': 'default',
  'type': 'sqlite',
  'database': './database_dev.db',
  'synchronize': true,
  'logging': false,
  'entities': [
    'dist/db/entity/**/*.js'
  ],
  'migrations': [
    'dist/db/migration/**/*.js'
  ],
  'subscribers': [
    'dist/db/subscriber/**/*.js'
  ],
  'cli': {
    'entitiesDir': 'db/entity',
    'migrationsDir': 'db/migration',
    'subscribersDir': 'db/subscriber'
  }
};