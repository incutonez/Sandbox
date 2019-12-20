const User = require('./models/User');
let people = {};
module.exports = function(server) {
  const io = require('socket.io')(server);
  io.on('connection', (client) => {
    let user;
    console.log('client connected');
    client.on('pickingTeam', (config) => {
      console.log('pickingTeam', config);
    });
    client.on('authenticated', (config) => {
      user = people[client.id] = config;
      User.updateUser({
        Id: user.Id,
        IsActive: true
      }).then(() => {
        io.sockets.emit('userStatusChange', user);
      }).catch((err) => {
        console.log(err);
      });
      console.log(user);
    });
    client.on('disconnect', () => {
      console.log('client disconnected', user);
      if (user) {
        User.updateUser({
          Id: user.Id,
          IsActive: false
        }).then(() => {
          io.sockets.emit('userStatusChange', user);
        }).catch((err) => {
          console.log(err);
        });
      }
      delete people[client.id];
    });
  });
};