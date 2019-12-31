Ext.define('JefBox.view.games.RoundItemView', {
  extend: 'JefBox.BaseDialog',
  alias: 'widget.gamesRoundItemView',

  viewModel: {
    data: {
      viewRecord: null
    },
    formulas: {
      hideText: function(get) {
        return get('viewRecord.Type') !== Enums.RoundItemTypes.TEXT;
      },
      hideAnswer: function(get) {
        return Ext.isEmpty(get('viewRecord.Type'));
      }
    }
  },

  width: 300,
  height: 600,
  title: 'Round Item',
  minimizable: false,
  maximizable: false,
  isCrudDialog: true,
  bodyPadding: 10,
  layout: {
    type: 'vbox'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox'
    },
    items: [{
      xtype: 'container',
      flex: 1,
      margin: '0 5 0 0',
      layout: {
        type: 'vbox'
      },
      items: [{
        xtype: 'enumComboBox',
        store: Enums.RoundItemTypes,
        label: 'Type',
        bind: {
          value: '{viewRecord.Type}'
        }
      }, {
        xtype: 'numberfield',
        label: 'Points',
        minValue: -10,
        required: true,
        bind: {
          value: '{viewRecord.Points}'
        }
      }]
    }, {
      xtype: 'container',
      flex: 1,
      margin: '0 0 0 5',
      layout: {
        type: 'vbox'
      },
      items: [{
        xtype: 'numberfield',
        label: 'Round',
        minValue: 1,
        required: true,
        bind: {
          value: '{viewRecord.Round}'
        }
      }, {
        xtype: 'numberfield',
        label: 'Order',
        minValue: 1,
        required: true,
        bind: {
          value: '{viewRecord.Order}'
        }
      }]
    }]
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
    let viewRecord = this.getViewRecord();
    if (viewRecord) {
      viewRecord.commit();
    }
    this.clickedSave = true;
    this.fireEvent('clickSave', viewRecord);
    this.close();
  }
});