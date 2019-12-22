Ext.define('JefBox.shared.Application', {
  extend: 'Ext.app.Application',
  name: 'Shared',
  requires: [
    'Ext.*',
    'Ext.Loader',
    'JefBox.Enums',
    'JefBox.UserProfile',
    'JefBox.Routes',
    'JefBox.view.auth.LoginView',
    'JefBox.Icons',
    'JefBox.Socket',
    'JefBox.Styles'
  ],

  defaultToken: Routes.HOME,

  onAppUpdate: function() {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?', function(choice) {
      if (choice === 'yes') {
        window.location.reload();
      }
    });
  }
});
