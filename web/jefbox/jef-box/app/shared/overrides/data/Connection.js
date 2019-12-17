Ext.define('JefBox.shared.overrides.data.Connection', {
  override: 'Ext.data.Connection',

  constructor: function(config) {
    this.callParent(arguments);
    this.on({
      beforerequest: function(conn, options, eOpts) {
        if (UserProfile.ACCESS_TOKEN) {
          options.headers = options.headers || {};
          options.headers['x-access-token'] = UserProfile.ACCESS_TOKEN;
        }
        else {
          location.hash = '#' + Routes.LOGIN;
        }
      },
      requestexception: function(conn, response, options, eOpts) {
        if (response.status === 401) {
          location.hash = '#' + Routes.LOGIN;
        }
      }
    });
  }
});