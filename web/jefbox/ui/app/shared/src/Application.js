Ext.define('JefBox.shared.Application', {
  extend: 'Ext.app.Application',
  name: 'Shared',
  requires: [
    'Ext.*',
    'Ext.Loader',
    'JefBox.UserProfile',
    'JefBox.Routes',
    'JefBox.view.auth.LoginView',
    'JefBox.Icons',
    'JefBox.Enums',
    'JefBox.Socket',
    'JefBox.Styles'
  ],

  appLoaded: false,
  defaultToken: Routes.HOME,

  routes: {
    '*': {
      before: 'onBeforeEveryRoute'
    }
  },

  onBeforeEveryRoute: function(action) {
    var me = this;
    if (UserProfile.phantom) {
      UserProfile.checkSession(Ext.util.History.getToken());
      return false;
    }
    if (!me.appLoaded) {
      Ext.Loader.loadScript({
        url: 'app/' + Ext.manifest.profile + '/viewport.js',
        onLoad: function() {
          me.appLoaded = true;
          setTimeout(function() {
            action.resume();
          }, 100);
        }
      });
      return;
    }
    action.resume();
  },

  init: function() {
    Enums.loadEnums();
  },

  onAppUpdate: function() {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?', function(choice) {
      if (choice === 'yes') {
        window.location.reload();
      }
    });
  }
});
