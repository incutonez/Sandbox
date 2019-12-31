Ext.define('JefBox.view.games.EditViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.gamesEditView',
  requires: [
    'JefBox.view.games.QuestionView'
  ],

  showQuestionView: function(record) {
    Ext.create('JefBox.view.games.QuestionView', {
      viewModel: {
        data: {
          viewRecord: record || JefBox.model.game.Question.loadData()
        }
      },
      listeners: {
        scope: this,
        clickSave: 'onClickSaveQuestionBtn'
      }
    });
  },

  onClickSaveQuestionBtn: function(questionRecord) {
    let viewRecord = this.getViewRecord();
    let questionsStore = viewRecord && viewRecord.getQuestionsStore();
    if (questionsStore && questionRecord && !questionRecord.store) {
      questionsStore.add(questionRecord);
    }
  },

  onClickAddTeam: function(gridEditor, context) {
    let viewRecord = this.getViewRecord();
    let teamsStore = viewRecord && viewRecord.getTeamsStore();
    let teamsView = this.lookup('teamsView');
    let teamsPlugin = teamsView && teamsView.getPlugin('rowEditingPlugin');
    if (teamsStore && teamsPlugin) {
      let team = teamsStore.add({});
      teamsPlugin.startEdit(team[0]);
    }
  },

  onEditQuestionRow: function(grid, info) {
    this.showQuestionView(info.record);
  },

  onDeleteQuestionRow: function(grid, info) {
    let record = info.record;
    let store = record && record.store;
    if (store) {
      store.remove(record);
    }
  },

  onClickAddQuestionBtn: function() {
    this.showQuestionView();
  },

  onClickCancel: function() {
    this.closeView();
  },

  onClickSave: function() {
    let me = this;
    let viewRecord = me.getViewRecord();
    if (viewRecord) {
      viewRecord.save({
        callback: function(record, operation, successful) {
          me.closeView();
        }
      });
    }
  },

  getViewRecord: function() {
    let viewModel = this.getViewModel();
    let viewRecord = viewModel && viewModel.get('viewRecord');
    if (!viewRecord) {
      this.logError('viewRecord is undefined');
    }
    return viewRecord;
  }
});