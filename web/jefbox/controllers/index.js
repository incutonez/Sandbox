const jwt = require('jwt-simple');
const SECRET_KEY = 'jackjohnson1';
const User = require('../models/User');
const url = require('url');
module.exports = (app) => {
  app.use(async (req, res, next) => {
    var authHeader = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var decoded = authHeader && jwt.decode(authHeader, SECRET_KEY);
    if (decoded || ['/api/users', '/api/login'].indexOf(url.parse(req.url).pathname) !== -1) {
      next();
    }
    else {
      return res.sendStatus(401);
    }
  });
  app.use('/api', require('./Users'));
  app.use('/api/login', (req, res) => {
    res.setHeader('x-access-token', jwt.encode(req.body, SECRET_KEY));
    return res.send({success: true, data: req.body});
  });
  app.get('/', function(req, res) {
    res.render(__dirname + '/jef-box/index.html');
  });
};