Ext.define('JefBox.shared.overrides.data.Connection', {
  override: 'Ext.data.Connection',

  constructor: function(config) {
    this.callParent(arguments);
    this.on({
      requestexception: function(conn, response, options, eOpts) {
        if (response.status === 401) {
          location.hash = '#' + Routes.LOGIN;
        }
      }
    });
  }
});