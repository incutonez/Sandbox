const db = require('./database');
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
      db.User.updateUser({
        Id: user.Id,
        IsActive: true
      }).then(() => {
        io.emit('userStatusChange', user);
      }).catch((err) => {
        console.log(err);
      });
      console.log(user);
    });
    client.on('disconnect', () => {
      console.log('client disconnected', user);
      if (user) {
        db.User.updateUser({
          Id: user.Id,
          IsActive: false
        }).then(() => {
          io.emit('userStatusChange', user);
        }).catch((err) => {
          console.log(err);
        });
      }
      delete people[client.id];
    });
  });
};