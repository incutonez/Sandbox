module.exports = function(server) {
  const io = require('socket.io')(server);
  io.on('connection', (client) => {
    console.log('client connected');
    client.on('pickingTeam', (config) => {
      console.log('pickingTeam', config);
    });
    client.on('disconnect', () => {
      console.log('client disconnected');
    });
  });
};