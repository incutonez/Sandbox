const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  define: {
    timestamps: false
  },
  dialectOptions: {
    // for reading from database
    useUTC: false
  }
});
module.exports = {
  conn: sequelize,
  orm: Sequelize
};