Ext.define('JefBox.view.teams.MainViewController', {
  extend: 'JefBox.view.BaseCrudViewController',
  alias: 'controller.teamsMainView',

  BASE_ROUTE: Routes.TEAMS,

  onSelectUserField: function(field, record) {
    var team = field.parent.getRecord();
    var usersStore = team && team.getUsersStore();
    if (usersStore) {
      usersStore.removeAll();
      usersStore.add(record);
    }
  }
});