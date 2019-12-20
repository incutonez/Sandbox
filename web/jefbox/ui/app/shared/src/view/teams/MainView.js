Ext.define('JefBox.view.teams.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.teamsMainView',
  requires: [
    'JefBox.model.Team'
  ],

  controller: {
    BASE_ROUTE: Routes.TEAMS
  },
  viewModel: {
    data: {
      mainStoreModel: 'JefBox.model.Team'
    }
  }
});