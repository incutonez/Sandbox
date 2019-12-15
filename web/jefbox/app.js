const port = 1337;
const ip = require('ip');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/jef-box'));
io.on('connection', (client) => {
  console.log('client connected');
  client.on('pickingTeam', (config) => {
    console.log('pickingTeam', config);
  });
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});
app.get('/', function(req, res) {
  res.render(__dirname + '/jef-box/index.html');
});
server.listen(port, () => {
  console.log('running on', port, ip.address());
});