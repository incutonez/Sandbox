const db = require('../database');
const GameModel = db.conn.define('Game', {
  Id: {
    type: db.orm.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: db.orm.STRING,
    allowNull: false
  },
  Room: {
    type: db.orm.STRING
  }
}, {
  timestamps: true,
  createdAt: 'CreateDate',
  updatedAt: 'UpdateDate',
  deletedAt: false
});

db.conn.sync().then(() => {
  console.log('Game table synced.');
});

module.exports = GameModel;