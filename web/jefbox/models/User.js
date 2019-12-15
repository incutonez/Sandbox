const db = require('../database');
const UserModel = db.orm.define('User', {
  Id: {
    type: db.types.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_int'
  },
  Name: {
    type: db.types.STRING,
    allowNull: false,
    field: 'user_name'
  },
  IsActive: {
    type: db.types.BOOLEAN,
    defaultValue: 0,
    field: 'is_active'
  },
  CreateDate: {
    type: db.types.DATE,
    defaultValue: db.types.NOW,
    field: 'create_date'
  }
});
db.orm.sync().then(() => {
  console.log('User table synced.');
});
module.exports = UserModel;