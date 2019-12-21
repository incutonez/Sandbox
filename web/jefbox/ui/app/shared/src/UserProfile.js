Ext.define('JefBox.shared.UserProfile', {
  extend: 'JefBox.model.User',
  singleton: true,
  alternateClassName: [
    'UserProfile'
  ],

  updateUserData: function(data) {
    // We set phantom to false because we've loaded an actual user at this point
    this.phantom = false;
    this.set(data);
    socket.emit('authenticated', data);
  },

  checkSession: function(nextToken) {
    var me = this;
    me.load({
      callback: function(record, operation, successful) {
        if (successful) {
          me.updateUserData(record.getData());
          Routes.redirectTo(nextToken, {
            force: true
          });
        }
        else if (!me.authWindow) {
          me.showLogInView(nextToken);
        }
      }
    });
  },

  showLogInView: function(nextToken) {
    var me = this;
    nextToken = nextToken || Ext.util.History.getToken();
    if (!me.authWindow) {
      me.authWindow = Ext.create('JefBox.view.auth.LoginView', {
        listeners: {
          destroy: function() {
            me.authWindow = null;
            Routes.redirectTo(nextToken, {
              force: true
            });
          }
        }
      }).show();
    }
  },

  logInUser: function(callback) {
    var me = this;
    Ext.Ajax.request({
      method: 'POST',
      url: 'api/login',
      jsonData: {
        UserName: me.get('UserName'),
        Password: me.get('Password')
      },
      callback: function(options, successful, response) {
        if (successful) {
          me.updateUserData(Ext.decode(response.responseText));
          me.authWindow.close();
        }
        else {
          Ext.toast('Incorrect credentials.');
        }
      }
    });
  },

  proxy: {
    type: 'ajax',
    url: 'api/login'
  }
});