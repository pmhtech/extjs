Ext.define('PmhTech.event.xtype.Grid', {
	extend: 'Ext.Base',

	requires: [
		'Ext.data.TreeStore'
	],
	statics: {
		select : function(grid){

			var selmodel =grid.getSelectionModel();
			var record = selmodel.getSelection[0];
			var index = grid.getStore().find('id',record.getId());
			return {
				component : grid,
				eventName : 'select',
				arguments : [selmodel,record,index]
			}

		},
		storeLoad : function(grid){

			var store = grid.getStore();

			return {
				component : grid,
				eventName : 'storeLoad',
				arguments : [store]
			}

		}
	}
});