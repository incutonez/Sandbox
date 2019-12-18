Ext.define('JefBox.shared.Application', {
  extend: 'Ext.app.Application',
  name: 'JefBox',

  defaultToken: Routes.HOME,

  routes: {
    '*': {
      before: 'onBeforeEveryRoute'
    }
  },

  onBeforeEveryRoute: function(action) {
    if (UserProfile.phantom) {
      action.stop();
      UserProfile.checkSession(Ext.util.History.getToken());
      return false;
    }
    action.resume();
  },

  removeSplash: function() {
    Ext.getBody().removeCls('launching');
    var elem = document.getElementById('splash');
    elem.parentNode.removeChild(elem);
  },

  launch: function() {
    this.removeSplash();
    Ext.Viewport.add([{
      xtype: 'mainView'
    }]);
  },

  onAppUpdate: function() {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
    function(choice) {
      if (choice === 'yes') {
        window.location.reload();
      }
    }
    );
  }
});
