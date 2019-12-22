const url = require('url');
const cookieParser = require('cookie-parser');
const session = require('express-session');
module.exports = (app) => {
  app.use(cookieParser());
  app.use(session({
    key: 'auth_token',
    secret: 'jackjohnson1',
    resave: false,
    saveUninitialized: false
  }));
  app.use((req, res, next) => {
    // TODO: This should probably check the database for the req.session.user.Id value
    // Only allow login and enums to pass
    // TODO: Should figure out how to not allow the app loading before login has succeeded
    if ([process.env.BASE_API_PATH + '/login', process.env.BASE_API_PATH + '/enums'].indexOf(url.parse(req.url).pathname) === -1 && (!req.cookies.auth_token || !req.session.user)) {
      return res.sendStatus(401);
    }
    next();
  });
  app.use(process.env.BASE_API_PATH, require('./Login'));
  app.use(process.env.BASE_API_PATH, require('./Users'));
  app.use(process.env.BASE_API_PATH, require('./Teams'));
  app.use(process.env.BASE_API_PATH, require('./Games'));
  app.use(process.env.BASE_API_PATH, require('./Enums'));
  app.get('/', function(req, res) {
    res.render(__dirname + process.env.UI_DIR + '/index.html');
  });
};