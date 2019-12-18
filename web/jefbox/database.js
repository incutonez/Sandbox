const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_SERVER,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  // for writing to database
  timezone: '-07:00',
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