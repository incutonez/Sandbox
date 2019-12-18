Ext.define('JefBox.shared.UserProfile', {
  extend: 'JefBox.model.User',
  singleton: true,
  alternateClassName: [
    'UserProfile'
  ],

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
          me.set(Ext.decode(response.responseText).data);
        }
        if (Ext.isFunction(callback)) {
          callback(successful);
        }
      }
    });
  }
});