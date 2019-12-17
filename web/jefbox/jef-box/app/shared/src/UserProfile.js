Ext.define('JefBox.shared.UserProfile', {
  extend: 'JefBox.model.User',
  singleton: true,
  alternateClassName: [
    'UserProfile'
  ],

  logInUser: function(selectedUser, callback) {
    var me = this;
    if (selectedUser) {
      Ext.Ajax.request({
        method: 'POST',
        url: 'api/login',
        jsonData: selectedUser.getData(),
        callback: function(options, successful, response) {
          if (successful) {
            me.ACCESS_TOKEN = response.getResponseHeader('x-access-token');
            me.set(Ext.decode(response.responseText).data);
          }
          if (Ext.isFunction(callback)) {
            callback(successful);
          }
        }
      });
    }
  }
});