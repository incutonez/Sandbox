Ext.define('JefBox.view.games.QuestionView', {
  extend: 'JefBox.BaseDialog',
  alias: 'widget.gamesQuestionView',

  viewModel: {
    data: {
      viewRecord: null
    },
    formulas: {
      hideText: function(get) {
        return get('viewRecord.Type') !== Enums.QuestionTypes.TEXT;
      },
      hideAnswer: function(get) {
        return Ext.isEmpty(get('viewRecord.Type'));
      }
    }
  },

  width: 300,
  height: 600,
  title: 'Question',
  minimizable: false,
  maximizable: false,
  isCrudDialog: true,
  bodyPadding: 10,
  layout: {
    type: 'vbox'
  },
  items: [{
    xtype: 'enumComboBox',
    store: Enums.QuestionTypes,
    label: 'Type',
    bind: {
      value: '{viewRecord.Type}'
    }
  }, {
    xtype: 'numberfield',
    label: 'Round',
    minValue: 1,
    required: true,
    bind: {
      value: '{viewRecord.Round}'
    }
  }, {
    xtype: 'textfield',
    label: 'Question',
    required: true,
    bind: {
      hidden: '{hideText}',
      value: '{viewRecord.Information}'
    }
  }, {
    xtype: 'textfield',
    label: 'Answer',
    required: true,
    bind: {
      hidden: '{hideAnswer}',
      value: '{viewRecord.Answer}'
    }
  }],

  onClickSaveBtn: function() {
    this.clickedSave = true;
    this.fireEvent('clickSave', this.getViewRecord());
    this.close();
  }
});