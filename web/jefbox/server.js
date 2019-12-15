require('dotenv').config();
const ip = require('ip');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/jef-box'));
require('./sockets')(server);
require('./controllers/index')(app);
server.listen(process.env.PORT, () => {
  console.log('running on', process.env.PORT, ip.address());
});