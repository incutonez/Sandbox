const SECRET_KEY = 'jackjohnson1';
const url = require('url');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const UserModel = require('../models/User');
module.exports = (app) => {
  app.use(cookieParser());
  app.use(session({
    key: 'auth_token',
    secret: 'jackjohnson1',
    resave: false,
    saveUninitialized: false
  }));
  app.use(async (req, res, next) => {
    // TODO: This should probably check the database for the req.session.user.Id value
    if ([process.env.BASE_API_PATH + '/login'].indexOf(url.parse(req.url).pathname) === -1 && (!req.cookies.auth_token || !req.session.user)) {
      return res.sendStatus(401);
    }
    next();
  });
  app.use(process.env.BASE_API_PATH, require('./Login'));
  app.use(process.env.BASE_API_PATH, require('./Users'));
  app.use(process.env.BASE_API_PATH, require('./Teams'));
  app.get('/', function(req, res) {
    res.render(__dirname + process.env.UI_DIR + '/index.html');
  });
};