Ext.define('JefBox.view.uploads.MainView', {
  extend: 'Ext.grid.Grid',
  alias: 'widget.uploadsMainView',

  store: JefBox.store.Uploads,
  defaultListenerScope: true,
  itemConfig: {
    viewModel: true
  },
  selectable: {
    cells: true,
    rows: false
  },
  columns: [{
    text: 'Type',
    dataIndex: 'Type',
    renderer: function(value) {
      return Enums.UploadTypes.getDisplayValue(value);
    }
  }, {
    text: 'Url',
    dataIndex: 'Url'
  }, {
    text: 'Image',
    dataIndex: 'Data',
    flex: 1,
    cell: {
      encodeHtml: false,
      bind: {
        value: '{record.displayValue}'
      },
      listeners: {
        mouseenter: {
          element: 'element',
          fn: 'onMouseEnterData'
        }
      }
    }
  }],

  onMouseEnterData: function(event, html, eOpts) {
    let img = Ext.get(html).down('img');
    let tooltip = Ext.create('Ext.tip.ToolTip', {
      target: html,
      html: '<img src="' + img.getAttribute('src') + '" />',
      listeners: {
        hide: function() {
          tooltip.destroy();
        }
      }
    });
  }
});