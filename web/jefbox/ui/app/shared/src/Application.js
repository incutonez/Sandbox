Ext.define('JefBox.shared.Application', {
  extend: 'Ext.app.Application',
  name: 'Shared',
  requires: [
    'Ext.*',
    'Ext.Loader',
    'JefBox.*'
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
        url: 'app/viewport.js',
        onLoad: function() {
          me.appLoaded = true;
          action.resume();
        }
      });
      return;
    }
    action.resume();
  },

  init: function() {
    Enums.loadEnums();
  },

  launch: function() {
    Ext.get('splash').destroy();
  },

  onAppUpdate: function() {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?', function(choice) {
      if (choice === 'yes') {
        window.location.reload();
      }
    });
  }
});
