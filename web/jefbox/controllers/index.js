module.exports = (app) => {
  app.use('/api', require('./Users'));
  app.get('/', function(req, res) {
    res.render(__dirname + '/jef-box/index.html');
  });
};