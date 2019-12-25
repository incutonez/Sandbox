Ext.define('JefBox.Socket', {
  alternateClassName: [
    'socket'
  ],
  singleton: true,
  config: {
    connection: null
  },

  constructor: function(config) {
    if (window.io) {
      this.setConnection(io());
    }
  },

  on: function(event, handler) {
    var connection = this.getConnection();
    if (connection) {
      connection.on(event, handler);
    }
  },

  off: function(event, handler) {
    var connection = this.getConnection();
    if (connection) {
      connection.off(event, handler);
    }
  },

  emit: function(id, message) {
    var connection = this.getConnection();
    if (connection) {
      connection.emit(id, message);
    }
  },

  setUpStoreListeners: function() {
    let me = this;
    let users = JefBox.store.Users;
    let teams = JefBox.store.Teams;
    let games = JefBox.store.Games;
    me.off('updatedTeams');
    me.off('updatedUsers');
    me.off('userStatusChange');
    me.off('updatedGames');
    // TODOJEF: How to remove socket events
    me.on('updatedTeams', function() {
      teams.load();
      users.load();
    });
    me.on('updatedUsers', function() {
      users.load();
      teams.load();
    });
    me.on('userStatusChange', function() {
      users.load();
      if (!games.isLoaded()) {
        games.load();
      }
      if (!teams.isLoaded()) {
        teams.load();
      }
    });
    me.on('updatedGames', function() {
      games.load();
    });
  }
});