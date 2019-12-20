const db = require('../database');
const TeamModel = db.conn.define('Team', {
  Id: {
    type: db.orm.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: db.orm.STRING,
    allowNull: false
  },
  Color: {
    type: db.orm.STRING
  }
}, {
  timestamps: true,
  createdAt: 'CreateDate',
  updatedAt: 'UpdateDate',
  deletedAt: false
});

db.conn.sync().then(() => {
  console.log('Team table synced.');
});

module.exports = TeamModel;