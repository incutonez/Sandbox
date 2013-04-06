Ext.onReady(function() {
  var store = Ext.create('Ext.data.TreeStore', {
    root: {
      expanded: true,
      children: [{
        text: 'Parent 1',
        id: 'parent1',
        children: [{
          text: 'Child 1',
          id: 'child1',
          leaf: true
        }, {
          text: 'Child 2',
          id: 'child2',
          leaf: true,
          iconCls: 'off'
        }]
      }, {
        text: 'Parent 2',
        id: 'parent2',
        children: [{
          text: 'Child 3',
          id: 'child3',
          leaf: true,
          iconCls: 'off'
        }, {
          text: 'Child 4',
          id: 'child4',
          leaf: true,
          iconCls: 'off'
        }]
      }]
    }
  });
  
  Ext.create('Ext.tree.Panel', {
    renderTo: Ext.getBody(),
    store: store,
    width: 300,
    height: 400,
    rootVisible: false,
    id: 'grid',
    title: 'My Tree',
	lines: false,
    tbar: [{
      xtype: 'button',
      text: 'Click!',
      listeners: {
        click: function(a, b, c) {
          Ext.getCmp('grid').store.getNodeById('child1').set('iconCls', 'off');
		  Ext.getCmp('grid').store.getNodeById('child1').set('cls', 'bold2');
          Ext.getCmp('grid').store.getNodeById('child4').set('iconCls', 'on');
		  Ext.getCmp('grid').store.getNodeById('child3').set('cls', 'bold2');
        }
      }
    }]
  });
});