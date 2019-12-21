let db = process.env.DB_DIALECT === 'sqlite' ? require('./config/sqlite') : require('./config/mssql');
db.User = db.conn.import('./models/User');
db.Team = db.conn.import('./models/Team');

for (let key in db) {
  let model = db[key];
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
}

db.conn.sync().then(() => {
  console.log('Tables synced.');
}).catch((err) => {
  console.log(err);
});
module.exports = db;